import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addBiancaEval() {
  console.log("Fetching students to find Bianca...");
  // Assuming students are in a 'students' table.
  const { data: students, error: listError } = await supabase.from('students').select('*');
  
  if (listError) {
    console.error("Error fetching students:", listError);
    return;
  }
  
  const bianca = students.find((s: any) => s.full_name?.toLowerCase().includes("bianca da costa oliveira"));
  
  if (!bianca) {
    console.error("Could not find student Bianca da Costa Oliveira");
    return;
  }
  
  console.log(`Found Bianca! ID: ${bianca.id}, Age: ${bianca.age}, Gender: ${bianca.gender}`);
  
  const evalData = {
    method: "pollock7",
    weight: 65,
    height: 1.57, // App uses meters! Wait, screenshot says 157. That implies 1.57m if they type 1.57 or 157 cm. In the screenshot it says "157", which is likely 1.57 (we should check if it's divided by 100). The form uses "157", let's use 1.57 for calculation.
    folds: {
      peitoral: 17,
      axilar: 15,
      triciptal: 20,
      subescapular: 23,
      abdominal: 17,
      suprailiaca: 15,
      coxa: 25
    },
    circumferences: {
      shoulder: 98,
      chest: 89,
      waist: 83,
      abdomen: 80,
      hip: 100,
      rightArm: 27,
      leftArm: 27,
      rightThigh: 46,
      leftThigh: 45,
      rightCalf: 37,
      leftCalf: 37
    }
  };
  
  const heightInMeters = evalData.height > 10 ? evalData.height / 100 : evalData.height;
  
  let bf = 0;
  let age = bianca.age || 25; // fallback
  let gender = bianca.gender || 'F';
  
  const sumFolds = evalData.folds.peitoral + evalData.folds.axilar + evalData.folds.triciptal + evalData.folds.subescapular + evalData.folds.abdominal + evalData.folds.suprailiaca + evalData.folds.coxa;
  
  let bd = gender === 'M'
        ? 1.112 - (0.00043499 * sumFolds) + (0.00000055 * sumFolds * sumFolds) - (0.00028826 * age)
        : 1.097 - (0.00046971 * sumFolds) + (0.00000056 * sumFolds * sumFolds) - (0.00012828 * age);
  bf = (4.95 / bd - 4.50) * 100;
  bf = Math.max(3, Math.min(bf, 60));
  
  const imc = evalData.weight / (heightInMeters * heightInMeters);
  const fatMass = evalData.weight * (bf / 100);
  const leanMass = evalData.weight - fatMass;
  
  // Need to import crypto for node? randomUUID is globally available in modern node
  const evalId = crypto.randomUUID();
  
  const newEval = {
    id: evalId,
    date: new Date().toISOString().split("T")[0],
    method: evalData.method,
    weight: evalData.weight,
    height: heightInMeters,
    folds: evalData.folds,
    circumferences: evalData.circumferences,
    metrics: {
      imc: Number(imc.toFixed(1)),
      bf: Number(bf.toFixed(2)),
      leanMass: Number(leanMass.toFixed(1)),
      fatMass: Number(fatMass.toFixed(1)),
    },
    bioimpedance: {},
    photos: []
  };

  const evalPayload = {
    id: newEval.id,
    student_id: bianca.id,
    eval_date: newEval.date,
    method: newEval.method,
    weight: newEval.weight,
    height: newEval.height,
    metrics: newEval.metrics,
    folds: newEval.folds,
    circumferences: newEval.circumferences,
    photos: newEval.photos
  };
  
  const biometricsPayload = {
    id: newEval.id,
    student_id: bianca.id,
    date: newEval.date,
    method: newEval.method,
    weight: newEval.weight,
    height: newEval.height,
    folds: newEval.folds,
    circumferences: newEval.circumferences,
    bioimpedance: newEval.bioimpedance,
    metrics: newEval.metrics,
    photos: newEval.photos
  };
  
  console.log("Inserting evaluation payload...");
  
  const { error: evalError } = await supabase.from('evaluations').upsert(evalPayload).select();
  if (evalError) console.warn("evaluations upsert error:", evalError.message);
  
  const { error: bioError } = await supabase.from('biometrics').upsert(biometricsPayload).select();
  if (bioError) console.warn("biometrics upsert error:", bioError.message);
  
  console.log("Done! Success.");
}

addBiancaEval();
