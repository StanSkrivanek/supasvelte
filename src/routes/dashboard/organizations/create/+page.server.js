import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		const fd = await request.formData();

		const { name, adr_1, adr_2, city, eircode, phone, email, website, contact, info } =
			Object.fromEntries([...fd]);

		const { error: err } = await supabase.from('organizations').insert({
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
		});

		if (err) return { status: 500, body: { error: err.message } };
		throw redirect(307, '/dashboard/organizations');
		// return { success: true };
	}
};
