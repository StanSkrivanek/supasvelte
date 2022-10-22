// import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		// console.log('🚀 ~ file: +page.server.js ~ line 5 ~ default: ~ data', [...fd]);
		const { name, email, phone, bio, avatarUrl } = Object.fromEntries([...data]);
		console.log('🚀 ~ file: +page.server.js ~ line 11 ~ create: ~ [...data]', [...data]);

		const { error: err } = await supabase
			.from('instructors')
			.insert({ name: name, email: email, phone: phone, bio: bio, avatar_url: avatarUrl });
		// console.log(err);

		if (err) return { status: 500, body: { error: err.message } };
		// throw redirect(307, '/dashboard/instructors');
		return { success: true };
	}
};
