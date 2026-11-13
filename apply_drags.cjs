const fs = require('fs');

function applyToPortal() {
  let portal = fs.readFileSync('src/views/StudentPortalView.tsx', 'utf8');

  // remove capture environment
  portal = portal.replace(/capture="environment"/g, '');

  if(!portal.includes('import { motion }')) {
     portal = `import { motion } from 'framer-motion';\n` + portal;
  }

  // Add scale states to WorkoutPhotoShare
  portal = portal.replace(
    'const [modalData, setModalData] = useState<{isOpen:',
    'const [logoScale, setLogoScale] = useState(1);\n  const [checkScale, setCheckScale] = useState(1);\n  const [modalData, setModalData] = useState<{isOpen:'
  );

  // Wrap check list in motion.div
  portal = portal.replace(
    /<div className="absolute bottom-\[10%\] right-2 sm:right-3 flex flex-col items-start border-l-2 border-white\/80 pl-2 gap-1.5 z-10">/g,
    '<motion.div drag dragMomentum={false} className="absolute bottom-[10%] right-2 sm:right-3 flex flex-col items-start border-l-2 border-white/80 pl-2 gap-1.5 z-10 cursor-move" style={{ scale: checkScale, transformOrigin: "bottom right" }}>'
  );
  
  // End of check list
  const checkListEnd = `                    );
                  })}
                </div>`;
  portal = portal.replace(checkListEnd, `                    );\n                  })}\n                </motion.div>`);


  // Wrap Logo in motion.div drag
  const logoOriginal = `<div className="absolute bottom-6 left-6 z-10 flex flex-col drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none w-36 sm:w-52">`;
  const logoNew = `<motion.div drag dragMomentum={false} className="absolute bottom-6 left-6 z-10 flex flex-col drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-move w-36 sm:w-52" style={{ scale: logoScale, transformOrigin: "bottom left" }}>`;
  portal = portal.replace(logoOriginal, logoNew);
  
  const logoEnd = `style={{ imageRendering: 'high-quality' }} />
                </div>`;
  const logoEndNew = `style={{ imageRendering: 'high-quality' }} draggable="false" />
                </motion.div>`;
  portal = portal.replace(logoEnd, logoEndNew);

  // Add scale controls to WorkoutPhotoShare
  const buttonsRegex = /<div className="flex gap-2 justify-center mt-2 max-w-\[400px\] mx-auto w-full">/;
  const scaleControls = `            <div className="flex gap-4 justify-between bg-white/5 p-4 rounded-xl mt-2 border border-white/10 w-full max-w-[400px] mx-auto">
               <div className="flex flex-col w-1/2">
                 <label className="text-xs font-bold text-gray-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Logo (Arraste p/ mover)</label>
                 <input type="range" min="0.5" max="3" step="0.1" value={logoScale} onChange={e => setLogoScale(parseFloat(e.target.value))} className="w-full accent-primary" />
               </div>
               <div className="flex flex-col w-1/2">
                 <label className="text-xs font-bold text-gray-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Check (Arraste p/ mover)</label>
                 <input type="range" min="0.5" max="2" step="0.1" value={checkScale} onChange={e => setCheckScale(parseFloat(e.target.value))} className="w-full accent-primary" />
               </div>
            </div>\n            `;
  portal = portal.replace(buttonsRegex, scaleControls + '<div className="flex gap-2 justify-center mt-2 max-w-[400px] mx-auto w-full">');

  
  // DietPhotoShare scale states
  portal = portal.replace(
    'const [isSharing, setIsSharing] = useState(false);\n  const compositeRef = useRef<HTMLDivElement>(null);\n  const [modalData, setModalData] = useState<{isOpen:',
    'const [isSharing, setIsSharing] = useState(false);\n  const [logoScale, setLogoScale] = useState(1);\n  const compositeRef = useRef<HTMLDivElement>(null);\n  const [modalData, setModalData] = useState<{isOpen:'
  );

  // DietPhotoShare logo wrapper
  const dietLogoOriginal = `<div className="flex items-center">
                   <img src="https://i.postimg.cc/7LpBgsmb/1001834561-(1).png" alt="Logo Protocolo P.A.P" className="w-[100px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ imageRendering: 'high-quality' }} />
                 </div>`;
  if(portal.includes(dietLogoOriginal)) {
     const dietLogoNew = `<motion.div drag dragMomentum={false} className="flex items-center cursor-move" style={{ scale: logoScale, transformOrigin: 'top left' }}>
                   <img src="https://i.postimg.cc/7LpBgsmb/1001834561-(1).png" alt="Logo Protocolo P.A.P" className="w-[100px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none" draggable="false" crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ imageRendering: 'high-quality' }} />
                 </motion.div>`;
     portal = portal.replace(dietLogoOriginal, dietLogoNew);
  }

  // DietPhotoShare add logo scale control
  const dietButtonsRegex = /<div className="grid grid-cols-2 gap-4 mt-2">/;
  const dietScaleControl = `            <div className="flex justify-center bg-white/5 p-4 rounded-xl mt-2 border border-white/10 w-full mb-2 cursor-pointer">
               <div className="flex flex-col w-full">
                 <label className="text-xs font-bold text-gray-400 mb-2">Tamanho da Logo (Arraste p/ mover)</label>
                 <input type="range" min="0.5" max="3" step="0.1" value={logoScale} onChange={e => setLogoScale(parseFloat(e.target.value))} className="w-full accent-primary" />
               </div>
            </div>\n            `;
  if (portal.includes('<div className="grid grid-cols-2 gap-4 mt-2">')) {
     portal = portal.replace(dietButtonsRegex, dietScaleControl + '<div className="grid grid-cols-2 gap-4 mt-2">');
  }


  fs.writeFileSync('src/views/StudentPortalView.tsx', portal);
}

