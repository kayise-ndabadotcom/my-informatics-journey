import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Award,
  BookOpen,
  Briefcase,
  Code2,
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

const PROFILE = {
  name: "Ntombikayise Ndaba",
  title: "BSc Informatics Student | Aspiring Technology Professional",
  tagline:
    "Building a foundation in software development, networking, and intelligent systems — one problem at a time.",
  email: "ntombi.mercia@gmail.com",
  linkedin: "https://www.linkedin.com/in/ntombikayise-ndaba-20a0549b/",
  github: "https://github.com/ntombikayise-ndaba",
  location: "Katlehong, South Africa",
  university: "University of South Africa (UNISA)",
  graduation: "2028",
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
    items: ["C++", "Python", "Qt Framework", "HTML", "CSS", "JavaScript"],
  },
  {
    icon: Network,
    title: "Networking & Infrastructure",
    items: ["TCP/IP", "DNS", "DHCP", "Network Diagnostics", "Command Prompt"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    items: ["Windows 11", "Linux", "Git", "GitHub", "Vercel"],
  },
  {
    icon: Cpu,
    title: "Other",
    items: ["Systems Analysis", "Problem-Solving", "Technical Documentation"],
  },
];

const PROJECTS = [
  {
    icon: Terminal,
    title: "Network Diagnostic Testing",
    overview:
      "Practical networking investigation using Windows command-line utilities to examine network configuration, connectivity, routing, and DNS resolution.",
    technologies: ["Windows 11", "Command Prompt", "TCP/IP", "DHCP", "DNS"],
    achievements: [
      "Analysed network configuration using ipconfig /all",
      "Tested connectivity and packet loss using ping",
      "Traced network routes using tracert",
      "Performed DNS troubleshooting using nslookup",
      "Documented actual test results with analysis",
    ],
    link: PROFILE.github,
  },
  {
    icon: Code2,
    title: "C++ Console Application",
    overview:
      "A structured C++ application demonstrating core programming principles including data structures, file handling, and object-oriented design.",
    technologies: ["C++", "OOP", "File I/O"],
    achievements: [
      "Designed modular, object-oriented program architecture",
      "Implemented robust input validation and error handling",
      "Applied data structures for efficient data processing",
    ],
    link: PROFILE.github,
  },
  {
    icon: FolderGit2,
    title: "Python Qt Desktop Application",
    overview:
      "A cross-platform desktop application built with Python and the Qt framework, featuring an intuitive graphical user interface.",
    technologies: ["Python", "Qt Framework", "GUI Design"],
    achievements: [
      "Built a responsive GUI with Qt widgets and layouts",
      "Connected interface events to application logic",
      "Packaged a clean, documented, maintainable codebase",
    ],
    link: PROFILE.github,
  },
];

const CERTIFICATIONS = [
  {
    name: "Introduction to Networks",
    org: "Cisco Networking Academy",
    year: "2025",
  },
  {
    name: "Python Essentials",
    org: "Cisco Networking Academy",
    year: "2025",
  },
  {
    name: "IT Support Fundamentals",
    org: "Google / Coursera",
    year: "2024",
  },
];

