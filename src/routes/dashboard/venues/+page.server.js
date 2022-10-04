import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: venues, error } = await supabase.from('venues').select('*');

	if (error) {
		console.log(error);
	}

	return { venues };
}
