// fetch locally
// load Args: { fetch: }
/** @type {import('./$types').PageLoad} */
export const load = ({ fetch }) => {
	const fetchVenues = async () => {
		const res = await fetch('/api/venues');
		const data = await res.json();

		console.log('🚀 ~ file: dashboard/venues/+page.js ~ line 5 ~ fetchVenues ~ venues', data);
		return data;
	};
	return {
		venues: fetchVenues()
	};
};

