// src/pages/ContactPage.jsx
import { Link } from 'react-router-dom';
import { socialLinks } from '../data/Data';

const name = "Phakaphol";
const nickname = "PK";
const description = "I build playful & interactive web experiences that make the internet feel a little more fun.";

/**
 * ฟังก์ชันสำหรับแสดงโลโก้แบรนด์ตาม id ของโซเชียล
 */
const renderSocialLogo = (social) => {
  const logos = {
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    ig: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    Facebook: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
    Borntodev: "https://b2dmain-ruk.cdn.jelastic.net/wp-content/uploads/2022/05/38033354_1904287879629496_1565701761929314304_n-3.png"
  };

  // ถ้ามี id ตรงกับที่กำหนด ให้แสดงรูปภาพ ถ้าไม่มีให้ใช้ icon สำรอง
  if (logos[social.id]) {
    return (
      <img 
        src={logos[social.id]} 
        alt={social.name} 
        className="size-8 object-contain group-hover:scale-110 transition-transform" 
      />
    );
  }
  return <span className="material-symbols-outlined text-3xl">{social.icon}</span>;
};

export default function ContactPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-[#f0f5f1] dark:border-white/10 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_4px_0_#0bc448]">
              <span className="text-white font-black text-xl tracking-tighter">PK</span>
            </div>
            <h2 className="text-xl font-black text-neutral-dark dark:text-white">PK.dev</h2>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[#4b5563] dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide transition-colors">
              Home
            </Link>
            <Link to="/quests" className="text-[#4b5563] dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide transition-colors">
              Work
            </Link>
            <Link to="/character" className="text-[#4b5563] dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-primary font-bold text-sm uppercase tracking-wide">
              Contact
            </Link>
          </nav>

          <button className="hidden sm:flex h-10 px-6 bg-primary text-[#064e1c] text-sm font-extrabold uppercase tracking-wide rounded-2xl items-center justify-center shadow-btn hover:shadow-btn-hover hover:translate-y-[2px] transition-all active:translate-y-[4px] active:shadow-none">
            Let's Talk
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content & Mascot */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111813] dark:text-white leading-tight tracking-tight">
                Let's build something <span className="text-primary inline-block transform hover:rotate-2 transition-transform cursor-default">together!</span>
              </h1>

              <p className="text-lg text-[#4b5563] dark:text-slate-300 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                {description || "Have a project in mind? I'm always open to discussing product design work or partnership opportunities. Let's make it fun!"}
              </p>
            </div>

            {/* Mascot Illustration */}
            <div className="relative w-full aspect-square max-w-[400px] mx-auto lg:mx-0 animate-float order-first lg:order-last mb-6 lg:mb-0">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75 translate-y-10"></div>
              {/* เปลี่ยนเป็นรูป Mascot หรือ Robot ที่ต้องการ */}
              <img
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=PK"
                alt="Playful mascot waving hello"
                className="w-full h-full object-contain drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Social Links (Desktop) */}
            <div className="hidden lg:flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-surface-dark rounded-2xl border-2 border-gray-100 dark:border-slate-600 text-[#4b5563] dark:text-slate-300 hover:text-primary hover:border-primary transition-all shadow-sm hover:translate-y-[-4px]"
                >
                  {renderSocialLogo(social)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="order-1 lg:order-2 w-full">
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full"></div>

              <form className="flex flex-col gap-6 relative z-10">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2" htmlFor="name">
                    Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="What's your name?"
                      className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl py-4 pl-12 pr-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2" htmlFor="email">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Where can I reach you?"
                      className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl py-4 pl-12 pr-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your idea..."
                    rows={4}
                    className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl p-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-3d-primary w-full py-4 bg-primary text-[#064e1c] dark:text-neutral-dark text-lg font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 mt-2 shadow-btn hover:shadow-btn-hover hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined font-bold">send</span>
                </button>
              </form>
            </div>

            {/* Social Links (Mobile) */}
            <div className="flex lg:hidden justify-center gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-white dark:bg-surface-dark rounded-xl border-2 border-gray-100 dark:border-slate-600 text-[#4b5563] dark:text-slate-300 hover:text-primary transition-all shadow-sm"
                >
                  {renderSocialLogo(social)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-6 text-center text-[#9ca3af] dark:text-slate-500 text-sm font-medium">
        <p>© {new Date().getFullYear()} {name}. Built with fun.</p>
      </footer>
    </div>
  );
}