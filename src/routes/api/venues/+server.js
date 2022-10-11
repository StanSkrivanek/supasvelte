// SVELTE REQUEST EVENTS -> https://kit.svelte.dev/docs/types#sveltejs-kit-requestevent

// SvelteKit allow us to create API in our SvelteKit application that we can consume inside and for other sources outside of our application
// {
//   cookies: Cookies;
//   fetch: typeof fetch;
//   getClientAddress: () => string;
//   locals: App.Locals;
//   params: Params;
//   platform: Readonly<App.Platform>;
//   request: Request;
//   routeId: string | null;
//   setHeaders: (headers: Record<string, string>) => void;
//   url: URL;
// }
import { VITE_SUPABASE_ANON_KEY } from '$env/static/private';
import { supabase } from '$lib/supabase/supabaseClient';
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url }) => {
	const authHeaders = request.headers.get('Authorization');
	if (authHeaders !== VITE_SUPABASE_ANON_KEY)
		return { status: 401, body: { error: 'Unauthorized' } };

	// const limit = url.searchParams.get('limit') ?? '10';
	// const offset = url.searchParams.get('offset') ?? '0';

	const { data: venues, error: dbError } = await supabase.from('instructors').select('*');
	if (dbError) return { status: 500, body: { error: dbError.message } };
	return new Response(JSON.stringify(venues), { status: 200 });
	// return new Response(JSON.stringify({venues}), { status: 200 });

	// const venues = data.slice(offset, limit);
	// return new Response(JSON.stringify(venues), {
	// 	venues,
	// 	limit,
	// 	offset,
	// 	total: data.length
	// });
};
// console.log(VITE_SUPABASE_ANON_KEY);

// };

// const authHeaders = {
// 	'apikey': VITE_SUPABASE_ANON_KEY,
// 	'Authorization': `Bearer ${VITE_SUPABASE_ANON_KEY}`
// }
