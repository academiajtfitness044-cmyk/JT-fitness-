const fs = require('fs');

function fixSharing(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace fallback logic in FeedbackAndShare
  content = content.replace(
    /if \(\!\s*shared\) \{\s*const url = URL\.createObjectURL\(blob\);\s*const a = document\.createElement\('a'\);\s*a\.href = url;\s*a\.download = file\.name;\s*document\.body\.appendChild\(a\);\s*a\.click\(\);\s*document\.body\.removeChild\(a\);\s*URL\.revokeObjectURL\(url\);\s*alert\('Feedback enviado e imagem salva no seu dispositivo!'\);\s*\}/g,
    `if (!shared) {
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = file.name;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             alert('Feedback gerado! O download foi iniciado. Caso não funcione no seu aparelho, abra o app pelo Safari ou Chrome.');
         }`
  );
  
  // Replace fallback logic for Foto pronta! 
  content = content.replace(
    /if \(\!\s*shared\) \{\s*const url = URL\.createObjectURL\(blob\);\s*const a = document\.createElement\('a'\);\s*a\.href = url;\s*a\.download = file\.name;\s*document\.body\.appendChild\(a\);\s*a\.click\(\);\s*document\.body\.removeChild\(a\);\s*URL\.revokeObjectURL\(url\);\s*alert\('Foto pronta! A imagem foi salva no seu dispositivo\.'\);\s*\}/g,
    `if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          alert('Foto pronta! O download foi iniciado. Se não salvar automaticamente, certifique-se de acessar por um navegador principal (Chrome, Safari).');
      }`
  );

  fs.writeFileSync(filePath, content);
}

fixSharing('src/views/StudentPortalView.tsx');
fixSharing('src/views/CardioView.tsx');
console.log('Fixed sharing alerts');
