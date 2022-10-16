// import { VITE_SUPABASE_ANON_KEY } from '$env/static/private';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  const { data, error } = await supabase.from('contacts').select('*');

  if (error) return { status: 500, body: { error: error.message } };
  return new Response(JSON.stringify(data), { status: 200 });
}
