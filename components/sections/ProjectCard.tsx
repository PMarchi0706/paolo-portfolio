import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-brand-green/15 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl font-bold tracking-tight text-brand-green">
        {project.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green"
          >
            {tech}
          </span>
        ))}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm font-medium text-brand-coral underline-offset-4 hover:underline"
          >
            {project.linkLabel ?? "View project"}
          </a>
        )}
      </div>
    </div>
  );
}
