import { useState, useMemo, useEffect } from "react";
import {
  Utensils,
  Save,
  AlertCircle,
  RefreshCw,
  Copy,
  CheckCircle2,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  CheckSquare,
  Bookmark,
  Download,
  Wand2,
  Loader2,
  Droplets,
  Bell,
  Trash2 as Trash,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  useAppContext,
  Student,
  Meal,
  DietPlan,
  Food,
  MealTemplate,
  Supplement,
} from "../context/AppContext";
import { GoogleGenAI, Type } from "@google/genai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { searchFoods, getFoodById, type FoodDatabaseItem } from "../services/foodService";
import { FOOD_DATABASE } from "../data/foodDatabase";
import { motion, AnimatePresence } from "motion/react";

export function DietasView() {
  const {
    students,
    updateDietPlan,
    deleteDietPlan,
    updateStudent,
    mealTemplates,
    addMealTemplate,
    deleteMealTemplate,
  } = useAppContext();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [includeSupplements, setIncludeSupplements] = useState(false);
  const [isLowCostMode, setIsLowCostMode] = useState(false);
  const [isReadyMeals, setIsReadyMeals] = useState(false);
  const [isFlexibleDiet, setIsFlexibleDiet] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [studentToSendTo, setStudentToSendTo] = useState<string>("");
  const [showAIFoodsSelector, setShowAIFoodsSelector] = useState(false);
  const [selectedFoodIds, setSelectedFoodIds] = useState<string[]>(() =>
    FOOD_DATABASE.map((f) => f.id)
  );

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) || null,
    [students, selectedStudentId],
  );

  const latestEval = useMemo(() => {
    const evals = selectedStudent?.evaluations || [];
    if (evals.length === 0) return null;
    return evals[evals.length - 1];
  }, [selectedStudent]);

  const isEvalOudated = useMemo(() => {
    if (!latestEval) return false;
    const diffTime = Math.abs(Date.now() - new Date(latestEval.date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30;
  }, [latestEval]);

  // Diet state
  const [proteins, setProteins] = useState(150);
  const [carbs, setCarbs] = useState(200);
  const [fats, setFats] = useState(60);
  const [targetCaloriesGoal, setTargetCaloriesGoal] = useState(0);
  const [bmrProtocol, setBmrProtocol] = useState<"katch" | "manual">("katch");
  const [manualBmr, setManualBmr] = useState(0);
  const [suggestedWater, setSuggestedWater] = useState<number | null>(null);
  const [localMeals, setLocalMeals] = useState<Meal[]>([]);
  const [localSupplements, setLocalSupplements] = useState<Supplement[]>([]);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>(
    {},
  );
  const [waterGoal, setWaterGoal] = useState(2500);
  const [waterReminders, setWaterReminders] = useState<string[]>([]);
  const [waterCurrent, setWaterCurrent] = useState(0);
  const [newReminderTime, setNewReminderTime] = useState("08:00");

  // Editor states
  const [addingFoodToMeal, setAddingFoodToMeal] = useState<string | null>(null);
  const [newFood, setNewFood] = useState({
    name: "",
    quantity: "100",
    kcals: "0",
    protein: "0",
    carbs: "0",
    fats: "0",
    kitchenMeasure: "",
  });
  const [addingSupplement, setAddingSupplement] = useState(false);
  const [newSupplement, setNewSupplement] = useState({
    name: "",
    dosage: "",
    time: "",
    kcals: "0",
    protein: "0",
    carbs: "0",
    fats: "0",
  });
  const [searchResults, setSearchResults] = useState<FoodDatabaseItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);

  useEffect(() => {
    if (selectedStudent?.dietPlan) {
      setProteins(selectedStudent.dietPlan.targetProtein);
      setCarbs(selectedStudent.dietPlan.targetCarbs);
      setFats(selectedStudent.dietPlan.targetFats);
      setTargetCaloriesGoal(selectedStudent.dietPlan.targetCalories || 0);
      setLocalMeals(selectedStudent.dietPlan.meals || []);
      setLocalSupplements(selectedStudent.dietPlan.supplements || []);
      
      // Auto-calculate water based on weight if not manually set
      const calcWater = latestEval?.weight ? Math.round(latestEval.weight * 35) : 2500;
      setWaterGoal(selectedStudent.dietPlan.waterIntakeGoal || calcWater);
      
      setWaterReminders(selectedStudent.dietPlan.waterReminders || []);
      setWaterCurrent(selectedStudent.dietPlan.currentWaterIntake || 0);
    } else {
      setProteins(0);
      setCarbs(0);
      setFats(0);
      setTargetCaloriesGoal(0);
      setLocalMeals([]);
      setLocalSupplements([]);
      setWaterGoal(latestEval?.weight ? Math.round(latestEval.weight * 35) : 2500);
      setWaterReminders([]);
      setWaterCurrent(0);
    }
  }, [selectedStudentId, selectedStudent?.dietPlan]);

  // Keep water goal in sync when weight changes (if student gets a new evaluation)
  useEffect(() => {
    if (latestEval?.weight) {
      setWaterGoal(Math.round(latestEval.weight * 35));
    }
  }, [latestEval?.weight]);

  const tmb = useMemo(() => {
    if (
      !selectedStudent ||
      !latestEval ||
      !latestEval.weight ||
      !latestEval.height
    )
      return 0;
    const weight = latestEval.weight;
    const height = latestEval.height;
    const age = selectedStudent.age || 25;
    const gender = selectedStudent.gender || "M";
    const heightCm = height * 100;
    const leanMass = latestEval.metrics?.leanMass || 0;

    if (bmrProtocol === "manual") {
      return manualBmr;
    }

    // Default to Katch-McArdle since it is the only dynamic one now
    if (leanMass && leanMass > 0) {
      // Katch-McArdle: 370 + (21.6 * Lean Body Mass in kg)
      return 370 + 21.6 * leanMass;
    }

    // Fallback to a basic estimate using Harris-Benedict revised if leanMass is missing or 0 but keep protocol as "katch" internally or "fallback"
    let base = 10 * weight + 6.25 * heightCm - 5 * age;
    return gender === "M" ? base + 5 : base - 161;
  }, [selectedStudent, latestEval, bmrProtocol, manualBmr]);

  const isKatchLeanMassMissing = useMemo(() => {
    return (
      bmrProtocol === "katch" &&
      (!latestEval?.metrics?.leanMass || latestEval.metrics?.leanMass <= 0)
    );
  }, [bmrProtocol, latestEval]);

  const get = useMemo(() => {
    if (!selectedStudent || tmb === 0) return 0;
    return tmb * selectedStudent.activityLevel;
  }, [selectedStudent, tmb]);

  const totalCals = proteins * 4 + carbs * 4 + fats * 9;

  const currentIntake = useMemo(() => {
    let kcals = 0,
      protein = 0,
      carbs = 0,
      fats = 0;
    localMeals.forEach((meal) => {
      if (meal.foods) {
        meal.foods.forEach((food) => {
          kcals += food.kcals || 0;
          protein += food.protein || 0;
          carbs += food.carbs || 0;
          fats += food.fats || 0;
        });
      }
    });

    // Sum Supplements too
    localSupplements.forEach((sup) => {
      kcals += sup.kcals;
      protein += sup.protein;
      carbs += sup.carbs;
      fats += sup.fats;
    });

    return { kcals, protein, carbs, fats };
  }, [localMeals, localSupplements]);

  const macroData = useMemo(
    () => [
      {
        name: "Proteínas",
        value: currentIntake.protein * 4,
        grams: currentIntake.protein,
        color: "#3b82f6",
      },
      {
        name: "Carboidratos",
        value: currentIntake.carbs * 4,
        grams: currentIntake.carbs,
        color: "#22c55e",
      },
      {
        name: "Gorduras",
        value: currentIntake.fats * 9,
        grams: currentIntake.fats,
        color: "#eab308",
      },
    ],
    [currentIntake],
  );

  const targetMacroData = useMemo(
    () => [
      {
        name: "Proteínas",
        value: proteins * 4,
        grams: proteins,
        color: "#3b82f6",
      },
      {
        name: "Carboidratos",
        value: carbs * 4,
        grams: carbs,
        color: "#22c55e",
      },
      { name: "Gorduras", value: fats * 9, grams: fats, color: "#eab308" },
    ],
    [proteins, carbs, fats],
  );

  const [activeChart, setActiveChart] = useState<"current" | "target">(
    "current",
  );
  const [expandedFoods, setExpandedFoods] = useState<Record<string, boolean>>({});

  const toggleFoodExpansion = (foodId: string) => {
    setExpandedFoods(prev => ({
      ...prev,
      [foodId]: !prev[foodId]
    }));
  };

  const handleAutoCalculate = () => {
    if (!selectedStudent || !latestEval) return;
    const { weight } = latestEval;
    const targetCals =
      selectedStudent.objective === "Hipertrofia"
        ? get + 300
        : selectedStudent.objective === "Emagrecimento"
          ? get - 500
          : get;

    // Base macros approach
    const newProt = Math.round(weight * 2.2); // 2.2g/kg
    const newFats = Math.round(weight * 0.8); // 0.8g/kg
    const remainingCals = targetCals - (newProt * 4 + newFats * 9);
    const newCarbs = Math.max(0, Math.round(remainingCals / 4));

    setProteins(newProt);
    setFats(newFats);
    setCarbs(newCarbs);
    setTargetCaloriesGoal(Math.round(targetCals));
  };

    const handleCalculateWater = () => {
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

    const weight = Number(latestEval.weight) || 0;
    if (weight === 0) {
      alert("Peso não preenchido na avaliação física.");
      return;
    }

    // Analisa Dieta (Proteína Alta)
    const currentProt = Number(proteins) || 0;
    const protPerKg = weight > 0 ? (currentProt / weight) : 0;
    let extraWater = 0;
    if (protPerKg > 2.2) {
      mlPerKg += 5;
    }

    // Analisa Anamnese
    const anamnesis = selectedStudent.anamnesis;
    if (anamnesis) {
       const lowerLifestyle = (anamnesis.lifestyle || "").toLowerCase();
       const lowerDietPrefs = (anamnesis.dietaryPreferences || "").toLowerCase();
       const lowerSups = (anamnesis.medications || "").toLowerCase();
       
       if (lowerLifestyle.includes('cafe') || lowerLifestyle.includes('café') || lowerDietPrefs.includes('cafe') || lowerDietPrefs.includes('café')) {
         extraWater += 300;
       }
       if (lowerSups.includes('creatina')) {
         extraWater += 500;
       }
    }

    const calculatedWater = Math.round(weight * mlPerKg) + extraWater;
    
    setSuggestedWater(calculatedWater);
  };

  const handleAddReminder = () => {
    if (!waterReminders.includes(newReminderTime)) {
      setWaterReminders([...waterReminders, newReminderTime].sort());
    }
  };

  const handleRemoveReminder = (time: string) => {
    setWaterReminders(waterReminders.filter((t) => t !== time));
  };

  const handleAddWater = (amount: number) => {
    setWaterCurrent((prev) => Math.max(0, prev + amount));
  };

  const ai = useMemo(() => {
    // Vite's 'define' replacement requires the exact string process.env.GEMINI_API_KEY
    let key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      console.warn(
        "GEMINI_API_KEY não detectada em DietasView. Tentando obter localmente...",
      );
      key = localStorage.getItem("GEMINI_API_KEY_TEMP") || "";
    }
    return new GoogleGenAI({ apiKey: key });
  }, []);

  const handleSendPlan = () => {
    if (!studentToSendTo) {
        alert("Selecione um aluno para receber a dieta.");
        return;
    }
    const targetStudent = students.find(s => s.id === studentToSendTo);
    if (!targetStudent) {
        alert("Aluno não encontrado.");
        return;
    }
    
    // Check if there is anything to send
    if (localMeals.length === 0) {
        alert("Nenhuma dieta atual para enviar.");
        return;
    }
    
    // construct current plan
    const currentPlan: DietPlan = {
      targetCalories: targetCaloriesGoal,
      targetProtein: proteins,
      targetCarbs: carbs,
      targetFats: fats,
      meals: localMeals,
      supplements: localSupplements
    };

    // clone deeply
    const clonedPlan: DietPlan = JSON.parse(JSON.stringify(currentPlan));
    
    // generate new IDs for the plan structure so it doesn't collide
    clonedPlan.meals = clonedPlan.meals.map(meal => ({
        ...meal,
        id: crypto.randomUUID(),
        foods: meal.foods.map(f => ({
            ...f,
            id: crypto.randomUUID()
        }))
    }));

    updateDietPlan(targetStudent.id, clonedPlan);
    
    setSendModalOpen(false);
    setStudentToSendTo("");
    alert(`Dieta enviada com sucesso para ${targetStudent.name}!`);
  };

  const handleGenerateAIDiet = async () => {
    if (!selectedStudent || !latestEval) {
      alert("Selecione um aluno com avaliação física para gerar a dieta.");
      return;
    }

    setIsGeneratingAI(true);
    try {
      const currentKey = process.env.GEMINI_API_KEY;
      if (!currentKey) {
        throw new Error(
          "Chave GEMINI_API_KEY não configurada no ambiente. Geração de dieta cancelada.",
        );
      }

      const currentAi = new GoogleGenAI({ apiKey: currentKey });

      // Extract specific context from FOOD_DATABASE to guide the AI
      const allowedFoods = FOOD_DATABASE.filter(f => selectedFoodIds.includes(f.id));
      if (allowedFoods.length === 0) {
        alert("Selecione pelo menos um alimento nas configurações de ingredientes antes de gerar a dieta.");
        setIsGeneratingAI(false);
        return;
      }
      const foodContext = allowedFoods.map(f => `${f.name} (Cat: ${f.category}) - ${f.kcals}kcal/100g [P:${f.protein}g C:${f.carbs}g G:${f.fats}g]`).join('\n');

      // Combine student info
      const anamnesis = selectedStudent.anamnesis || {};
      const anamnesisText = `DADOS DE ANAMNESE:
      Histórico Médico: ${anamnesis.medicalHistory || "N/A"}
      Medicamentos: ${anamnesis.medications || "N/A"}
      Lesões: ${anamnesis.injuries || "N/A"}
      Estilo de Vida: ${anamnesis.lifestyle || "N/A"}
      Qualidade do Sono: ${anamnesis.sleepQuality || "N/A"}
      Digestão: ${anamnesis.digestion || "N/A"}
      Preferências Alimentares: ${anamnesis.dietaryPreferences || "N/A"}
      Alergias: ${anamnesis.allergies || "N/A"}`;

      // AI Shape Analyses (sorted by newest first usually, so grab [0])
      const shapeAnalysesInfo = selectedStudent.aiAnalyses && selectedStudent.aiAnalyses.length > 0 
        ? `Última análise de shape feita pela IA (Avaliação por Foto): ${selectedStudent.aiAnalyses[0].report}`
        : "Sem avaliação por foto cadastrada.";

      const prompt = `Você é um COACH DE FISICULTURISMO e NUTRICIONISTA ESPORTIVO DE ELITE (estilo Hany Rambod, Chris Aceto ou grandes profissionais brasileiros).
      Seu objetivo é gerar um protocolo dietético de alta performance focado em estética extrema (hipertrofia ou cutting severo).
      
      BASE DE DADOS OBRIGATÓRIA (Use APENAS os itens abaixo para compor as refeições):
      ${foodContext}
      
      IMPORTANTE: Use os valores nutricionais EXATOS da lista acima para seus cálculos. Não use dados externos.
      Se precisar de um alimento que não está na lista, use o mais próximo possível.
      
      PERFIL DO ATLETA:
      Nome: ${selectedStudent.name}
      Idade: ${selectedStudent.age} anos
      Gênero: ${selectedStudent.gender === "M" ? "Masculino" : "Feminino"}
      Peso: ${latestEval.weight} kg
      Altura: ${latestEval.height} m
      BF Estimado: ${latestEval.metrics?.bf || 'N/A'}%
      Massa Magra Estimada: ${latestEval.metrics?.leanMass || 'N/A'} kg
      Nível de Atividade: ${selectedStudent.activityLevel}
      OBJETIVO: ${selectedStudent.objective}
      
      ${anamnesisText}
      
      ${shapeAnalysesInfo}
      
      Observações do Aluno: ${selectedStudent.observations || "N/A"}
      Feedback recente de Dieta/Treino do aluno: ${selectedStudent.feedback || "N/A"}
      
      METAS MACRO DIÁRIAS (Aproxime-se ao máximo destes valores na soma de todas as refeições):
      - Calorias: ${targetCaloriesGoal > 0 ? targetCaloriesGoal : Math.round(totalCals)} kcal
      - Proteínas: ${proteins}g
      - Carboidratos: ${carbs}g
      - Gorduras: ${fats}g
      
      DIRETRIZES DE EXCELÊNCIA GASTRONÔMICA E NUTRICIONAL (MUITO IMPORTANTE):
      1. DIETA DETALHADAMENTE EXPLICADA E ORGANIZADA: Nada de listas secas e repetitivas. Para cada refeição, explique detalhadamente na propriedade "observations" o propósito dela (ex: Pré-treino imediato para estoque de glicogênio, Ceia para liberação lenta de aminoácidos à noite, etc.), o horário sugerido em "time", e como consumir.
      2. REFEIÇÕES ELABORADAS E SABOROSAS (NÃO REPETITIVAS): Não mande o atleta comer frango com arroz seco 5 vezes ao dia. Combine os ingredientes de maneira atrativa e inteligente em cada refeição!
         - Exemplo de Lanches: Se os macros incluírem Pão Integral, Peito de Frango e Queijo, apresente-os combinados na refeição e, nas "observations", explique detalhadamente como montar um delicioso "Sanduíche de Frango Desfiado com Queijo Grelhado e temperos saudáveis na Sanduicheira/Frigideira".
         - Exemplo de Café da Manhã/Lanche: Combine ovos, aveia, banana, mel ou whey em uma deliciosa "Panqueca de Aveia e Whey com fatias de Banana e fio de Mel" ou "Omelete super cremosa recheada com queijo e tomate ao lado de uma porção de frutas picadas". Explique o preparo passo-a-passo no campo "observations".
         - Exemplo de Almoço/Jantar: Combine arroz, feijão, patinho moído, azeite e vegetais em um prato completo e ensine a temperar de maneira maravilhosa e saudável (alho, cebola, ervas finas, limão, sal moderado).
      3. VARIABILIDADE DE FONTES: Evite repetir a mesma fonte proteica ou de carboidratos em todas as refeições seguidas. Varie entre carne bovina moída magra (patinho), ovos, peito de frango, whey protein, iogurte, queijo, peixes, arroz, pão integral, tapioca, aveia, batata doce, de acordo com o que estiver disponível na nossa Base de Dados permitida.
      4. INGREDIENTES E MEDIDAS CASEIRAS IMPECÁVEIS:
         - A propriedade "kitchenMeasure" para cada alimento DEVE ser extremamente precisa, prática e visual para quem não tem balança. Exemplos: "Equivalente a 2 fatias de pão integral", "Aprox. 1 colher de sopa cheia (15g)", "1 xícara de chá cheia de arroz cozido (150g)", "1 filé de frango médio (120g)", "1 banana média fatiada".
      5. DIETA FLEXÍVEL E SUBSTITUIÇÕES (FLEXIBILIDADE ABSOLUTA):
         - Explique claramente nas "observations" como o aluno pode substituir cada macronutriente de forma flexível de acordo com seus macros (ex: "Se quiser variar o carboidrato, você pode trocar as fatias de pão por Xg de tapioca ou Yg de aveia para manter as mesmas gramas de carbo").
         - Se a opção de Dieta Flexível estiver ativada, use o formato de nome no alimento: "Nome Principal (ou: Opção Substituto 1, Opção Substituto 2)" para dar opções rápidas ao aluno diretamente na visualização dos alimentos.
         - Forneça fáceis equivalências de substituição com outras frutas, vegetais ou fontes de proteína de valor semelhante nas observações de cada refeição! Por exemplo: "Você pode trocar 1 maçã média por 1 banana pequena ou 100g de mamão para bater os mesmos carboidratos".
      6. EVITE A TODO CUSTO A REPETIÇÃO: Cada uma das 5 ou 6 refeições deve ter uma cara completamente diferente, um método de preparo diferente (grelhado, assado, omelete, shake, sanduíche) para que o plano alimentar seja prazeroso de seguir e fácil de manter a longo prazo.
      
      - ${
        isLowCostMode
          ? 'FOCO EM BAIXO CUSTO: Priorize Ovos, Frango, Arroz, Feijão, Batata Doce e Aveia da lista.'
          : 'ALTA GASTRONOMIA FIT: Pode variar com carnes mais nobres (Mignon, Salmão, Tilápia) e grãos diversos.'
      }
      - ${
        isReadyMeals
          ? 'CARDÁPIO/REFEIÇÕES PRONTAS: Gere receitas completas e pratos prontos (ex: Pão integral com frango desfiado, Omelete recheado, Vitamina de Banana, Marmita completa) agrupando os ingredientes num único item de comida ("food"), com os macros totais somados.'
          : 'INGREDIENTES SEPARADOS: Liste cada ingrediente separadamente na refeição (ex: Arroz, Feijão, Frango isolados), mas sempre combine-os conceitualmente nas observações da refeição para fazerem sentido juntos.'
      }
      ${
        isFlexibleDiet
          ? `
      MÉTODO DIETA FLEXÍVEL:
      Esta dieta DEVE ser extremamente flexível e focar na liberdade alimentar do aluno, batendo os macros com precisão.
      Para cada alimento na refeição (carboidrato, proteína ou gordura), ofereça OPÇÕES DE SUBSTITUIÇÃO equivalentes em macronutrientes da nossa base de dados.
      Use o formato no nome do alimento: "[Principal] (Ou: [Substituto 1], [Substituto 2])". Exemplo: "120g Peito de Frango (Ou: Peixe, Patinho Moído)".
      No campo "kitchenMeasure", inclua instruções de como bater o macronutriente alvo usando as opções. O aluno deve ter a liberdade de alterar carboidrato, proteína ou gordura por fontes semelhantes da lista sem sair da dieta.
      `
          : ''
      }

      ESTRUTURA DA DIETA:
      Gere entre 5 a 6 refeições espaçadas estrategicamente ao longo do dia. Nomeie-as com clareza (Ex: Café da Manhã, Almoço, Lanche da Tarde, Pré-Treino, Pós-Treino, Ceia).
      Adicione o horário sugerido na propriedade "time" (Ex: "08:00", "12:00", "15:30", "18:00", "21:00").
      Escreva uma observação inspiradora, rica em orientações de preparo e substituições práticas na propriedade "observations" de cada refeição.
      
      RETORNE APENAS JSON PLANO (sem markdown ou prefixos):
      {
        "meals": [
          {
            "name": "Nome da Refeição (Ex: Café da Manhã)",
            "time": "Horário Sugerido (Ex: 08:00)",
            "observations": "Dicas de preparo (Ex: Monte um sanduíche tostado delicioso usando o pão, frango e o queijo na sanduicheira...)",
            "isReadyMeal": ${isReadyMeals ? "true" : "false"},
            "foods": [
              { "name": "Nome do Alimento", "quantity": gramas, "kcals": calorias, "protein": proteínas, "carbs": carboidratos, "fats": gorduras, "kitchenMeasure": "Medida caseira bem detalhada e explicativa" }
            ]
          }
        ],
        "supplements": [
          {
            "name": "Nome do Suplemento (Ex: Whey Protein)",
            "dosage": "Dose (Ex: 30g - 1 dosador)",
            "time": "Horário ideal (Ex: Pós-treino)",
            "kcals": calorias,
            "protein": proteínas,
            "carbs": carboidratos,
            "fats": gorduras
          }
        ]
      }`;
 
      let response;
      const configObj: any = {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  time: { type: Type.STRING },
                  observations: { type: Type.STRING },
                  foods: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        quantity: { type: Type.NUMBER },
                        protein: { type: Type.NUMBER },
                        carbs: { type: Type.NUMBER },
                        fats: { type: Type.NUMBER },
                        kcals: { type: Type.NUMBER },
                        kitchenMeasure: { type: Type.STRING },
                      },
                      required: [
                        "name",
                        "quantity",
                        "protein",
                        "carbs",
                        "fats",
                        "kcals",
                      ],
                    },
                  },
                },
                required: ["name", "foods", "time", "observations"],
              },
            },
            supplements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  dosage: { type: Type.STRING },
                  time: { type: Type.STRING },
                  kcals: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                },
                required: [
                  "name",
                  "dosage",
                  "time",
                  "kcals",
                  "protein",
                  "carbs",
                  "fats",
                ],
              },
            },
          },
          required: ["meals"],
        },
      };

      const modelsToTry = [
        "gemini-flash-lite-latest",
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-flash-latest",
        "gemini-3.6-flash",
        "gemini-3.7-flash"
      ];
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Tentando gerar dieta com o modelo: ${modelName}`);
          response = await currentAi.models.generateContent({
            model: modelName,
            contents: prompt,
            config: configObj,
          });
          if (response && response.text) {
            break; // Sucesso!
          }
        } catch (err: any) {
          console.warn(`Erro com o modelo ${modelName} na geração de dieta:`, err);
          lastError = err;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      // Fallback sem schema estrito se necessário
      if (!response?.text) {
        for (const modelName of ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"]) {
          try {
            response = await currentAi.models.generateContent({
              model: modelName,
              contents: `${prompt}\n\nIMPORTANTE: Retorne estritamente um JSON válido com os campos meals e supplements.`,
              config: { responseMimeType: "application/json" },
            });
            if (response?.text) break;
          } catch (err: any) {
            lastError = err;
          }
        }
      }

      if (!response || !response.text) {
        throw new Error(
          lastError?.message ||
          "A IA não retornou conteúdo no momento. Por favor, tente novamente em alguns instantes.",
        );
      }

      const parsed = JSON.parse(response.text);
      const generatedMeals = parsed.meals || [];
      const generatedSupplements = parsed.supplements || [];

      const formattedMeals = generatedMeals.map((m: any) => ({
        ...m,
        id: Math.random().toString(36).substr(2, 9),
        time: m.time || "12:00",
        observations: m.observations || "",
        foods: (m.foods || []).map((f: any) => ({
          ...f,
          id: Math.random().toString(36).substr(2, 9),
        })),
      }));

      const formattedSupplements = generatedSupplements.map((s: any) => ({
        ...s,
        id: Math.random().toString(36).substr(2, 9),
      }));

      if (formattedMeals.length > 0) {
        setLocalMeals(formattedMeals);
        setLocalSupplements(formattedSupplements);
        alert(
          "Plano e suplementação sugeridos pela IA com sucesso! Revise os valores antes de salvar.",
        );
      } else {
        throw new Error("A IA retornou um plano vazio.");
      }
    } catch (error: any) {
      console.error("AI Diet Error:", error);
      let errorMsg = error?.message || "Erro desconhecido";
      if (
        typeof errorMsg === "string" &&
        errorMsg.includes("PERMISSION_DENIED") &&
        errorMsg.includes("API_KEY_SERVICE_BLOCKED")
      ) {
        errorMsg =
          "A chave de API fornecida é válida, mas seu uso está BLOQUEADO no painel do Google Cloud para a API 'generativelanguage.googleapis.com'.\n\nPor favor, vá no Google Cloud Console, encontre sua API Key e edite as 'Restrições da chave'. Permita o 'Generative Language API'.";
      }
      alert(
        `Erro na Dieta por IA: ${errorMsg}\n\nDetalhes: ${JSON.stringify(error)}`,
      );
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleDeleteCurrentDiet = () => {
    if (!selectedStudent) return;
    if (
      !window.confirm(
        "Tem certeza que deseja apagar DEFINITIVAMENTE a dieta deste aluno? (Isso não afetará o histórico, se houver)",
      )
    )
      return;
    deleteDietPlan(selectedStudent.id);
    setLocalMeals([]);
    setTargetCaloriesGoal(0);
    setWaterGoal(2500);
    setLocalSupplements([]);
  };

  const handleDeleteEntireDietHistory = () => {
    if (!selectedStudent) return;
    if (
      !window.confirm(
        "Tem certeza que deseja apagar DEFINITIVAMENTE TODO O HISTÓRICO e a dieta atual deste aluno?",
      )
    )
      return;
    deleteDietPlan(selectedStudent.id);
    // Overwrite the history to empty in student object
    const updatedStudent = { ...selectedStudent, dietPlan: undefined };
    updateStudent(selectedStudent.id, { dietPlan: undefined });
    
    setLocalMeals([]);
    setTargetCaloriesGoal(0);
  };

  const handleSaveDiet = () => {
    if (!selectedStudent) return;
    updateDietPlan(selectedStudent.id, {
      targetCalories: targetCaloriesGoal || totalCals,
      targetProtein: proteins,
      targetCarbs: carbs,
      targetFats: fats,
      meals: localMeals,
      supplements: localSupplements,
      waterIntakeGoal: waterGoal,
      waterReminders: waterReminders,
      currentWaterIntake: waterCurrent,
    });
    setShowSyncSuccess(true);
    setTimeout(() => setShowSyncSuccess(false), 3000);
  };

  const handleSaveWaterOnly = (goal: number) => {
    if (!selectedStudent) return;
    updateDietPlan(selectedStudent.id, {
      targetCalories: targetCaloriesGoal || totalCals,
      targetProtein: proteins,
      targetCarbs: carbs,
      targetFats: fats,
      meals: localMeals,
      supplements: localSupplements,
      waterIntakeGoal: goal,
      waterReminders: waterReminders,
      currentWaterIntake: waterCurrent,
    });
    setWaterGoal(goal);
    setSuggestedWater(null);
    setShowSyncSuccess(true);
    setTimeout(() => setShowSyncSuccess(false), 3000);
  };

  const handleAddMeal = () => {
    setLocalMeals([
      ...localMeals,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Refeição ${localMeals.length + 1}`,
        foods: [],
        observations: "",
      },
    ]);
  };

  const handleRemoveMeal = (id: string) => {
    setLocalMeals(localMeals.filter((m) => m.id !== id));
  };

  const handleMoveMealUp = (index: number) => {
    if (index === 0) return;
    const newMeals = [...localMeals];
    const temp = newMeals[index - 1];
    newMeals[index - 1] = newMeals[index];
    newMeals[index] = temp;
    setLocalMeals(newMeals);
  };

  const handleMoveMealDown = (index: number) => {
    if (index === localMeals.length - 1) return;
    const newMeals = [...localMeals];
    const temp = newMeals[index + 1];
    newMeals[index + 1] = newMeals[index];
    newMeals[index] = temp;
    setLocalMeals(newMeals);
  };

  const handleNewFoodChange = (field: string, value: string) => {
    if (field === "name") {
      const results = searchFoods(value);
      setSearchResults(results);
      setShowSearch(true);
      setActiveSearchIndex(-1);
    }

    setNewFood((prev) => {
      let updated = { ...prev, [field]: value };
      const numVal = Number(value);

      if (field === "quantity" && Number(prev.quantity) > 0) {
        const ratio = numVal / Number(prev.quantity);
        updated.protein = (Number(prev.protein) * ratio)
          .toFixed(1)
          .replace(/\.0$/, "");
        updated.carbs = (Number(prev.carbs) * ratio)
          .toFixed(1)
          .replace(/\.0$/, "");
        updated.fats = (Number(prev.fats) * ratio)
          .toFixed(1)
          .replace(/\.0$/, "");
        updated.kcals = Math.round(Number(prev.kcals) * ratio).toString();
      } else if (["protein", "carbs", "fats"].includes(field)) {
        updated.kcals = Math.round(
          Number(updated.protein) * 4 +
            Number(updated.carbs) * 4 +
            Number(updated.fats) * 9,
        ).toString();
      }

      return updated;
    });
  };

  const handleSelectFoodResult = (food: FoodDatabaseItem) => {
    setNewFood({
      name: food.name,
      quantity: "100",
      kcals: food.kcals.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fats: food.fats.toString(),
      kitchenMeasure: "",
    });
    setSearchResults([]);
    setShowSearch(false);
    setActiveSearchIndex(-1);
  };

  const handleKeyDown = (e: any) => {
    if (!showSearch || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSearchIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSearchIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeSearchIndex >= 0) {
        e.preventDefault();
        handleSelectFoodResult(searchResults[activeSearchIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  const handleFoodChange = (
    mealId: string,
    foodId: string,
    field: keyof Food,
    value: string,
  ) => {
    const numVal = Number(value);
    setLocalMeals((prev) =>
      prev.map((meal) => {
        if (meal.id !== mealId) return meal;

        const foods = meal.foods.map((food) => {
          if (food.id !== foodId) return food;

          let updatedFood = {
            ...food,
            [field]: (field === "name" || field === "kitchenMeasure") ? value : numVal,
          };

          if (field === "quantity" && food.quantity > 0) {
            const ratio = numVal / food.quantity;
            updatedFood.protein = parseFloat((food.protein * ratio).toFixed(1));
            updatedFood.carbs = parseFloat((food.carbs * ratio).toFixed(1));
            updatedFood.fats = parseFloat((food.fats * ratio).toFixed(1));
            updatedFood.kcals = Math.round(food.kcals * ratio);
          } else if (["protein", "carbs", "fats"].includes(field)) {
            updatedFood.kcals = Math.round(
              updatedFood.protein * 4 +
                updatedFood.carbs * 4 +
                updatedFood.fats * 9,
            );
          }

          return updatedFood;
        });

        return { ...meal, foods };
      }),
    );
  };

  const handleSaveFoodToMeal = (mealId: string) => {
    if (!newFood.name || !newFood.kcals) return;
    setLocalMeals(
      localMeals.map((meal) => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: [
              ...meal.foods,
              {
                id: Math.random().toString(36).substr(2, 9),
                name: newFood.name,
                quantity: Number(newFood.quantity),
                kcals: Number(newFood.kcals),
                protein: Number(newFood.protein),
                carbs: Number(newFood.carbs),
                fats: Number(newFood.fats),
                kitchenMeasure: newFood.kitchenMeasure,
              },
            ],
          };
        }
        return meal;
      }),
    );
    setAddingFoodToMeal(null);
    setNewFood({
      name: "",
      quantity: "100",
      kcals: "0",
      protein: "0",
      carbs: "0",
      fats: "0",
      kitchenMeasure: "",
    });
  };

  const handleRemoveFood = (mealId: string, foodId: string) => {
    setLocalMeals(
      localMeals.map((meal) => {
        if (meal.id === mealId) {
          return { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) };
        }
        return meal;
      }),
    );
  };

  const handleSaveSupplement = () => {
    if (
      !newSupplement.name ||
      (!newSupplement.kcals && newSupplement.kcals !== "0")
    )
      return;
    setLocalSupplements([
      ...localSupplements,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newSupplement.name,
        dosage: newSupplement.dosage || "1 dose",
        time: newSupplement.time || "-",
        kcals: Number(newSupplement.kcals),
        protein: Number(newSupplement.protein),
        carbs: Number(newSupplement.carbs),
        fats: Number(newSupplement.fats),
      },
    ]);
    setAddingSupplement(false);
    setNewSupplement({
      name: "",
      dosage: "",
      time: "",
      kcals: "0",
      protein: "0",
      carbs: "0",
      fats: "0",
    });
  };

  const handleRemoveSupplement = (id: string) => {
    setLocalSupplements(localSupplements.filter((s) => s.id !== id));
  };

  const handleGeneratePDF = () => {
    if (!selectedStudent || localMeals.length === 0) {
      alert("Não há refeições registradas para exportar.");
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(`Plano Alimentar: ${selectedStudent.name}`, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Objetivo: ${selectedStudent.objective} | VCT Alvo: ${totalCals} kcal`,
      14,
      32,
    );
    doc.text(
      `Meta Secundária: ${proteins}g Prot | ${carbs}g Carb | ${fats}g Gord`,
      14,
      38,
    );
    doc.setFontSize(10);
    doc.text(
      `Meta Hídrica Diária: ${waterGoal}ml ${waterReminders.length > 0 ? "| Lembretes: " + waterReminders.join(", ") : ""}`,
      14,
      44,
    );

    let mealY = 52;

    localMeals.forEach((meal) => {
      if (mealY > 240) {
        doc.addPage();
        mealY = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      doc.text(meal.time ? `${meal.name} - ${meal.time}` : meal.name, 14, mealY);

      const foodData = meal.foods.map((f) => [
        f.name,
        f.kitchenMeasure ? `${f.quantity}g\n(${f.kitchenMeasure})` : `${f.quantity}g`,
        `${f.protein}g`,
        `${f.carbs}g`,
        `${f.fats}g`,
        `${f.kcals} kcal`,
      ]);

      if (foodData.length === 0) {
        foodData.push([
          "(Nenhum alimento cadastrado nesta refeição)",
          "-",
          "-",
          "-",
          "-",
          "-",
        ]);
      }

      autoTable(doc, {
        startY: mealY + 4,
        head: [["Alimento", "Qtd", "Prot", "Carb", "Gord", "Kcal"]],
        body: foodData,
        margin: { left: 14 },
        theme: "grid",
        headStyles: { fillColor: [46, 204, 113] },
        styles: { fontSize: 10 },
      });

      mealY = (doc as any).lastAutoTable.finalY + 8;

      if (meal.observations) {
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const splitText = doc.splitTextToSize(`Obs: ${meal.observations}`, 180);
        doc.text(splitText, 14, mealY);
        mealY += splitText.length * 5 + 5;
      } else {
        mealY += 5;
      }
    });

    if (localSupplements && localSupplements.length > 0) {
      if (mealY > 240) {
        doc.addPage();
        mealY = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      doc.text("Protocolo de Suplementação", 14, mealY);

      const suppData = localSupplements.map((s) => [
        s.name,
        s.dosage,
        s.time || "-",
        `${s.protein}g`,
        `${s.carbs}g`,
        `${s.fats}g`,
        `${s.kcals}`,
      ]);

      autoTable(doc, {
        startY: mealY + 4,
        head: [
          [
            "Suplemento",
            "Dosagem",
            "Horário/Uso",
            "Prot",
            "Carb",
            "Gord",
            "Kcal",
          ],
        ],
        body: suppData,
        margin: { left: 14 },
        theme: "grid",
        headStyles: { fillColor: [138, 43, 226] }, // a beautiful purple/indigo for supplements
        styles: { fontSize: 10 },
      });

      mealY = (doc as any).lastAutoTable.finalY + 8;
    }

    doc.save(
      `dieta_${selectedStudent.name.replace(/\s+/g, "_").toLowerCase()}.pdf`,
    );
  };

  const handleSaveToTemplates = (meal: Meal) => {
    addMealTemplate({
      name: meal.name,
      isReadyMeal: meal.isReadyMeal,
      foods: meal.foods.map((f) => ({
        ...f,
        id: Math.random().toString(36).substr(2, 9),
      })),
      observations: meal.observations,
    });
    alert(`Refeição "${meal.name}" salva nos modelos!`);
  };

  const handleLoadTemplate = (template: MealTemplate) => {
    setLocalMeals([
      ...localMeals,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: template.name,
        time: "12:00",
        isReadyMeal: template.isReadyMeal,
        foods: template.foods.map((f) => ({
          ...f,
          id: Math.random().toString(36).substr(2, 9),
        })),
        observations: template.observations || "",
      },
    ]);
    setShowTemplateMenu(false);
  };

  const loadHypertrophyTemplate = () => {
    const templateMeals = [
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Refeição 1: Café da Manhã",
        time: "07:00",
        foods: [
          {
            id: Math.random().toString(),
            name: "Ovo de Galinha Inteiro (Cozido/Mexido)",
            quantity: 150,
            kcals: 217.5,
            protein: 19.5,
            carbs: 0.9,
            fats: 14.2,
          },
          {
            id: Math.random().toString(),
            name: "Batata Doce (Cozida)",
            quantity: 150,
            kcals: 129,
            protein: 2.4,
            carbs: 30.1,
            fats: 0.1,
          },
        ],
        observations: "Energia sustentada logo pela manhã.",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Refeição 2: Pós-Treino / Lanche",
        time: "10:30",
        foods: [
          {
            id: Math.random().toString(),
            name: "Peito de Frango (Grelhado/Desfiado)",
            quantity: 150,
            kcals: 247.5,
            protein: 48,
            carbs: 0,
            fats: 4.8,
          },
          {
            id: Math.random().toString(),
            name: "Batata Doce (Cozida)",
            quantity: 200,
            kcals: 172,
            protein: 3.2,
            carbs: 40.2,
            fats: 0.2,
          },
          {
            id: Math.random().toString(),
            name: "Brócolis (Cozido)",
            quantity: 100,
            kcals: 35,
            protein: 2.4,
            carbs: 7.2,
            fats: 0.4,
          },
        ],
        observations:
          "Proteína magra para síntese muscular e carbo limpo de rápida reposição de glicogênio na medida certa.",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Refeição 3: Almoço",
        time: "13:30",
        foods: [
          {
            id: Math.random().toString(),
            name: "Peito de Frango (Grelhado/Cozido)",
            quantity: 150,
            kcals: 247.5,
            protein: 48,
            carbs: 0,
            fats: 4.8,
          },
          {
            id: Math.random().toString(),
            name: "Arroz Branco (Cozido)",
            quantity: 200,
            kcals: 260,
            protein: 5,
            carbs: 56.2,
            fats: 0.4,
          },
          {
            id: Math.random().toString(),
            name: "Brócolis (Cozido)",
            quantity: 150,
            kcals: 52.5,
            protein: 3.6,
            carbs: 10.8,
            fats: 0.6,
          },
          {
            id: Math.random().toString(),
            name: "Azeite de Oliva Extra Virgem",
            quantity: 13,
            kcals: 115.5,
            protein: 0,
            carbs: 0,
            fats: 13,
          },
        ],
        observations:
          "Adicione temperos secos e sal a gosto para garantir boa hidratação do músculo.",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Refeição 4: Lanche da Tarde",
        time: "17:00",
        foods: [
          {
            id: Math.random().toString(),
            name: "Peito de Frango (Grelhado)",
            quantity: 150,
            kcals: 247.5,
            protein: 48,
            carbs: 0,
            fats: 4.8,
          },
          {
            id: Math.random().toString(),
            name: "Batata Doce (Cozida)",
            quantity: 150,
            kcals: 129,
            protein: 2.4,
            carbs: 30.1,
            fats: 0.1,
          },
        ],
        observations: "Fácil de transportar em marmita térmica.",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Refeição 5: Jantar / Ceia",
        time: "20:30",
        foods: [
          {
            id: Math.random().toString(),
            name: "Ovo de Galinha Inteiro (Cozido/Omelete)",
            quantity: 150,
            kcals: 217.5,
            protein: 19.5,
            carbs: 0.9,
            fats: 14.2,
          },
          {
            id: Math.random().toString(),
            name: "Brócolis (Cozido)",
            quantity: 200,
            kcals: 70,
            protein: 4.8,
            carbs: 14.4,
            fats: 0.8,
          },
          {
            id: Math.random().toString(),
            name: "Azeite de Oliva Extra Virgem",
            quantity: 13,
            kcals: 115.5,
            protein: 0,
            carbs: 0,
            fats: 13,
          },
        ],
        observations:
          "Alta ingestão de vegetais antes de dormir para saciedade, com fonte de gordura saudável com proteína de média liberação (ovo).",
      },
    ];

    setLocalMeals(templateMeals);

    // Auto-adjust macros appropriately for this diet build:
    const newProt = templateMeals.reduce(
      (acc, m) => acc + m.foods.reduce((fac, f) => fac + f.protein, 0),
      0,
    );
    const newCarbs = templateMeals.reduce(
      (acc, m) => acc + m.foods.reduce((fac, f) => fac + f.carbs, 0),
      0,
    );
    const newFats = templateMeals.reduce(
      (acc, m) => acc + m.foods.reduce((fac, f) => fac + f.fats, 0),
      0,
    );
    const newCals = templateMeals.reduce(
      (acc, m) => acc + m.foods.reduce((fac, f) => fac + f.kcals, 0),
      0,
    );

    setProteins(Math.round(newProt));
    setCarbs(Math.round(newCarbs));
    setFats(Math.round(newFats));
    setTargetCaloriesGoal(Math.round(newCals));
  };

  // Macro Bar Subcomponent
  const MacroBar = ({
    label,
    current,
    target,
    colorClass,
  }: {
    label: string;
    current: number;
    target: number;
    colorClass: string;
  }) => {
    const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
    return (
      <div className="mb-[15px]">
        <div className="flex justify-between text-[11px] text-[#999999] mb-[5px] uppercase tracking-[1px] font-[500]">
          <span>{label}</span>
          <span>
            {Math.round(current)} / {Math.round(target)}{" "}
            {label === "Calorias" ? "kcal" : "g"}
          </span>
        </div>
        <div className="h-[6px] w-full bg-dark-bg border border-dark-border rounded-full overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-700 ease-in-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[30px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09090b] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div>
          <h1 className="text-3xl font-[300] tracking-tight text-white leading-tight">
            Dietas & Macros
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Calculadora metabólica e planejamento alimentar sincronizado.
          </p>
        </div>

        <div className="w-full sm:w-[350px]">
          <select
            className="w-full bg-black/50 border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option value="">-- Selecione o Aluno --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!selectedStudent ? (
        <div className="rounded-[16px] bg-dark-card border border-dark-border p-[60px] flex flex-col items-center justify-center text-center">
          <Utensils className="w-16 h-16 text-dark-border mb-[20px]" />
          <h3 className="text-[20px] text-white mb-[5px] font-[300]">
            Nenhum aluno selecionado
          </h3>
          <p className="text-[#999999] text-[14px] max-w-md">
            Selecione um aluno no menu acima para puxar os dados da última
            avaliação física e prescrever sua dieta.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[25px]">
          {selectedStudent?.dietPlan?.history && selectedStudent.dietPlan.history.length > 0 && (
            <div className="bg-dark-card border border-dark-border p-[20px] rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-white text-[15px] font-[500]">Histórico de Dietas ({selectedStudent.dietPlan.history.length})</h3>
                <p className="text-[#999999] text-[12px]">Este aluno possui dietas arquivadas no histórico.</p>
              </div>
              <select
                onChange={(e) => {
                  const histIdx = parseInt(e.target.value);
                  if (histIdx >= 0) {
                    const hist = selectedStudent.dietPlan!.history![histIdx];
                    setTargetCaloriesGoal(hist.targetCalories);
                    setProteins(hist.targetProtein);
                    setCarbs(hist.targetCarbs);
                    setFats(hist.targetFats);
                    setLocalMeals(hist.meals || []);
                    alert("Dieta do histórico carregada para edição!");
                  }
                }}
                className="bg-dark-bg border border-dark-border rounded-[8px] px-4 py-2 text-white text-[13px] focus:outline-none focus:border-primary"
              >
                <option value="-1">-- Carregar Dieta do Histórico --</option>
                {selectedStudent.dietPlan.history.map((hist, i) => (
                  <option key={i} value={i}>
                    Dieta de {new Date(hist.date).toLocaleDateString('pt-BR')} ({hist.targetCalories || '?'} kcal)
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="grid lg:grid-cols-3 gap-[25px]">
            <div className="rounded-[16px] bg-dark-card border border-dark-border p-[25px] lg:col-span-1 flex flex-col gap-[25px]">
            <div>
              <h2 className="text-[13px] text-[#999999] uppercase tracking-[1px] font-[600] mb-[20px] pb-[10px] border-b border-dark-border flex items-center justify-between">
                <span>Dados Metabólicos</span>
                {latestEval && (
                  <span className="text-primary text-[10px] px-2 py-1 bg-primary/10 rounded-full">
                    {new Date(latestEval.date).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </h2>

              {!latestEval ? (
                <div className="flex items-start gap-[10px] p-[15px] bg-[#ffdd00]/10 border border-[#ffdd00]/20 rounded-[8px]">
                  <AlertCircle className="w-5 h-5 text-[#ffdd00] flex-shrink-0 mt-[2px]" />
                  <p className="text-[13px] text-[#ffdd00] leading-snug">
                    Aluno não possui avaliação física. O cálculo metabólico
                    precisa de peso e altura reais para funcionar.
                  </p>
                </div>
              ) : (
                <div className="space-y-[15px]">
                  {isEvalOudated && (
                    <div className="flex items-start gap-[10px] p-[12px] mb-4 bg-orange-500/10 border border-orange-500/20 rounded-[8px]">
                      <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-[2px]" />
                      <p className="text-[12px] text-orange-400 leading-snug">
                        Atenção: A avaliação física deste aluno tem mais de 30
                        dias. Os gastos calóricos podem estar defasados.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between border-b border-dark-border pb-[10px]">
                    <span className="text-[#999999] text-[13px]">
                      Peso Sincronizado
                    </span>
                    <span className="text-white font-[500] text-[14px]">
                      {latestEval.weight}kg
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-dark-border pb-[10px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#999999] text-[13px]">
                        Fórmula TMB
                      </span>
                      {isKatchLeanMassMissing && (
                        <div className="flex items-center gap-1 text-[10px] text-orange-400 animate-pulse">
                          <AlertCircle className="w-3 h-3" /> Fallback (Mifflin)
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        { id: "katch", label: "Katch" },
                        { id: "manual", label: "Manual" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setBmrProtocol(p.id as any);
                            if (p.id === "manual" && manualBmr === 0)
                              setManualBmr(Math.round(tmb));
                          }}
                          className={`text-[10px] py-1 rounded-[4px] border transition-all ${
                            bmrProtocol === p.id
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-dark-bg border-dark-border text-[#666] hover:text-[#999]"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {bmrProtocol === "manual" && (
                    <div className="flex flex-col gap-2 border-b border-dark-border pb-[10px] animate-in slide-in-from-top-1 duration-200">
                      <label className="text-[#999999] text-[11px] uppercase tracking-[0.5px]">
                        TMB Manual (kcal)
                      </label>
                      <input
                        type="number"
                        value={manualBmr}
                        onChange={(e) => setManualBmr(Number(e.target.value))}
                        className="w-full bg-dark-bg border border-primary/30 rounded-[6px] px-3 py-1.5 text-white text-[13px] focus:border-primary outline-none"
                      />
                    </div>
                  )}

                  <div className="flex justify-between border-b border-dark-border pb-[10px]">
                    <span className="text-[#999999] text-[13px]">
                      Fator Atividade
                    </span>
                    <span className="text-white font-[500] text-[14px]">
                      {selectedStudent.activityLevel}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border pb-[10px]">
                    <span className="text-[#999999] text-[13px]">Objetivo</span>
                    <span className="text-primary font-[500] text-[14px]">
                      {selectedStudent.objective}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border pb-[10px]">
                    <span className="text-[#999999] text-[13px]">
                      TMB (Basal)
                    </span>
                    <span className="text-white font-[500] text-[14px]">
                      {tmb.toFixed(0)} kcal
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border pb-[10px]">
                    <span className="text-[#999999] text-[13px]">
                      GET (Gasto Total)
                    </span>
                    <span className="text-[#00FF85] font-[500] text-[14px]">
                      {get.toFixed(0)} kcal
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-[13px] text-[#999999] uppercase tracking-[1px] font-[600] flex items-center justify-between mb-[20px] pb-[10px] border-b border-dark-border">
                <span>Ajuste de Macros</span>
                <button
                  onClick={handleAutoCalculate}
                  disabled={!latestEval}
                  className="text-primary hover:text-white transition-colors flex items-center gap-1 normal-case font-[400]"
                >
                  <RefreshCw className="w-3 h-3" /> Sugerir P/ Objetivo
                </button>
              </h2>
              <div className="space-y-[20px]">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-[12px] mb-4">
                  <label className="flex justify-between text-[11px] text-primary uppercase tracking-[1px] font-[700] mb-[10px]">
                    <span>Meta de Calorias Alvo</span>
                    <span className="bg-primary/20 px-2 py-0.5 rounded text-[10px]">
                      Ajuste Manual
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={targetCaloriesGoal}
                      onChange={(e) =>
                        setTargetCaloriesGoal(Number(e.target.value))
                      }
                      className="flex-1 bg-dark-bg border border-primary/30 rounded-[8px] px-[15px] py-[12px] text-white text-[18px] focus:outline-none focus:border-primary transition-all font-[700] placeholder:text-[#333]"
                      placeholder="Ex: 2500"
                    />
                    <div className="text-[14px] text-primary font-[600]">
                      kcal
                    </div>
                  </div>
                  <p className="text-[10px] text-primary/60 mt-2 italic">
                    * Esta meta será usada como referência nos indicadores de
                    consumo.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-[15px]">
                  <div>
                    <label className="flex justify-between text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      <span>Proteínas (g)</span>
                      <span className="text-white/50">
                        {latestEval
                          ? (
                              ((proteins * 4) /
                                (targetCaloriesGoal || totalCals || 1)) *
                              100
                            ).toFixed(0)
                          : 0}
                        %
                      </span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={proteins}
                        onChange={(e) => setProteins(Number(e.target.value))}
                        className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-[15px] py-[10px] text-white text-[14px] focus:outline-none focus:border-primary transition-all"
                      />
                      <span className="w-16 text-[12px] text-white/40">
                        {latestEval
                          ? (proteins / latestEval.weight).toFixed(1)
                          : 0}{" "}
                        g/kg
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="flex justify-between text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      <span>Carboidratos (g)</span>
                      <span className="text-white">
                        {latestEval
                          ? (carbs / latestEval.weight).toFixed(1)
                          : 0}{" "}
                        g/kg
                      </span>
                    </label>
                    <input
                      type="number"
                      value={carbs}
                      onChange={(e) => setCarbs(Number(e.target.value))}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-[15px] py-[10px] text-white text-[14px] focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-[12px] text-[#999999] uppercase tracking-[0.5px] mb-[8px]">
                      <span>Gorduras (g)</span>
                      <span className="text-white">
                        {latestEval ? (fats / latestEval.weight).toFixed(1) : 0}{" "}
                        g/kg
                      </span>
                    </label>
                    <input
                      type="number"
                      value={fats}
                      onChange={(e) => setFats(Number(e.target.value))}
                      className="w-full bg-dark-bg border border-dark-border rounded-[8px] px-[15px] py-[10px] text-white text-[14px] focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="pt-[20px] border-t border-dark-border">
                  <div className="text-center">
                    <span
                      className={`block text-[48px] font-[200] leading-none mb-[10px] ${
                        get > 0 &&
                        totalCals > get &&
                        selectedStudent.objective === "Emagrecimento"
                          ? "text-red-500"
                          : get > 0 &&
                              totalCals < get &&
                              selectedStudent.objective === "Hipertrofia"
                            ? "text-red-500"
                            : "text-white"
                      }`}
                    >
                      {totalCals}
                    </span>
                    <span className="text-[12px] text-[#999999] uppercase tracking-[1px] font-[600]">
                      Kcal Totais da Dieta
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-dark-bg p-3 rounded-[8px] flex items-center justify-between border border-dark-border">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-white font-[500]">
                        Permitir Suplementos na IA
                      </span>
                      <span className="text-[10px] text-[#999999]">
                        Whey, Creatina (custa mais caro)
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={includeSupplements}
                        onChange={(e) =>
                          setIncludeSupplements(e.target.checked)
                        }
                      />
                      <div className="w-9 h-5 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#999] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="bg-dark-bg p-3 rounded-[8px] flex items-center justify-between border border-dark-border">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-white font-[500]">
                        Dieta de Baixo Custo
                      </span>
                      <span className="text-[10px] text-[#999999]">
                        Foco em ovos, frango, arroz (econômico)
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isLowCostMode}
                        onChange={(e) =>
                          setIsLowCostMode(e.target.checked)
                        }
                      />
                      <div className="w-9 h-5 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#999] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FF85]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-[15px] bg-dark-bg border border-dark-border rounded-[8px] hover:border-primary/30 transition-all cursor-pointer" onClick={() => setIsReadyMeals(!isReadyMeals)}>
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary/10">
                        <Utensils className="w-[18px] h-[18px] text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-[600] text-white">Refeições Prontas</span>
                        <span className="text-[11px] text-[#999]">Gerar cardápio pronto (Ex: Sanduíches)</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isReadyMeals}
                        onChange={(e) =>
                          setIsReadyMeals(e.target.checked)
                        }
                      />
                      <div className="w-9 h-5 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#999] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FF85]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-[15px] bg-dark-bg border border-dark-border rounded-[8px] hover:border-primary/30 transition-all cursor-pointer" onClick={() => setIsFlexibleDiet(!isFlexibleDiet)}>
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary/10">
                        <Wand2 className="w-[18px] h-[18px] text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-[600] text-white">Dieta Flexível</span>
                        <span className="text-[11px] text-[#999]">Permitir escolhas inteligentes com macros pré-calculados</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isFlexibleDiet}
                        onChange={(e) =>
                          setIsFlexibleDiet(e.target.checked)
                        }
                      />
                      <div className="w-9 h-5 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#999] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FF85]"></div>
                    </label>
                  </div>

                  {/* Seleção de Alimentos Permitidos (IA) */}
                  <div className="flex flex-col p-[15px] bg-dark-bg border border-dark-border rounded-[8px] hover:border-primary/30 transition-all">
                    <button
                      type="button"
                      onClick={() => setShowAIFoodsSelector(!showAIFoodsSelector)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary/10">
                          <CheckSquare className="w-[18px] h-[18px] text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-[600] text-white">Ingredientes para a IA</span>
                          <span className="text-[11px] text-[#999]">
                            {selectedFoodIds.length === FOOD_DATABASE.length 
                              ? "Todos os alimentos permitidos" 
                              : `${selectedFoodIds.length} de ${FOOD_DATABASE.length} selecionados`
                            }
                          </span>
                        </div>
                      </div>
                      <span className="text-[#999] text-[12px] hover:text-white transition-colors">
                        {showAIFoodsSelector ? "Ocultar ▲" : "Configurar ▼"}
                      </span>
                    </button>

                    {showAIFoodsSelector && (
                      <div className="mt-4 pt-4 border-t border-dark-border space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar animate-in fade-in duration-200">
                        {[
                          {
                            id: "carbs",
                            name: "🍞 Carboidratos",
                            categories: ["Carboidratos", "Leguminosas"]
                          },
                          {
                            id: "proteins",
                            name: "🍗 Proteínas",
                            categories: ["Proteínas", "Suplementos", "Laticínios"]
                          },
                          {
                            id: "fats",
                            name: "🥑 Gorduras",
                            categories: ["Gorduras"]
                          },
                          {
                            id: "frutas_veg",
                            name: "🍎 Frutas & Vegetais",
                            categories: ["Frutas", "Vegetais"]
                          }
                        ].map((group) => {
                          const groupFoods = FOOD_DATABASE.filter(f => group.categories.includes(f.category));
                          const selectedInGroup = groupFoods.filter(f => selectedFoodIds.includes(f.id));
                          const isAllSelected = selectedInGroup.length === groupFoods.length;

                          return (
                            <div key={group.id} className="space-y-2">
                              <div className="flex items-center justify-between bg-black/40 p-2 rounded-[6px] border border-dark-border/40">
                                <span className="text-[12px] font-[600] text-white">{group.name}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isAllSelected) {
                                      // Deselect all in group
                                      setSelectedFoodIds(prev => prev.filter(id => !groupFoods.map(gf => gf.id).includes(id)));
                                    } else {
                                      // Select all in group
                                      setSelectedFoodIds(prev => {
                                        const otherIds = prev.filter(id => !groupFoods.map(gf => gf.id).includes(id));
                                        return [...otherIds, ...groupFoods.map(gf => gf.id)];
                                      });
                                    }
                                  }}
                                  className="text-[10px] text-primary hover:text-primary-hover transition-colors font-[500]"
                                >
                                  {isAllSelected ? "Deselecionar" : "Selecionar Tudo"}
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5">
                                {groupFoods.map((food) => {
                                  const isChecked = selectedFoodIds.includes(food.id);
                                  return (
                                    <label
                                      key={food.id}
                                      className={`flex items-start gap-1.5 p-1.5 rounded-[6px] border cursor-pointer select-none transition-all ${
                                        isChecked
                                          ? "bg-primary/5 border-primary/30 text-white"
                                          : "bg-dark-bg border-dark-border/50 text-[#666] hover:border-dark-border"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                          setSelectedFoodIds(prev =>
                                            prev.includes(food.id)
                                              ? prev.filter(id => id !== food.id)
                                              : [...prev, food.id]
                                          );
                                        }}
                                        className="sr-only"
                                      />
                                      <div className={`w-3.5 h-3.5 mt-0.5 rounded flex items-center justify-center border transition-all ${
                                        isChecked ? "bg-primary border-primary text-dark-bg" : "border-[#666]"
                                      }`}>
                                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                      </div>
                                      <span className="text-[10px] leading-tight font-medium truncate" title={food.name}>
                                        {food.name}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSendModalOpen(true)}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-[8px] bg-gradient-to-r from-[#00e676] to-[#00b35c] hover:from-[#00b35c] hover:to-[#008f4a] disabled:from-dark-border disabled:to-dark-border disabled:text-[#666] text-white px-[20px] py-[14px] rounded-[8px] transition-all font-[600] tracking-[0.5px] text-[14px] border border-white/10"
                  >
                    <Copy className="w-5 h-5" /> Enviar para Aluno
                  </button>

                  <button
                    onClick={handleGenerateAIDiet}
                    disabled={!latestEval || isGeneratingAI}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-[8px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-dark-border disabled:to-dark-border disabled:text-[#666] text-white px-[20px] py-[14px] rounded-[8px] transition-all font-[600] tracking-[0.5px] text-[14px] border border-white/10"
                  >
                    {isGeneratingAI ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Gerando
                        Plano...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" /> ✨ Gerar Dieta Inteligente
                        (IA)
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSaveDiet}
                    disabled={!latestEval || isGeneratingAI}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-[8px] bg-primary hover:bg-primary-hover disabled:bg-dark-border disabled:text-[#666] text-white px-[20px] py-[14px] rounded-[8px] transition-all font-[600] tracking-[0.5px] text-[14px]"
                  >
                    {showSyncSuccess ? (
                      <span className="flex items-center gap-2 text-[#00FF85]">
                        <CheckCircle2 className="w-5 h-5" /> Sincronizado
                      </span>
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Sincronizar Plano Atual
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleGeneratePDF}
                    disabled={!latestEval || localMeals.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-dark-bg border border-dark-border hover:border-white/30 disabled:border-dark-border disabled:text-[#666] text-white px-[20px] py-[14px] rounded-[8px] transition-all font-[600] tracking-[0.5px] text-[14px]"
                  >
                    <Download className="w-5 h-5" /> Exportar Dieta em PDF
                  </button>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleDeleteCurrentDiet}
                      disabled={!selectedStudent?.dietPlan}
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 disabled:opacity-50 border border-red-500/20 px-[20px] py-[12px] rounded-[8px] transition-all font-[600] tracking-[0.5px] text-[13px]"
                    >
                      <Trash className="w-4 h-4" /> Excluir Dieta Atual
                    </button>
                    {selectedStudent?.dietPlan?.history && selectedStudent.dietPlan.history.length > 0 && (
                      <button
                        onClick={handleDeleteEntireDietHistory}
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 hover:border-red-500/80 hover:bg-red-500/30 disabled:opacity-50 text-red-500 px-[16px] py-[12px] rounded-[8px] transition-all font-[600]"
                        title="Zerar completamente todo Histórico de Dietas"
                      >
                        Zerar Histórico
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Water Intake Section */}
            <div className="mt-[25px] p-[25px] bg-[#0A84FF]/5 border border-[#0A84FF]/20 rounded-[16px] relative overflow-hidden">
              {/* Decorative Hardware Elements */}
              <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
                <Droplets className="w-12 h-12 text-[#0A84FF] rotate-12" />
              </div>

              <h3 className="text-[13px] text-[#0A84FF] uppercase tracking-[1.5px] font-[700] flex items-center gap-2 mb-[20px]">
                <Droplets className="w-4 h-4" /> Painel de Hidratação
              </h3>

              <div className="space-y-[20px]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-[#999] uppercase tracking-[1px] font-[600]">Meta Diária / {(waterGoal / 1000).toFixed(1)} L</label>
                    <button
                      onClick={handleCalculateWater}
                      disabled={!latestEval}
                      className="text-[10px] text-[#0A84FF] hover:underline disabled:text-[#444] disabled:no-underline font-[600]"
                    >
                      Recalcular
                    </button>
                  </div>
                  {suggestedWater !== null && (
                    <div className="mb-2 p-2 bg-[#0A84FF]/10 rounded border border-[#0A84FF]/20">
                      <p className="text-[11px] text-white">
                        Sugestão: <strong>{(suggestedWater / 1000).toFixed(1)} Litros</strong> ({suggestedWater} ml)
                      </p>
                      <button 
                         onClick={() => handleSaveWaterOnly(suggestedWater)}
                         className="text-[10px] text-[#0A84FF] font-bold hover:underline mt-1"
                      >
                        Aplicar e Salvar
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={waterGoal}
                      onChange={(e) => setWaterGoal(Number(e.target.value))}
                      className="flex-1 bg-dark-bg border border-dark-border rounded-[8px] px-[12px] py-[10px] text-white text-[15px] font-mono focus:outline-none focus:border-[#0A84FF] transition-all"
                    />
                    <span className="text-[11px] text-white/40 font-mono tracking-wider">
                      ML
                    </span>
                  </div>
                  <button 
                    onClick={handleSaveDiet} 
                    className="w-full mt-4 bg-[#0A84FF] text-[#111] font-bold py-3 px-4 rounded-xl hover:bg-[#0070E0] hover:text-white active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" /> Salvar e Atualizar
                  </button>
                </div>

                {/* Progress Indicator - Hardware Style */}
                <div className="bg-dark-bg/50 border border-dark-border rounded-[12px] p-[15px] relative">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-[#666] uppercase tracking-[2px] mb-1 font-[700]">
                        Status de Consumo
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-mono text-white leading-none">
                          {waterCurrent}
                        </span>
                        <span className="text-[12px] font-mono text-white/40">
                          / {waterGoal}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-mono text-[#0A84FF] font-bold">
                        {Math.round((waterCurrent / (waterGoal || 1)) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="h-[8px] w-full bg-dark-bg rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-[#00A3FF] to-[#0A84FF] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(10,132,255,0.6)] rounded-full"
                      style={{
                        width: `${Math.min(100, (waterCurrent / (waterGoal || 1)) * 100)}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[150, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAddWater(amount)}
                        className="py-2 bg-dark-card border border-dark-border rounded-[6px] text-white text-[11px] font-mono hover:bg-[#0A84FF]/10 hover:border-[#0A84FF]/40 transition-all flex flex-col items-center justify-center gap-1 group"
                      >
                        <span className="text-[#0A84FF] group-hover:scale-110 transition-transform">
                          +{amount}
                        </span>
                        <span className="text-[8px] text-[#444] font-sans">
                          ML
                        </span>
                      </button>
                    ))}
                  </div>

                  {waterCurrent > 0 && (
                    <button
                      onClick={() => {
                        if (
                          confirm("Deseja resetar o consumo hídrico atual?")
                        ) {
                          setWaterCurrent(0);
                        }
                      }}
                      className="absolute -top-2 -right-2 bg-dark-card border border-dark-border p-1.5 rounded-full text-[#666] hover:text-red-400 transition-colors shadow-lg"
                      title="Zerar Consumo"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Reminders - Compact Hardware List */}
                <div className="pt-4 border-t border-dark-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-4 h-4 text-[#0A84FF]" />
                    <span className="text-[10px] text-[#999] uppercase tracking-[1.5px] font-[700]">
                      Agendamento de Lembretes
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 bg-dark-bg/30 p-2 rounded-[8px] border border-dark-border">
                    <input
                      type="time"
                      value={newReminderTime}
                      onChange={(e) => setNewReminderTime(e.target.value)}
                      className="flex-1 bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white text-[12px] font-mono focus:border-[#0A84FF] outline-none"
                    />
                    <button
                      onClick={handleAddReminder}
                      className="bg-[#0A84FF] hover:bg-[#32ade6] text-white px-3 rounded-[6px] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                    {waterReminders.length === 0 ? (
                      <p className="text-[10px] text-white/30 italic text-center py-2">
                        Nenhum lembrete configurado
                      </p>
                    ) : (
                      waterReminders.map((time) => (
                        <div
                          key={time}
                          className="flex items-center justify-between bg-dark-bg/50 border-l-2 border-l-[#0A84FF] border border-dark-border px-3 py-2 rounded-r-[6px] transition-all hover:bg-dark-bg group"
                        >
                          <span className="text-[13px] font-mono text-white tracking-widest">
                            {time}
                          </span>
                          <button
                            onClick={() => handleRemoveReminder(time)}
                            className="text-[#444] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-[25px]">
            {/* Visual Analytics */}
            <div className="rounded-[16px] bg-dark-card border border-dark-border p-[25px]">
              <div className="flex items-center justify-between mb-[20px] pb-[10px] border-b border-dark-border">
                <h2 className="text-[13px] text-[#999999] uppercase tracking-[1px] font-[600]">
                  Indicadores de Consumo
                </h2>
                <div className="flex bg-dark-bg p-1 rounded-[8px] border border-dark-border">
                  <button
                    onClick={() => setActiveChart("current")}
                    className={`block px-3 py-1 text-[11px] uppercase tracking-[1px] rounded-[4px] transition-colors ${activeChart === "current" ? "bg-primary/20 text-primary" : "text-[#666] hover:text-[#999]"}`}
                  >
                    Dieta Atual
                  </button>
                  <button
                    onClick={() => setActiveChart("target")}
                    className={`block px-3 py-1 text-[11px] uppercase tracking-[1px] rounded-[4px] transition-colors ${activeChart === "target" ? "bg-primary/20 text-primary" : "text-[#666] hover:text-[#999]"}`}
                  >
                    Metas
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-[30px] items-center">
                <div className="flex-1">
                  <MacroBar
                    label="Calorias"
                    current={currentIntake.kcals}
                    target={totalCals}
                    colorClass="bg-white"
                  />
                  <MacroBar
                    label="Proteínas"
                    current={currentIntake.protein}
                    target={proteins}
                    colorClass="bg-blue-500"
                  />
                  <MacroBar
                    label="Carboidratos"
                    current={currentIntake.carbs}
                    target={carbs}
                    colorClass="bg-green-500"
                  />
                  <MacroBar
                    label="Gorduras"
                    current={currentIntake.fats}
                    target={fats}
                    colorClass="bg-yellow-500"
                  />
                </div>

                <div className="h-[200px] relative flex flex-col items-center justify-center">
                  {(activeChart === "current" && currentIntake.kcals > 0) ||
                  (activeChart === "target" && totalCals > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            activeChart === "current"
                              ? macroData
                              : targetMacroData
                          }
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {(activeChart === "current"
                            ? macroData
                            : targetMacroData
                          ).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(
                            value: number,
                            name: string,
                            props: any,
                          ) => [
                            `${Math.round(props.payload.grams)}g (${Math.round(value)} kcal)`,
                            "Contribuição",
                          ]}
                          contentStyle={{
                            backgroundColor: "#111111",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-[160px] h-[160px] border-[12px] border-dark-bg rounded-full flex items-center justify-center">
                      <span className="text-[#666] text-[12px] uppercase text-center leading-tight">
                        Sem
                        <br />
                        Consumo
                      </span>
                    </div>
                  )}
                  {((activeChart === "current" && currentIntake.kcals > 0) ||
                    (activeChart === "target" && totalCals > 0)) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-white text-[24px] font-[300] leading-none">
                        {Math.round(
                          activeChart === "current"
                            ? currentIntake.kcals
                            : totalCals,
                        )}
                      </span>
                      <span className="text-[#999999] text-[10px] uppercase tracking-[1px] mt-1">
                        kcal
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Meals Editor */}
            <div className="rounded-[16px] bg-dark-card border border-dark-border p-[25px]">
              <div className="flex items-center justify-between mb-[20px] pb-[10px] border-b border-dark-border">
                <h2 className="text-[13px] text-[#999999] uppercase tracking-[1px] font-[600] flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Distribuição de Refeições
                </h2>
                <div className="flex flex-wrap items-center gap-[10px]">
                  <button
                    onClick={loadHypertrophyTemplate}
                    className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary/20 transition-colors text-[12px] bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-[6px]"
                  >
                    <Wand2 className="w-3 h-3" /> Gerar Dieta Hipertrofia
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                      className="flex items-center gap-2 text-[#999999] hover:text-white transition-colors text-[12px] bg-dark-bg border border-dark-border px-3 py-1.5 rounded-[6px]"
                    >
                      <Download className="w-3 h-3" /> Importar Modelo
                    </button>
                    {showTemplateMenu && (
                      <div className="absolute right-0 top-full mt-2 w-[240px] bg-dark-card border border-dark-border rounded-[8px] shadow-2xl z-10 overflow-hidden">
                        <div className="p-[10px] border-b border-dark-border text-[11px] text-[#999] uppercase tracking-[1px]">
                          Modelos Salvos
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                          {mealTemplates.length === 0 ? (
                            <div className="p-[15px] text-center text-[#666] text-[12px]">
                              Nenhum modelo salvo.
                            </div>
                          ) : (
                            mealTemplates.map((t) => (
                              <div
                                key={t.id}
                                className="flex items-center hover:bg-white/[0.03] border-b border-dark-border last:border-0 transition-colors"
                              >
                                <button
                                  onClick={() => handleLoadTemplate(t)}
                                  className="flex-1 text-left px-[15px] py-[10px]"
                                >
                                  <div className="text-white text-[13px] font-[500] truncate">
                                    {t.name}
                                  </div>
                                  <div className="text-[#666] text-[11px] truncate">
                                    {t.foods.length} alimentos
                                  </div>
                                </button>
                                <button
                                  onClick={() => deleteMealTemplate(t.id)}
                                  className="px-[15px] pt-1 pb-1 text-[#666] hover:text-red-500 transition-colors"
                                  title="Remover Modelo"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleAddMeal}
                    className="flex items-center gap-1 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-[12px] px-3 py-1.5 rounded-[6px]"
                  >
                    <Plus className="w-3 h-3" /> Nova
                  </button>
                </div>
              </div>

              {localMeals.length === 0 ? (
                <div className="text-center py-[20px] text-[#666] text-[13px]">
                  Nenhuma refeição registrada. Comece montando a grade alimentar
                  aqui.
                </div>
              ) : (
                <div className="space-y-[15px]">
                  {localMeals.map((meal, mealIndex) => (
                    <div
                      key={meal.id}
                      className={`bg-dark-bg border transition-all duration-300 rounded-[12px] p-[15px] ${completedMeals[meal.id] ? "border-primary/50 shadow-[0_0_15px_rgba(46,204,113,0.1)]" : "border-dark-border"}`}
                    >
                      <div className="flex justify-between items-center mb-[15px]">
                        <div className="flex items-center gap-3 flex-1 mr-4">
                          {/* Modern Interactive Checkbox */}
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setCompletedMeals((prev) => ({
                                ...prev,
                                [meal.id]: !prev[meal.id],
                              }))
                            }
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                              completedMeals[meal.id]
                                ? "bg-primary border-primary shadow-[0_0_10px_rgba(46,204,113,0.3)]"
                                : "bg-dark-card border-dark-border hover:border-primary/50"
                            }`}
                          >
                            <AnimatePresence>
                              {completedMeals[meal.id] && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                          <div className="flex-1 w-full sm:w-auto flex items-center gap-2">
                             <input
                              type="time"
                              value={meal.time || ""}
                              onChange={(e) => {
                                const updated = [...localMeals];
                                const idx = updated.findIndex((m) => m.id === meal.id);
                                if (idx >= 0) updated[idx].time = e.target.value;
                                setLocalMeals(updated);
                              }}
                              className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-[12px] text-white focus:outline-none focus:border-primary font-mono w-[80px]"
                            />
                            <input
                              type="text"
                              value={meal.name}
                              onChange={(e) => {
                                const updated = [...localMeals];
                                const idx = updated.findIndex(
                                  (m) => m.id === meal.id,
                                );
                                if (idx >= 0)
                                  updated[idx].name = e.target.value;
                                setLocalMeals(updated);
                              }}
                              className={`bg-transparent border-none text-[16px] font-[600] tracking-[0.5px] focus:outline-none w-full transition-all duration-300 ${completedMeals[meal.id] ? "text-primary" : "text-white"}`}
                              placeholder="Nome da Refeição"
                            />
                            
                            <label className="flex items-center gap-2 cursor-pointer text-[12px] font-[500] text-[#999] hover:text-white transition-colors mt-1" title="Marcar como cardápio/refeição pronta">
                              <input 
                                type="checkbox" 
                                className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
                                checked={meal.isReadyMeal || false}
                                onChange={(e) => {
                                  const updated = [...localMeals];
                                  const idx = updated.findIndex((m) => m.id === meal.id);
                                  if (idx >= 0) updated[idx].isReadyMeal = e.target.checked;
                                  setLocalMeals(updated);
                                }}
                              />
                              <Utensils className="w-3.5 h-3.5 text-primary" />
                              Refeição Pronta
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-dark-border mt-2 sm:mt-0">
                          {(() => {
                            const totals = meal.foods.reduce(
                              (acc, f) => ({
                                kcals: acc.kcals + f.kcals,
                                p: acc.p + f.protein,
                                c: acc.c + f.carbs,
                                f: acc.f + f.fats,
                              }),
                              { kcals: 0, p: 0, c: 0, f: 0 },
                            );

                            return totals.kcals > 0 ? (
                              <div className="flex items-center gap-3 text-[10px] uppercase font-[600] tracking-[1px] bg-dark-bg px-3 py-1.5 rounded-full border border-dark-border mr-2">
                                <span className="text-white">
                                  {Math.round(totals.kcals)}
                                  <span className="text-[#666] ml-1">kcal</span>
                                </span>
                                <span className="w-1 h-1 rounded-full bg-dark-border" />
                                <span className="text-blue-500">
                                  {Math.round(totals.p)}g{" "}
                                  <span className="opacity-50">P</span>
                                </span>
                                <span className="text-green-500">
                                  {Math.round(totals.c)}g{" "}
                                  <span className="opacity-50">C</span>
                                </span>
                                <span className="text-yellow-500">
                                  {Math.round(totals.f)}g{" "}
                                  <span className="opacity-50">G</span>
                                </span>
                              </div>
                            ) : null;
                          })()}

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleMoveMealUp(mealIndex)}
                              disabled={mealIndex === 0}
                              className="text-[#666] hover:text-[#00D1FF] transition-colors p-[5px] disabled:opacity-30 disabled:hover:text-[#666]"
                              title="Mover para Cima"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveMealDown(mealIndex)}
                              disabled={mealIndex === localMeals.length - 1}
                              className="text-[#666] hover:text-[#00D1FF] transition-colors p-[5px] disabled:opacity-30 disabled:hover:text-[#666]"
                              title="Mover para Baixo"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSaveToTemplates(meal)}
                              className="text-primary hover:text-white transition-colors p-[5px] flex items-center gap-1 text-[11px] uppercase tracking-[0.5px]"
                              title="Salvar como Modelo"
                            >
                              <Bookmark className="w-3.5 h-3.5" />{" "}
                              <span className="hidden lg:inline">
                                Salvar Modelo
                              </span>
                            </button>
                            <button
                              onClick={() => handleRemoveMeal(meal.id)}
                              className="text-[#666] hover:text-red-500 transition-colors p-[5px]"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <textarea
                        value={meal.observations || ""}
                        onChange={(e) => {
                          const updated = [...localMeals];
                          const idx = updated.findIndex(
                            (m) => m.id === meal.id,
                          );
                          if (idx >= 0)
                            updated[idx].observations = e.target.value;
                          setLocalMeals(updated);
                        }}
                        placeholder="Observações ou orientações para esta refeição..."
                        className="w-full bg-dark-bg/50 border border-dark-border rounded-[8px] text-[#999] text-[12px] p-3 focus:outline-none focus:border-primary resize-none h-[40px] focus:h-[60px] transition-all mb-4"
                      />

                      <div className="space-y-3">
                        {meal.foods.map((food, i) => (
                          <motion.div
                            key={food.id || i}
                            layout
                            className={`bg-dark-card border transition-all duration-300 rounded-xl overflow-hidden ${
                              expandedFoods[food.id]
                                ? "border-primary/40 ring-1 ring-primary/20 shadow-lg"
                                : "border-dark-border hover:border-dark-border/80"
                            }`}
                          >
                            <div className="p-4">
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-lg">
                                    <Utensils className="w-4 h-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <input
                                      type="text"
                                      value={food.name}
                                      onChange={(e) =>
                                        handleFoodChange(
                                          meal.id,
                                          food.id,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-transparent border-none text-[14px] font-semibold text-white focus:outline-none focus:ring-0 placeholder:text-dark-border"
                                      placeholder="Nome do alimento"
                                    />
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <div className="flex items-center gap-1.5 bg-dark-bg/50 px-2 py-0.5 rounded-md border border-dark-border">
                                        <input
                                          type="number"
                                          value={food.quantity}
                                          onChange={(e) =>
                                            handleFoodChange(
                                              meal.id,
                                              food.id,
                                              "quantity",
                                              e.target.value,
                                            )
                                          }
                                          className="w-[45px] bg-transparent border-none text-center text-[12px] text-primary font-bold focus:outline-none focus:ring-0 p-0"
                                        />
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">g</span>
                                      </div>
                                      <span className="text-[11px] text-gray-500 font-medium tracking-tight">
                                        • {Math.round(food.kcals)} kcal {food.kitchenMeasure && `• ${food.kitchenMeasure}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => toggleFoodExpansion(food.id)}
                                    className={`p-2 rounded-lg transition-all ${
                                      expandedFoods[food.id]
                                        ? "bg-primary/20 text-primary rotate-180"
                                        : "bg-white/5 text-gray-500 hover:text-white"
                                    }`}
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRemoveFood(meal.id, food.id)
                                    }
                                    className="p-2 bg-red-500/10 text-red-500/70 hover:text-red-500 hover:bg-red-500/20 rounded-lg transition-all"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedFoods[food.id] && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="mt-4 pt-4 border-t border-dark-border"
                                  >
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                      <div className="bg-dark-bg/40 p-3 rounded-xl border border-dark-border/50 group">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5 group-hover:text-blue-500 transition-colors">Proteína</span>
                                        <div className="flex items-end gap-1">
                                          <input
                                            type="number"
                                            value={food.protein}
                                            onChange={(e) =>
                                              handleFoodChange(
                                                meal.id,
                                                food.id,
                                                "protein",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-transparent border-none text-[16px] font-bold text-blue-500 focus:outline-none focus:ring-0 p-0"
                                          />
                                          <span className="text-[11px] text-gray-600 font-bold mb-0.5">g</span>
                                        </div>
                                      </div>

                                      <div className="bg-dark-bg/40 p-3 rounded-xl border border-dark-border/50 group">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5 group-hover:text-green-500 transition-colors">Carbo</span>
                                        <div className="flex items-end gap-1">
                                          <input
                                            type="number"
                                            value={food.carbs}
                                            onChange={(e) =>
                                              handleFoodChange(
                                                meal.id,
                                                food.id,
                                                "carbs",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-transparent border-none text-[16px] font-bold text-green-500 focus:outline-none focus:ring-0 p-0"
                                          />
                                          <span className="text-[11px] text-gray-600 font-bold mb-0.5">g</span>
                                        </div>
                                      </div>

                                      <div className="bg-dark-bg/40 p-3 rounded-xl border border-dark-border/50 group">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5 group-hover:text-yellow-500 transition-colors">Gordura</span>
                                        <div className="flex items-end gap-1">
                                          <input
                                            type="number"
                                            value={food.fats}
                                            onChange={(e) =>
                                              handleFoodChange(
                                                meal.id,
                                                food.id,
                                                "fats",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-transparent border-none text-[16px] font-bold text-yellow-500 focus:outline-none focus:ring-0 p-0"
                                          />
                                          <span className="text-[11px] text-gray-600 font-bold mb-0.5">g</span>
                                        </div>
                                      </div>

                                      <div className="bg-dark-bg/40 p-3 rounded-xl border border-dark-border/50 group">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5 group-hover:text-white transition-colors">Calorias</span>
                                        <div className="flex items-end gap-1">
                                          <input
                                            type="number"
                                            value={food.kcals}
                                            onChange={(e) =>
                                              handleFoodChange(
                                                meal.id,
                                                food.id,
                                                "kcals",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-transparent border-none text-[16px] font-bold text-white focus:outline-none focus:ring-0 p-0"
                                          />
                                          <span className="text-[10px] text-gray-600 font-bold mb-0.5">KCAL</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-3 bg-dark-bg/40 p-3 rounded-xl border border-dark-border/50 group">
                                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5 group-hover:text-white transition-colors">Medida Caseira</span>
                                      <div className="flex items-end gap-1">
                                        <input
                                          type="text"
                                          value={food.kitchenMeasure || ""}
                                          onChange={(e) =>
                                            handleFoodChange(
                                              meal.id,
                                              food.id,
                                              "kitchenMeasure",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Ex: Equivalente a 1 colher de sopa ou aprox. 3 ovos"
                                          className="w-full bg-transparent border-none text-[13px] font-[500] text-gray-300 focus:outline-none focus:ring-0 p-0"
                                        />
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {addingFoodToMeal === meal.id ? (
                        <div className="mt-[15px] bg-dark-card border border-primary/30 rounded-[8px] p-[15px] space-y-[15px]">
                          <div className="relative">
                            <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                              Nome do Alimento (Base TBCA)
                            </label>
                            <input
                              type="text"
                              autoFocus
                              value={newFood.name}
                              onChange={(e) =>
                                handleNewFoodChange("name", e.target.value)
                              }
                              onKeyDown={handleKeyDown}
                              onBlur={() =>
                                setTimeout(() => setShowSearch(false), 200)
                              }
                              onFocus={() => {
                                if (newFood.name) setShowSearch(true);
                              }}
                              className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              placeholder="Pesquisar ex: Frango, Arroz, Ovo..."
                            />
                            {showSearch && searchResults.length > 0 && (
                              <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-dark-card border border-dark-border rounded-[8px] shadow-2xl overflow-hidden max-h-[200px] overflow-y-auto">
                                {searchResults.map((result, idx) => (
                                  <button
                                    key={result.id}
                                    type="button"
                                    onMouseEnter={() =>
                                      setActiveSearchIndex(idx)
                                    }
                                    onClick={() =>
                                      handleSelectFoodResult(result)
                                    }
                                    className={`w-full text-left px-4 py-2 border-b border-dark-border last:border-0 transition-colors ${
                                      activeSearchIndex === idx
                                        ? "bg-white/[0.1]"
                                        : "hover:bg-white/[0.05]"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="text-white text-[13px] font-[500]">
                                        {result.name}
                                      </div>
                                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                        {result.category}
                                      </span>
                                    </div>
                                    <div className="text-[#666] text-[11px]">
                                      {result.kcals} kcal | P: {result.protein}g | C: {result.carbs}g | G: {result.fats}g (100g)
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                            <div>
                              <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                                Qtd. (g)
                              </label>
                              <input
                                type="number"
                                value={newFood.quantity}
                                onChange={(e) =>
                                  handleNewFoodChange(
                                    "quantity",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-blue-500 uppercase tracking-[1px]">
                                Prot. (g)
                              </label>
                              <input
                                type="number"
                                value={newFood.protein}
                                onChange={(e) =>
                                  handleNewFoodChange("protein", e.target.value)
                                }
                                className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-green-500 uppercase tracking-[1px]">
                                Carb. (g)
                              </label>
                              <input
                                type="number"
                                value={newFood.carbs}
                                onChange={(e) =>
                                  handleNewFoodChange("carbs", e.target.value)
                                }
                                className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-yellow-500 uppercase tracking-[1px]">
                                Gord. (g)
                              </label>
                              <input
                                type="number"
                                value={newFood.fats}
                                onChange={(e) =>
                                  handleNewFoodChange("fats", e.target.value)
                                }
                                className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                                Kcals
                              </label>
                              <input
                                type="number"
                                value={newFood.kcals}
                                onChange={(e) =>
                                  handleNewFoodChange("kcals", e.target.value)
                                }
                                className="w-full bg-primary/10 border border-primary/30 rounded-[6px] px-3 py-1.5 text-primary mt-1 text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                                Medida Caseira
                              </label>
                              <input
                                type="text"
                                value={newFood.kitchenMeasure}
                                onChange={(e) =>
                                  handleNewFoodChange("kitchenMeasure", e.target.value)
                                }
                                placeholder="Ex: 2 unidades"
                                className="w-full bg-dark-bg border border-dark-border rounded-[6px] px-3 py-1.5 text-white mt-1 text-[13px]"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pt-2">
                            <button
                              onClick={() => handleSaveFoodToMeal(meal.id)}
                              className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-4 py-1.5 text-[13px] rounded-[6px] text-white"
                            >
                              <Check className="w-4 h-4" /> Confirmar
                            </button>
                            <button
                              onClick={() => setAddingFoodToMeal(null)}
                              className="text-[#999] text-[13px] hover:text-white"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAddingFoodToMeal(meal.id)}
                          className="flex justify-center items-center gap-2 w-full mt-[10px] text-primary/70 hover:text-primary border border-dashed border-dark-border hover:border-primary/50 text-[12px] py-[8px] rounded-[6px] transition-all"
                        >
                          <Plus className="w-3 h-3" /> Adicionar Alimento Manual
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUPPLEMENTS BLOCK */}
            <div className="rounded-[16px] bg-dark-card border border-[#8a2be2]/20 lg:col-span-2 p-[25px] mt-[25px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[25px] gap-4">
                <div>
                  <h3 className="text-[18px] text-[#8a2be2] font-[500] flex items-center gap-2">
                    💊 Protocolo de Suplementação
                  </h3>
                  <p className="text-[13px] text-[#999999] mt-1">
                    Organize os suplementos fora das refeições para melhor
                    visualização.
                  </p>
                </div>
                <button
                  onClick={() => setAddingSupplement(true)}
                  className="bg-dark-bg border border-[#8a2be2]/30 hover:border-[#8a2be2] text-[#8a2be2] hover:text-white hover:bg-[#8a2be2]/20 px-4 py-2 rounded-[8px] text-[13px] transition-all flex items-center gap-2 font-[500]"
                >
                  <Plus className="w-4 h-4" /> Novo Suplemento
                </button>
              </div>

              {localSupplements.length === 0 && !addingSupplement ? (
                <div className="text-center py-[20px] text-[#666] text-[13px]">
                  Nenhum suplemento registrado ou sugerido.
                </div>
              ) : (
                <div className="space-y-[15px]">
                  {localSupplements.map((sup) => (
                    <div
                      key={sup.id}
                      className="bg-dark-bg border border-dark-border rounded-[12px] p-[15px] flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="text-[15px] font-[500] text-white flex items-center gap-2">
                          {sup.name}
                        </div>
                        <div className="text-[13px] text-[#999] mt-1 flex items-center gap-4">
                          <span>
                            <strong>Dose:</strong> {sup.dosage}
                          </span>
                          {sup.time && (
                            <span>
                              <strong>Uso:</strong> {sup.time}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-[11px] text-blue-500 uppercase">
                              Prot
                            </div>
                            <div className="text-white text-[13px]">
                              {sup.protein}g
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[11px] text-green-500 uppercase">
                              Carb
                            </div>
                            <div className="text-white text-[13px]">
                              {sup.carbs}g
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[11px] text-yellow-500 uppercase">
                              Gord
                            </div>
                            <div className="text-white text-[13px]">
                              {sup.fats}g
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[11px] text-[#999] uppercase">
                              Kcal
                            </div>
                            <div className="text-primary text-[13px] font-[500]">
                              {sup.kcals}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSupplement(sup.id)}
                          className="p-2 text-[#999] hover:text-red-500 transition-colors ml-auto md:ml-0 bg-white/5 rounded-[6px] hover:bg-white/10"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {addingSupplement && (
                    <div className="bg-dark-bg border border-[#8a2be2]/30 rounded-[12px] p-[20px] mt-[15px]">
                      <h4 className="text-[13px] text-white font-[500] mb-[15px]">
                        Adicionar Novo Suplemento
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                            Nome do Suplemento
                          </label>
                          <input
                            type="text"
                            value={newSupplement.name}
                            onChange={(e) =>
                              setNewSupplement({
                                ...newSupplement,
                                name: e.target.value,
                              })
                            }
                            className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                            placeholder="Ex: Whey Protein Isolado"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                              Dosagem
                            </label>
                            <input
                              type="text"
                              value={newSupplement.dosage}
                              onChange={(e) =>
                                setNewSupplement({
                                  ...newSupplement,
                                  dosage: e.target.value,
                                })
                              }
                              className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                              placeholder="Ex: 30g (1 scoop)"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                              Horário/Uso
                            </label>
                            <input
                              type="text"
                              value={newSupplement.time}
                              onChange={(e) =>
                                setNewSupplement({
                                  ...newSupplement,
                                  time: e.target.value,
                                })
                              }
                              className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                              placeholder="Ex: Pós-treino"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="text-[11px] text-blue-500 uppercase tracking-[1px]">
                            Prot. (g)
                          </label>
                          <input
                            type="number"
                            value={newSupplement.protein}
                            onChange={(e) =>
                              setNewSupplement({
                                ...newSupplement,
                                protein: e.target.value,
                              })
                            }
                            className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-green-500 uppercase tracking-[1px]">
                            Carb. (g)
                          </label>
                          <input
                            type="number"
                            value={newSupplement.carbs}
                            onChange={(e) =>
                              setNewSupplement({
                                ...newSupplement,
                                carbs: e.target.value,
                              })
                            }
                            className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-yellow-500 uppercase tracking-[1px]">
                            Gord. (g)
                          </label>
                          <input
                            type="number"
                            value={newSupplement.fats}
                            onChange={(e) =>
                              setNewSupplement({
                                ...newSupplement,
                                fats: e.target.value,
                              })
                            }
                            className="w-full bg-dark-card border border-dark-border rounded-[6px] px-3 py-2 text-white mt-1 text-[13px]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#999] uppercase tracking-[1px]">
                            Kcals Total
                          </label>
                          <input
                            type="number"
                            value={newSupplement.kcals}
                            onChange={(e) =>
                              setNewSupplement({
                                ...newSupplement,
                                kcals: e.target.value,
                              })
                            }
                            className="w-full bg-primary/10 border border-primary/30 rounded-[6px] px-3 py-2 text-primary mt-1 text-[13px]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={handleSaveSupplement}
                          className="flex items-center gap-2 bg-[#8a2be2] hover:bg-[#9a3bf2] px-4 py-2 text-[13px] rounded-[6px] text-white transition-colors"
                        >
                          <Check className="w-4 h-4" /> Salvar Suplemento
                        </button>
                        <button
                          onClick={() => setAddingSupplement(false)}
                          className="text-[#999] text-[13px] hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Modal - Send Plan */}
      {sendModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pb-24 sm:pb-4">
          <div className="bg-[#111] border border-[#00e676]/30 shadow-[0_0_50px_rgba(0,230,118,0.15)] rounded-3xl w-full max-w-lg overflow-hidden flex flex-col relative z-[61] max-h-[85dvh] sm:max-h-[85vh]">
            <div className="p-5 sm:p-6 border-b border-light-border flex justify-between items-center bg-gradient-to-r from-[#00e676]/10 to-transparent shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00e676]/20 flex items-center justify-center">
                  <Copy className="w-5 h-5 text-[#00e676]" />
                </div>
                <h3 className="text-xl font-bold text-white">Enviar Dieta</h3>
              </div>
              <button 
                onClick={() => setSendModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Selecione um aluno abaixo para enviar a dieta atual de {selectedStudent?.name}. <strong className="text-[#00e676]">A dieta do aluno selecionado será sobrescrita.</strong>
              </p>

              <div className="space-y-3">
                {students.filter(s => s.id !== selectedStudent?.id).length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-4">Nenhum outro aluno cadastrado.</p>
                ) : (
                  students
                    .filter(s => s.id !== selectedStudent?.id)
                    .map(student => (
                      <div 
                        key={student.id}
                        onClick={() => setStudentToSendTo(student.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          studentToSendTo === student.id ? 'bg-[#00e676]/20 border-[#00e676]/50' : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {student.profilePicture ? (
                            <img src={student.profilePicture} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-gray-400 font-bold">{student.name.charAt(0)}</span>
                            </div>
                          )}
                          <div>
                            <p className="text-white font-bold text-sm tracking-tight">{student.name}</p>
                            <p className="text-xs text-gray-400">{student.dietPlan?.targetCalories ? `${student.dietPlan?.targetCalories} kcal` : 'Sem dieta'}</p>
                          </div>
                        </div>
                      </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-[#111] flex gap-3 shrink-0 sticky bottom-0 z-10">
              <button
                onClick={() => setSendModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendPlan}
                className="flex-1 bg-[#00e676] hover:bg-[#00e676]/80 text-black px-4 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                disabled={!studentToSendTo}
              >
                Enviar Dieta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
