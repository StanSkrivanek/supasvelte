import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: courses, error } = await supabase.from('courses').select('*');

	if (error) {
		console.log(error);
	}

	return { courses };
}

