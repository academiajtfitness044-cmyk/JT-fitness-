const fs = require('fs');
let dietas = fs.readFileSync('src/views/DietasView.tsx', 'utf8');

const hydrationBlockSearchString = `                  <div className="flex items-center gap-3">
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
                </div>`;

const updateButton = `                  <div className="flex items-center gap-3">
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
                </div>`;

if (dietas.includes(hydrationBlockSearchString) && !dietas.includes("Salvar e Atualizar")) {
    dietas = dietas.replace(hydrationBlockSearchString, updateButton);
    console.log("Added Salvar e Atualizar");
} else {
    // If not found, log why
    console.log("Cannot add Salvar e Atualizar, search string missing or already there");
}

fs.writeFileSync('src/views/DietasView.tsx', dietas);
