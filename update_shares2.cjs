const fs = require('fs');

function injectGeneratedImageState(filePath, componentName) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add the state variable
  const stateRegex = new RegExp(`(function ${componentName}\\([^)]*\\) \\{[\\s\\S]*?)(const \\[isSharing, setIsSharing\\] = useState\\(false\\);)`);
  if (content.match(stateRegex)) {
     content = content.replace(stateRegex, `$1$2\n  const [generatedResultUrl, setGeneratedResultUrl] = useState<string | null>(null);`);
  }

  // Update logic to set the state instead of only showing alert
  const shareRegex = new RegExp(`(if \\(!shared\\) \\{[\\s\\S]*?)(alert\\([^)]+\\);)(\\s*\\})`);
  // Note: we can't easily globally regex this dynamically because it's inside loops, let's do manual replacement per component below

  fs.writeFileSync(filePath, content);
}
