/** @type {import('./$types').PageLoad} */
export const load = ({ fetch }) => {
	const fetchVenues = async () => {
		const res = await fetch('/api/venues');
		const data = await res.json();
		return data;
	};
	return {
		venues: fetchVenues()
	};
};


// import { supabase } from '$lib/supabase/supabaseClient';

// export async function load() {
// 	const { data: venues, error } = await supabase.from('venues').select('*');

// 	if (error) {
// 		console.log(error);
// 	}

// 	return { venues };
// }
