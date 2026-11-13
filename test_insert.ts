import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
async function testInsert() {
  const { data, error } = await supabase.from('students').insert([{
    name: 'Test',
    email: 'test@example.com',
    access_code: 'TEST12'
  }]).select();
  console.log('Result:', data, 'Error:', error);
}
testInsert();
