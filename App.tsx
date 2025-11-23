
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Shield, Search, Code, Globe, Server, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { CyberNetworkScene } from './components/QuantumScene'; // Reused/Renamed component
import { ScannerDiagram, MethodologyChart } from './components/Diagrams';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  theme: 'light' | 'dark';
  layout: 'center' | 'split' | 'full';
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Технології Виявлення Уразливостей",
    subtitle: "Сучасні підходи до кібербезпеки",
    theme: 'light',
    layout: 'center',
    content: (
      <div className="text-center mt-8">
        <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Огляд методів, інструментів та стратегій для ідентифікації слабких місць у програмному забезпеченні та інфраструктурі.
        </p>
        <div className="mt-12 flex justify-center gap-4 text-sm font-bold tracking-widest text-stone-400 uppercase">
          <span>SAST</span> • <span>DAST</span> • <span>IAST</span> • <span>SCA</span>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Що таке вразливість?",
    theme: 'dark',
    layout: 'split',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-stone-300">
          <strong className="text-nobel-gold">Вразливість (Vulnerability)</strong> — це недолік у системі, який може бути використаний зловмисником для порушення цілісності, доступності або конфіденційності даних.
        </p>
        <ul className="space-y-4 mt-8">
          <li className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
            <Code className="text-red-400" />
            <span>Помилки в коді (Bug)</span>
          </li>
          <li className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
            <Server className="text-orange-400" />
            <span>Неправильна конфігурація</span>
          </li>
          <li className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
            <Shield className="text-blue-400" />
            <span>Слабкі механізми захисту</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "Класифікація методів аналізу",
    subtitle: "Основні підходи до тестування безпеки (AST)",
    theme: 'light',
    layout: 'full',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {[
          { acronym: 'SAST', title: 'Static Analysis', desc: 'Аналіз вихідного коду без запуску програми (White Box).', icon: <Code /> },
          { acronym: 'DAST', title: 'Dynamic Analysis', desc: 'Тестування працюючої програми ззовні (Black Box).', icon: <Globe /> },
          { acronym: 'IAST', title: 'Interactive Analysis', desc: 'Гібридний підхід: аналіз роботи зсередини (Gray Box).', icon: <ActivityIcon /> },
          { acronym: 'SCA', title: 'Composition Analysis', desc: 'Перевірка сторонніх бібліотек та залежностей.', icon: <Server /> },
        ].map((item) => (
          <div key={item.acronym} className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-800 mb-4">
              {item.icon}
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{item.acronym}</h3>
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">{item.title}</div>
            <p className="text-stone-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    title: "SAST: Статичний аналіз",
    subtitle: "Static Application Security Testing",
    theme: 'light',
    layout: 'split',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-stone-700">
          SAST сканує вихідний код, байт-код або бінарні файли на наявність відомих шаблонів вразливостей. Це відбувається на ранніх етапах розробки (SDLC).
        </p>
        <div className="bg-stone-100 p-6 rounded-lg border border-stone-200">
            <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-green-600"/> Переваги</h4>
            <ul className="list-disc list-inside text-stone-600 space-y-2">
                <li>Знаходить точне місце помилки в коді.</li>
                <li>Не вимагає робочої програми.</li>
                <li>100% покриття коду.</li>
            </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
             <h4 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500"/> Недоліки</h4>
             <ul className="list-disc list-inside text-stone-600 space-y-2">
                <li>Високий рівень хибних спрацювань (False Positives).</li>
                <li>Не виявляє проблеми конфігурації середовища.</li>
             </ul>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "DAST: Динамічний аналіз",
    subtitle: "Dynamic Application Security Testing",
    theme: 'dark',
    layout: 'split',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-stone-300">
          DAST імітує дії хакера, взаємодіючи з запущеним додатком через веб-інтерфейс або API. Він не бачить внутрішнього коду.
        </p>
        <div className="mt-8">
            <ScannerDiagram />
        </div>
        <p className="text-sm text-stone-500 italic">
          DAST ефективний для виявлення проблем автентифікації, SQL Injection, XSS, які проявляються тільки під час роботи.
        </p>
      </div>
    )
  },
  {
    id: 6,
    title: "IAST: Інтерактивний аналіз",
    subtitle: "Найкраще з двох світів",
    theme: 'light',
    layout: 'center',
    content: (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
            <div className="text-center p-6 bg-stone-50 rounded-lg w-64">
                <div className="font-bold text-stone-400 mb-2">SAST</div>
                <div className="text-sm">Доступ до коду</div>
            </div>
            <div className="text-2xl text-stone-300">+</div>
            <div className="text-center p-6 bg-stone-50 rounded-lg w-64">
                <div className="font-bold text-stone-400 mb-2">DAST</div>
                <div className="text-sm">Реальний трафік</div>
            </div>
            <div className="text-2xl text-nobel-gold">=</div>
            <div className="text-center p-6 bg-nobel-gold text-white rounded-lg w-64 shadow-lg scale-110">
                <div className="font-bold mb-2">IAST</div>
                <div className="text-sm">Агенти всередині</div>
            </div>
        </div>
        <p className="text-center text-stone-600 text-lg">
          IAST використовує агенти, вбудовані в сервери додатків. Вони аналізують виконання коду в реальному часі під час тестів, забезпечуючи високу точність і низький рівень хибних спрацювань.
        </p>
      </div>
    )
  },
  {
    id: 7,
    title: "SCA: Software Composition Analysis",
    subtitle: "Ризики Open Source",
    theme: 'light',
    layout: 'split',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-stone-700">
          Сучасні додатки на 80-90% складаються з відкритого коду (бібліотеки, фреймворки). SCA ідентифікує всі компоненти та перевіряє їх на відомі вразливості (CVE).
        </p>
        
        <div className="relative h-48 bg-stone-100 rounded-xl overflow-hidden border border-stone-200 p-6 flex items-center justify-center">
             <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg animate-pulse opacity-50"></div>
                    <span className="text-xs font-mono">App Code (10%)</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold animate-bounce">
                        !
                    </div>
                    <span className="text-xs font-mono font-bold text-red-500">Lib v1.0 (90%)</span>
                </div>
             </div>
             <div className="absolute bottom-2 right-4 text-xs text-stone-400">Log4j Example</div>
        </div>

        <ul className="space-y-3 text-stone-600">
            <li className="flex gap-3"><Terminal size={20}/> Виявлення застарілих версій.</li>
            <li className="flex gap-3"><Terminal size={20}/> Аналіз ліцензійних ризиків.</li>
            <li className="flex gap-3"><Terminal size={20}/> Автоматичне оновлення залежностей.</li>
        </ul>
      </div>
    )
  },
  {
    id: 8,
    title: "Сканери vs Пентести",
    theme: 'dark',
    layout: 'full',
    content: (
      <div className="mt-8 max-w-5xl mx-auto">
        <MethodologyChart />
      </div>
    )
  },
  {
    id: 9,
    title: "Майбутнє: AI в кібербезпеці",
    subtitle: "Нова ера виявлення загроз",
    theme: 'light',
    layout: 'split',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-stone-700">
          Штучний інтелект змінює правила гри. Сучасні системи використовують ML для виявлення аномалій, які неможливо описати статичними правилами.
        </p>
        <div className="grid grid-cols-1 gap-4">
            <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold text-nobel-gold mb-1">Predictive Analysis</h4>
                <p className="text-sm text-stone-500">Прогнозування атак до їх початку на основі глобальних даних.</p>
            </div>
            <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold text-nobel-gold mb-1">Automated Triage</h4>
                <p className="text-sm text-stone-500">AI автоматично сортує тисячі сповіщень, виділяючи лише критичні.</p>
            </div>
            <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold text-nobel-gold mb-1">Self-Healing</h4>
                <p className="text-sm text-stone-500">Системи, що автоматично патчать себе при виявленні вразливості.</p>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Висновки",
    subtitle: "Побудова безпечного SDLC",
    theme: 'light',
    layout: 'center',
    content: (
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <p className="text-2xl text-stone-800 font-serif leading-relaxed">
            "Безпека — це не продукт, а процес."
        </p>
        <div className="w-24 h-1 bg-nobel-gold mx-auto"></div>
        <p className="text-lg text-stone-600">
            Ефективна стратегія захисту вимагає комбінації методів (SAST + DAST + SCA) та їх інтеграції в процес розробки (DevSecOps). Автоматизація та регулярність перевірок є ключем до успіху.
        </p>
        <div className="pt-12">
            <button className="px-8 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 transition-colors" onClick={() => window.location.reload()}>
                Почати спочатку
            </button>
        </div>
      </div>
    )
  }
];

function ActivityIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
}

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(0, prev - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${slide.theme === 'dark' ? 'bg-stone-950 text-white' : 'bg-[#F9F8F4] text-stone-900'}`}>
      
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0">
          <CyberNetworkScene theme={slide.theme} intensity={currentSlide / slides.length} />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-stone-200/20 z-50">
        <motion.div 
            className="h-full bg-nobel-gold" 
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-50 flex gap-4">
         <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-stone-500/30 hover:bg-white/20 disabled:opacity-30 transition-all text-current">
            <ChevronLeft size={24} />
         </button>
         <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 rounded-full bg-nobel-gold text-stone-900 shadow-lg hover:bg-yellow-500 disabled:opacity-50 transition-all">
            <ChevronRight size={24} />
         </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 left-8 z-50 font-mono text-sm opacity-50">
         {currentSlide + 1} / {slides.length}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div 
            key={slide.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-24"
        >
            <div className="container mx-auto">
                {/* Header */}
                <div className={`mb-8 ${slide.layout === 'center' ? 'text-center' : 'text-left'}`}>
                    {slide.subtitle && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="text-nobel-gold font-bold tracking-[0.2em] text-sm uppercase mb-3"
                        >
                            {slide.subtitle}
                        </motion.div>
                    )}
                    <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight">{slide.title}</h1>
                    <div className={`h-1 bg-nobel-gold mt-6 ${slide.layout === 'center' ? 'w-24 mx-auto' : 'w-24'}`}></div>
                </div>

                {/* Content Body */}
                <div className="w-full">
                    {slide.layout === 'split' ? (
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>{slide.content}</div>
                            <div className="hidden lg:block">
                                {/* The right side in split view is explicitly left empty for the 3D background to shine through, 
                                    or the content puts a diagram there */}
                            </div>
                         </div>
                    ) : (
                        <div className="max-w-6xl mx-auto">
                            {slide.content}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default App;
