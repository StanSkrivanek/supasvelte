import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request }) => {
		const fd = await request.formData();

		const { id, name, email, phone, type } = Object.fromEntries([...fd]);

		const { error: err } = await supabase
			.from('courses')
			.update({ name: name, email: email, phone: phone, type: type })
			.eq('id', id);

		if (err) return { status: 500, body: { error: err.message } };
		if (!err) throw redirect(307, '/dashboard/courses');

		return { success: true };
	},

};

	// del: async ({ request }) => {
	// 	const fd = await request.formData();
	// 	console.log('🚀 ~ file: +page.server.js ~ line 23 ~ delete: ~ fd', [...fd]);
	// 	console.log('DELETE ITEM');

	// 	const { itemId } = Object.fromEntries([...fd]);

	// 	const { error: err } = await supabase.from('courses').delete().eq('id', itemId);

	// 	if (err) return { status: 500, body: { error: err.message } };
	// 	if (!err) throw redirect(307, '/dashboard/courses');

	// 	return { success: true };
	// }

// export async function get({ params, fetch }) {
// 	const { id } = params;

// 	const { data: contact, error: err } = await supabase
// 		.from('courses')
// 		.select('*')
// 		.eq('id', id)
// 		.single();

// 	if (err) return { status: 500, body: { error: err.message } };
// 	if (!contact) return { status: 404, body: { error: 'Not found' } };

// 	return {
// 		body: {
// 			contact
// 		}
// 	};
// };
