const fs = require('fs');

let cardio = fs.readFileSync('src/views/CardioView.tsx', 'utf8');

// The replacement corrupted ShareImageModal return statement, it added it at the end of ShareImageModal itself
cardio = cardio.replace(
  /<ShareImageModal isOpen=\{modalData\.isOpen\}[^>]+>\s*<\/div>\s*\);\s*\}/g,
  '</div>\n  );\n}'
);

// wait the exact string was:
// </div>\n      <ShareImageModal isOpen={modalData.isOpen} onClose={() => setModalData(prev => ({...prev, isOpen: false}))} imageUrl={modalData.imageUrl} file={modalData.file} title={modalData.title} textContext={modalData.text} />\n    </div>\n  );\n}
cardio = cardio.replace(/<ShareImageModal isOpen=\{modalData\.isOpen\}[^>]+>\s*<\/div>\s*\);\s*\}/g, '</div>\n  );\n}');

// Also there is a problem at the end of CardioView where I replaced something. Let's just fix it by replacing the whole thing.
fs.writeFileSync('src/views/CardioView_temp.tsx', cardio);
