import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		const fd = await request.formData();

		// console.log('🚀 ~ file: +page.server.js ~ line 5 ~ default: ~ data', [...fd]);
		const { name, email, phone, type } = Object.fromEntries([...fd]);

		const { error: err } = await supabase
			.from('contacts')
			.insert({ name: name, email: email, phone: phone, type: type });

		if (err) return { status: 500, body: { error: err.message } };
		throw redirect(307, '/dashboard/contacts');
		// return { success: true };
	}
};
