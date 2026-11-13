const fs = require('fs');

const html = fs.readFileSync('folder_1t5x88f0kHbvQ4nRnMkLOTrW7YIz0m3BF.html', 'utf8');

console.log('HTML Length:', html.length);

// Look for AF_initDataCallback or window._DRIVE_state or window._DRIVE_data
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Script tags count:', scriptMatches.length);

for (let i = 0; i < scriptMatches.length; i++) {
  const content = scriptMatches[i][1];
  if (content.includes('AF_initDataCallback') || content.includes('drive_fe') || content.includes('.gif') || content.includes('1t5x88f0kHbvQ4nRnMkLOTrW7YIz0m3BF')) {
    console.log(`Script #${i} (len ${content.length}) contains target keywords`);
    // print snippet
    console.log(content.substring(0, 500));
  }
}

// Search for any .gif string in the file
const gifMatches = [...html.matchAll(/([^"'\s\\\/]+\.gif)/gi)];
console.log('Gif files matched in HTML:', gifMatches.length);
if (gifMatches.length > 0) {
  console.log('Sample Gifs:', gifMatches.slice(0, 10).map(m => m[1]));
}
