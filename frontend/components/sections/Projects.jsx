import { projectdata } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";

export default function Projects() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-black text-center mb-4">Select a Quest</h2>
      <p className="text-center text-neutral-mid mb-12">Choose a project to explore my frontend skills.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectdata.map((proj, i) => (
          <ProjectCard key={i} {...proj} />
        ))}
      </div>
    </section>
  );
}