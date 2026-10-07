import { useEffect, useState } from "react";
import Boot from "./components/Boot";
import Cursor from "./components/Cursor";
import Field from "./components/Field";
import Nav from "./components/Nav";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Origin from "./components/Origin";
import Arsenal from "./components/Arsenal";
import Missions from "./components/Missions";
import Flagship from "./components/Flagship";
import Credentials from "./components/Credentials";
import Proof from "./components/Proof";
import Quote from "./components/Quote";
import Trajectory from "./components/Trajectory";
import Contact from "./components/Contact";
import AvatarAssistant from "./components/AvatarAssistant";
import { useSmoothScroll, useReveals, useParallax, useCinematic, useRefreshOnLoad, getLenis } from "./motion";

export default function App() {
  const [entered, setEntered] = useState(false);
  useSmoothScroll();
  useReveals(entered);
  useParallax(entered);
  useCinematic(entered);
  useRefreshOnLoad();

  // freeze scrolling behind the boot gate
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (entered) lenis.start();
    else lenis.stop();
  }, [entered]);

  return (
    <div className="grain relative min-h-screen bg-void font-display text-cream">
      {!entered && <Boot onDone={() => setEntered(true)} />}
      <Cursor />
      <Field />
      {/* cinematic vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 55%, rgba(2,4,9,0.55) 100%)",
        }}
      />
      <Nav visible={entered} />
      <ScrollProgress />
      <AvatarAssistant visible={entered} />

      <main id="skew-wrap" className="relative">
        <Hero active={entered} />
        <Marquee />
        <Origin />
        <Arsenal />
        <Missions />
        <Marquee slow />
        <Flagship />
        <Credentials />
        <Proof />
        <Quote />
        <Trajectory />
        <Contact />
      </main>
    </div>
  );
}
