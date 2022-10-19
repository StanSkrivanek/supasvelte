// prevent ERR 500 on page reload
export const ssr = false;

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