function applyToCardio() {
  let cardio = fs.readFileSync('src/views/CardioView.tsx', 'utf8');

  // remove capture environment
  cardio = cardio.replace(/capture="environment"/g, '');

  if(!cardio.includes('import { motion }')) {
     cardio = `import { motion } from 'framer-motion';\n` + cardio;
  }

  cardio = cardio.replace(
    'const [isSharing, setIsSharing] = useState(false);\n  const compositeRef = useRef<HTMLDivElement>(null);\n  const [modalData, setModalData]',
    'const [isSharing, setIsSharing] = useState(false);\n  const [logoScale, setLogoScale] = useState(1);\n  const compositeRef = useRef<HTMLDivElement>(null);\n  const [modalData, setModalData]'
  );

  const cardioLogoOriginal = `<div className="flex items-center">
                    <img src="https://i.postimg.cc/7LpBgsmb/1001834561-(1).png" alt="Logo Protocolo P.A.P" className="w-[100px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ imageRendering: 'high-quality' }} />
                  </div>`;
  const cardioLogoNew = `<motion.div drag dragMomentum={false} className="flex items-center cursor-move" style={{ scale: logoScale, transformOrigin: 'top left' }}>
                    <img src="https://i.postimg.cc/7LpBgsmb/1001834561-(1).png" alt="Logo Protocolo P.A.P" className="w-[100px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none" draggable="false" crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ imageRendering: 'high-quality' }} />
                  </motion.div>`;
  cardio = cardio.replace(cardioLogoOriginal, cardioLogoNew);

  const cardioButtonsRegex = /<div className="grid grid-cols-2 gap-4 mt-2">/;
  const cardioScaleControl = `            <div className="flex justify-center bg-white/5 p-4 rounded-xl mt-2 border border-white/10 w-full mb-2">
               <div className="flex flex-col w-full">
                 <label className="text-xs font-bold text-gray-400 mb-2">Tamanho da Logo (Arraste p/ mover)</label>
                 <input type="range" min="0.5" max="3" step="0.1" value={logoScale} onChange={e => setLogoScale(parseFloat(e.target.value))} className="w-full accent-primary" />
               </div>
            </div>\n            `;
  cardio = cardio.replace(cardioButtonsRegex, cardioScaleControl + '<div className="grid grid-cols-2 gap-4 mt-2">');

  fs.writeFileSync('src/views/CardioView.tsx', cardio);
}

applyToPortal();
applyToCardio();
console.log("Drags applied");
