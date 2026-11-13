import fs from 'fs';
import https from 'https';

const env = fs.readFileSync('.env', 'utf-8');
const [, url] = env.match(/VITE_SUPABASE_URL=(.*)/) || [];
const [, key] = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/) || [];

fetch(`${url}/rest/v1/students?limit=1`, {
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`
  }
}).then(r => r.json()).then(data => console.log("Students Columns: ", Object.keys(data[0] || {}))).catch(console.error);
