import { VITE_SUPABASE_ANON_KEY } from '$env/static/private';
import { supabase } from '$lib/supabase/supabaseClient';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	// const authHeaders = request.headers.get('Authorization');
	// if (authHeaders !== VITE_SUPABASE_ANON_KEY)
	// 	return { status: 401, body: { error: 'Unauthorized' } };

	const { data, error } = await supabase.from('venues').select('*');
	if (error) return { status: 500, body: { error: error.message } };
	return new Response(JSON.stringify(data), { status: 200 });
};

// POST
export const POST = async ({ request }) => {
	// const authHeaders = request.headers.get('Authorization');
	// if (authHeaders !== VITE_SUPABASE_ANON_KEY)
	// 	return { status: 401, body: { error: 'Unauthorized' } };

	const venue = await request.json();
	
	const { error } = await supabase.from('venues').insert(venue);
	if (error) return { status: 500, body: { error: error.message } };
	return new Response(JSON.stringify({message: "Success"}), { status: 201 });
};

// PATCH
export const PATCH = async ({ request }) => {
	const authHeaders = request.headers.get('Authorization');
	if (authHeaders !== VITE_SUPABASE_ANON_KEY)
		return { status: 401, body: { error: 'Unauthorized' } };

	const venue = await request.json();
	const { data, error } = await supabase.from('venues').update(venue).eq('id', venue.id);
	if (error) return { status: 500, body: { error: error.message } };
	return new Response(JSON.stringify({data}), { status: 200 });
};

// DELETE
export const DELETE = async ({ request }) => {
	const authHeaders = request.headers.get('Authorization');
	if (authHeaders !== VITE_SUPABASE_ANON_KEY)
		return { status: 401, body: { error: 'Unauthorized' } };

	const venue = await request.json();
	const { data, error } = await supabase.from('venues').delete().eq('id', venue.id);
	if (error) return { status: 500, body: { error: error.message } };
	return new Response(JSON.stringify(data), { status: 200 });
};
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
// const limit = url.searchParams.get('limit') ?? '10';
// const offset = url.searchParams.get('offset') ?? '0';
