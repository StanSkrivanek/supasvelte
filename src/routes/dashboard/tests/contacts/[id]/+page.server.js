import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request}) => {
    const fd = await request.formData();


    const {itemId, name, email, phone, type } = Object.fromEntries([...fd]);

    const { error: err } = await supabase
			.from('contacts')
			.update({ name: name, email: email, phone: phone, type: type })
			.eq('id', itemId);

    if (err) return { status: 500, body: { error: err.message } };
		//TODO: display success message to user and redirect to /dashboard/tests/contacts and redirect to /dashboard/tests/contacts in 2s 
    throw redirect(307, '/dashboard/tests/contacts');
    // return { success: true };
  },

};
