import { useEffect, useRef, useState } from "react";
import { X, Send, Mic, Square, Volume2, Sparkles, MessageCircle, Route } from "lucide-react";
import { FAQS, GREETING_ID, matchFaq, QUICK_CHIPS } from "../avatar-brain";
import { scrollToId } from "../motion";

type Msg = { from: "avatar" | "user"; text: string };

/* ---------- guided tour stops (same engine as before) ---------- */
const STOPS = [
  { id: "top", num: "00", label: "INTRO", file: "/tour/00.mp3", caption: "Meet Syed — your guide through this portfolio." },
  { id: "origin", num: "01", label: "ORIGIN", file: "/tour/01.mp3", caption: "Where the journey began." },
  { id: "arsenal", num: "02", label: "ARSENAL", file: "/tour/02.mp3", caption: "The skills arsenal." },
  { id: "missions", num: "03", label: "MISSIONS", file: "/tour/03.mp3", caption: "Four internships, one year." },
  { id: "flagship", num: "04", label: "FLAGSHIP", file: "/tour/04.mp3", caption: "DEFENXIA — the flagship build." },
  { id: "credentials", num: "05", label: "CREDENTIALS", file: "/tour/05.mp3", caption: "Ten certifications deep." },
  { id: "proof", num: "06", label: "PROOF", file: "/tour/06.mp3", caption: "Receipts, not promises." },
  { id: "trajectory", num: "07", label: "TRAJECTORY", file: "/tour/07.mp3", caption: "Where this is all headed." },
  { id: "contact", num: "08", label: "CONTACT", file: "/tour/08.mp3", caption: "Open a channel." },
];

function Waveform({ small = false }: { small?: boolean }) {
  return (
    <span className={`flex items-end gap-[3px] ${small ? "" : "rounded-full bg-void/80 px-2 py-1"}`}>
      {[0, 1, 2, 3].map((b) => (
        <span
          key={b}
          className="w-[3px] animate-bounce rounded-full bg-magenta"
          style={{
            height: `${small ? 6 + (b % 3) * 3 : 8 + (b % 3) * 5}px`,
            animationDelay: `${b * 0.12}s`,
            animationDuration: "0.7s",
          }}
        />
      ))}
    </span>
  );
}

