import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request }) => {
		const fd = await request.formData();
		console.log('🚀 ~ file: open/creaate/+page.server.js ~ line 11 ~ update: ~ [...fd]', [...fd]);
		const {
			id,
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
			console.log('🚀 ~ file: +page.server.js ~ line 25 ~ update: ~ id', id)


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

		const { error: err } = await supabase
			.from('opencourses')
			.update({
				title: title,
				type: coursetype,
				venue: venue,
				group: group,
				weekday: weekday,
				date_in: date_in,
				date_end: date_end,
				time_in: time_in,
				time_end: time_end,
				price: price,
				attachment: attachment,
				apply_open: apply_open,
				apply_close: apply_close,
				is_open: isOpen
			})
			.eq('id', id);

		if (err) return { status: 500, body: { error: err.message } };
		if (!err) throw redirect(307, '/dashboard/open');

		return { success: true };
	}
};
