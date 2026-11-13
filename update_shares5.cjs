const fs = require('fs');

let portalContent = fs.readFileSync('src/views/StudentPortalView.tsx', 'utf8');

// ==== FeedbackAndShare Update ====
const feedbackOldShareLogic = `         let shared = false;
         if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
             try {
                 await navigator.share({
                     files: [file],
                     title: \`Meu \${context}\`,
                     text: \`Confira meu feedback de \${context}!\`
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
             alert('Feedback gerado! O download foi iniciado. Caso não funcione no seu aparelho, abra o app pelo Safari ou Chrome.');
         }`;

const feedbackNewShareLogic = `
         const blobUrl = URL.createObjectURL(blob);
         setModalData({ isOpen: true, imageUrl: blobUrl, file: file, title: \`Meu \${context}\`, text: \`Confira meu feedback de \${context}!\` });
`;

// Insert modal state in FeedbackAndShare
portalContent = portalContent.replace('const [isSharing, setIsSharing] = useState(false);', `const [isSharing, setIsSharing] = useState(false);\n  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});`);

portalContent = portalContent.replace(feedbackOldShareLogic, feedbackNewShareLogic);

portalContent = portalContent.replace('</button>\n           </div>\n        </div>\n\n        {/* Hidden UI for screenshot */}', `</button>\n           </div>\n        </div>\n\n        <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />\n\n        {/* Hidden UI for screenshot */}`);


// ==== DietPhotoShare Update ====
const dietOldShareLogic = `      let shared = false;
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
              await navigator.share({
                  files: [file],
                  title: \`Meu Cardápio\`,
                  text: \`Olha o meu cardápio de hoje!\`
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
          alert('Foto pronta! O download foi iniciado. Se não salvar automaticamente, certifique-se de acessar por um navegador principal (Chrome, Safari).');
      }`;

const dietNewShareLogic = `
      const blobUrl = URL.createObjectURL(blob);
      setModalData({ isOpen: true, imageUrl: blobUrl, file: file, title: \`Meu Cardápio\`, text: \`Olha o meu cardápio de hoje!\` });
`;

portalContent = portalContent.replace('const compositeRef = useRef<HTMLDivElement>(null);', `const compositeRef = useRef<HTMLDivElement>(null);\n  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});`);

portalContent = portalContent.replace(dietOldShareLogic, dietNewShareLogic);

portalContent = portalContent.replace('</button>\n            </div>\n          </div>\n        ) : (', `</button>\n            </div>\n            <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />\n          </div>\n        ) : (`);


// ==== WorkoutPhotoShare Update ====
const workoutOldShareLogic = `      let shared = false;
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
          alert('Foto pronta! O download foi iniciado. Se não salvar automaticamente, certifique-se de acessar por um navegador principal (Chrome, Safari).');
      }`;

const workoutNewShareLogic = `
      const blobUrl = URL.createObjectURL(blob);
      setModalData({ isOpen: true, imageUrl: blobUrl, file: file, title: \`Treino Concluído\`, text: '' });
`;

portalContent = portalContent.replace('const daysOfWeek = [\'SEG\', \'TER\', \'QUA\', \'QUI\', \'SEX\', \'SÁB\', \'DOM\'];', `const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];\n  const [modalData, setModalData] = useState<{isOpen: boolean, imageUrl: string, file: File | null, title: string, text: string}>({isOpen: false, imageUrl: '', file: null, title: '', text: ''});`);

portalContent = portalContent.replace(workoutOldShareLogic, workoutNewShareLogic);

portalContent = portalContent.replace('</button>\n            </div>\n          </div>\n        ) : (', `</button>\n            </div>\n            <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />\n          </div>\n        ) : (`);

fs.writeFileSync('src/views/StudentPortalView.tsx', portalContent);
console.log('Done mapping components Portal!');
