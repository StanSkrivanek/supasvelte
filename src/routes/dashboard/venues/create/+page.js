

/** @type {import('./$types').PageLoad} */
// export const load = ({fetch}) => {
// 	const fetchVenues = async () => {
// 		const res = await fetch('/api/venues');
// 		const data = await res.json();
// 		console.log('🚀 ~ file: +page.js ~ line 5 ~ fetchVenues ~ venues', data);
// 		return data;
// 	};
// 	return {
// 		venues: fetchVenues()
// 	};
// };

//----------------------------------
// definition of the page component
// If the load function is defined in +page.js or +layout.js it will run both on the server and in the browser. If it's instead defined in +page.server.js or +layout.server.js it will only run on the server, in which case it can (for example) make database calls and access private environment variables, but can only return data that can be serialized with devalue.

//1 define load function
// export const load = () => {
//2. the return value of load function (if there is one) must be an OBJECT !!!
// 	return {
// 		venues: [
// 			{
// 				id: 1,
// 				name: 'Venue 1',
// 				address: '123 Main St',
// 				city: 'New York',
// 				state: 'NY',
// 				zip: '10001',
// 				phone: '123-456-7890',
// 				website: 'https://www.venue1.com',
// 				createdAt: '2021-07-01T00:00:00.000Z',
// 				updatedAt: '2021-07-01T00:00:00.000Z'
// 			}
// ]

//if load function is determined on +page/layout.svelte its argument is a `LoadEvent` that contains the following properties: fetch, data, setHeaders, parent, depends

//if load function is determined on +page.server/layout.server.js to run only on server its argument is a `ServerLoadEvent` that contains the following properties: fetch, params, url, request, routeId, sertHeadeers, cookies, getClientAddress, locals, platform.

// +page.svelte recives data from +page.js or +layout.js (export let data)

// If you want to return a promise, you can do so by wrapping it in an object.
//----------------------------------
