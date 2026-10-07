/* ------------------------------------------------------------------
   Single source of truth for every fact on the site.
   Everything here mirrors the resume — nothing is invented.
------------------------------------------------------------------- */

export const profile = {
  name: "SYED SUBHAN HUSSAIN",
  firstName: "SYED SUBHAN",
  lastName: "HUSSAIN",
  roles: [
    "Cyber Security Analyst",
    "SOC & Incident Response",
    "IoT & Blockchain Specialist",
    "Builder of DEFENXIA",
  ],
  tagline:
    "Final-year B.E. Computer Science (Cyber Security, IoT & Blockchain) engineer turning curiosity about how systems break into a craft of keeping them unbreakable.",
  location: "Bidar, Karnataka, India",
  email: "syedsubhanhussain.icb@gmail.com",
  phone: "+91-8431323178",
  phoneHref: "tel:+918431323178",
  linkedin: "https://linkedin.com/in/syed-subhan-hussain-414675337",
  github: "https://github.com/syedsubhanhussain-sih",
  resume: "/resume.pdf",
};

export const stats = [
  { value: 4, suffix: "", label: "Cyber Security Internships" },
  { value: 10, suffix: "", label: "Professional Certifications" },
  { value: 50, suffix: "+", label: "Network Dumps Analysed" },
  { value: 100, suffix: "+", label: "Hackathon Participants Led" },
];

export const skillGroups = [
  {
    title: "Security Operations",
    level: 90,
    items: ["Alert triage & log-source review", "Wireshark / tcpdump analysis", "Unauthorized-access & malware-signature detection"],
  },
  {
    title: "Incident Handling",
    level: 86,
    items: ["Structured incident triage", "Incident documentation", "Phishing simulation with GoPhish"],
  },
  {
    title: "Vulnerability Assessment",
    level: 88,
    items: ["Nmap scanning — ports, services, CVEs", "Snort IDS deployment & alert analysis"],
  },
  {
    title: "Web Security",
    level: 84,
    items: ["Burp Suite — SQLi / XSS testing", "OWASP awareness", "Secure-coding basics"],
  },
  {
    title: "Networking & Systems",
    level: 87,
    items: ["Linux (Red Hat)", "TCP/IP · DNS · HTTP", "Python scripting · basic SQL"],
  },
  {
    title: "Development",
    level: 82,
    items: ["Java · Python · C/C++", "HTML / CSS / JavaScript", "Solidity · MERN basics"],
  },
];

export const toolChips = [
  "Nmap", "Wireshark", "Burp Suite", "Snort", "Metasploit",
  "GoPhish", "Linux", "Python", "Java", "Solidity", "AWS", "Git",
];

export const experience = [
  {
    org: "Codec Technologies Pvt. Ltd.",
    role: "Cyber Security Intern",
    period: "Jul 2026 — Aug 2026",
    tag: "AICTE & ICAC approved",
    points: [
      "Hands-on cyber security internship program with structured training modules.",
      "Applied vulnerability assessment and network-security fundamentals in lab scenarios.",
    ],
  },
  {
    org: "Infotact Solutions",
    role: "Cyber Security Intern",
    period: "Jun 2026 — Sep 2026",
    tag: "3 months",
    points: [
      "Three-month deep dive into security operations and defensive tooling.",
      "Worked on real-world style SOC workflows — monitoring, triage and reporting.",
    ],
  },
  {
    org: "Future Interns",
    role: "Cyber Security Intern",
    period: "May 2026 — Jun 2026",
    tag: "1 month",
    points: [
      "Foundations of offensive & defensive security through guided labs.",
      "Built baseline skills in scanning, enumeration and traffic analysis.",
    ],
  },
  {
    org: "SyntecXhub",
    role: "Cyber Security Intern",
    period: "May 2026 — Jun 2026",
    tag: "1 month",
    points: [
      "Introductory security internship — core concepts of networks and threats.",
      "First structured exposure to the security analyst workflow.",
    ],
  },
  {
    org: "Security Lab — Hands-on Training",
    role: "Self-driven Lab Work",
    period: "2025 — 2026",
    tag: "Lab",
    points: [
      "50+ network traffic dumps analysed with Wireshark / tcpdump.",
      "Controlled SQLi / XSS testing with Burp Suite; Snort IDS deployment.",
      "Ethical ARP-poisoning & MITM experiments in an isolated lab.",
    ],
  },
  {
    org: "HACKTOBER — College Cyber Awareness Event",
    role: "Event Coordinator & Quiz Lead",
    period: "Nov 2025",
    tag: "100+ participants",
    points: [
      "Coordinated a college-level cyber-awareness event.",
      "Led the quiz competition with 100+ participants.",
    ],
  },
];

