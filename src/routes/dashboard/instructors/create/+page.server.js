import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const fd = await request.formData();
		const { name, email, phone, bio, url } = Object.fromEntries([...fd]);
		const { error: err } = await supabase
			.from('instructors')
			.insert({ name: name, email: email, phone: phone, bio: bio, avatar_url: url });


		if (err) return { status: 500, body: { error: err.message } };
		throw redirect(307, '/dashboard/instructors');
		// return { success: true };
	}
};
