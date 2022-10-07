import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data: courses, error: errCourses } = await supabase.from('courses').select('*');
	const { data: venues, error: errVenues } = await supabase.from('venues').select('*');
	const { data: trainers, error: errTrainers } = await supabase.from('venues').select('*');
	if (errCourses) {
		console.log('errCourses', errCourses);
	}
	if (errVenues) {
		console.log(errVenues);
	}
		if (errTrainers) {
			console.log(errTrainers);
		}
	return { courses, venues, trainers };
}
// export async function loadVenues() {
// 	const { data: venues, error: errVenues } = await supabase.from('venues').select('*');

// 	if (errVenues) {
// 		console.log(errVenues);
// 	}

// 	return { venues };
// }
// export async function loadTrainers() {
// 	const { data: trainers, error: errTrainers } = await supabase.from('venues').select('*');

// 	if (errTrainers) {
// 		console.log(errTrainers);
// 	}

// 	return { trainers };
// }
