/** @type {import('./$types').PageLoad} */
export const load = ({ fetch, params }) => {
	const fetchContact = async () => {
		const res = await fetch('/api/contacts');
		const data = await res.json();
		let item = data.filter((contact) => contact.id === params.id);
		return item;
	};
	return {
		contact: fetchContact()
	};
};
