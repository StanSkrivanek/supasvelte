// prevent ERR 500 on page reload
export const ssr = false;
/** @type {import('./$types').PageLoad} */

export const load = ({ fetch }) => {
	const fetchContact = async () => {
		let id = localStorage.getItem('currentItemId');
		const res = await fetch('/api/contacts');
		const data = await res.json();
		let item = data.filter((contact) => contact.id === id);
	localStorage.removeItem('currentItemId');
		return item;
	};
	return {
		contact: fetchContact()
	};
};
