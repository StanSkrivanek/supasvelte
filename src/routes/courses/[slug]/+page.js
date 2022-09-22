import { supabase } from '$lib/supabase/supabaseClient';

export async function load({ params }) {
	// console.log('params', params);
	
	const { data, error } = await supabase.from('courses').select('*').eq('id', params.id);
	if (error) {
		console.log(error);
	}
	if (data[0].id === Number(params.id)) {
		return  data ;
	}
}
