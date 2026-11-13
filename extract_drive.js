const https = require('https');
const fs = require('fs');

const folders = [
  { id: '1t5x88f0kHbvQ4nRnMkLOTrW7YIz0m3BF', category: 'Abdominal' },
  { id: '11an674Jauu74FJfqR_PDOn3rOPq6I96k', category: 'Alongamento e Mobilidade' },
  { id: '1oRdtYG9NGl_qMuTFOZE8eZFnvVPacmL6', category: 'Antebraço' },
  { id: '1WM77KDJmwEIdXWBdDoPFmq120sUgwALK', category: 'Bíceps' },
  { id: '113DpeT6_H3pZpdwoaEQ6RrSx7mGcOanj', category: 'Cardio' },
  { id: '1V3kNt9_15KY9c7k4TNBZ7dQKwCggKbsd', category: 'Costas' },
  { id: '1pO0bNk0cLgRkD7CvQopPTN3FlqrUWuND', category: 'Eretores da Espinha' },
  { id: '1b5JfiBzAPyQdyLmLdtHoVHNVC-gsxLEj', category: 'Glúteos' },
  { id: '1eQzzuRPSbjA38RBTSXTbqj-JrZyV26jp', category: 'Membros Inferiores' },
  { id: '1Czx8p2ZsYe0-WchZjMwwpLy6J4PwOWva', category: 'Ombros' },
  { id: '1zER-PHcW52riOgv0TeirJ2l1J-5pAfi_', category: 'Panturrilhas' },
  { id: '1C4pZbAG6PJ8gjBqZD5Ct0Pq_i0e2NgRN', category: 'Peitoral' },
  { id: '1t4VyTAX9lJwUTO0xGIvVFSNVun7CJxAy', category: 'Pernas' },
  { id: '1KvvZocfwT80d3sVN_wjCs_WZwelBO5TT', category: 'Trapézio' },
  { id: '1qy75BJ51Phq748vWlW4a2zmfhofu80-1', category: 'Tríceps' }
];

async function fetchHtml(id) {
  return new Promise((resolve) => {
    https.get('https://drive.google.com/drive/folders/' + id, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function parseDriveHtml(html) {
  const items = [];

  // Match pattern in Google Drive HTML JS state data
  // Google Drive stores file entries in JS structures like: ["id", ["name.gif", ...]] or ["id","name",...]
  const matches = [...html.matchAll(/\["([a-zA-Z0-9_-]{25,50})",\["([^"]+)"/g)];
  const seen = new Set();
  
  for (const m of matches) {
    const fileId = m[1];
    let fileName = m[2];
    if (!fileId || seen.has(fileId)) continue;
    seen.add(fileId);
    items.push({ id: fileId, name: fileName });
  }

  // Also try secondary regex for escaped quotes
  const matchesEscaped = [...html.matchAll(/\[\\"([a-zA-Z0-9_-]{25,50})\\",\[\\"([^"\\]+)\\"/g)];
  for (const m of matchesEscaped) {
    const fileId = m[1];
    let fileName = m[2];
    if (!fileId || seen.has(fileId)) continue;
    seen.add(fileId);
    items.push({ id: fileId, name: fileName });
  }

  return items;
}

(async () => {
  const result = [];
  for (const f of folders) {
    const html = await fetchHtml(f.id);
    const items = parseDriveHtml(html);
    console.log(`Category: ${f.category} -> Found ${items.length} items`);
    if (items.length > 0) {
      console.log(`  Sample:`, items.slice(0, 3));
    }
    result.push({
      folderId: f.id,
      category: f.category,
      files: items
    });
  }
  fs.writeFileSync('drive_extracted.json', JSON.stringify(result, null, 2));
  console.log('Saved to drive_extracted.json');
})();
