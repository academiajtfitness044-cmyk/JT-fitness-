const fs = require("fs");
const path = require("path");

const folders = [
  { url: "https://drive.google.com/drive/folders/1njhjf9tIZjQ8_tpVHLtXWF4p4SiMNeWX", key: "1ABDOMINAIS", muscleGroup: "Abdômen", category: "Abdominal" },
  { url: "https://drive.google.com/drive/folders/1sReQ4ZRg2XmkZLR9oEqPX9ZQCQ5grFHB", key: "2ANTEBRAÇO", muscleGroup: "Antebraço", category: "Antebraço" },
  { url: "https://drive.google.com/drive/folders/1NxdlDO529OAXjDYHXOCXy6I89dUOvnxy", key: "3BÍCEPS", muscleGroup: "Bíceps", category: "Bíceps" },
  { url: "https://drive.google.com/drive/folders/1qhwu7Jo1tQntZY28Kjythu4bj13sy2qx", key: "4CARDIO", muscleGroup: "Cardio", category: "Cardio / Aeróbico" },
  { url: "https://drive.google.com/drive/folders/1rUlTYG1xCoIXg-oq5Mnz7C4LBT5URsfv", key: "5COSTAS", muscleGroup: "Costas", category: "Dorsal / Costas" },
  { url: "https://drive.google.com/drive/folders/1zY1QJ-eHOXHTnBaiKrxa8Xa9lUPQEGYg", key: "6GLÚTEOS", muscleGroup: "Glúteos", category: "Glúteos" },
  { url: "https://drive.google.com/drive/folders/1cTsZowYnJQNfNv9TSfQ_plSUMmKfLS-1", key: "7MEMBROS INFERIORES", muscleGroup: "Pernas", category: "Membros Inferiores / Pernas" },
  { url: "https://drive.google.com/drive/folders/1npLszEZhOy7ZyfHHtHLVATlJHOy0X1kF", key: "8OMBRO", muscleGroup: "Ombros", category: "Ombro / Deltoide" },
  { url: "https://drive.google.com/drive/folders/1OriCGO2xkRHf0CfREszWsv8AsyUS7THV", key: "9PANTURRILHA", muscleGroup: "Panturrilha", category: "Panturrilha" },
  { url: "https://drive.google.com/drive/folders/1AhoaFnRztROqCVeo8QP_rCkYbqMPcwhb", key: "10PEITO", muscleGroup: "Peito", category: "Peitoral" },
  { url: "https://drive.google.com/drive/folders/1pEy5jXKb0uMooR5EQ_8Df0yFafzsOhTQ", key: "11TRÍCEPS", muscleGroup: "Tríceps", category: "Tríceps" },
  { url: "https://drive.google.com/drive/folders/1YyV6_BQqVdq5wPlUI3fV-CFMe3-TkurW", key: "12TRAPÉZIO", muscleGroup: "Trapézio", category: "Trapézio" },
  { url: "https://drive.google.com/drive/folders/1Rh9ptypYF8LD55A9UOqD-4CCaoBIG38S", key: "13TODO CORPO", muscleGroup: "Corpo Todo", category: "Corpo Todo / Full Body" },
  { url: "https://drive.google.com/drive/folders/1vIhPHdtrzq3JlRzbPF_9kpgr2fCkG0xF", key: "14PESCOÇO", muscleGroup: "Pescoço", category: "Pescoço / Cervical" },
  { url: "https://drive.google.com/drive/folders/19mjQ0CG6FCwSjFriAYsYs-kJ89NE_YYS", key: "15AGACHAMENTOS GIFS", muscleGroup: "Pernas", category: "Agachamentos" },
  { url: "https://drive.google.com/drive/folders/1mcnSZCUYeB08TRNM4aHV1o86nTZ7g-ZF", key: "16CROSS", muscleGroup: "Funcional", category: "Cross / Funcional" },
  { url: "https://drive.google.com/drive/folders/1GGGdYTEyaJeCCQ1jl7_5n6f6zbLUuU-j", key: "17PARALELAS", muscleGroup: "Peito / Tríceps", category: "Paralelas" },
  { url: "https://drive.google.com/drive/folders/1sgdg3hixsjb2zEjaxsrKN4_SobC-HU-k", key: "18MOBILIDADE/ALONGAMENTO", muscleGroup: "Alongamento", category: "Mobilidade / Alongamento" }
];

