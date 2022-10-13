export const load = ({ fetch }) => {
	const fetchContacts = async () => {
		const res = await fetch('/api/contacts');
		const data = await res.json();

		// console.log('🚀 ~ file: +page.js ~ line 5 ~ tests/contacts ~ contacts', data);
		return data;
	};
	return {
		contacts: fetchContacts()
	};
};
