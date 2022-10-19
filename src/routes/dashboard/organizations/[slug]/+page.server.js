import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request }) => {
		const fd = await request.formData();
		console.log('🚀 ~ file: +page.server.js ~ line 10 ~ update: ~ id', [...fd]);

		const { id, name, adr_1, adr_2, city, eircode, phone, email, website, contact, info } =
			Object.fromEntries([...fd]);
		const { error: err } = await supabase
			.from('organizations')
			.update({
				name: name,
				adr_1: adr_1,
				adr_2: adr_2,
				city: city,
				eircode: eircode,
				phone: phone,
				email: email,
				website: website,
				contact: contact,
				info: info
			})
			.eq('id', id);

		if (err) return { status: 500, body: { error: err.message } };
		if (!err) throw redirect(307, '/dashboard/organizations');

		return { success: true };
	}
};

// del: async ({ request }) => {
// 	const fd = await request.formData();
// 	console.log('🚀 ~ file: +page.server.js ~ line 23 ~ delete: ~ fd', [...fd]);
// 	console.log('DELETE ITEM');

// 	const { itemId } = Object.fromEntries([...fd]);

// 	const { error: err } = await supabase.from('organizations').delete().eq('id', itemId);

// 	if (err) return { status: 500, body: { error: err.message } };
// 	if (!err) throw redirect(307, '/dashboard/organizations');

// 	return { success: true };
// };
// export async function get({ params, fetch }) {
// 	const { id } = params;

// 	const { data: contact, error: err } = await supabase
// 		.from('organizations')
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
