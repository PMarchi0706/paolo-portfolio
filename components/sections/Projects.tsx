import { Sparkle } from "lucide-react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="flex items-center gap-2 font-heading text-3xl font-bold tracking-tight">
        <Sparkle className="size-5 fill-brand-orange text-brand-orange" />
        Projects
      </h2>
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
