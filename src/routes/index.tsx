import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Award,
  BookOpen,
  Briefcase,
  Check,
  Code2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Terminal,
  Wrench,
  X,
} from "lucide-react";

// ============================================================
// EDITABLE CONTENT CONFIG
// Update the values below to change text, links, and content.
// ============================================================
const PROFILE = {
  name: "Ntombikayise Ndaba",
  title: "BSc Informatics Student | Aspiring Technology Professional",
  tagline:
    "I build practical solutions at the intersection of software, networking, and systems analysis — turning academic learning into real-world impact.",
  email: "ntombi.mercia@gmail.com",
  linkedin: "https://www.linkedin.com/in/ntombikayise-ndaba-20a0549b/",
  github: "https://github.com/kayise-ndabadotcom",
  location: "Katlehong, South Africa",
  university: "University of South Africa (UNISA)",
  degree: "BSc Informatics",
  graduation: "2028",
  cvPath: "/cv/Ntombikayise_Ndaba_CV.pdf",
  availability: "Open to entry-level & internship opportunities",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Programming & Development",
    items: ["C++", "Python", "Qt Framework", "HTML", "CSS", "JavaScript", "OOP"],
  },
  {
    icon: Network,
    title: "Networking & Infrastructure",
    items: ["TCP/IP", "DNS", "DHCP", "Network Diagnostics", "Command Prompt", "Routing"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    items: ["Windows 11", "Git", "GitHub", "Zendesk", "Microsoft Teams", "STL"],
  },
  {
    icon: Cpu,
    title: "Systems Analysis & AI",
    items: ["Systems Analysis", "Data Structures", "Algorithms", "Prompt Engineering", "Technical Documentation"],
  },
];

const PROJECTS = [
  {
    icon: Terminal,
    title: "Network Diagnostic Testing",
    overview:
      "Hands-on network troubleshooting using Windows Command Prompt. Executed core diagnostics to verify configuration, connectivity, routing, and DNS resolution.",
    technologies: ["TCP/IP", "DHCP", "DNS", "Windows 11", "CMD"],
    achievements: [
      "Verified IPv4 (192.168.18.107), gateway/DHCP/DNS (192.168.18.1), and MAC via ipconfig /all",
      "Tested connectivity and measured latency/packet loss with ping 8.8.8.8",
      "Mapped an 8-hop route to Google DNS using tracert",
      "Validated DNS resolution with nslookup",
      "Documented stable DHCP, low-latency routing, and working DNS with screenshots",
    ],
    link: PROFILE.github,
    linkLabel: "View Report",
  },
  {
    icon: Code2,
    title: "Wildlife Corridor Network System",
    overview:
      "A C++ graph-based conservation network modelling wildlife corridors across Southern Africa. Built for COS2611 (Data Structures & Algorithms).",
    technologies: ["C++17", "STL", "Graphs", "BFS", "Dijkstra"],
    achievements: [
      "Represented parks as vertices and corridors as weighted edges using an adjacency list",
      "Used map<string,int> for O(1) park name-to-index lookup",
      "Implemented BFS traversal O(V+E) for network exploration",
      "Implemented Dijkstra's shortest path O((V+E) log V) for optimal migration routes",
      "Added parks, created undirected corridors, displayed the network, and formatted path output",
    ],
    link: PROFILE.github,
    linkLabel: "View Code",
  },
  {
    icon: FolderGit2,
    title: "Student Records Desktop App",
    overview:
      "A Python and Qt desktop application built during Visual Programming II. Manages student records through an intuitive GUI with form validation and persistent storage.",
    technologies: ["Python", "Qt", "PyQt/PySide", "GUI Design", "File I/O"],
    achievements: [
      "Designed a responsive Qt interface with widgets, layouts, and event handlers",
      "Connected UI actions to backend logic for CRUD-style record management",
      "Implemented input validation and user feedback dialogs",
      "Stored and retrieved records from a local file format",
      "Documented the codebase for maintainability and future extension",
    ],
    link: PROFILE.github,
    linkLabel: "View Code",
  },
];

const EDUCATION = {
  degree: PROFILE.degree,
  university: PROFILE.university,
  graduation: PROFILE.graduation,
  coursework: [
    "Computer Networks",
    "Visual Programming II (Python, Qt)",
    "Data Structures",
    "Structured Systems Analysis and Design",
    "Object-Oriented Analysis",
    "Strategic Management",
  ],
};

// ------------------------------------------------------------
// CERTIFICATIONS
// To add a certificate file: drop the PDF (or PNG/JPG) into
// public/certificates/ and set `file` below to
// "/certificates/<your-file-name>.pdf".
// Leave `file: null` while a certificate document is not uploaded yet.
// ------------------------------------------------------------
const CERTIFICATIONS: {
  name: string;
  org: string | null;
  year: string | null;
  description: string | null;
  courses: string[];
  file: string | null;
}[] = [
  {
    name: "Google AI Essentials",
    org: "Google",
    year: "2026",
    description:
      "Foundational program covering practical, responsible use of AI tools in everyday work.",
    courses: [
      "Introduction to AI",
      "Maximize Productivity With AI Tools",
      "Discover the Art of Prompting",
      "Use AI Responsibly",
      "Stay Ahead of the AI Curve",
    ],
    // Upload as: public/certificates/google-ai-essentials.pdf then set the path below
    file: null,
  },
  {
    name: "Agility Python Training Program",
    org: null, // TODO: add issuing organisation
    year: null, // TODO: add completion date
    description: null, // TODO: add a short description
    courses: [],
    // Upload as: public/certificates/agility-python-training-program.pdf then set the path below
    file: null,
  },
];


