import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: images, error } = await supabase.storage.getBucket('images');
	console.log("🚀 ~ file: +page.js ~ line 5 ~ load ~ images", images)

	if (error) {
		console.log(error);
	}

	return { images };
}
