import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {project.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
          >
            {project.linkLabel ?? "View project"}
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
