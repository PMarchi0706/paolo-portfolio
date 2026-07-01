import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "unbox3d",
    title: "Unbox 3D",
    description:
      "Senior design project built in collaboration with the U.S. Army's Combat Capabilities Development Command (DEVCOM) Army Research Laboratory (ARL). Unbox 3D simplifies the transformation of 3D objects, stored in .obj format, into precise 2D net representations. The 2D nets are exported in a laser-cutter-compatible format so the flat shapes can be seamlessly reassembled into their original 3D forms — combining efficiency and accuracy to support military training use cases, where soldiers build full-scale vehicle replicas out of cardboard.",
    tech: ["C#", ".NET", "OpenTK", "Blender API", "Assimp", "xUnit", "MOQ", "Python"],
    // TODO: add a link once the repo is shareable.
  },
  {
    id: "portfolio-site",
    title: "This Portfolio Site",
    description:
      "A personal developer portfolio built with Next.js, featuring a live Spotify 'now playing' widget and an AI-generated music page: short, personality-driven blurbs for a curated list of song picks, written by Claude and cached at build time to keep the site fast and cost-effective.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Spotify API", "Anthropic API"],
    // TODO: add the live URL once deployed.
  },
];
