import profile from "../assets/profil.jpg"
export default function Home() {
  const name = "Phakaphol";
const nickname = "";
const title = "Frontend Developer";
const description = "I build playful & interactive web experiences that make the internet feel a little more fun.";
const available = "Available for freelance";
const stackIcons = ["code_blocks", "javascript", "css", "html"];

  return (
    <div className="relative min-h-screen flex flex-col bg-dot-pattern bg-background-light text-neutral-dark font-display antialiased overflow-x-hidden">
      {/* Navigation - จะแยกเป็น component ภายหลัง */}
      <header className="w-full px-6 py-4 md:px-10 lg:px-20 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-neutral-dark text-2xl font-bold">code</span>
            </div>
            <h2 className="text-neutral-dark text-xl font-black tracking-tight">PK.dev</h2>
          </div>

          {/* Desktop Nav - ปรับให้เชื่อม routing */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-100 shadow-sm mr-4">
              <a href="/" className="px-5 py-2 text-sm font-bold text-neutral-mid hover:text-neutral-dark hover:bg-gray-100 rounded-xl transition-colors">Home</a>
              <a href="/quests" className="px-5 py-2 text-sm font-bold text-neutral-mid hover:text-neutral-dark hover:bg-gray-100 rounded-xl transition-colors">Work</a>
              <a href="/character" className="px-5 py-2 text-sm font-bold text-neutral-mid hover:text-neutral-dark hover:bg-gray-100 rounded-xl transition-colors">About</a>
              <a href="/contact" className="px-5 py-2 text-sm font-bold text-neutral-mid hover:text-neutral-dark hover:bg-gray-100 rounded-xl transition-colors">Contact</a>
            </nav>
            <button className="bg-neutral-dark text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-3d-secondary hover:translate-y-[2px] hover:shadow-3d-secondary-hover active:translate-y-[4px] active:shadow-none transition-all border-2 border-transparent">
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 text-neutral-dark">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center relative px-6 py-12 md:px-10 lg:px-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col gap-8 items-start z-10 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-gray-100 rounded-full mb-2 mx-auto lg:mx-0 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold text-neutral-mid uppercase tracking-wide">{available}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-dark leading-[1.1] tracking-tight">
                Hi, I'm <span className="text-primary-dark underline decoration-wavy decoration-primary/40 underline-offset-4">{name}</span> 
              </h1>

              <p className="text-lg md:text-xl text-neutral-mid font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
              <a href="/quests">
                <button className="btn-gamified flex items-center justify-center gap-2 bg-primary text-neutral-dark text-lg font-black px-8 py-4 rounded-2xl shadow-3d hover:translate-y-[2px] hover:shadow-3d-hover active:translate-y-[4px] active:shadow-none transition-all w-full sm:w-auto uppercase tracking-wide border-2 border-primary-dark/10">
                  <span className="material-symbols-outlined">rocket_launch</span>
                  View Projects
                </button>
              </a>

              <a href="/contact">
                <button className="btn-gamified-secondary flex items-center justify-center gap-2 bg-white text-neutral-mid text-lg font-bold px-8 py-4 rounded-2xl border-2 border-gray-200 shadow-3d-secondary hover:translate-y-[2px] hover:shadow-3d-secondary-hover hover:text-neutral-dark hover:border-gray-300 active:translate-y-[4px] active:shadow-none transition-all w-full sm:w-auto uppercase tracking-wide">
                  Contact Me
                </button>
              </a>
            </div>

            {/* Stack Icons */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 opacity-70">
              <span className="text-sm font-bold text-neutral-mid">Stack:</span>
              <div className="flex gap-3 text-neutral-dark text-3xl">
                {stackIcons.map((icon, idx) => (
                  <span key={idx} className="material-symbols-outlined" title={icon}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Avatar + Floating Elements */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 h-[400px] md:h-[500px]">
            {/* Blobs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] bg-white rounded-full border-4 border-dashed border-primary/30 animate-[spin_60s_linear_infinite]"></div>
            </div>

            {/* Avatar */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-8 border-white shadow-floating transform transition-transform hover:scale-105 duration-300">
              <img
                src={profile}
                alt={`Friendly avatar of ${name} (${nickname})`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badges - ปรับเป็น tech ที่คุณถนัดจริง ๆ */}
            <div className="absolute top-10 right-10 lg:right-20 animate-[bounce_3s_infinite]">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-floating flex items-center justify-center border-b-4 border-gray-100 transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-blue-500">science</span> {/* React */}
              </div>
            </div>

            <div className="absolute bottom-12 left-6 lg:left-12 animate-[bounce_4s_infinite_1s]">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-floating flex items-center justify-center border-b-4 border-gray-100 transform rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-3xl text-green-600">animation</span> {/* GSAP */}
              </div>
            </div>

            <div className="absolute top-1/2 left-0 lg:-left-4 transform -translate-y-1/2 animate-[pulse_4s_infinite]">
              <div className="px-4 py-2 bg-neutral-dark text-white rounded-xl shadow-lg flex items-center gap-2 border-b-4 border-black -rotate-3">
                <span className="material-symbols-outlined text-lg text-primary">terminal</span>
                <span className="font-bold text-sm">Frontend</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background-light to-transparent pointer-events-none"></div>
    </div>
  );
}