import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: openCourse, error } = await supabase.from('opencourses').select('*');

	// if (error) {
	// 	console.log(error);
	// }
	if (error) return { status: 500, body: { error: error.message } };
	return { openCourse };
}

// export async function post(request) {
// 	const { data, error } = await supabase.from('opencourses').insert(request.body);
// 	if (error) return { status: 500, body: { error: error.message } };
// 	return { data };
// }

