import { Sparkle } from "lucide-react";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="bg-brand-black text-brand-black-foreground"
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="flex items-center gap-2 font-heading text-3xl font-bold tracking-tight">
          <Sparkle className="size-5 fill-brand-orange text-brand-orange" />
          Skills
        </h2>
        <div className="mt-6 space-y-6">
          {skillCategories.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium uppercase tracking-wide text-brand-black-foreground/50">
                {group.category}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-brand-orange px-3 py-1 text-sm font-medium text-brand-orange-foreground"
                  >
                    {skill}
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
