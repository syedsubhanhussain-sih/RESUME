/* Avatar Q&A brain — keyword matching over Syed's real facts.
   Every answer below has a pre-generated TTS clip in /avatar/. */

export type Faq = {
  id: string;
  patterns: string[];
  answer: string;   // shown as chat text
  audio: string;    // spoken clip
  action?: "tour";
};

export const GREETING_ID = "greeting";
export const FALLBACK_ID = "fallback";

export const FAQS: Faq[] = [
  {
    id: "greeting",
    patterns: ["hi", "hello", "hey", "hai", "namaste", "yo", "salam", "good morning", "good evening"],
    answer: "Hai! I'm Syed's avatar. Ask me about his skills, internships, Defenxia, or certifications — or tap Start Tour and I'll walk you through everything with my voice.",
    audio: "/avatar/greeting.mp3",
  },
  {
    id: "who",
    patterns: ["who are you", "your name", "about syed", "introduce", "tell me about yourself", "who is syed"],
    answer: "I'm an interactive avatar of Syed Subhan Hussain — a final-year Computer Science engineer specializing in Cyber Security, IoT & Blockchain, from Bidar, India.",
    audio: "/avatar/who.mp3",
  },
  {
    id: "tour",
    patterns: ["tour", "guide me", "walkthrough", "walk me", "show me around", "take me"],
    answer: "Let's go! Starting the guided voice tour now — sit back and I'll narrate the whole journey.",
    audio: "/avatar/tour.mp3",
    action: "tour",
  },
  {
    id: "internships",
    patterns: ["internship", "intern ", "experience", "work experience", "worked", "job"],
    answer: "Syed completed four cyber security internships in 2026 — SyntecXhub, Future Interns, Infotact Solutions for three months, and Codec Technologies. Full timeline in the Missions chapter.",
    audio: "/avatar/internships.mp3",
  },
  {
    id: "skills",
    patterns: ["skill", "tools", "expertise", "what can", "nmap", "wireshark", "burp", "good at", "stack"],
    answer: "His arsenal: security operations, incident handling, vulnerability assessment with Nmap, web security with Burp Suite, plus networking, Linux, Python and Java. The Arsenal chapter has the full breakdown.",
    audio: "/avatar/skills.mp3",
  },
  {
    id: "defenxia",
    patterns: ["defenxia", "project", "flagship", "app ", "built", "major project"],
    answer: "Defenxia is his flagship — a mobile security platform with real-time threat detection on Android. Born in a hackathon he led to the finals, now his major project. Live demos are linked in the Flagship chapter.",
    audio: "/avatar/defenxia.mp3",
  },
  {
    id: "certifications",
    patterns: ["certification", "certificate", "certified", "course", "courses"],
    answer: "Ten certifications — Cisco networking, Red Hat Linux, ethical hacking, AWS cloud, DevOps and more. Check the Credentials chapter.",
    audio: "/avatar/certifications.mp3",
  },
  {
    id: "education",
    patterns: ["education", "college", "degree", "cgpa", "university", "study", "studying", "school", "gpa"],
    answer: "He's pursuing a B.E. in Computer Science — Cyber Security, IoT & Blockchain — at Guru Nanak Dev Engineering College, graduating in 2027 with a CGPA of 8 out of 10.",
    audio: "/avatar/education.mp3",
  },
  {
    id: "achievements",
    patterns: ["achievement", "award", "won", "winner", "hackathon", "prize", "topper"],
    answer: "Winner of the mini project competition, finalist at the college internal hackathon, cluster finals at the PALS innovation exhibition, and class topper. See the Proof chapter.",
    audio: "/avatar/achievements.mp3",
  },
  {
    id: "contact",
    patterns: ["contact", "email", "phone", "hire", "reach", "message him", "call"],
    answer: "You can reach him at syedsubhanhussain.icb@gmail.com, or by phone at +91-8431323178. There's also a contact form at the end of the page.",
    audio: "/avatar/contact.mp3",
  },
  {
    id: "location",
    patterns: ["where", "location", "based", "from", "city", "country", "live"],
    answer: "He's based in Bidar, Karnataka, India.",
    audio: "/avatar/location.mp3",
  },
  {
    id: "vision",
    patterns: ["future", "vision", "goal", "plan", "startup", "founder", "ambition", "dream"],
    answer: "His trajectory: turn Defenxia into a global product, grow from SOC analyst to security engineer on the world stage, and eventually found his own technology companies.",
    audio: "/avatar/vision.mp3",
  },
  {
    id: "resume",
    patterns: ["resume", "cv", "download"],
    answer: "You can download his resume with the Resume button in the top navigation bar.",
    audio: "/avatar/resume.mp3",
  },
  {
    id: "social",
    patterns: ["github", "linkedin", "social", "profile link"],
    answer: "Find him on GitHub and LinkedIn — the links are in the Contact chapter at the end of the page.",
    audio: "/avatar/social.mp3",
  },
  {
    id: "thanks",
    patterns: ["thank", "great", "awesome", "nice", "cool", "amazing", "love it"],
    answer: "You're most welcome! Anything else you'd like to know?",
    audio: "/avatar/thanks.mp3",
  },
  {
    id: "bye",
    patterns: ["bye", "goodbye", "see you", "alright"],
    answer: "Goodbye! And remember — stay secure out there.",
    audio: "/avatar/bye.mp3",
  },
  {
    id: "fallback",
    patterns: [],
    answer: "Hmm, that's outside my briefing. Try asking about his skills, internships, Defenxia, or certifications — or message Syed directly through the contact form below.",
    audio: "/avatar/fallback.mp3",
  },
];

export function matchFaq(input: string): Faq {
  const text = ` ${input.toLowerCase().trim()} `;
  let best: Faq | null = null;
  let bestScore = 0;
  for (const faq of FAQS) {
    if (faq.id === FALLBACK_ID) continue;
    let score = 0;
    for (const p of faq.patterns) {
      if (text.includes(p)) score += p.length; // longer phrases weigh more
    }
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }
  if (!best || bestScore < 2) {
    return FAQS.find((f) => f.id === FALLBACK_ID)!;
  }
  return best;
}

export const QUICK_CHIPS = [
  "Take the voice tour",
  "What are his skills?",
  "Tell me about Defenxia",
  "How to contact him?",
];
