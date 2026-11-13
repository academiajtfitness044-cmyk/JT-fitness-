import fs from 'fs';

async function fetchLegacy() {
  console.log("Fetching legacy from Bunny API...");
  const zoneName = 'protocolo-pap-storage';
  const baseUrl = `https://storage.bunnycdn.com/${zoneName}/`;
  const apiKey = '80ce5ca2-1d1b-4ae9-9a41d8a96640-8169-474f';
  const allFiles: any[] = [];

  async function fetchDirectory(dirPath: string) {
      const url = `${baseUrl}${dirPath}`;
      const response = await fetch(url, { headers: { "AccessKey": apiKey, "Accept": "application/json" } });
      if (!response.ok) return;
      const data = await response.json();
      for (const item of data) {
         if (item.IsDirectory) {
           await fetchDirectory(`${dirPath}${item.ObjectName}/`);
         } else {
           allFiles.push({ ...item, Path: dirPath });
         }
      }
  }

  await fetchDirectory("");
  
  const newDb = [];
  let idCounter = 1;

  for (const item of allFiles) {
    if (!item.ObjectName.match(/\.(mp4|mov|avi|webm)$/i)) continue;
    const fileName = item.ObjectName.replace(/\.[^/.]+$/, "");
    const isFemale = item.Path.includes('Exercícios mulheres') || item.Path.includes('Exercicios mulheres');
    const videoGender = isFemale ? 'F' : 'M';
    let muscleGroup = "Outros";
    const pathLower = item.Path.toLowerCase();
    if (pathLower.includes('abdomen') || pathLower.includes('abdômen') || pathLower.includes('abdominais')) muscleGroup = "Abdômen";
    else if (pathLower.includes('biceps') || pathLower.includes('bíceps')) muscleGroup = "Bíceps";
    else if (pathLower.includes('costa')) muscleGroup = "Costas";
    else if (pathLower.includes('gluteo') || pathLower.includes('glúteo')) muscleGroup = "Glúteos";
    else if (pathLower.includes('ombro') || pathLower.includes('omobro')) muscleGroup = "Ombros";
    else if (pathLower.includes('panturilha') || pathLower.includes('panturinha') || pathLower.includes('panturrilha')) muscleGroup = "Panturrilha";
    else if (pathLower.includes('peito')) muscleGroup = "Peito";
    else if (pathLower.includes('posterior')) muscleGroup = "Posterior de Coxa";
    else if (pathLower.includes('quadriceps') || pathLower.includes('quadríceps') || pathLower.includes('perna')) muscleGroup = "Quadríceps";
    else if (pathLower.includes('trapezio') || pathLower.includes('trapézio')) muscleGroup = "Trapézio";
    else if (pathLower.includes('triceps') || pathLower.includes('tríceps')) muscleGroup = "Tríceps";
    else if (pathLower.includes('terra')) muscleGroup = "Costas";

    newDb.push({
      id: `auto-${idCounter++}-${isFemale ? 'f' : 'm'}`,
      name: fileName.replace(/_/g, " "),
      muscleGroup,
      equipment: "-",
      videoUrl: "", // Strip old bunny URLs
      videoGender
    });
  }
  
  newDb.sort((a, b) => {
     if (a.videoGender !== b.videoGender) return a.videoGender === 'M' ? -1 : 1;
     if (a.muscleGroup !== b.muscleGroup) return a.muscleGroup.localeCompare(b.muscleGroup);
     return a.name.localeCompare(b.name);
  });

  return newDb;
}

const cleanName = (name: string): string => {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\.[^/.]+$/, "").replace(/\b(homem|mulher|feminino|masculino|fem|masc|_)\b/g, "").replace(/[^a-z0-9]/g, "").trim();
};

