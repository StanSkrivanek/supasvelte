import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		const fd = await request.formData();

		// console.log('🚀 ~ file: +page.server.js ~ line 5 ~ default: ~ data', [...fd]);
		const { name, email, phone, type } = Object.fromEntries([...fd]);

		const { error } = await supabase
			.from('contacts')
			.insert({ name: name, email: email, phone: phone, type: type });

		if (error) return { status: 500, body: { error: error.message } };
		return { success: true };
	}
};
