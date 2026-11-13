const fs = require('fs');

let portal = fs.readFileSync('src/views/StudentPortalView.tsx', 'utf8');

// The replacement was:
// 'const [modalData, setModalData] = useState<{isOpen:' -> 'const [logoScale, setLogoScale] = useState(1);\n  const [checkScale, setCheckScale] = useState(1);\n  const [modalData, setModalData] = useState<{isOpen:'

// This messed up FeedbackAndShare because it was the first instance.
// Let's remove the scale state from FeedbackAndShare.
portal = portal.replace('const [logoScale, setLogoScale] = useState(1);\n  const [checkScale, setCheckScale] = useState(1);\n  const [modalData, setModalData] = useState<{isOpen:', 'const [modalData, setModalData] = useState<{isOpen:');

// Now add it to WorkoutPhotoShare
const daysString = "  const daysOfWeek = [\\'SEG\\', \\'TER\\', \\'QUA\\', \\'QUI\\', \\'SEX\\', \\'SÁB\\', \\'DOM\\'];";
const workoutMatchPattern =/const daysOfWeek = \['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'\];\s*const \[modalData, setModalData\] = useState/;
const workoutReplacePattern = `const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
  const [logoScale, setLogoScale] = useState(1);
  const [checkScale, setCheckScale] = useState(1);
  const [modalData, setModalData] = useState`;

portal = portal.replace(workoutMatchPattern, workoutReplacePattern);

// If it's still missing:
if(!portal.includes('const [checkScale, setCheckScale]')) {
  console.log("Could not find place to add checkScale! Re-adding using another point");
  portal = portal.replace(
    /const compositeRef = useRef<HTMLDivElement>\(null\);/,
    `const compositeRef = useRef<HTMLDivElement>(null);\n  const [logoScale, setLogoScale] = useState(1);\n  const [checkScale, setCheckScale] = useState(1);`
  );
}

// Ensure CardioPhotoShare has logoScale (it only needed logoScale, but if it doesn't we'll just add it)
if(!fs.readFileSync('src/views/CardioView.tsx', 'utf8').includes('logoScale')) {
  console.log("Missing logoScale in Cardio");
}

// Now the user wants "option to take a photo and pick a photo from gallery".
// We will just create two buttons instead of one.
const oldTakePhotoWorkout = `        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white px-4 py-8 sm:py-12 rounded-2xl transition-all font-bold tracking-wide">
             <Camera className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
             <span className="text-gray-400 group-hover:text-white transition-colors">Tirar Foto para o Check de Treino</span>
          </button>
        )}`;

const newTakePhotoWorkout = `        ) : (
          <div className="flex gap-4 w-full">
            <button onClick={() => { fileInputRef.current!.removeAttribute('capture'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Galeria</span>
            </button>
            <button onClick={() => { fileInputRef.current!.setAttribute('capture', 'environment'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <Camera className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Câmera</span>
            </button>
          </div>
        )}`;

portal = portal.replace(oldTakePhotoWorkout, newTakePhotoWorkout);

// Also for DietPhotoShare
const oldTakePhotoDiet = `        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white px-6 py-8 rounded-2xl transition-all font-bold tracking-wide">
             <Camera className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
             <span className="text-gray-400 group-hover:text-white transition-colors">Tirar Foto da Refeição</span>
          </button>
        )}`;

const newTakePhotoDiet = `        ) : (
          <div className="flex gap-4 w-full">
            <button onClick={() => { fileInputRef.current!.removeAttribute('capture'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Galeria</span>
            </button>
            <button onClick={() => { fileInputRef.current!.setAttribute('capture', 'environment'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <Camera className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Câmera</span>
            </button>
          </div>
        )}`;
portal = portal.replace(oldTakePhotoDiet, newTakePhotoDiet);

fs.writeFileSync('src/views/StudentPortalView.tsx', portal);


// Apply same logic to CardioView.tsx
let cardio = fs.readFileSync('src/views/CardioView.tsx', 'utf8');
const oldTakePhotoCardio = `        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white px-6 py-8 rounded-2xl transition-all font-bold tracking-wide">
             <Camera className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
             <span className="text-gray-400 group-hover:text-white transition-colors">Tirar Foto da Paisagem / Cardio</span>
          </button>
        )}`;

const newTakePhotoCardio = `        ) : (
          <div className="flex gap-4 w-full">
            <button onClick={() => { fileInputRef.current!.removeAttribute('capture'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Galeria</span>
            </button>
            <button onClick={() => { fileInputRef.current!.setAttribute('capture', 'environment'); fileInputRef.current?.click(); }} className="flex-1 relative overflow-hidden group flex flex-col items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white p-6 rounded-2xl transition-all font-bold tracking-wide">
               <Camera className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
               <span className="text-gray-400 group-hover:text-white transition-colors text-center text-sm">Câmera</span>
            </button>
          </div>
        )}`;

cardio = cardio.replace(oldTakePhotoCardio, newTakePhotoCardio);
fs.writeFileSync('src/views/CardioView.tsx', cardio);