async function fetchPanda() {
  const url = 'http://localhost:3000/api/videos';
  const res = await fetch(url);
  const data = await res.json();
  const exercises = [];
  
  for (const item of data) {
    const rawName = item.ObjectName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    const isFemale = item.Path.includes('Exercícios mulheres') || item.Path.includes('Exercicios mulheres');
    const videoGender = isFemale ? 'F' : 'M';
    let muscleGroup = "Outros";
    const pathLower = item.Path.toLowerCase();
    if (pathLower.includes('abdomen') || pathLower.includes('abdômen') || pathLower.includes('abdominais')) muscleGroup = "Abdômen";
    else if (pathLower.includes('biceps') || pathLower.includes('bíceps')) muscleGroup = "Bíceps";
    else if (pathLower.includes('costa')) muscleGroup = "Costas";
    else if (pathLower.includes('gluteo') || pathLower.includes('glúteo')) muscleGroup = "Glúteos";
    else if (pathLower.includes('ombro') || pathLower.includes('omobro')) muscleGroup = "Ombros";
    else if (pathLower.includes('panturilha') || pathLower.includes('panturinha') || pathLower.includes('panturrilha')) muscleGroup = "Panturrilha";
    else if (pathLower.includes('peito')) muscleGroup = "Peito";
    else if (pathLower.includes('posterior')) muscleGroup = "Posterior de Coxa";
    else if (pathLower.includes('quadriceps') || pathLower.includes('quadríceps') || pathLower.includes('perna')) muscleGroup = "Quadríceps";
    else if (pathLower.includes('trapezio') || pathLower.includes('trapézio')) muscleGroup = "Trapézio";
    else if (pathLower.includes('triceps') || pathLower.includes('tríceps')) muscleGroup = "Tríceps";
    else if (pathLower.includes('terra')) muscleGroup = "Costas";
    else if (pathLower.includes('mobilidade')) muscleGroup = "Mobilidade";
    else if (pathLower.includes('cardio') || pathLower.includes('cárdio') || pathLower.includes('aerobico') || pathLower.includes('aeróbico')) muscleGroup = "Cardio";
    
    const slug = cleanName(rawName) || Math.random().toString(36).substring(2, 7);
    let uniqueId = `auto-new-${slug}-${videoGender.toLowerCase()}`;
    if (exercises.some(ex => ex.id === uniqueId)) {
        let counter = 2;
        while (exercises.some(ex => ex.id === `${uniqueId}-${counter}`)) {
            counter++;
        }
        uniqueId = `${uniqueId}-${counter}`;
    }

    exercises.push({
      id: uniqueId,
      name: rawName,
      muscleGroup,
      equipment: "-",
      videoUrl: item.videoUrl || "",
      videoGender,
      thumbnail: item.thumbnail || undefined,
      previewUrl: item.previewUrl || undefined,
      iframeUrl: item.iframeUrl || undefined
    });
  }
  return exercises;
}

async function main() {
  const legacy = await fetchLegacy();
  const panda = await fetchPanda();
  
  // Step 1: Add ALL legacy ones to ensure past references don't break.
  // We match them with panda to get the video urls
  const finalDb = [];
  const addedPandaIdx = new Set();
  
  for (const leg of legacy) {
    const normName = cleanName(leg.name);
    // find a matching panda video
    let matchIdx = panda.findIndex((p, idx) => !addedPandaIdx.has(idx) && cleanName(p.name) === normName && p.videoGender === leg.videoGender);
    if (matchIdx === -1) {
       // fallback ignore gender
       matchIdx = panda.findIndex((p, idx) => !addedPandaIdx.has(idx) && cleanName(p.name) === normName);
    }
    
    let dbEntry = { ...leg };
    if (matchIdx !== -1) {
       const p = panda[matchIdx];
       dbEntry.videoUrl = p.videoUrl;
       dbEntry.thumbnail = p.thumbnail;
       if (p.previewUrl) dbEntry.previewUrl = p.previewUrl;
       if (p.iframeUrl) dbEntry.iframeUrl = p.iframeUrl;
       // keep the legacy id!
       // So we don't add this panda one again!
       addedPandaIdx.add(matchIdx);
    }
    finalDb.push(dbEntry);
  }
  
  // Step 2: Add all NEW tools from panda that weren't matched and the ones that MIGHT HAVE BEEN MAPPED already in the last 3 hours (the auto-new ones)
  // Actually, wait, if a student added an exercise in the last 3 hours it used the \`auto-new-...\` ID!
  // So we MUST also add ALL panda exercises with their NEW IDs into the database, even if they duplicate a legacy one functionally! That ensures whichever ID is in the plan works.
  
  for (const p of panda) {
    finalDb.push(p);
  }
  
  // Sort final db for UI
  finalDb.sort((a, b) => {
    if (a.videoGender !== b.videoGender) return a.videoGender === 'M' ? -1 : 1;
    if (a.muscleGroup !== b.muscleGroup) return a.muscleGroup.localeCompare(b.muscleGroup);
    return a.name.localeCompare(b.name);
  });

  const fileContent = "export interface Exercise {\n" +
  "  id: string;\n" +
  "  name: string;\n" +
  "  muscleGroup: string;\n" +
  "  folderName?: string;\n" +
  "  equipment: string;\n" +
  "  gifUrl?: string;\n" +
  "  videoUrl?: string;\n" +
  "  videoGender?: 'M' | 'F' | 'Ambos';\n" +
  "  instructions?: string;\n" +
  "  thumbnail?: string;\n" +
  "  previewUrl?: string;\n" +
  "  iframeUrl?: string;\n" +
  "}\n\n" +
  "export const EXERCISE_DATABASE: Exercise[] = " + JSON.stringify(finalDb, null, 2) + ";\n";

  fs.writeFileSync('src/data/exerciseDatabase.ts', fileContent);
console.log("Successfully wrote " + finalDb.length + " exercises to DB (legacy + new)");
}

main().catch(console.error);
