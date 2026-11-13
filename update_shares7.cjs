const fs = require('fs');

let cardioContent = fs.readFileSync('src/views/CardioView.tsx', 'utf8');

// Insert modal state in CardioView
cardioContent = cardioContent.replace('const [mapError, setMapError] = useState<string | null>(null);', `const [mapError, setMapError] = useState<string | null>(null);\n  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});`);

// Update logic
const cardioViewOldShareLogic = `      let shared = false;
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Meu treino',
                    text: 'Confira meu treino!'
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
            alert('Compartilhamento não suportado pelo navegador, imagem salva no dispositivo!');
        }`;

const cardioViewNewShareLogic = `
        const blobUrl = URL.createObjectURL(blob);
        setModalData({ isOpen: true, imageUrl: blobUrl, file: file, title: 'Meu treino', text: 'Confira meu treino!' });
`;

cardioContent = cardioContent.replace(cardioViewOldShareLogic, cardioViewNewShareLogic);

// Add Modal component block to the end of return in CardioView
cardioContent = cardioContent.replace('</div>\n    </div>\n  );\n}', `</div>\n      <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />\n    </div>\n  );\n}`);

fs.writeFileSync('src/views/CardioView.tsx', cardioContent);
console.log('Done mapping CardioView component!');
