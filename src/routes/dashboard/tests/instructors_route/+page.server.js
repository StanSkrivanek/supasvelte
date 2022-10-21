import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: instructors, error } = await supabase.from('instructors').select('*');

	if (error) {
		console.log(error);
	}

	return { instructors };
}

