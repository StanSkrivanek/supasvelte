import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: opencourses, error } = await supabase.from('opencourses').select('*');

	if (error) {
		console.log(error);
	}

	return { opencourses };
}