const EXPERIENCE = [
  {
    role: "Call Centre Agent",
    company: "Vivalife Insurance Pty Ltd",
    period: "May 2019 – September 2020",
    highlights: [
      "Owned escalated queries including cancellations, lapsed policies, sales, and retention",
      "Verified and maintained accurate customer information in line with FSCA standards",
      "Worked within strict SLAs and compliance frameworks on every interaction",
      "Used Zendesk, Exergy, and Microsoft Teams to manage cases and customer interactions",
    ],
  },
  {
    role: "Bridging Course Candidate",
    company: "Harambee Youth Accelerator",
    period: "March 2019 – April 2019",
    highlights: [
      "Completed workplace readiness training in professionalism, communication, and customer service",
      "Developed problem-solving and conflict resolution skills for customer-facing environments",
      "Strengthened analytical thinking, teamwork, and adaptability",
    ],
  },
  {
    role: "Junior Investment Administrator",
    company: "Stanlib Investments",
    period: "January 2017 – December 2017",
    highlights: [
      "Verified and updated sensitive FICA/KYC and FATCA/CRS regulatory documentation",
      "Performed authorisation calls to confirm changes and prevent fraud",
      "Managed work items within strict SLA and FSCA compliance requirements",
      "Resolved client and adviser queries via telephone and email",
      "Used Workflow, Horizons, and Compass systems daily",
    ],
  },
];

// ============================================================
// ROUTE
// ============================================================
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ntombikayise Ndaba — BSc Informatics Student Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Ntombikayise Ndaba, BSc Informatics student at UNISA specialising in software development, networking, and systems analysis.",
      },
      {
        property: "og:title",
        content: "Ntombikayise Ndaba — BSc Informatics Student Portfolio",
      },
      {
        property: "og:description",
        content:
          "Software development, networking, and systems analysis projects by Ntombikayise Ndaba, BSc Informatics student at UNISA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

// ============================================================
// HOOKS
// ============================================================
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("revealed");
    const els = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    const fallback = window.setTimeout(() => els.forEach(reveal), 1800);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}

function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return { copied, copy };
}

