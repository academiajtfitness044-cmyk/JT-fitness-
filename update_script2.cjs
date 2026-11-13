const fs = require('fs');
let content = fs.readFileSync('src/views/StudentPortalView.tsx', 'utf8');

const startStr = 'function WorkoutPhotoShare() {';
const endStr = '\nfunction AnamnesisForm({';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newFunction = `function WorkoutPhotoShare() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [checkedDays, setCheckedDays] = useState<boolean[]>(Array(7).fill(false));
  const compositeRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  const toggleDay = (index: number) => {
    const newDays = [...checkedDays];
    newDays[index] = !newDays[index];
    setCheckedDays(newDays);
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareComposite = async () => {
    if (!compositeRef.current) return;
    setIsSharing(true);
    try {
      const dataUrl = await toJpeg(compositeRef.current, {
        quality: 0.95,
        pixelRatio: 3
      });
      
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      
      if (!blob) throw new Error('Não foi possível gerar a imagem.');
      
      const file = new File([blob], 'treino_concluido.jpg', { type: 'image/jpeg' });
      
      let shared = false;
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
              await navigator.share({
                  files: [file],
                  title: \`Treino Concluído\`,
              });
              shared = true;
          } catch(err) {
              console.log("Share failed", err);
          }
      }
      
      if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert('Foto pronta! A imagem foi salva no seu dispositivo.');
      }
    } catch(err) {
      alert('Erro ao compartilhar foto: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="mt-8 border-t border-dark-border pt-8">
      <div className="bg-dark-card border border-dark-border p-6 rounded-[24px]">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
           <Camera className="w-5 h-5 text-primary" /> Compartilhar Check de Treino
        </h3>
        <p className="text-sm text-gray-400 mb-6">Tire uma foto (ou escolha uma) para renderizar a checagem com os dias da semana, nas cores do protocolo, e compartilhar no seu Instagram Story ou WhatsApp Status!</p>
        
        {photoUrl ? (
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-3 bg-[#0a0a0f] p-4 rounded-xl border border-dark-border">
               <label className="text-sm font-bold text-white flex items-center gap-2">
                 <Check className="w-4 h-4 text-primary"/> Dias de Treino na Semana:
               </label>
               <p className="text-[12px] text-gray-400">Clique na área da imagem abaixo, diretamente nos dias, para marcar ou desmarcar livremente conforme o seu progresso da semana.</p>
            </div>
            
            <div className="w-full max-w-[400px] mx-auto">
              {/* Added responsive wrapper to display correctly scaled down on mobile but preserve 9:16 layout logic */}
              <div 
                className="relative overflow-hidden w-full bg-[#050505] rounded-[32px] border-[1px] border-primary/20 shadow-[0_0_30px_rgba(0,255,133,0.1)] flex" 
                ref={compositeRef} 
                style={{ aspectRatio: '9/16' }}
              >
                {/* Photo Background */}
                <img src={photoUrl} className="absolute inset-0 w-full h-full object-cover" alt="Foto do Treino" />
                
                {/* Overlay gradients to make text pop */}
                <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
                
                {/* Text: TREINO BOM É TREINO FEITO */}
                <div className="absolute top-12 left-6 sm:top-14 sm:left-7 flex flex-col justify-start z-10 pointer-events-none">
                   <span className="text-white font-black text-4xl sm:text-[2.8rem] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase italic leading-[1]">TREINO</span>
                   <div className="flex items-baseline gap-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                      <span className="text-[#00d1ff] font-black text-4xl sm:text-[2.8rem] uppercase italic leading-[1]">BOM</span>
                      <span className="text-[#00d1ff] font-[800] text-xl sm:text-[1.4rem] italic pl-1">é treino</span>
                   </div>
                   <span className="text-white font-black text-4xl sm:text-[2.8rem] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase italic leading-[1]">FEITO</span>
                </div>

                {/* Days of Week Filter List */}
                <div className="absolute bottom-[20%] right-6 sm:right-7 flex flex-col items-start border-l-[3px] border-white/95 pl-3 sm:pl-4 gap-[10px] sm:gap-3 z-10">
                  {daysOfWeek.map((day, idx) => {
                    const isChecked = checkedDays[idx];
                    return (
                       <div key={day} onClick={() => toggleDay(idx)} className="flex items-center gap-2 sm:gap-4 cursor-pointer group active:scale-95 transition-transform w-[110px] sm:w-[140px] justify-between">
                         <span className="text-white font-black text-[22px] sm:text-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,1)] leading-none">{day}</span>
                         <div className={\`w-6 h-6 sm:w-8 sm:h-8 rounded-[6px] sm:rounded-lg flex flex-shrink-0 items-center justify-center transition-all \${isChecked ? 'bg-[#00d1ff] shadow-[0_0_15px_rgba(0,209,255,0.8)] border-none' : 'bg-black/40 border-[2px] border-white/40 backdrop-blur-sm'}\`}>
                            {isChecked && <Check className="w-4 h-4 sm:w-6 sm:h-6 text-black stroke-[4]" />}
                         </div>
                       </div>
                    );
                  })}
                </div>

                {/* Logo bottom left */}
                <div className="absolute bottom-6 left-6 z-10 flex flex-col drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                  <span className="text-[#00d1ff] font-black tracking-widest text-[13px] sm:text-[16px] italic leading-tight uppercase font-mono">PROTOCOLO</span>
                  <span className="text-white font-black tracking-tighter text-[18px] sm:text-[24px] italic leading-none uppercase font-mono">P.A.P</span>
                </div>

              </div>
            </div>
            
            <div className="flex gap-2 justify-center mt-2 max-w-[400px] mx-auto w-full">
               <button onClick={() => setPhotoUrl(null)} className="py-4 px-4 rounded-xl border border-white/10 font-bold text-white hover:bg-white/5 transition-colors text-sm text-center">
                  Outra Foto
               </button>
               <button onClick={handleShareComposite} disabled={isSharing} className="bg-primary text-[#0c0c0e] font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors text-sm disabled:opacity-50 flex-1 uppercase tracking-wider">
                  {isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Instagram className="w-5 h-5" />}
                  Compartilhar
               </button>
            </div>
          </div>
        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-dark-bg border-2 border-dashed border-dark-border hover:border-primary/50 text-white px-4 py-8 sm:py-12 rounded-2xl transition-all font-bold tracking-wide">
             <Camera className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
             <span className="text-gray-400 group-hover:text-white transition-colors">Tirar Foto para o Check de Treino</span>
          </button>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleCapture}
        />
      </div>
    </div>
  );
}`;
  
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  
  fs.writeFileSync('src/views/StudentPortalView.tsx', before + newFunction + after);
  console.log('Replaced successfully.');
} else {
  console.error('Could not find markers.', { startIndex, endIndex });
}