function cleanTitle(raw, folder) {
  let name = raw
    .replace(/\.(gif|png|jpeg|jpg|webp)$/i, "")
    .replace(/^[0-9]+[\.\-\_\s]+/, "")
    .replace(/[\-_]+/g, " ")
    .trim();

  // Dictionary for translation
  const dict = {
    "alternate heel touchers": "Toque no Calcanhar Alternado",
    "ball sit up": "Abdominal com Bola",
    "barbell rollout": "Abdominal Rollout com Barra",
    "bicycle crunch movement": "Abdominal Bicicleta",
    "barbell reverse curl": "Rosca Inversa com Barra",
    "alternating hammer curls": "Rosca Martelo Alternada",
    "arm blaster benefits": "Rosca no Arm Blaster",
    "barbell cheat curl": "Rosca com Barra (Roubada)",
    "airbike": "Air Bike",
    "alpinista": "Mountain Climber (Alpinista)",
    "band assisted pull up": "Barra Fixa com Elástico",
    "band lat pulldown": "Puxada com Elástico",
    "band pull apart": "Crucifixo Inverso com Elástico",
    "cable one arm lateral raise": "Elevação Lateral com Polia",
    "bench dips on floor": "Mergulho no Banco",
    "bench tricep dips": "Mergulho no Banco",
    "arnold press": "Desenvolvimento Arnold",
    "cable lying tricep extension": "Tríceps Testa no Cabo",
    "assisted push up with resistance band": "Flexão com Elástico",
    "barbell bench press": "Supino Reto com Barra",
    "barbell decline bench press": "Supino Declinado com Barra",
    "band pushdown": "Tríceps Pulley com Elástico",
    "battle ropes exercise": "Corda Naval",
    "box jump": "Salto na Caixa",
    "parallel bar dips": "Paralelas",
    "korean dips": "Mergulho Coreano",
    "assisted dip": "Paralelas Assistidas",
    "abd maquina": "Abdominal na Máquina",
    "abds": "Abdominais",
    "banco alternado": "Banco Alternado",
    "cacho de punho": "Rosca de Punho",
    "curva de punho": "Rosca de Punho",
    "halter": "Halter",
    "halteres": "Halteres",
    "dumbbell": "Halter",
    "barbell": "Barra",
    "pull up": "Barra Fixa",
    "push up": "Flexão de Braço",
    "bench press": "Supino",
    "squat": "Agachamento",
    "deadlift": "Levantamento Terra",
    "curl": "Rosca",
    "extension": "Extensão",
    "cable": "Cabo / Polia",
    "smith": "Smith Machine",
    "alongamente": "Alongamento"
  };

  const lowerName = name.toLowerCase();
  for (const [en, pt] of Object.entries(dict)) {
    if (lowerName.includes(en)) {
      name = name.toLowerCase().replace(en, pt);
    }
  }

  if (/^\d+$/.test(name) || !name) {
    const cleanFolder = folder.key.replace(/^[0-9]+/, "");
    name = `${cleanFolder} ${name ? "Exercício " + name : "Exercício"}`;
  }

  name = name.split(" ")
    .filter(Boolean)
    .map(w => {
      const lower = w.toLowerCase();
      if (["de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas", "com", "e", "para"].includes(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");

  return name.charAt(0).toUpperCase() + name.slice(1);
}

function detectEquipment(name, raw, folder) {
  const t = (name + " " + raw).toLowerCase();
  if (t.includes("halter") || t.includes("dumbbell")) return "Halteres";
  if (t.includes("barra") || t.includes("barbell")) return "Barra";
  if (t.includes("polia") || t.includes("cabo") || t.includes("cable") || t.includes("crossover")) return "Polia / Cabo";
  if (t.includes("maquina") || t.includes("máquina") || t.includes("machine") || t.includes("smith") || t.includes("leg press") || t.includes("hack")) return "Máquina";
  if (t.includes("elastico") || t.includes("elástico") || t.includes("band")) return "Elástico / Band";
  if (t.includes("bola") || t.includes("ball")) return "Bola Suíça";
  if (t.includes("banco") || t.includes("bench")) return "Banco";
  if (t.includes("paralela") || t.includes("paralelas") || t.includes("dips")) return "Barras Paralelas";
  if (t.includes("corda") || t.includes("rope")) return "Corda Naval";
  if (folder.muscleGroup === "Cardio") return "Aparelho Aeróbico";
  if (folder.muscleGroup === "Alongamento") return "Solo / Peso Corporal";
  return "Peso Corporal / Geral";
}

function buildTags(name, raw, folder, equipment) {
  const set = new Set();
  const rawWords = (name + " " + raw + " " + folder.muscleGroup + " " + folder.category + " " + equipment)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2);

  rawWords.forEach(w => set.add(w));
  return Array.from(set);
}

async function run() {
  console.log("Starting fetch from 18 Google Drive folders...");
  const gifItems = [];
  const exerciseItems = [];
  const seenIds = new Set();

  for (let i = 0; i < folders.length; i++) {
    const f = folders[i];
    console.log(`[${i+1}/${folders.length}] Fetching ${f.key}...`);
    try {
      const res = await fetch(f.url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
      const html = await res.text();
      const m = html.match(/window\x5b\x27_DRIVE_ivd\x27\x5d\s*=\s*\x27(.*?)\x27;/s);
      if (!m) {
        console.warn(`No _DRIVE_ivd in ${f.key}`);
        continue;
      }
      const unescaped = m[1].replace(/\\x([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
                            .replace(/\\u([0-9A-Fa-f]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
      const regex = /\["([a-zA-Z0-9_-]{25,})",\["[^"]*"\],"([^"]+?)","image\\?\/(?:gif|png|jpeg|webp|jpg)"/g;
      const matches = [...unescaped.matchAll(regex)];

      console.log(`  -> Found ${matches.length} files in ${f.key}`);

      for (const match of matches) {
        const driveId = match[1];
        const rawFilename = match[2];
        const id = `drive-${driveId}`;

        if (seenIds.has(driveId)) {
          continue;
        }
        seenIds.add(driveId);

        const cleanName = cleanTitle(rawFilename, f);
        const equipment = detectEquipment(cleanName, rawFilename, f);
        const tags = buildTags(cleanName, rawFilename, f, equipment);
        const mediaUrl = `https://lh3.googleusercontent.com/d/${driveId}`;

        gifItems.push({
          id,
          name: cleanName,
          muscleGroup: f.muscleGroup,
          equipment,
          gifUrl: mediaUrl,
          source: "Google Drive",
          driveId,
          category: f.category,
          tags
        });

        exerciseItems.push({
          id,
          name: cleanName,
          muscleGroup: f.muscleGroup,
          equipment,
          instructions: `Execução de ${cleanName}. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.`,
          gifUrl: mediaUrl,
          thumbnail: mediaUrl,
          previewUrl: mediaUrl
        });
      }
    } catch (err) {
      console.error(`Error fetching folder ${f.key}:`, err);
    }
  }

  console.log(`\nTotal unique GIFs gathered: ${gifItems.length}`);

  // Write src/data/exerciseGifs.ts
  const gifTsContent = `export interface ExerciseGifItem {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  gifUrl: string;
  source?: string;
  tags?: string[];
  category?: string;
  driveId?: string;
}

// Complete library of ${gifItems.length} Google Drive exercise GIF animations
export const EXERCISE_GIFS: ExerciseGifItem[] = ${JSON.stringify(gifItems, null, 2)};

export function findBestExerciseGif(nameOrExercise: any, muscleGroup?: string): string | undefined {
  if (!nameOrExercise) return EXERCISE_GIFS[0]?.gifUrl;
  
  if (typeof nameOrExercise === 'object' && nameOrExercise !== null) {
    if (nameOrExercise.gifUrl && nameOrExercise.gifUrl.trim() !== '') {
      return nameOrExercise.gifUrl;
    }
    return searchGifByKeywords(nameOrExercise.name || '', nameOrExercise.muscleGroup || muscleGroup || '');
  }

  return searchGifByKeywords(String(nameOrExercise), muscleGroup || '');
}

function searchGifByKeywords(name: string, muscle: string): string | undefined {
  const normName = (name || '').toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").trim();
  const normMuscle = (muscle || '').toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").trim();

  if (!normName) return EXERCISE_GIFS[0]?.gifUrl;

  // 1. Direct Exact / Substring Name Match
  for (const item of EXERCISE_GIFS) {
    const itemNorm = item.name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    if (normName === itemNorm || normName.includes(itemNorm) || itemNorm.includes(normName)) {
      return item.gifUrl;
    }
  }

  // 2. Keyword / Tag scoring match
  const nameWords = normName.split(/\\s+/).filter(w => w.length > 2);
  let bestItem: ExerciseGifItem | null = null;
  let maxScore = 0;

  for (const item of EXERCISE_GIFS) {
    const itemNorm = item.name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    let score = 0;

    for (const word of nameWords) {
      if (itemNorm.includes(word)) score += 3;
      if (item.tags && item.tags.some(t => t.includes(word))) score += 1.5;
    }

    if (normMuscle) {
      const itemMuscleNorm = item.muscleGroup.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
      if (normMuscle.includes(itemMuscleNorm) || itemMuscleNorm.includes(normMuscle)) {
        score += 2;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestItem = item;
    }
  }

  if (bestItem && maxScore >= 2) {
    return bestItem.gifUrl;
  }

  // 3. Muscle Group Fallback
  for (const item of EXERCISE_GIFS) {
    const itemMuscleNorm = item.muscleGroup.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    if (normMuscle && (normMuscle.includes(itemMuscleNorm) || itemMuscleNorm.includes(normMuscle))) {
      return item.gifUrl;
    }
  }

  return EXERCISE_GIFS[0]?.gifUrl;
}
`;

  fs.writeFileSync(path.resolve("src/data/exerciseGifs.ts"), gifTsContent, "utf-8");
  console.log("Successfully wrote src/data/exerciseGifs.ts!");

  // Write src/data/exerciseDatabase.ts
  const dbTsContent = `import { findBestExerciseGif, EXERCISE_GIFS } from './exerciseGifs';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions?: string;
  videoUrl?: string;
  gifUrl?: string;
  thumbnail?: string;
  previewUrl?: string;
  iframeUrl?: string;
  videoGender?: 'M' | 'F';
}

// Complete library of ${exerciseItems.length} Google Drive GIF exercises catalog
export const EXERCISE_DATABASE: Exercise[] = ${JSON.stringify(exerciseItems, null, 2)};

function normalizeSlug(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function enrichExerciseMedia(ex: Exercise): Exercise {
  if (!ex) return ex;
  if (!ex.gifUrl || ex.gifUrl.trim() === '') {
    const gif = findBestExerciseGif(ex.name, ex.muscleGroup);
    if (gif) {
      return { ...ex, gifUrl: gif };
    }
  }
  return ex;
}

export function findExerciseById(idOrName?: string): Exercise {
  let matched: Exercise;

  if (!idOrName || !EXERCISE_DATABASE.length) {
    matched = EXERCISE_DATABASE[0] || {
      id: 'default',
      name: 'Exercício',
      muscleGroup: 'Geral',
      equipment: '-'
    };
  } else {
    // 1. Direct match by exact ID
    const directMatch = EXERCISE_DATABASE.find(e => e.id === idOrName);
    if (directMatch) {
      matched = directMatch;
    } else {
      // 2. Match GUID inside the string
      const guidMatch = idOrName.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
      if (guidMatch) {
        const byGuid = EXERCISE_DATABASE.find(e => e.id.toLowerCase() === guidMatch[0].toLowerCase());
        if (byGuid) matched = byGuid;
        else matched = EXERCISE_DATABASE[0];
      } else {
        // 3. Match normalized slug / name
        const targetSlug = normalizeSlug(idOrName);
        const bySlug = EXERCISE_DATABASE.find(e => {
          const eSlug = normalizeSlug(e.name);
          return eSlug === targetSlug || (targetSlug.length > 5 && (targetSlug.includes(eSlug) || eSlug.includes(targetSlug)));
        });

        if (bySlug) {
          matched = bySlug;
        } else {
          // 4. Match keywords
          const keywords = idOrName.toLowerCase().split(/[-_ ]+/).filter(w => w.length > 3);
          if (keywords.length > 0) {
            const byKeyword = EXERCISE_DATABASE.find(e => {
              const eName = e.name.toLowerCase();
              return keywords.filter(k => eName.includes(k)).length >= Math.min(2, keywords.length);
            });
            matched = byKeyword || EXERCISE_DATABASE[0];
          } else {
            matched = EXERCISE_DATABASE[0];
          }
        }
      }
    }
  }

  return enrichExerciseMedia(matched);
}
`;

  fs.writeFileSync(path.resolve("src/data/exerciseDatabase.ts"), dbTsContent, "utf-8");
  console.log("Successfully wrote src/data/exerciseDatabase.ts!");
}

run();
