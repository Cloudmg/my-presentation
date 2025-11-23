
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Search, Bug, FileCode } from 'lucide-react';

// --- SCANNER ANIMATION DIAGRAM ---
export const ScannerDiagram: React.FC = () => {
  const [scanPos, setScanPos] = useState(0);
  
  // Simulate scanning rows
  const rows = [
    { id: 1, text: "<html>", safe: true },
    { id: 2, text: "  <body>", safe: true },
    { id: 3, text: "    <input type='text' />", safe: true },
    { id: 4, text: "    <script>eval(input)</script>", safe: false }, // Vulnerable
    { id: 5, text: "  </body>", safe: true },
    { id: 6, text: "</html>", safe: true },
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setScanPos(prev => (prev + 1) % (rows.length + 2));
      }, 800);
      return () => clearInterval(interval);
  }, [rows.length]);

  return (
    <div className="bg-stone-900 rounded-lg p-6 font-mono text-sm border border-stone-700 shadow-2xl max-w-md mx-auto relative overflow-hidden">
        <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="space-y-2 relative z-10">
            {rows.map((row, idx) => (
                <div key={row.id} className={`flex items-center gap-4 transition-colors duration-300 ${scanPos === idx ? 'bg-stone-800' : ''}`}>
                    <span className="text-stone-600 select-none w-6 text-right">{row.id}</span>
                    <span className={`${row.safe ? 'text-stone-300' : 'text-red-400 font-bold'}`}>
                        {row.text}
                    </span>
                    {scanPos === idx && !row.safe && (
                        <motion.span 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="ml-auto text-xs bg-red-600 text-white px-2 py-0.5 rounded uppercase font-bold"
                        >
                            XSS Found
                        </motion.span>
                    )}
                </div>
            ))}
        </div>
        
        {/* Scanning Line */}
        <motion.div 
            className="absolute left-0 right-0 h-1 bg-nobel-gold shadow-[0_0_10px_#C5A059] z-20 opacity-50"
            animate={{ top: `${(scanPos / rows.length) * 100}%` }}
            transition={{ duration: 0.5 }}
        />
        
        <div className="mt-4 pt-4 border-t border-stone-800 text-xs text-stone-500 flex justify-between">
            <span>Scanner: Active</span>
            <span className="text-nobel-gold">{scanPos >= rows.length ? "Scan Complete" : "Analyzing..."}</span>
        </div>
    </div>
  );
};

// --- METHODOLOGY COMPARISON CHART ---
export const MethodologyChart: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-200">
            <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
                <div className="flex items-center gap-3 mb-6">
                    <Search className="text-nobel-gold" />
                    <h3 className="text-xl font-serif">Automated Scanners</h3>
                </div>
                <div className="space-y-4">
                    <Bar label="Швидкість" value={95} color="bg-green-500" />
                    <Bar label="Вартість" value={20} color="bg-green-500" />
                    <Bar label="Глибина аналізу" value={40} color="bg-red-500" />
                    <Bar label="Бізнес-логіка" value={10} color="bg-red-500" />
                </div>
                <p className="mt-6 text-sm text-stone-400">
                    Ідеально для регулярних, швидких перевірок на типові вразливості.
                </p>
            </div>

            <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-nobel-gold" />
                    <h3 className="text-xl font-serif">Penetration Testing</h3>
                </div>
                <div className="space-y-4">
                    <Bar label="Швидкість" value={10} color="bg-red-500" />
                    <Bar label="Вартість" value={90} color="bg-red-500" />
                    <Bar label="Глибина аналізу" value={95} color="bg-green-500" />
                    <Bar label="Бізнес-логіка" value={98} color="bg-green-500" />
                </div>
                <p className="mt-6 text-sm text-stone-400">
                    Необхідно для виявлення складних ланцюжків атак та логічних помилок.
                </p>
            </div>
        </div>
    )
}

const Bar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex items-center gap-4 text-sm">
        <span className="w-24 text-stone-400">{label}</span>
        <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
            <motion.div 
                className={`h-full ${color}`} 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.2 }}
            />
        </div>
    </div>
);
