// import { supabase } from '$lib/supabase/supabaseClient';
export const ssr = false;
export const load = ({ fetch }) => {
	let id = localStorage.getItem('currentItemId');
	const fetchCourses = async () => {
		const res = await fetch('/api/courses');
		const data = await res.json();
		let item = data.filter((item) => {
			// console.log('🚀 ~ file: +page.js ~ line 8 ~ fetchCourses ~ item', item)
			return item.id == id;
		});
		return item;
	};
	return {
		course: fetchCourses()
	};
};
// export async function load({ params }) {
// 	console.log('params', params);

// 	const { data, error } = await supabase.from('courses').select('*').eq('id', params.id);
// 	console.log('🚀 ~ file: +page.js ~ line 7 ~ load ~ data', data)

// 	if (error) {
// 		console.log(error);
// 	}
// 	if (data[0].id === Number(params.id)) {
// 		return  data ;
// 	}
// }
