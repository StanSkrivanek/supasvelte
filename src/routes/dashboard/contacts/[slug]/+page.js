/** @type {import('./$types').PageLoad} */

// 
export const load = ({ fetch }) => {
	const fetchContact = async () => {
		let id = localStorage.getItem('currentItemId');
		const res = await fetch('/api/contacts');
		const data = await res.json();
		let item = data.filter((contact) => contact.id === id);
		return item;
	};
	return {
		contact: fetchContact()
	};
};