export default function AvatarAssistant({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [micOk, setMicOk] = useState(false);

  // section awareness: which chapter is on screen right now
  const [currentSection, setCurrentSection] = useState("top");
  // speech bubble for section voice intros
  const [bubble, setBubble] = useState<{ label: string; caption: string } | null>(null);

  // tour state
  const [touring, setTouring] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourSpeaking, setTourSpeaking] = useState(false);

  const chatAudio = useRef<HTMLAudioElement | null>(null);
  const tourAudio = useRef<HTMLAudioElement | null>(null);
  const tourIndexRef = useRef(0);
  const touringRef = useRef(false);
  const stopTimer = useRef<number | null>(null);
  const greeted = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<any>(null);

  /* ---------- section awareness ---------- */
  useEffect(() => {
    if (!visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrentSection(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [visible]);

  /* ---------- speech ---------- */
  const speak = (file: string, onDone?: () => void) => {
    if (!chatAudio.current) chatAudio.current = new Audio();
    const a = chatAudio.current;
    a.pause();
    a.src = file;
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(safety);
      setSpeaking(false);
      onDone?.();
    };
    // safety: a hung/blocked play() can never leave the avatar stuck "talking"
    const safety = window.setTimeout(done, 25000);
    a.onplay = () => setSpeaking(true);
    a.onended = done;
    a.onerror = done;
    a.play().catch(done);
  };

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || speaking) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    const faq = matchFaq(q);
    // tiny "thinking" beat so it feels alive
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "avatar", text: faq.answer }]);
      speak(faq.audio, () => {
        if (faq.action === "tour") startTour();
      });
    }, 450);
  };

  /* ---------- mic (progressive enhancement) ---------- */
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) setMicOk(true);
  }, []);

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    recogRef.current = rec;
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript as string;
      setListening(false);
      if (t.trim()) ask(t);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    setListening(true);
  };

  /* ---------- mascot: speak about the section on screen ----------
     Computed live from the scroll position at tap time — never stale. */
  const speakSection = () => {
    const y = window.scrollY + window.innerHeight * 0.4;
    let current = STOPS[0].id;
    for (const s of STOPS) {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= y) current = s.id;
    }
    setCurrentSection(current);
    const stop = STOPS.find((s) => s.id === current) ?? STOPS[0];
    setBubble({ label: stop.label, caption: stop.caption });
    speak(stop.file, () => setBubble(null));
  };

  /* ---------- panel open: greet once ---------- */
  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // opening the panel interrupts any section intro
      chatAudio.current?.pause();
      setBubble(null);
    }
    if (next && !greeted.current) {
      greeted.current = true;
      const g = FAQS.find((f) => f.id === GREETING_ID)!;
      setTimeout(() => {
        setMsgs([{ from: "avatar", text: g.answer }]);
        speak(g.audio);
      }, 500);
    }
    if (!next) {
      chatAudio.current?.pause();
      setSpeaking(false);
      recogRef.current?.stop();
      setListening(false);
    }
  };

  /* ---------- guided tour ----------
     Advancement is timer-driven (deterministic): each stop advances on audio
     end OR after a max dwell — a hung/blocked audio element can never stall
     the tour. Audio is best-effort (plays when the platform allows). */
  const advanceTour = () => {
    if (stopTimer.current) {
      clearTimeout(stopTimer.current);
      stopTimer.current = null;
    }
    if (!touringRef.current) return;
    const next = tourIndexRef.current + 1;
    if (next < STOPS.length) playStop(next);
    else stopTour();
  };

  const playStop = (i: number) => {
    const stop = STOPS[i];
    tourIndexRef.current = i;
    setTourIndex(i);
    setOpen(false);
    scrollToId(stop.id);
    // safety dwell: always advance, even if audio hangs or is blocked
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = window.setTimeout(advanceTour, 20000);
    setTimeout(() => {
      if (!touringRef.current) return;
      const a = tourAudio.current!;
      a.src = stop.file;
      // best-effort audio; the dwell timer advances regardless
      a.play().catch(() => {});
    }, 900);
  };

  const startTour = () => {
    if (!tourAudio.current) tourAudio.current = new Audio();
    // tour takes over: stop any section intro / chat audio
    chatAudio.current?.pause();
    setSpeaking(false);
    setBubble(null);
    setOpen(false);
    const a = tourAudio.current;
    STOPS.forEach((s) => {
      const pre = new Audio();
      pre.preload = "auto";
      pre.src = s.file;
    });
    touringRef.current = true;
    setTouring(true);
    a.onended = () => advanceTour();
    a.onplay = () => setTourSpeaking(true);
    a.onpause = () => setTourSpeaking(false);
    playStop(0);
  };

  const stopTour = () => {
    touringRef.current = false;
    if (stopTimer.current) {
      clearTimeout(stopTimer.current);
      stopTimer.current = null;
    }
    const a = tourAudio.current;
    if (a) {
      a.pause();
      a.removeAttribute("src");
    }
    setTourSpeaking(false);
    setTouring(false);
    setTourIndex(0);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

  useEffect(
    () => () => {
      chatAudio.current?.pause();
      tourAudio.current?.pause();
      recogRef.current?.stop();
    },
    []
  );

  if (!visible) return null;
  const stop = STOPS[tourIndex];

  return (
    <>
      {/* ===== floating mascot cluster ===== */}
      {!open && !touring && (
        <div className="fixed bottom-6 right-6 z-[85] flex flex-col items-end gap-3">
          {/* speech bubble: voice intro of the section on screen (tap to replay) */}
          {bubble && (
            <div
              className="glass-card w-60 cursor-pointer p-4"
              onClick={speakSection}
              data-hover
              role="button"
              aria-label="Replay section intro"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-magenta">
                {speaking ? <Waveform small /> : <Sparkles className="h-3 w-3" />}
                {bubble.label}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-cream">{bubble.caption}</div>
            </div>
          )}

          {/* chat + tour pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleOpen}
              className="flex items-center gap-1.5 rounded-full border border-line/70 bg-abyss/90 px-3.5 py-2 font-mono text-[10px] tracking-[0.25em] text-mist backdrop-blur transition-colors hover:border-magenta/60 hover:text-magenta"
              data-hover
              aria-label="Open chat with the avatar"
            >
              <MessageCircle className="h-3.5 w-3.5" /> CHAT
            </button>
            <button
              onClick={startTour}
              className="flex items-center gap-1.5 rounded-full border border-magenta/50 bg-magenta/10 px-3.5 py-2 font-mono text-[10px] tracking-[0.25em] text-magenta backdrop-blur transition-all hover:bg-magenta hover:text-void"
              data-hover
              aria-label="Start guided tour"
            >
              <Route className="h-3.5 w-3.5" /> TOUR
            </button>
          </div>

          {/* mascot: click = voice intro of the section on screen */}
          <button
            onClick={speakSection}
            className="group relative"
            data-hover
            aria-label="Avatar speaks about the section on your screen"
          >
            <span className={`${speaking ? "animate-mascot-work" : "animate-floaty"} relative block`}>
              <img
                src={speaking ? "/mascot-working.jpg" : "/mascot-idle.jpg"}
                alt="Avatar"
                className="h-20 w-20 rounded-full border-2 border-magenta/60 object-cover shadow-[0_0_36px_rgba(236,47,125,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
              {speaking && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-magenta/60" />
              )}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-magenta/50 bg-void/90 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-magenta">
                {speaking
                  ? "TALKING"
                  : (STOPS.find((s) => s.id === currentSection)?.label ?? "HI")}
              </span>
            </span>
          </button>
        </div>
      )}

      {/* ===== chat panel ===== */}
      {open && !touring && (
        <div className="fixed bottom-6 right-6 z-[95] flex max-h-[70vh] w-[calc(100%-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-magenta/30 bg-abyss/95 shadow-[0_0_60px_rgba(236,47,125,0.18)] backdrop-blur-xl glass-card">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line/60 p-4">
            <span className="relative">
              {speaking && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-magenta/60" />
              )}
              <img
                src={speaking ? "/mascot-working.jpg" : "/mascot-idle.jpg"}
                alt="Syed's avatar"
                className="h-12 w-12 rounded-full border-2 border-magenta/60 object-cover"
              />
              {speaking && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                  <Waveform />
                </span>
              )}
            </span>
            <div className="flex-1">
              <div className="font-display text-sm font-bold text-cream">Syed's Avatar</div>
              <div className="font-mono text-[11px] text-dim">
                {speaking ? <span className="text-magenta">SPEAKING…</span> : listening ? <span className="text-magenta">LISTENING…</span> : "ONLINE · ASK ME ANYTHING"}
              </div>
            </div>
            <button
              onClick={toggleOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-magenta/60 hover:text-magenta"
              aria-label="Close"
              data-hover
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-magenta/15 text-cream"
                      : "rounded-bl-md border border-line/70 bg-panel/80 text-mist"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* quick chips */}
          <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {QUICK_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => ask(c)}
                className="shrink-0 rounded-full border border-line bg-panel/70 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-mist transition-colors hover:border-magenta/60 hover:text-magenta"
                data-hover
              >
                {c}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-line/60 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, Defenxia…"
              className="min-w-0 flex-1 rounded-full border border-line bg-void/70 px-4 py-2.5 text-sm text-cream placeholder:text-dim outline-none focus:border-magenta/60"
              data-hover
            />
            {micOk && (
              <button
                type="button"
                onClick={toggleMic}
                aria-label="Voice input"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all ${
                  listening
                    ? "animate-pulse border-red-400/70 bg-red-400/10 text-red-400"
                    : "border-line text-mist hover:border-magenta/60 hover:text-magenta"
                }`}
                data-hover
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              aria-label="Send"
              className="bg-ig flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-shadow hover:shadow-[0_0_20px_rgba(236,47,125,0.5)]"
              data-hover
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* ===== tour overlay ===== */}
      {touring && (
        <div className="fixed bottom-6 left-1/2 z-[95] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2">
          <div className="glass overflow-hidden rounded-3xl border border-magenta/30 shadow-[0_0_60px_rgba(236,47,125,0.2)] glass-card">
            <div className="h-1 w-full bg-line/60">
              <div
                className="h-full bg-gradient-to-r from-magenta to-ember transition-all duration-500"
                style={{ width: `${((tourIndex + 1) / STOPS.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-4 p-5">
              <span className="relative shrink-0">
                {tourSpeaking && (
                  <>
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-magenta/60" />
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-magenta/40 [animation-delay:1.3s]" />
                  </>
                )}
                <img
                  src="/mascot-working.jpg"
                  alt="Syed — your tour guide"
                  className="h-16 w-16 rounded-full border-2 border-magenta/60 object-cover"
                />
                {tourSpeaking && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <Waveform />
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-magenta">
                  <Volume2 className="h-3.5 w-3.5" />
                  {stop.num} — {stop.label}
                </div>
                <div className="mt-1 truncate font-display text-sm font-semibold text-cream">
                  {stop.caption}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-dim">
                  STOP {tourIndex + 1} / {STOPS.length}
                  {tourSpeaking ? " · SPEAKING" : " · …"}
                </div>
              </div>
              <button
                onClick={stopTour}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-red-400/70 hover:text-red-400"
                aria-label="Stop tour"
                data-hover
              >
                <Square className="h-4 w-4" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
