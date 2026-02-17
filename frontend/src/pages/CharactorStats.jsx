import { Link } from "react-router-dom";
import { socialLinks, playerInfo, skills, experience } from "../data/Data";
import profile from "../assets/profil.jpg";

export default function CharacterStats() {
  // ฟังก์ชันช่วยจัดการสีของ Node ตามข้อมูล exp.color
  const getBadgeStyle = (color) => {
    const base = color?.split('-')[0] || "primary";
    const colors = {
      purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      primary: "bg-primary/10 text-primary border-primary/20",
    };
    return colors[base] || colors.primary;
  };

  const getNodeColor = (color) => {
    const base = color?.split('-')[0] || "primary";
    const colors = {
      purple: "border-purple-500 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
      orange: "border-orange-500 bg-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]",
      blue: "border-blue-500 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      primary: "border-primary bg-primary shadow-[0_0_15px_rgba(10,184,67,0.5)]",
    };
    return colors[base] || colors.primary;
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden font-display">
      
      {/* --- HEADER --- */}
      <header className="w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b-2 border-border-color sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="size-10 bg-primary rounded-xl flex justify-center items-center text-white shadow-[0_4px_0_#0ab843] group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined font-bold">videogame_asset</span>
            </div>
            <h2 className="font-black text-xl tracking-tight">PK.dev</h2>
          </div>

          <nav className="hidden md:flex gap-8 font-black text-xs uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/quests" className="hover:text-primary transition-colors">Quests</Link>
            <Link to="/character" className="text-primary">Character</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto w-full px-6 pt-12 pb-24">
        
        {/* --- HERO PROFILE --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-24">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <img
                src={profile}
                className="relative w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-surface-dark shadow-2xl transform transition group-hover:scale-105"
                alt="Player Profile"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-surface-dark shadow-lg">
                <span className="material-symbols-outlined text-sm font-bold">star</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter">Player {playerInfo?.nickname}</h1>
              <p className="text-primary font-black flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/10 rounded text-[10px] border border-primary/20 uppercase">Level {playerInfo?.level}</span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="text-sm uppercase tracking-widest">{playerInfo?.role}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-32 bg-white dark:bg-surface-dark p-5 rounded-3xl border-2 border-border-color shadow-card text-center group hover:border-primary transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total XP</p>
              <p className="text-2xl font-black text-primary">{playerInfo?.totalXP}</p>
            </div>
            <div className="flex-1 md:w-32 bg-white dark:bg-surface-dark p-5 rounded-3xl border-2 border-border-color shadow-card text-center group hover:border-orange-400 transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Streak</p>
              <p className="text-2xl font-black text-orange-500">{playerInfo?.streak}</p>
            </div>
          </div>
        </div>

        {/* --- SKILL TREE CAROUSEL --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Mastery Skill Tree</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10" />

            <div className="flex gap-10 animate-scroll w-max">
              {[...skills, ...skills].map((skill, index) => (
                <div key={index} className="flex flex-col items-center group cursor-help">
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border-2 border-border-color shadow-card group-hover:shadow-primary/20 group-hover:border-primary transition-all duration-300 transform group-hover:-translate-y-2">
                    <img src={skill.image} className="w-16 h-16 object-contain group-hover:rotate-12 transition-transform" alt={skill.name} />
                  </div>
                  <p className="mt-4 font-black text-xs uppercase tracking-widest text-slate-500">{skill.name}</p>
                  <div className="mt-1 w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${skill.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CAREER QUEST PATH --- */}
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Career Quest Path</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">The Journey of a Developer</p>
          </div>

          <div className="relative">
            {/* Main Center Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full" />

            {experience.map((exp, index) => (
              <div key={exp.period} className="relative mb-16 md:mb-24 last:mb-0">
                <div className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Date Side */}
                  <div className="hidden md:flex w-full md:w-1/2 justify-center px-12">
                    <div className={`text-center ${index % 2 === 0 ? 'md:text-left w-full' : 'md:text-right w-full'}`}>
                      <span className={`px-4 py-1 rounded-full border font-black text-[10px] uppercase tracking-widest ${getBadgeStyle(exp.color)}`}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                    <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-background-dark group transition-transform hover:scale-125 ${getNodeColor(exp.color)}`}>
                        <div className="w-full h-full rounded-full animate-ping bg-current opacity-20" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12">
                    <div className="bg-white dark:bg-surface-dark p-7 rounded-[2rem] border-2 border-border-color shadow-card relative group hover:border-primary transition-all duration-300">
                      {/* Triangle Arrow */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-surface-dark border-t-2 border-l-2 border-border-color rotate-[135deg] ${index % 2 === 0 ? '-left-[9px] -rotate-45' : '-right-[9px] rotate-[135deg]'}`}></div>
                      
                      <div className="md:hidden mb-2">
                        <span className={`px-3 py-0.5 rounded-full border font-black text-[9px] uppercase tracking-tighter ${getBadgeStyle(exp.color)}`}>
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                      <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-4">{exp.company}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-32 text-center max-w-2xl mx-auto">
          <div className="relative p-10 bg-slate-50 dark:bg-surface-dark rounded-[3rem] border-2 border-dashed border-border-color">
            <span className="material-symbols-outlined text-primary text-4xl mb-6 opacity-30">format_quote</span>
            <p className="text-xl font-bold italic text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
              "{playerInfo?.quote}"
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  className="px-6 py-3 bg-white dark:bg-background-dark border-2 border-border-color rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}