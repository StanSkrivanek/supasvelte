// prevent ERR 500 on page reload 
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export const load = ({ fetch }) => {
	const fetchContact = async () => {
		let id = localStorage.getItem('currentItemId');
		const res = await fetch('/api/orgs');
		const data = await res.json();

		let item = data.filter((org) => org.id == id);

		
		return item;
	};
	return {
		org: fetchContact()
	};
};
