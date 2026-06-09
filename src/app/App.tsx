import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ChevronDown, Copy, Check, ExternalLink, Menu, X } from "lucide-react";
import { OWNER, SKILL_GROUPS, PROJECTS } from "./components/portfolio-data";
import { ProjectCard } from "./components/ProjectCard";

// ── Utility ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function lerpHsl(
  h1: number, s1: number, l1: number,
  h2: number, s2: number, l2: number,
  t: number
): string {
  return `hsl(${lerp(h1, h2, t)},${lerp(s1, s2, t)}%,${lerp(l1, l2, t)}%)`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function NavLink({ label, href, isDark }: { label: string; href: string; isDark: boolean }) {
  return (
    <a
      href={href}
      className="text-sm transition-colors hover:opacity-100"
      style={{ color: isDark ? "rgba(210,220,255,0.65)" : "rgba(15,30,80,0.55)", fontFamily: "'DM Sans', sans-serif", opacity: 0.9 }}
      onClick={e => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {label}
    </a>
  );
}

function SocialBtn({ href, icon, isDark }: { href: string; icon: React.ReactNode; isDark: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,30,100,0.07)",
        border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,30,100,0.12)",
        color: isDark ? "rgba(210,220,255,0.8)" : "rgba(15,30,100,0.7)",
        backdropFilter: "blur(6px)",
      }}
    >
      {icon}
    </a>
  );
}

