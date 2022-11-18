import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const fd = await request.formData();
		// console.log('🚀 ~ file: open/creaate/+page.server.js ~ line 11 ~ add: ~ [...fd]', [...fd]);
		const {
			title,
			venue,
			group,
			weekday,
			date_in,
			date_end,
			time_in,
			time_end,
			price,
			attachment,
			apply_open,
			apply_close,
			isOpen
		} = Object.fromEntries([...fd]);

		// get course type from db based on course title
		let coursetype = '';
		const { data: course, error } = await supabase
			.from('courses')
			.select('type')
			.eq('title', title);
		if (error) {
			console.log('error', error);
		} else {
			coursetype = course[0].type;
		}

		const { error: err } = await supabase.from('opencourses').insert({
			title: title,
			type: coursetype,
			venue: venue,
			group: group || 'not set',
			weekday: weekday || 'not set',
			date_in: date_in || 'not set',
			date_end: date_end || 'not set',
			time_in: time_in || 'not set',
			time_end: time_end || 'not set',
			price: price || 'not set',
			attachment: attachment,
			apply_open: apply_open || 'not set',
			apply_close: apply_close || 'not set',
			is_open: isOpen
		});

		if (err) return { status: 500, body: { error: err.message } };
		throw redirect(307, '/dashboard/open');
		// return { success: true };
	}
};
