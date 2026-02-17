export default function ProjectCard({ projectname, description, techStack, picture, link, experience }) {
  // เลือกสีตามความยาก หรือ random จาก secondary colors
  const colorThemes = ["secondary-purple", "secondary-orange", "secondary-blue"];
  const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

  return (
    <div className={`group relative flex flex-col bg-white border-2 border-border-color rounded-3xl overflow-hidden hover:border-${theme} hover:shadow-[0_8px_0_var(--tw-shadow-color)] transition-all shadow-[0_4px_0_#e5e5e5]`}>
      {/* badge difficulty */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`bg-white/90 text-${theme}-dark border-2 border-${theme} px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm`}>
          Quest
        </span>
      </div>

      <div className={`h-48 w-full bg-${theme}/20 flex items-center justify-center relative overflow-hidden`}>
        <img src={picture} alt={projectname} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-black mb-2">{projectname}</h3>
        <p className="text-neutral-mid mb-6 text-sm flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border-b-2 border-slate-200">
              {tech}
            </span>
          ))}
        </div>

        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className={`w-full h-12 rounded-2xl bg-${theme} border-b-4 border-${theme}-dark text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:border-b-0 active:translate-y-1 hover:brightness-110 transition-all`}>
            Enter Quest <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </a>
      </div>
    </div>
  );
}