import React from 'react';
import { ArrowUpRight, User, BookOpen, Compass, ShieldCheck, Mail, Sparkles, Github, Linkedin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <section className="pt-16 pb-20 px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="max-w-4xl">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> ABOUT & PERSONAL MANIFESTO
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-tight">
            Hi, I'm Vidhu P Vinod. <br />
            <span className="font-editorial italic font-light text-blue-600">Thinker, builder,</span> & craftsman.
          </h1>
          <p className="text-gray-600 text-xl font-light leading-relaxed max-w-2xl">
            This space serves as an archive of my personal perspectives, intellectual experiments, and reflections on technology, human agency, and high-fidelity craftsmanship.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-16 pb-24 space-y-20">
        {/* Core Principles Grid */}
        <section className="bg-white border border-gray-200 rounded-3xl p-8 md:p-16 shadow-sm">
          <div className="max-w-3xl mb-12">
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2 block">
              WORLD VIEWS
            </span>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-4">
              Guiding Principles & Personal Beliefs
            </h2>
            <p className="text-gray-500 font-editorial italic text-lg">
              Mental models and heuristics I rely on when making decisions, designing systems, and writing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-[#fafafa] rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-gray-900">Restraint Over Excess</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Whether in visual design, code architecture, or daily commitments, subtraction is often more powerful than addition. True sophistication lies in simplicity.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#fafafa] rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-gray-900">First-Principles Thinking</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Challenge assumptions and break complex problems down to their fundamental truths rather than blindly following conventional wisdom or dogmatic rules.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#fafafa] rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-xl font-bold text-gray-900">Agency & Conviction</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                In an automated world, human value lies in moral clarity, taste, and the courage to hold independent perspectives backed by deep work.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Redirection Banner */}
        <section className="bg-[#111111] text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase block">
              PRIMARY PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Looking for my engineering portfolio?
            </h2>
            <p className="text-gray-400 font-editorial italic text-lg">
              Explore full case studies, technical projects, interactive applications, and professional background on my main portfolio site.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://vidhuvinod.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider rounded hover:bg-blue-500 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              Portfolio <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/VidhuVi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-gray-200 border border-gray-700 px-5 py-3.5 text-sm font-semibold tracking-wider rounded hover:bg-gray-700 hover:text-white transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vidhu-p-vinod/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-gray-200 border border-gray-700 px-5 py-3.5 text-sm font-semibold tracking-wider rounded hover:bg-gray-700 hover:text-white transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </section>

        {/* Influences & Recommended Reading */}
        <section className="bg-white border border-gray-200 rounded-3xl p-8 md:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Influences & Reading List
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
            <li className="p-4 bg-gray-50 rounded-xl text-gray-700 flex justify-between items-center">
              <span>Deep Work — Cal Newport</span>
              <span className="text-xs text-gray-400 font-editorial italic">Focus & Attention</span>
            </li>
            <li className="p-4 bg-gray-50 rounded-xl text-gray-700 flex justify-between items-center">
              <span>The Design of Everyday Things — Don Norman</span>
              <span className="text-xs text-gray-400 font-editorial italic">UX & Intent</span>
            </li>
            <li className="p-4 bg-gray-50 rounded-xl text-gray-700 flex justify-between items-center">
              <span>Antifragile — Nassim Nicholas Taleb</span>
              <span className="text-xs text-gray-400 font-editorial italic">Systems & Risk</span>
            </li>
            <li className="p-4 bg-gray-50 rounded-xl text-gray-700 flex justify-between items-center">
              <span>Meditations — Marcus Aurelius</span>
              <span className="text-xs text-gray-400 font-editorial italic">Philosophy</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};
