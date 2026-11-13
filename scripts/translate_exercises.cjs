const fs = require('fs');

const translationMap = {
  "Alternate Heel Touchers": "Toque no Calcanhar Alternado",
  "Ball Sit Up": "Abdominal com Bola",
  "Barbell Rollout": "Abdominal Rollout com Barra",
  "Bicycle Crunch Movement": "Abdominal Bicicleta",
  "Barbell Reverse Curl": "Rosca Inversa com Barra",
  "Alternating Hammer Curls": "Rosca Martelo Alternada",
  "Arm Blaster Benefits": "Rosca no Arm Blaster",
  "Barbell Cheat Curl": "Rosca com Barra (Roubada)",
  "Airbike": "Air Bike",
  "Alpinista": "Mountain Climber (Alpinista)",
  "Band Assisted Pull Up": "Barra Fixa com Elástico",
  "Band Lat Pulldown": "Puxada com Elástico",
  "Band Pull Apart": "Crucifixo Inverso com Elástico",
  "Cable One Arm Lateral Raise": "Elevação Lateral com Polia",
  "Bench Dips On Floor": "Mergulho no Banco",
  "Bench Tricep Dips": "Mergulho no Banco",
  "Arnold Press": "Desenvolvimento Arnold",
  "Cable Lying Tricep Extension": "Tríceps Testa no Cabo",
  "Assisted Push Up With Resistance Band": "Flexão com Elástico",
  "Barbell Bench Press": "Supino Reto com Barra",
  "Barbell Decline Bench Press": "Supino Declinado com Barra",
  "Band Pushdown": "Tríceps Pulley com Elástico",
  "Battle Ropes Exercise": "Corda Naval",
  "Box Jump": "Salto na Caixa",
  "Parallel Bar Dips": "Paralelas",
  "Korean Dips": "Mergulho Coreano",
  "Assisted Dip": "Paralelas Assistidas",
  "Dumbbell": "Halter",
  "Barbell": "Barra"
};

function translateName(name) {
  let translated = name;
  for (const [en, pt] of Object.entries(translationMap)) {
    // Case insensitive replacement
    const regex = new RegExp(en, 'gi');
    translated = translated.replace(regex, pt);
  }
  return translated;
}

// Read and update both files
const files = ['src/data/exerciseGifs.ts', 'src/data/exerciseDatabase.ts'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Regex to find "name": "..."
  content = content.replace(/"name":\s*"([^"]+)"/g, (match, p1) => {
    return `"name": "${translateName(p1)}"`;
  });
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