export const projects = [
  {
    name: "DEFENXIA",
    subtitle: "Mobile Security Platform — Major Project",
    cover: "/work/defenxia-app.jpg",
    description:
      "An Android-based mobile security application that detects malicious activity and alerts the user in real time. Built with Java & the Android SDK — threat-detection engine, user-alert mechanisms and network-security concepts woven into one hardened app.",
    bullets: ["Real-time threat detection", "User alert mechanisms", "Phishing simulations via GoPhish"],
    links: [
      { label: "Live Demo", href: "https://defenxia.vercel.app/" },
      { label: "Aurora Build", href: "https://defenxia-aurora-three.vercel.app/" },
      { label: "GitHub", href: "https://github.com/syedsubhanhussain-sih/defenxia_iot_hardware" },
      { label: "Watch Demo", href: "https://drive.google.com/file/d/1r3MoGUGYQp5gkZ6wnujCgblrWvK488cW/view" },
    ],
  },
  {
    name: "DEFENXIA — SIH Build",
    subtitle: "Internal Hackathon · SIH 2025 Nomination Round — Team Leader",
    cover: "/work/defenxia-sih.jpg",
    description:
      "Led Team Defenxia as a finalist in the college internal hackathon (SIH 2025 nomination round) — architecting a mobile & network security solution, running vulnerability scans and packet analysis, and presenting the defence to evaluators.",
    bullets: ["Vulnerability scanning", "Packet analysis", "Evaluator presentation"],
    links: [
      { label: "GitHub", href: "https://github.com/syedsubhanhussain-sih/defenxia-hardened" },
    ],
  },
];

export const certifications = [
  { name: "Cisco Networking Basics", org: "Cisco" },
  { name: "Red Hat Linux Essentials", org: "Red Hat" },
  { name: "Ethical Hacking & Networking", org: "Simplilearn" },
  { name: "Cyber Security Training", org: "LearnTube" },
  { name: "IT & Programming Courses", org: "Infosys Springboard" },
  { name: "MERN Stack Development", org: "Zenexis Solutions" },
  { name: "AWS Cloud Essentials", org: "AWS" },
  { name: "DevOps Training Program", org: "Cyber Defentech" },
  { name: "Cloud Security Training", org: "Cyber Defentech" },
  { name: "ADVAYA 2.0 National Hackathon", org: "BGSCET Bengaluru" },
];

export const achievements = [
  {
    title: "Winner — Mini Project Competition",
    detail: "DEFENXIA application · Cash prize ₹3,000",
  },
  {
    title: "Finalist — College Internal Hackathon",
    detail: "SIH 2025 nomination round · Team Defenxia (Team Leader)",
  },
  {
    title: "Cluster Finals — PALS innoWAH! Exhibition",
    detail: "Selected among top innovators at the cluster level",
  },
  {
    title: "Participant — ADVAYA 2.0 National Hackathon",
    detail: "BGSCET, Bengaluru",
  },
  {
    title: "Class Topper",
    detail: "Consistently top academic performance · 5th semester",
  },
  {
    title: "Event Coordinator — HACKTOBER",
    detail: "Led quiz competition · 100+ participants · Nov 2025",
  },
];

export const education = [
  {
    degree: "B.E. Computer Science — Cyber Security, IoT & Blockchain",
    school: "Guru Nanak Dev Engineering College (VTU), Bidar",
    period: "2023 — 2027",
    detail: "CGPA 8.0 / 10 · up to 6th semester",
  },
  {
    degree: "Class 12 (PUC)",
    school: "Karnataka Board",
    period: "2021",
    detail: "81% · First Class",
  },
  {
    degree: "Class 10 (CBSE)",
    school: "CBSE",
    period: "2019",
    detail: "71%",
  },
];

export const vision = [
  {
    title: "DEFENXIA → Global Product",
    detail:
      "Turn the mobile-security platform into a hardened, world-class product — secure banking, threat intel and privacy tooling that people across the globe actually use.",
  },
  {
    title: "International Security Career",
    detail:
      "Grow from SOC analyst to security engineer on the world stage — starting in India's tech hubs, then taking the craft global.",
  },
  {
    title: "Builder & Founder",
    detail:
      "Cybersecurity × AI × entrepreneurship — founding technology companies that ship impactful security products, not just services.",
  },
];

export const chapters = [
  { id: "origin", num: "01", label: "ORIGIN" },
  { id: "arsenal", num: "02", label: "ARSENAL" },
  { id: "missions", num: "03", label: "MISSIONS" },
  { id: "flagship", num: "04", label: "FLAGSHIP" },
  { id: "credentials", num: "05", label: "CREDENTIALS" },
  { id: "proof", num: "06", label: "PROOF" },
  { id: "trajectory", num: "07", label: "TRAJECTORY" },
  { id: "contact", num: "08", label: "CONTACT" },
];

export const tickerItems = [
  "CYBER SECURITY",
  "SOC ANALYSIS",
  "INCIDENT RESPONSE",
  "VULNERABILITY ASSESSMENT",
  "IOT SECURITY",
  "BLOCKCHAIN",
  "NETWORK DEFENCE",
  "ETHICAL HACKING",
];
