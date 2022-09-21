import { supabase } from '$lib/supabase/supabaseClient';

export async function load({ params }) {
	console.log(typeof params.id);

	const { data, error } = await supabase.from('courses').select('*').eq('id', params.id);
	console.log(data[0].id);

	if (error) {
		console.log(error);
	}
	if (data[0].id === Number(params.id)) {
		return  data ;
	}
}