// ============================================================
// UI COMPONENTS
// ============================================================
function Nav() {
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (id: string) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      active === id ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 glass-strong shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-foreground"
        >
          NN<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={linkClass(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={PROFILE.cvPath}
          download
          className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex"
        >
          <Download className="size-4" />
          CV
        </a>

        <button
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-border/60 glass-strong lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-2.5 ${linkClass(link.id)} ${
                    active === link.id ? "bg-accent" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={PROFILE.cvPath}
                download
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Download className="size-4" />
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="reveal mb-12 text-center">
      <span className="terminal-header inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
        <Icon className="size-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function TerminalHeader({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span className="text-primary">$</span>
      <span>{text}</span>
    </div>
  );
}

// ============================================================
// SECTIONS
// ============================================================
function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      {/* Radial glows */}
      <div className="pointer-events-none absolute top-0 right-0 size-[600px] rounded-full radial-glow opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-[520px] rounded-full radial-violet opacity-20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-8">
        <div className="max-w-3xl">
          <TerminalHeader text="init portfolio --user=ntombikayise" />

          <p
            className="reveal font-mono text-sm font-medium text-primary"
            style={{ animationDelay: "0.05s" }}
          >
            Hello, I'm
          </p>
          <h1
            className="reveal mt-3 text-4xl leading-tight font-bold tracking-tight md:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            {PROFILE.name}
          </h1>
          <p
            className="reveal mt-4 text-xl font-medium text-muted-foreground md:text-2xl"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="gradient-text text-glow">{PROFILE.title}</span>
          </p>
          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "0.35s" }}
          >
            {PROFILE.tagline}
          </p>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 border-glow"
            >
              View Projects
            </a>
            <a
              href={PROFILE.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
            >
              <Download className="size-4" />
              Download CV
            </a>
          </div>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "0.55s" }}
          >
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="size-5" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Send email"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-5" />
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              {PROFILE.availability}
            </span>
          </div>

          <div
            className="reveal mt-6 flex items-center gap-1.5 text-sm text-muted-foreground"
            style={{ animationDelay: "0.65s" }}
          >
            <MapPin className="size-4 text-primary" />
            {PROFILE.location}
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="animate-float-slow absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={BookOpen} eyebrow="About Me" title="Who I Am" />
        <div className="reveal mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I am a{" "}
            <span className="font-medium text-foreground">
              {PROFILE.degree} student at {PROFILE.university}
            </span>{" "}
            with a passion for technology, problem-solving, and digital
            innovation. Through my academic projects and continuous learning, I
            have developed practical skills across programming, data
            structures, databases, networking, systems analysis, and AI-assisted
            development.
          </p>
          <p>
            My technical toolkit includes{" "}
            <span className="text-foreground">C++</span>,{" "}
            <span className="text-foreground">Python</span>, and the{" "}
            <span className="text-foreground">Qt Framework</span>, alongside
            hands-on networking experience using Windows diagnostics and
            TCP/IP fundamentals. I enjoy turning complex problems into practical
            technology solutions.
          </p>
          <p>
            I am actively building the technical and professional experience
            needed to contribute meaningfully in the technology industry —
            whether that is through software development, IT support,
            networking, or systems analysis roles.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={Cpu} eyebrow="Skills" title="What I Work With" />
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILLS.map((group, i) => (
            <div
              key={group.title}
              className="card-hover reveal glass rounded-2xl p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <group.icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="badge-tech">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={FolderGit2}
          eyebrow="Projects"
          title="Things I've Built"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="card-hover reveal glass flex flex-col rounded-2xl p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <project.icon className="size-5" />
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ExternalLink className="size-3.5" />
                  {project.linkLabel}
                </a>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {project.achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge-tech">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={GraduationCap}
          eyebrow="Education"
          title="My Academic Journey"
        />
        <div className="reveal glass mx-auto max-w-3xl rounded-2xl p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{EDUCATION.degree}</h3>
              <p className="mt-1 font-medium text-primary">
                {EDUCATION.university}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Expected Graduation: {EDUCATION.graduation}
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20">
              In Progress
            </span>
          </div>
          <div className="mt-6 border-t border-border/60 pt-6">
            <h4 className="terminal-header text-sm font-semibold text-muted-foreground">
              Relevant Coursework
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {EDUCATION.coursework.map((course) => (
                <span key={course} className="badge-tech">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  index: number;
}) {
  return (
    <div
      className="card-hover reveal glass flex h-full flex-col rounded-2xl p-6"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <Award className="size-5" />
      </span>
      <h3 className="mt-3 font-semibold">{cert.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {cert.org ?? "Issuing organisation — to be added"}
      </p>
      <p className="mt-2 font-mono text-xs text-primary">
        {cert.year ?? "Date — to be added"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {cert.description ?? "Description — to be added"}
      </p>

      {cert.courses.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cert.courses.slice(0, 3).map((course) => (
            <span
              key={course}
              className="rounded-full border border-border bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {course}
            </span>
          ))}
          {cert.courses.length > 3 && (
            <span className="rounded-full border border-border bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground">
              +{cert.courses.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-auto pt-5">
        {cert.file ? (
          <div className="flex flex-wrap gap-2">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/20"
            >
              <ExternalLink className="size-3.5" />
              View Certificate
            </a>
            <a
              href={cert.file}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Download className="size-3.5" />
              Download
            </a>
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
            Certificate file not uploaded yet
          </span>
        )}
      </div>
    </div>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={Award}
          eyebrow="Certifications"
          title="Credentials & Learning"
        />
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={Briefcase}
          eyebrow="Experience"
          title="Where I've Worked"
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {EXPERIENCE.map((job, i) => (
            <div
              key={`${job.company}-${job.role}`}
              className="card-hover reveal glass rounded-2xl p-6 md:p-8"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-primary">{job.company}</p>
                </div>
                <span className="mt-1 font-mono text-xs text-muted-foreground sm:mt-0">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { copied, copy } = useCopyToClipboard(PROFILE.email);

  const links = [
    {
      icon: Mail,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      action: copy,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "ntombikayise-ndaba",
      href: PROFILE.linkedin,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "kayise-ndabadotcom",
      href: PROFILE.github,
    },
  ];

  return (
    <section id="contact" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={Mail} eyebrow="Contact" title="Let's Connect" />
        <p className="reveal mx-auto -mt-6 mb-10 max-w-xl text-center text-muted-foreground">
          Whether it's an opportunity, a collaboration, or just a conversation
          about technology — my inbox is always open.
        </p>

        <div className="reveal glass mx-auto max-w-2xl rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold">Ready to work together?</h3>
          <p className="mt-2 text-muted-foreground">
            Drop me an email or connect with me on LinkedIn.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 border-glow sm:w-auto"
            >
              <Mail className="size-4" />
              Send Email
            </a>
            <button
              onClick={copy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card sm:w-auto"
            >
              {copied ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied ? "Copied!" : "Copy Email"}
            </button>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              onClick={link.action ? (e) => { e.preventDefault(); link.action!(); } : undefined}
              className="card-hover reveal glass flex flex-col items-center rounded-2xl p-6 text-center"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <link.icon className="size-5" />
              </span>
              <span className="mt-3 text-sm font-semibold">{link.label}</span>
              <span className="mt-1 text-xs break-all text-muted-foreground">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {PROFILE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="size-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Send email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