const COURSEWORK = [
  "Programming Fundamentals",
  "Database Systems",
  "Computer Networks",
  "Systems Analysis & Design",
  "Discrete Mathematics",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ntombikayise Ndaba — BSc Informatics Student Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Ntombikayise Ndaba, BSc Informatics student at UNISA specialising in software development, networking, and technology.",
      },
      {
        property: "og:title",
        content: "Ntombikayise Ndaba — BSc Informatics Student Portfolio",
      },
      {
        property: "og:description",
        content:
          "Software development, networking, and technology projects by Ntombikayise Ndaba, BSc Informatics student at UNISA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
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

        <button
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md lg:hidden">
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
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
        <Icon className="size-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary-glow), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 size-[420px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary), transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-8">
        <div className="max-w-3xl">
          <p className="reveal font-mono text-sm font-medium text-primary">
            Hello, I'm
          </p>
          <h1
            className="reveal mt-3 text-4xl leading-tight font-bold tracking-tight md:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {PROFILE.name}
          </h1>
          <p
            className="reveal mt-4 text-xl font-medium text-muted-foreground md:text-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="gradient-text">{PROFILE.title}</span>
          </p>
          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            {PROFILE.tagline}
          </p>
          <div
            className="reveal mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "0 12px 30px -10px color-mix(in oklab, var(--primary) 50%, transparent)",
              }}
            >
              View My Work
            </a>
            <a
              href="/cv/Ntombikayise-Ndaba-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <Download className="size-4" />
              Download CV
            </a>
          </div>
          <div
            className="reveal mt-8 flex items-center gap-5"
            style={{ animationDelay: "0.5s" }}
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
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {PROFILE.location}
            </span>
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
    <section id="about" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={BookOpen} eyebrow="About Me" title="Who I Am" />
        <div className="reveal mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I am a BSc Informatics student at the{" "}
            <span className="font-medium text-foreground">
              {PROFILE.university}
            </span>{" "}
            with a genuine passion for technology and problem-solving. My studies
            sit at the intersection of software, systems, and people — and I enjoy
            turning complex technical challenges into clear, workable solutions.
          </p>
          <p>
            My interests span software development, computer networking,
            artificial intelligence, and digital transformation. I have practical,
            hands-on experience with network diagnostic testing, C++ programming,
            and Python/Qt development, and I am always looking for opportunities
            to apply what I learn to real-world problems.
          </p>
          <p>
            I bring strong analytical skills and careful attention to detail to
            everything I do — from tracing a faulty network route to documenting
            test results. My goal is to grow into a technology professional who
            builds reliable systems and contributes meaningfully to the teams I
            join.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={Cpu} eyebrow="Skills" title="What I Work With" />
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILLS.map((group, i) => (
            <div
              key={group.title}
              className="card-hover reveal rounded-2xl border border-border bg-card p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <group.icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
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
    <section id="projects" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={FolderGit2}
          eyebrow="Projects"
          title="Things I've Built"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="card-hover reveal flex flex-col rounded-2xl border border-border bg-card p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <project.icon className="size-5" />
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
              <ul className="mt-4 flex-1 space-y-1.5">
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
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-primary"
                  >
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
    <section id="education" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={GraduationCap}
          eyebrow="Education"
          title="My Academic Journey"
        />
        <div className="card-hover reveal mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">BSc Informatics</h3>
              <p className="mt-1 font-medium text-primary">{PROFILE.university}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Expected Graduation: {PROFILE.graduation}
              </p>
            </div>
            <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
              In Progress
            </span>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Relevant Coursework
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {COURSEWORK.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                >
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

function Certifications() {
  return (
    <section id="certifications" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={Award}
          eyebrow="Certifications"
          title="Credentials & Learning"
        />
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.name}
              className="card-hover reveal rounded-2xl border border-border bg-card p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Award className="size-5" />
              </span>
              <h3 className="mt-3 font-semibold">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{cert.org}</p>
              <p className="mt-2 font-mono text-xs text-primary">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          icon={Briefcase}
          eyebrow="Experience"
          title="Where I'm Headed"
        />
        <div className="card-hover reveal mx-auto max-w-3xl rounded-2xl border border-dashed border-primary/40 bg-accent/40 p-10 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Briefcase className="size-6" />
          </span>
          <h3 className="mt-4 text-xl font-semibold">Open to Opportunities</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I am currently focused on my studies while building practical
            experience through projects and certifications. I am open to
            internships, vacation work, and entry-level roles in software
            development, IT support, and networking — let's talk.
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Mail className="size-4" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    {
      icon: Mail,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
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
      value: "ntombikayise-ndaba",
      href: PROFILE.github,
    },
  ];

  return (
    <section id="contact" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading icon={Mail} eyebrow="Contact" title="Let's Connect" />
        <p className="reveal mx-auto -mt-6 mb-10 max-w-xl text-center text-muted-foreground">
          Whether it's an opportunity, a collaboration, or just a conversation
          about technology — my inbox is always open.
        </p>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="card-hover reveal flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
    <footer className="border-t border-border bg-background py-8">
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
    <div className="min-h-screen">
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
