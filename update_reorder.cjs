const fs = require('fs');

let content = fs.readFileSync('src/views/TreinosView.tsx', 'utf8');

// 1. Add moveExerciseToTop and moveExerciseToBottom functions
const newFunctions = `
  const moveExerciseToTop = (dayId: string, index: number) => {
    if (!localPlan || index === 0) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId) {
          const newExercises = [...d.exercises];
          const [moved] = newExercises.splice(index, 1);
          newExercises.unshift(moved);
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };

  const moveExerciseToBottom = (dayId: string, index: number) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId && index < d.exercises.length - 1) {
          const newExercises = [...d.exercises];
          const [moved] = newExercises.splice(index, 1);
          newExercises.push(moved);
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };
`;

if (!content.includes('const moveExerciseToTop')) {
  // Insert before moveExerciseUp
  content = content.replace('const moveExerciseUp = (dayId: string, index: number) => {', newFunctions + '\  const moveExerciseUp = (dayId: string, index: number) => {');
}

// 2. Add imports for ChevronsUp, ChevronsDown
if (!content.includes('ChevronsUp')) {
  content = content.replace('ChevronUp, ChevronDown, Copy', 'ChevronUp, ChevronDown, Copy, ChevronsUp, ChevronsDown');
}

// 3. Update AdminWorkoutExercise props
// It might be formatted differently, let's use a regex instead
if (!content.includes('moveExerciseToTop,')) {
    content = content.replace(/moveExerciseDown\s*\}: any\)/g, 'moveExerciseDown,\n  moveExerciseToTop,\n  moveExerciseToBottom\n}: any)');
}

// 4. Update the parent render to pass the new props
content = content.replace(/moveExerciseDown=\{moveExerciseDown\}/g, 'moveExerciseDown={moveExerciseDown}\n                            moveExerciseToTop={moveExerciseToTop}\n                            moveExerciseToBottom={moveExerciseToBottom}');

// 5. Add UI buttons inside AdminWorkoutExercise
// We will replace the <div> block containing the up/down buttons
const buttonsRegex = /<div className="flex flex-col opacity-50 group-hover:opacity-100 gap-1">[\s\S]*?<\/div>/;

const newButtons = `<div className="flex flex-col opacity-50 group-hover:opacity-100 gap-[2px]">
            <button 
              onClick={() => moveExerciseToTop(dayId, exIdx)} 
              disabled={exIdx === 0} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Mover para o topo"
            >
              <ChevronsUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseUp(dayId, exIdx)} 
              disabled={exIdx === 0} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Subir 1 posição"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseDown(dayId, exIdx)} 
              disabled={exIdx === totalExercises - 1} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Descer 1 posição"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseToBottom(dayId, exIdx)} 
              disabled={exIdx === totalExercises - 1} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Mover para o fim"
            >
              <ChevronsDown className="w-4 h-4" />
            </button>
          </div>`;

content = content.replace(buttonsRegex, newButtons);

fs.writeFileSync('src/views/TreinosView.tsx', content);
console.log('Done mapping components!');
