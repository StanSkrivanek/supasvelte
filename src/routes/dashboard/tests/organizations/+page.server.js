import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: organizations, error } = await supabase.from('organizations').select('*');

	if (error) {
		console.log(error);
	}

	return { organizations };
}

