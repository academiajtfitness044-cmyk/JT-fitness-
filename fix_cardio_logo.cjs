const fs = require('fs');
let cardio = fs.readFileSync('src/views/CardioView.tsx', 'utf8');

const replacement = `<div className="flex items-center">
                    <img src="https://i.postimg.cc/7LpBgsmb/1001834561-(1).png" alt="Logo Protocolo P.A.P" className="w-[100px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ imageRendering: 'high-quality' }} />
                  </div>`;

cardio = cardio.replace(/<div className="flex items-center gap-2">\s*<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">\s*<Activity className="w-5 h-5 text-black" \/>\s*<\/div>\s*<div className="flex flex-col drop-shadow-md">\s*<span className="text-white font-black text-xs tracking-widest uppercase text-shadow-sm">Protocolo P\.A\.P<\/span>\s*<\/div>\s*<\/div>/g, replacement);
fs.writeFileSync('src/views/CardioView.tsx', cardio);
console.log("Cardio regex fixed");
