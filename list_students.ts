import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listStudents() {
  const { data: students, error: listError } = await supabase.from('students').select('*');
  if (listError) return console.error(listError);
  
  console.log("Students:");
  students.forEach((s: any) => console.log(`- ${s.id}: ${s.full_name} / ${s.name}`));
}

listStudents();
