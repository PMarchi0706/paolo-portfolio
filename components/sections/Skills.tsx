import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 space-y-5">
        {skillCategories.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {group.category}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
