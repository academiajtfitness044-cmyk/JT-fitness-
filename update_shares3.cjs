const fs = require('fs');

function applyShareFix() {
  const portalPath = 'src/views/StudentPortalView.tsx';
  let portalContent = fs.readFileSync(portalPath, 'utf8');

  // Insert ShareImageModal before FeedbackAndShare
  const shareModalCode = `
function ShareImageModal({ 
  isOpen, 
  onClose, 
  imageUrl, 
  file, 
  title, 
  textContext 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  imageUrl: string, 
  file: File | null, 
  title: string, 
  textContext?: string 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm shadow-2xl">
      <div className="bg-[#0a0a0f] border border-dark-border rounded-3xl p-6 w-full max-w-[360px] flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.8)] relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-2">
            X
        </button>
        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider text-center">Tudo Pronto!</h3>
        <div className="w-full relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_0_20px_rgba(0,255,133,0.1)] mb-6 max-h-[50vh] flex items-center justify-center bg-black">
           <img src={imageUrl} alt="Sua imagem" className="w-full h-full object-contain" />
        </div>
        
        <p className="text-[13px] text-gray-400 mb-6 text-center leading-relaxed">
           Pressione no botão abaixo para compartilhar.<br/><br/>Se quiser salvar e o botão falhar ou não aparecer o instagram, <span className="text-white font-bold">pressione e segure o dedo em cima da imagem</span> para baixar na galeria.
        </p>

        <button 
          onClick={async () => {
             if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                 try {
                     await navigator.share({ files: [file], title, text: textContext });
                 } catch(err) {
                     console.log("Share cancelled or failed", err);
                 }
             } else {
                 const a = document.createElement('a');
                 a.href = imageUrl;
                 a.download = file ? file.name : 'imagem.jpg';
                 a.click();
             }
          }}
          className="w-full bg-primary text-[#0c0c0e] font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg"
        >
          <Share2 className="w-5 h-5" /> COMPARTILHAR
        </button>
      </div>
    </div>
  );
}
`;

  if (!portalContent.includes('function ShareImageModal')) {
    portalContent = portalContent.replace('function FeedbackAndShare', shareModalCode + '\nfunction FeedbackAndShare');
  }

  fs.writeFileSync(portalPath, portalContent);
}

applyShareFix();
console.log('Done injecting modal');
