
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request }) => {
		const fd = await request.formData();

		// console.log('🚀 ~ file: +page.server.js ~ line 5 ~ default: ~ fd', [...fd]);
		const { id, name, email, phone, bio, url } = Object.fromEntries([...fd]);

		const { error: err } = await supabase
			.from('instructors')
			.update({ name: name, email: email, phone: phone, bio: bio, avatar_url: url }).eq('id', id);
		console.log(err);

			if (err) return { status: 500, body: { error: err.message } };
			if (!err) throw redirect(307, '/dashboard/instructors');

			return { success: true };
	}
};