function SkillBar({ label, level, isDark }: { label: string; level: number; isDark: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-sm w-40 flex-shrink-0"
        style={{ color: isDark ? "rgba(200,210,240,0.75)" : "rgba(20,40,100,0.65)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-1 rounded-full overflow-hidden"
        style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${(level / 5) * 100}%`,
            background: isDark
              ? "linear-gradient(to right, #6366f1, #f59e0b)"
              : "linear-gradient(to right, #2563eb, #06b6d4)",
          }}
        />
      </div>
      <span
        className="text-xs w-4 flex-shrink-0"
        style={{ color: isDark ? "rgba(200,210,240,0.4)" : "rgba(20,40,100,0.4)", fontFamily: "'DM Mono', monospace" }}
      >
        {level}/5
      </span>
    </div>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────

function Stars({ count = 260 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.4 + 0.4,
      dur: (Math.random() * 2 + 2).toFixed(1),
      delay: (Math.random() * 3).toFixed(1),
    }))
  );
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; r: var(--r); }
            50% { opacity: 1; r: calc(var(--r) * 1.4); }
          }
        `}</style>
      </defs>
      {stars.current.map(s => (
        <circle
          key={s.id}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill="white"
          style={{
            animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
            "--r": `${s.r}px`,
          } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

// ── Cloud ─────────────────────────────────────────────────────────────────────

function Clouds({ opacity }: { opacity: number }) {
  const clouds = [
    { x: "5%",  y: "30%", scale: 1.1, delay: 0 },
    { x: "60%", y: "15%", scale: 0.8, delay: 2 },
    { x: "80%", y: "40%", scale: 1.3, delay: 1 },
    { x: "35%", y: "50%", scale: 0.7, delay: 3 },
  ];
  return (
    <>
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: c.x,
            top: c.y,
            transform: `scale(${c.scale})`,
            opacity: opacity * 0.55,
            transition: "opacity 0.6s ease",
          }}
        >
          <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
            <ellipse cx="90" cy="55" rx="85" ry="18" fill="white" fillOpacity="0.6" />
            <ellipse cx="60" cy="45" rx="45" ry="25" fill="white" fillOpacity="0.7" />
            <ellipse cx="105" cy="38" rx="55" ry="32" fill="white" fillOpacity="0.75" />
            <ellipse cx="140" cy="50" rx="35" ry="20" fill="white" fillOpacity="0.65" />
          </svg>
        </div>
      ))}
    </>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [scroll, setScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      setScroll(scrollTop / (scrollHeight - clientHeight));
    };
    const el = containerRef.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  // Transition: 0 = day, 1 = night (starts transitioning after 15% scroll)
  const t = Math.min(1, Math.max(0, (scroll - 0.08) / 0.35));
  const isDark = t > 0.5;

  // Background gradient
  const skyTop    = lerpHsl(210, 55, 88,   225, 25,  6, t);
  const skyMid    = lerpHsl(220, 40, 75,   230, 30, 10, t);
  const skyBottom = lerpHsl(225, 30, 94,   220, 20,  8, t);

  const textColor    = isDark ? "rgba(230,235,255,0.95)" : "rgba(8,18,60,0.95)";
  const mutedColor   = isDark ? "rgba(200,210,245,0.85)" : "rgba(15,35,90,0.80)";
  const accentColor  = isDark ? "#f59e0b" : "#2563eb";
  const navBg        = isDark
    ? "rgba(8,10,22,0.8)"
    : `rgba(240,245,255,${Math.min(0.88, scroll * 10)})`;
  const navBorder    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

  function copyEmail() {
    try {
      const ta = document.createElement("textarea");
      ta.value = OWNER.email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch {
      // fallback: open mailto if copy fails
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const navLinks = [
    { label: "Sobre",    href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato",  href: "#contato" },
  ];

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Dynamic background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${skyTop} 0%, ${skyMid} 55%, ${skyBottom} 100%)`,
          transition: "background 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* Clouds */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <Clouds opacity={1 - t * 2.5} />
      </div>

      {/* Stars */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, opacity: Math.min(1, (t - 0.3) * 3) }}
      >
        <Stars />
      </div>

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          backdropFilter: scroll > 0.02 ? "blur(14px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            onClick={e => { e.preventDefault(); containerRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: textColor }}
          >
            GS<span style={{ color: accentColor }}>.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => <NavLink key={l.href} {...l} isDark={isDark} />)}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${OWNER.email}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: accentColor, color: isDark ? "#0f1a3a" : "#fff" }}
            >
              <Mail className="w-3.5 h-3.5" />
              Contato
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            style={{ color: textColor }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-5 flex flex-col gap-4"
            style={{ borderTop: `1px solid ${navBorder}` }}
          >
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm py-1"
                style={{ color: textColor, fontFamily: "'DM Sans', sans-serif" }}
                onClick={e => {
                  e.preventDefault();
                  setMobileOpen(false);
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            {/* Text */}
            <div className="flex-1 order-2 md:order-1">
              <p
                className="text-sm mb-3 tracking-widest uppercase"
                style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}
              >
                Full Stack Developer
              </p>
              <h1
                className="leading-none mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem, 7vw, 5rem)",
                  fontWeight: 700,
                  color: textColor,
                }}
              >
                {OWNER.name.split(" ")[0]}
                <br />
                <span style={{ color: accentColor }}>{OWNER.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p
                className="mb-2 text-base"
                style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}
              >
                {OWNER.specialty}
              </p>
              <p
                className="mb-8 text-base leading-relaxed max-w-lg"
                style={{ color: mutedColor }}
              >
                {OWNER.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projetos"
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{ background: accentColor, color: isDark ? "#0f1a3a" : "#fff" }}
                  onClick={e => { e.preventDefault(); document.querySelector("#projetos")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Ver projetos
                </a>
                <a
                  href="#contato"
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{
                    background: "transparent",
                    color: textColor,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                  }}
                  onClick={e => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Entre em contato
                </a>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <SocialBtn href={OWNER.github}   icon={<Github className="w-4 h-4" />}   isDark={isDark} />
                <SocialBtn href={OWNER.linkedin}  icon={<Linkedin className="w-4 h-4" />} isDark={isDark} />
                <SocialBtn href={`mailto:${OWNER.email}`} icon={<Mail className="w-4 h-4" />} isDark={isDark} />
              </div>
            </div>

            {/* Photo */}
            <div className="order-1 md:order-2 flex-shrink-0">
              <div
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{
                  border: `3px solid ${isDark ? "rgba(245,158,11,0.4)" : "rgba(37,99,235,0.25)"}`,
                  boxShadow: isDark
                    ? "0 0 40px rgba(245,158,11,0.15), 0 8px 32px rgba(0,0,0,0.5)"
                    : "0 0 40px rgba(37,99,235,0.1), 0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={OWNER.photo}
                  alt={OWNER.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="flex justify-center mt-16">
            <button
              className="flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity"
              style={{ color: textColor }}
              onClick={() => document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>scroll</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Sobre ────────────────────────────────────────────────────────── */}
      <section id="sobre" className="relative min-h-screen flex items-center py-24" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto px-6 w-full">

          {/* Section label */}
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}>
            Sobre mim
          </p>
          <h2
            className="mb-12"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: textColor, fontWeight: 600 }}
          >
            Tecnologia como <span style={{ color: accentColor }}>ferramenta</span>, resultado como objetivo
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Bio */}
            <div>
              <p className="leading-relaxed mb-6" style={{ color: mutedColor, fontSize: "0.95rem" }}>
                {OWNER.bio}
              </p>
              <p className="leading-relaxed mb-6" style={{ color: mutedColor, fontSize: "0.95rem" }}>
                Minha trajetória combina o desenvolvimento de aplicações completas — do banco de dados à interface — com a automação de infraestrutura e a construção de sistemas inteligentes. Gosto de trabalhar em projetos que exigem pensamento sistêmico e entrega consistente.
              </p>
              <p className="leading-relaxed" style={{ color: mutedColor, fontSize: "0.95rem" }}>
                Atualmente explorando arquiteturas de LLMs e RAG para aplicações práticas no mundo real, além de aprofundar conhecimentos em observabilidade e SRE.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {["Open Source", "Machine Learning", "Cloud Native", "DevSecOps"].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                      color: mutedColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-8">
              {SKILL_GROUPS.map(group => (
                <div key={group.title}>
                  <h4
                    className="text-xs uppercase tracking-widest mb-4"
                    style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}
                  >
                    {group.title}
                  </h4>
                  <div className="space-y-3">
                    {group.skills.map(skill => (
                      <SkillBar key={skill.label} {...skill} isDark={isDark} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projetos ─────────────────────────────────────────────────────── */}
      <section id="projetos" className="relative py-24" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto px-6 w-full">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}>
            Portfólio
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: textColor, fontWeight: 600 }}
            >
              Projetos selecionados
            </h2>
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-all hover:gap-2.5 flex-shrink-0"
              style={{ color: accentColor, fontFamily: "'DM Sans', sans-serif" }}
            >
              <Github className="w-4 h-4" />
              Ver todos no GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                featured={project.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contato ──────────────────────────────────────────────────────── */}
      <section id="contato" className="relative min-h-screen flex items-center py-24" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accentColor, fontFamily: "'DM Mono', monospace" }}>
              Contato
            </p>
            <h2
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: textColor, fontWeight: 600 }}
            >
              Vamos conversar sobre seu projeto
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: mutedColor, fontSize: "0.95rem" }}>
              Estou disponível para freelances, projetos de longa duração e oportunidades full-time. Se você tem um problema interessante para resolver, me manda uma mensagem.
            </p>

            <div className="space-y-4">
              {/* Email copy */}
              <div
                className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl"
                style={{
                  background: isDark ? "rgba(15,18,32,0.7)" : "rgba(255,255,255,0.6)",
                  border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div>
                  <p className="text-xs mb-0.5" style={{ color: mutedColor, fontFamily: "'DM Mono', monospace" }}>Email</p>
                  <p className="text-sm font-medium" style={{ color: textColor }}>{OWNER.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      color: mutedColor,
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#10b981" }} /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                  <a
                    href={`mailto:${OWNER.email}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105 active:scale-95"
                    style={{ background: accentColor, color: isDark ? "#0f1a3a" : "#fff" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Enviar
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                <a
                  href={OWNER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: isDark ? "rgba(15,18,32,0.7)" : "rgba(255,255,255,0.6)",
                    border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                    color: textColor,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={OWNER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: isDark ? "rgba(15,18,32,0.7)" : "rgba(255,255,255,0.6)",
                    border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                    color: textColor,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative ambient */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="relative py-8 px-6"
        style={{ zIndex: 2, borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span style={{ fontFamily: "'Playfair Display', serif", color: mutedColor, fontSize: "0.9rem" }}>
            GS<span style={{ color: accentColor }}>.</span>
          </span>
          <span className="text-xs" style={{ color: mutedColor, fontFamily: "'DM Mono', monospace" }}>
            {new Date().getFullYear()} · Gustavo Santos
          </span>
          <div className="flex items-center gap-4">
            <SocialBtn href={OWNER.github}           icon={<Github className="w-3.5 h-3.5" />}   isDark={isDark} />
            <SocialBtn href={OWNER.linkedin}          icon={<Linkedin className="w-3.5 h-3.5" />} isDark={isDark} />
            <SocialBtn href={`mailto:${OWNER.email}`} icon={<Mail className="w-3.5 h-3.5" />}    isDark={isDark} />
          </div>
        </div>
      </footer>
    </div>
  );
}
