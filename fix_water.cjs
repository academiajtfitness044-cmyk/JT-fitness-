const fs = require('fs');
let dietas = fs.readFileSync('src/views/DietasView.tsx', 'utf8');

const newWaterSuggestion = `  const handleSuggestWater = () => {
    if (!latestEval || !selectedStudent) return;
    
    // Calcula ml/kg base a partir do nível de atividade
    let mlPerKg = 35;
    if (selectedStudent.activityLevel === 1.2) mlPerKg = 35;
    else if (selectedStudent.activityLevel === 1.375) mlPerKg = 40;
    else if (selectedStudent.activityLevel === 1.55) mlPerKg = 45;
    else if (selectedStudent.activityLevel === 1.725) mlPerKg = 50;
    else if (selectedStudent.activityLevel === 1.9) mlPerKg = 55;
    else mlPerKg = 40;

    let explanation = \`Cálculo base: \${mlPerKg}ml/kg (Nível de Atividade base).\n\`;

    // Analisa Dieta (Proteína Alta)
    const protPerKg = proteins / latestEval.weight;
    if (protPerKg > 2.2) {
      mlPerKg += 5;
      explanation += \`\n+5ml/kg pela dieta hiperproteica (\${protPerKg.toFixed(1)}g/kg).\`;
    }

    // Analisa Anamnese
    const anamnesis = selectedStudent.anamnesis;
    let extraWater = 0;
    if (anamnesis) {
       const lowerLifestyle = (anamnesis.lifestyle || "").toLowerCase();
       const lowerDietPrefs = (anamnesis.dietaryPreferences || "").toLowerCase();
       const lowerSups = (anamnesis.medications || "").toLowerCase(); // supplements might be in medications
       
       if (lowerLifestyle.includes('cafe') || lowerLifestyle.includes('café') || lowerDietPrefs.includes('cafe') || lowerDietPrefs.includes('café')) {
         extraWater += 300;
         explanation += \`\n+300ml pelo consumo de café/cafeína relatado na Anamnese.\`;
       }
       if (lowerSups.includes('creatina')) {
         extraWater += 500;
         explanation += \`\n+500ml pelo uso de Creatina relatado.\`;
       }
    }

    const calculatedWater = Math.round(latestEval.weight * mlPerKg) + extraWater;
    
    explanation += \`\n\nPeso Atual: \${latestEval.weight}kg\nTotal Sugerido: \${calculatedWater}ml\`;

    if (window.confirm(\`Cálculo Inteligente de Hidratação:\\n\\n\${explanation}\\n\\nAplicar este valor e salvar dieta?\`)) {
       setWaterGoal(calculatedWater);
       // Save diet right away if confirmed
       setTimeout(() => handleSaveDiet(), 100);
    }
  };`;

dietas = dietas.replace(
  /const handleSuggestWater = \(\) => \{\s*if \(!latestEval\) return;\s*\/\/ Suggestion: 35ml per kg\s*setWaterGoal\(Math\.round\(latestEval\.weight \* 35\)\);\s*\};/g,
  newWaterSuggestion
);

// Mudar o texto do botão "Sugerir p/ Peso" para "Refazer Cálculo"
dietas = dietas.replace('Sugerir p/ Peso', 'Refazer Cálculo e Salvar');

fs.writeFileSync('src/views/DietasView.tsx', dietas);
console.log("Water logic updated");
