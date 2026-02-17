import { Link } from 'react-router-dom';
import { portfoliodata } from '../data/Data';

const projects = portfoliodata;

// สีสำหรับ card แต่ละใบ (วนลูป)
const colorThemes = [
  { name: "secondary-purple", dark: "secondary-purple-dark", accent: "#ce82ff" },
  { name: "secondary-orange", dark: "secondary-orange-dark", accent: "#f59e0b" },
  { name: "secondary-blue", dark: "secondary-blue-dark", accent: "#3b82f6" },
];

export default function ProjectGrid() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-text-main overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b-2 border-border-color px-6 py-4 sticky top-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_4px_0_#0ab843] border-2 border-primary-dark">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>code</span>
          </div>
          <h2 className="text-[#3c3c3c] dark:text-white text-xl font-black tracking-tight hidden sm:block">
            PK's Playground
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-text-light hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors">Home</Link>
          <Link to="/quests" className="text-primary font-bold uppercase tracking-widest text-xs">Quests</Link>
          <Link to="/character" className="text-text-light hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors">Character</Link>
          <Link to="/contact" className="text-text-light hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full border-2 border-orange-200">
            <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span>
            <span className="text-orange-600 font-bold text-sm">12</span>
          </div>
          <button className="flex cursor-pointer items-center justify-center rounded-2xl h-10 px-6 bg-primary border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all text-white font-bold uppercase tracking-wide text-sm shadow-sm hover:brightness-105">
            Resume
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="w-full mb-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-800 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Select a Quest</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Choose a project to explore PK's skills.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-border-color bg-white dark:bg-surface-dark">
              <div className="size-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">XP</div>
              <div>
                <p className="text-xs font-bold text-text-light uppercase">Total XP</p>
                <p className="text-slate-800 dark:text-white font-black">15,420</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {projects.map((project, index) => {
            const theme = colorThemes[index % colorThemes.length];
            const bgGradient = index % 3 === 0 
              ? `radial-gradient(circle at center, ${theme.accent}15 0%, ${theme.accent}30 100%)`
              : index % 3 === 1
              ? "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)"
              : "radial-gradient(circle at top right, #e0f2fe 0%, #bae6fd 100%)";

            return (
              <a 
                key={project.projectname} 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex flex-col bg-white dark:bg-surface-dark border-2 border-border-color rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-primary transition-all duration-300 shadow-card"
              >
                {/* Badge Tech (First item in stack) */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`bg-white/90 backdrop-blur text-${theme.dark} border-2 border-${theme.name} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                    {project.techStack[0]}
                  </span>
                </div>

                {/* Image Area */}
                <div className="h-48 w-full flex items-center justify-center relative overflow-hidden" style={{ background: bgGradient }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`, backgroundSize: "20px 20px" }}></div>
                  <img
                    src={project.picture}
                    alt={project.projectname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <span className="material-symbols-outlined text-primary font-bold">open_in_new</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {project.projectname}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 text-sm flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold border-b-2 border-slate-200 dark:border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Pseudo Button (Visual Only since the whole card is an <a>) */}
                  <div className={`w-full h-12 rounded-2xl bg-${theme.name} border-b-4 border-${theme.dark} text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all`}>
                    <span>Enter Quest</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      {/* Mobile Footer Bar */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-background-dark border-t-2 border-border-color p-4 z-40 md:hidden">
        <div className="flex justify-around items-center">
          <Link to="/" className="text-slate-400"><span className="material-symbols-outlined text-2xl">home</span></Link>
          <Link to="/quests" className="text-primary"><span className="material-symbols-outlined text-2xl">trophy</span></Link>
          <Link to="/contact" className="text-slate-400"><span className="material-symbols-outlined text-2xl">person</span></Link>
        </div>
      </div>
    </div>
  );
}