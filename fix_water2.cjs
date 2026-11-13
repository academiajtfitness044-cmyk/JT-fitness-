const fs = require('fs');

let dietas = fs.readFileSync('src/views/DietasView.tsx', 'utf8');

const regex = /const handleSuggestWater = \(\) => \{[\s\S]+?setTimeout\(\(\) => handleSaveDiet\(\), 100\);\n\s*\}\n\s*\};/;

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

    let explanation = \`Cálculo base: \${mlPerKg}ml/kg (Nível de Atividade base).\n\`;

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
      explanation += \`\n+5ml/kg pela dieta hiperproteica (\${protPerKg.toFixed(1)}g/kg).\`;
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
         explanation += \`\n+300ml pelo consumo de café/cafeína relatado na Anamnese.\`;
       }
       if (lowerSups.includes('creatina')) {
         extraWater += 500;
         explanation += \`\n+500ml pelo uso de Creatina relatado.\`;
       }
    }

    const calculatedWater = Math.round(weight * mlPerKg) + extraWater;
    
    explanation += \`\n\nPeso Atual: \${weight}kg\nTotal Sugerido: \${calculatedWater}ml\`;

    if (window.confirm(\`Cálculo Inteligente de Hidratação:\\n\\n\${explanation}\\n\\nAplicar este valor e salvar dieta?\`)) {
       setWaterGoal(calculatedWater);
       
       updateDietPlan(selectedStudent.id, {
         targetCalories: targetCaloriesGoal || totalCals,
         targetProtein: proteins,
         targetCarbs: carbs,
         targetFats: fats,
         meals: localMeals,
         supplements: localSupplements,
         waterIntakeGoal: calculatedWater,
         waterReminders: waterReminders,
         currentWaterIntake: waterCurrent,
       });
       setShowSyncSuccess(true);
       setTimeout(() => setShowSyncSuccess(false), 3000);
    }
  };`;

dietas = dietas.replace(regex, newWaterSuggestion);
fs.writeFileSync('src/views/DietasView.tsx', dietas);
console.log("Updated handleSuggestWater");
