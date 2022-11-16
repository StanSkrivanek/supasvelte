// import { redirect } from '@sveltejs/kit';
// import { supabase } from '$lib/supabase/supabaseClient';

// /** @type {import('./$types').Actions} */
// export const actions = {
// 	add: async ({ request }) => {
// 		const fd = await request.formData();
// 		const {
// 			title,
// 			type,
// 			venue,
// 			group,
// 			weekday,
// 			date_in,
// 			date_end,
// 			time_in,
// 			time_end,
// 			price,
// 			attachment,
// 			apply_open,
// 			apply_close,
// 			isOpen
// 		} = Object.fromEntries([...fd]);
// 		// console.log('🚀 ~ file: +page.server.js ~ line 11 ~ add: ~ content', content)
// 		const { error: err } = await supabase.from('opencourses').insert({
// 			title: title,
// 			type: type,
// 			venue: venue,
//       group: group,
//       weekday: weekday,
//       date_in: date_in,
//       date_end: date_end,
//       time_in: time_in,
//       time_end: time_end,
//       price: price,
//       attachment: attachment,
//       apply_open: apply_open,
//       apply_close: apply_close,
//       isOpen: isOpen
// 		});

// 		if (err) return { status: 500, body: { error: err.message } };
// 		// throw redirect(307, '/dashboard/open');
// 		return { success: true };
// 	}
// };
