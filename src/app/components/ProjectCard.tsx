import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "./portfolio-data";

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  featured?: boolean;
}

export function ProjectCard({ project, isDark, featured }: ProjectCardProps) {
  const card = isDark
    ? { bg: "rgba(15,18,32,0.85)", border: "rgba(255,255,255,0.07)", tag: "rgba(255,255,255,0.06)", tagText: "rgba(200,210,240,0.7)", title: "#f0f2ff", desc: "rgba(180,190,220,0.75)" }
    : { bg: "rgba(255,255,255,0.75)", border: "rgba(0,0,0,0.07)", tag: "rgba(0,0,0,0.05)", tagText: "rgba(30,50,100,0.65)", title: "#0f1a3a", desc: "rgba(40,60,120,0.65)" };

  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: card.bg,
        border: `1px solid ${card.border}`,
        backdropFilter: "blur(12px)",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&h=450&fit=crop&auto=format`;
          }}
        />
        {featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: isDark ? "#f59e0b" : "#2563eb", color: isDark ? "#0f1a3a" : "#fff" }}
          >
            Destaque
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
            >
              <Github className="w-4 h-4" />
              Código
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ background: isDark ? "#f59e0b" : "#2563eb", color: isDark ? "#0f1a3a" : "#fff" }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="mb-2 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif", color: card.title, fontSize: "1.05rem", fontWeight: 600 }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: card.desc }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-xs"
              style={{ background: card.tag, color: card.tagText }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium transition-all hover:gap-2 w-fit"
            style={{ color: isDark ? "#f59e0b" : "#2563eb" }}
          >
            Ver projeto
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
