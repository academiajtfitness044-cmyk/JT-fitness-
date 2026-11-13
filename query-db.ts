import { db } from './src/lib/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

async function run() {
  const snapshot = await getDocs(collection(db, 'students'));
  let uniqueEx = new Set();
  
  snapshot.docs.forEach(d => {
    const w = d.data().workoutPlan;
    if (w && w.days) {
      w.days.forEach(day => {
        if (day.exercises) {
          day.exercises.forEach(ex => {
            uniqueEx.add(ex.exerciseId);
          });
        }
      });
    }
  });
  
  fs.writeFileSync('missing.json', JSON.stringify(Array.from(uniqueEx), null, 2));
  console.log('Saved to missing.json');
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
