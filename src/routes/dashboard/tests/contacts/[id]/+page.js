
/** @type {import('./$types').PageLoad} */
export const load = ({ fetch, params, page}) => {
	console.log("🚀 ~ file: +page.js ~ line 3 ~ load ~ params", page)
	const fetchContact = async () => {

		const res = await fetch('/api/contacts');
		const data = await res.json();
		let item = data.filter((contact) => contact.id === params.id);
		console.log("🚀 ~ file: +page.js ~ line 10 ~ load ~ item", item);
		
		return item;
	};
	return {
		contact: fetchContact()
	};
};
