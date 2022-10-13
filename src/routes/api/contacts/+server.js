// import { VITE_SUPABASE_ANON_KEY } from '$env/static/private';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  // const authHeaders = request.headers.get('Authorization');
  // if (authHeaders !== VITE_SUPABASE_ANON_KEY)
  // 	return { status: 401, body: { error: 'Unauthorized' } };

  const { data, error } = await supabase.from('contacts').select('*');
  if (error) return { status: 500, body: { error: error.message } };
  return new Response(JSON.stringify(data), { status: 200 });
}

// export const POST = async (request) => {
//   console.log("🚀 ~ file: +server.js ~ line 16 ~ POST ~ request", request)
//   const data = await request.json();
//   console.log("🚀 ~ file: +server.js ~ line 17 ~ POST ~ data", data)
  
//   // const { error } = await supabase.from('contacts').insert([data]);
//   // if (error) return { status: 500, body: { error: error.message } };
//   // return new Response(JSON.stringify(data), { status: 200 });
// }

// set post request to create a new contact
export const POST = async ({request}) => {
  // console.log("🚀 ~ file: +server.js ~ line 27 ~ POST ~ request", request)
  const data = await request.json();
  // console.log("🚀 ~ file: +server.js ~ line 28 ~ POST ~ data", data)
  
  const { error } = await supabase.from('contacts').insert({name: data.name, email: data.email, phone: data.phone, type: data.type}); 
  if (error) return { status: 500, body: { error: error.message } };
  return new Response({ message: 'success' }, { status: 200 });
};
