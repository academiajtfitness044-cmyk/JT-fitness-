const https = require('https');
const fs = require('fs');

async function downloadFolderHtml(id) {
  return new Promise((resolve) => {
    https.get('https://drive.google.com/drive/folders/' + id, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

(async () => {
  // Download Bíceps folder HTML
  const html = await downloadFolderHtml('1WM77KDJmwEIdXWBdDoPFmq120sUgwALK');
  fs.writeFileSync('biceps_folder.html', html);
  console.log('Saved biceps_folder.html len:', html.length);

  // Find index of 'biceps concentrado'
  const idx = html.indexOf('biceps concentrado');
  console.log('Index of biceps concentrado:', idx);
  if (idx !== -1) {
    console.log('SURROUNDING 500 CHARS:');
    console.log(html.substring(Math.max(0, idx - 200), idx + 300));
  }
})();
