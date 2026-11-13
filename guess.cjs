const EXERCISE_DATABASE = require('./src/data/exerciseDatabase.ts').EXERCISE_DATABASE;

// The database currently contains ONLY the new auto-new-... exercises.
// And it's SORTED!

const maleEq = EXERCISE_DATABASE.filter(e => e.videoGender === 'M' || e.videoGender === 'Ambos');
const femaleEq = EXERCISE_DATABASE.filter(e => e.videoGender === 'F');

// Alphabetize them properly just in case!
const sortLogic = (a, b) => {
   if (a.muscleGroup !== b.muscleGroup) return a.muscleGroup.localeCompare(b.muscleGroup);
   return a.name.localeCompare(b.name);
};

maleEq.sort(sortLogic);
femaleEq.sort(sortLogic);

const oldToNewMap = {};

let mCounter = 1;
// Wait! If the original Bunny script recursed directories...
// The order was alphabetical BY FOLDER (`Path`), then BY FILE NAME!
// Path was like "Exercícios homem/Abdomen/"
// Let's sort by muscle group, which roughly correlates to Path!
maleEq.forEach(ex => {
  oldToNewMap[`auto-${mCounter++}-m`] = ex.id;
});

let fCounter = 1;
femaleEq.forEach(ex => {
  oldToNewMap[`auto-${fCounter++}-f`] = ex.id;
});

// Let's check how it aligns with OUR KNOWN OLD_ID_MAP!
const knownMap = require('./extracted_map.js');
let mismatches = 0;
let matches = 0;
for (const k in knownMap) {
   if (oldToNewMap[k] === knownMap[k]) matches++;
   else if (oldToNewMap[k]) mismatches++;
}

console.log(`Matches: ${matches}, Mismatches: ${mismatches}`);
