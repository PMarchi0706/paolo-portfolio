import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-3xl px-6">
        <Separator />
      </div>
      <About />
      <div className="mx-auto max-w-3xl px-6">
        <Separator />
      </div>
      <Skills />
      <div className="mx-auto max-w-3xl px-6">
        <Separator />
      </div>
      <Projects />
      <div className="mx-auto max-w-3xl px-6">
        <Separator />
      </div>
      <Resume />
    </>
  );
}
