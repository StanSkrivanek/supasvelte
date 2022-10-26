export const ssr = false;

/** @type {import('./$types').PageLoad} */
export const load = ({ fetch }) => {
	const fetchContact = async () => {
		let id = localStorage.getItem('currentItemId');
		const res = await fetch('/api/venues');
		const data = await res.json();

		let item = data.filter((org) => org.id == id);

		return item;
	};
	return {
		venue: fetchContact()
	};
};
