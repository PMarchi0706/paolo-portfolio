import type { SkillCategory } from "@/lib/types";

// TODO: confirm/expand this list with Paolo — seeded from the Unbox 3D tech
// stack plus common CS-fundamentals categories.
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["C#", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Web Development",
    skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Tools & Platforms",
    skills: [".NET", "OpenTK", "Blender API", "Assimp", "Git", "Vercel"],
  },
  {
    category: "Testing & Practices",
    skills: ["xUnit", "MOQ", "Unit Testing", "Project Management"],
  },
  {
    category: "Data",
    skills: ["Data Analysis"],
  },
];
