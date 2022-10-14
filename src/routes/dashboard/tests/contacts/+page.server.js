// import { redirect } from '@sveltejs/kit';
// import { supabase } from '$lib/supabase/supabaseClient';

// this action runs on EDIT Button click on card inside dashboard/tests/contacts
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const fd = await request.formData();
		const id = fd.get('itemId');
		console.log("🚀 ~ file: +page.server.js ~ line 10 ~ prefill: ~ id", id)

		// select data from db on the basis of id

		// const { data, error } = await supabase.from('contacts').select('*').eq('id', id);
		// console.log('🚀 ~ file: +page.server.js ~ line 18 ~ prefill: ~ data', data);
		// if (error) return { status: 500, body: { error: error.message } };
    // return { body: data[0] };

		// goto('/dashboard/tests/contacts/edit', { state: { data: data[0] } });
    // return { body: { id: id } };
		// throw redirect(307, '/dashboard/tests/contacts/edit');
		// return { success: true };
	}
};
