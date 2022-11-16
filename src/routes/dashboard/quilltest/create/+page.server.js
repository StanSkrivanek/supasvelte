// import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		const fd = await request.formData();
		// console.log('🚀 ~ file: +page.server.js ~ line 10 ~ add: ~ [...fd]', [...fd])

		const {  title, type, organization, excerpt, content } = Object.fromEntries([...fd]);


		const { error: err } = await supabase.from('courses').insert({
			title: title,
			type: type,
			organization: organization,
			excerpt: excerpt,
			content: content,
	
		});

		if (err) return { status: 500, body: { error: err.message } };
		// throw redirect(307, '/dashboard/courses');
		return { success: true };
	}
};
