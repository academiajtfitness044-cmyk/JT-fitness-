const fs = require('fs');

let portal = fs.readFileSync('src/views/StudentPortalView.tsx', 'utf8');
portal = portal.replace(/style=\{\{ imageRendering: 'high-quality' \}\}/g, '');
fs.writeFileSync('src/views/StudentPortalView.tsx', portal);

let cardio = fs.readFileSync('src/views/CardioView.tsx', 'utf8');
cardio = cardio.replace(/style=\{\{ imageRendering: 'high-quality' \}\}/g, '');
fs.writeFileSync('src/views/CardioView.tsx', cardio);
