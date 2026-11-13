const fs = require('fs');

let dietas = fs.readFileSync('src/views/DietasView.tsx', 'utf8');

const regex = /const handleSuggestWater = \(\) => \{[\s\S]+?setTimeout\(\(\) => setShowSyncSuccess\(false\), 3000\);\n\s*\}\n\s*\};/;

const newWaterSuggestion = `const handleSuggestWater = () => {
    if (!latestEval || !selectedStudent) {
       alert("É necessário ter pelo menos uma avaliação física do aluno para calcular a hidratação.");
       return;
    }
    
    // Calcula ml/kg base a partir do nível de atividade
    const activityLevel = Number(selectedStudent.activityLevel) || 1.2;
    let mlPerKg = 35;
    if (activityLevel === 1.2) mlPerKg = 35;
    else if (activityLevel === 1.375) mlPerKg = 40;
    else if (activityLevel === 1.55) mlPerKg = 45;
    else if (activityLevel === 1.725) mlPerKg = 50;
    else if (activityLevel === 1.9) mlPerKg = 55;
    else mlPerKg = 40;

    let explanation = \`Cálculo base: \${mlPerKg}ml/kg (Nível de Atividade base).\\n\`;

    const weight = Number(latestEval.weight) || 0;
    if (weight === 0) {
      alert("Peso não preenchido na avaliação física.");
      return;
    }

    // Analisa Dieta (Proteína Alta)
    const currentProt = Number(proteins) || 0;
    const protPerKg = weight > 0 ? (currentProt / weight) : 0;
    if (protPerKg > 2.2) {
      mlPerKg += 5;
      explanation += \`\\n+5ml/kg pela dieta hiperproteica (\${protPerKg.toFixed(1)}g/kg).\`;
    }

    // Analisa Anamnese
    const anamnesis = selectedStudent.anamnesis;
    let extraWater = 0;
    if (anamnesis) {
       const lowerLifestyle = (anamnesis.lifestyle || "").toLowerCase();
       const lowerDietPrefs = (anamnesis.dietaryPreferences || "").toLowerCase();
       const lowerSups = (anamnesis.medications || "").toLowerCase();
       
       if (lowerLifestyle.includes('cafe') || lowerLifestyle.includes('café') || lowerDietPrefs.includes('cafe') || lowerDietPrefs.includes('café')) {
         extraWater += 300;
         explanation += \`\\n+300ml pelo consumo de café/cafeína relatado na Anamnese.\`;
       }
       if (lowerSups.includes('creatina')) {
         extraWater += 500;
         explanation += \`\\n+500ml pelo uso de Creatina relatado.\`;
       }
    }

    const calculatedWater = Math.round(weight * mlPerKg) + extraWater;
    
    explanation += \`\\n\\nPeso Atual: \${weight}kg\\nTotal Sugerido: \${calculatedWater}ml (\${(calculatedWater/1000).toFixed(1)} Litros)\`;

    alert(\`Cálculo Inteligente de Hidratação:\\n\\n\${explanation}\`);
    setWaterGoal(calculatedWater);
  };`;

if(dietas.match(regex)) {
   dietas = dietas.replace(regex, newWaterSuggestion);
} else {
   console.log("Could not match the specific regex. Trying a broader match.");
   const startStr = "const handleSuggestWater = () => {";
   const endStr = "  const handleAddReminder = () => {";
   if (dietas.indexOf(startStr) > -1 && dietas.indexOf(endStr) > -1) {
       const startIdx = dietas.indexOf(startStr);
       const endIdx = dietas.indexOf(endStr);
       dietas = dietas.substring(0, startIdx) + newWaterSuggestion + "\n\n" + dietas.substring(endIdx);
   } else {
       console.log("Still could not match.");
   }
}

dietas = dietas.replace('Refazer Cálculo e Salvar', 'Recalcular');
dietas = dietas.replace('Refazer Cálculo', 'Recalcular');

// Modify the label to include liters preview
dietas = dietas.replace(
  /<label className="text-\[10px\] text-\[#999\] uppercase tracking-\[1px\] font-\[600\]">\s*Meta Diária \(ml\)\s*<\/label>/,
  '<label className="text-[10px] text-[#999] uppercase tracking-[1px] font-[600]">Meta Diária / {(waterGoal / 1000).toFixed(1)} L</label>'
);

// We need a specific "Salvar e Atualizar" button for the hydration block
const hydrationBlockEndString = `<div className="space-y-[20px]">
                <div>
                  <div className="flex justify-between items-center mb-2">`;

const hydrationBlockSearchString = `                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={waterGoal}
                      onChange={(e) => setWaterGoal(Number(e.target.value))}
                      className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-[12px] py-[10px] text-white text-[15px] font-mono focus:outline-none focus:border-[#0A84FF] transition-all"
                    />
                    <span className="text-[11px] text-white/40 font-mono tracking-wider">
                      ml
                    </span>
                  </div>
                </div>`;

const updateButton = `                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={waterGoal}
                      onChange={(e) => setWaterGoal(Number(e.target.value))}
                      className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-[12px] py-[10px] text-white text-[15px] font-mono focus:outline-none focus:border-[#0A84FF] transition-all"
                    />
                    <span className="text-[11px] text-white/40 font-mono tracking-wider">
                      ml
                    </span>
                  </div>
                  <button 
                    onClick={handleSaveDiet} 
                    className="w-full mt-4 bg-[#0A84FF] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#0070E0] active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Salvar e Atualizar
                  </button>
                </div>`;

if (dietas.includes(hydrationBlockSearchString) && !dietas.includes("Salvar e Atualizar")) {
    dietas = dietas.replace(hydrationBlockSearchString, updateButton);
    console.log("Added Salvar e Atualizar");
} else {
    // If not found, log why
    console.log("Cannot add Salvar e Atualizar, search string missing or already there");
}

fs.writeFileSync('src/views/DietasView.tsx', dietas);
console.log("Updated dietasView file.");
