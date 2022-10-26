import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request }) => {
		const fd = await request.formData();

		const { id, title, type, organization, excerpt, content } = Object.fromEntries([...fd]);

		const { error: err } = await supabase
			.from('courses')
			.update({
				title: title,
				organization: organization,
				excerpt: excerpt,
				type: type,
				content: content
			})
			.eq('id', id);

		if (err) return { status: 500, body: { error: err.message } };
		if (!err) throw redirect(307, '/dashboard/courses');

		return { success: true };
	}
};
