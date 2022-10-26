export const load = ({ fetch }) => {
	const fetchContacts = async () => {
		const res = await fetch('/api/instructors');
		const data = await res.json();
		return data;
	};
	return {
		instructors: fetchContacts()
	};
};

// import { supabase } from '$lib/supabase/supabaseClient';

// export async function load() {
// 	const { data: instructors, error } = await supabase.from('instructors').select('*');

// 	if (error) {
// 		console.log(error);
// 	}

// 	return { instructors };
// }
