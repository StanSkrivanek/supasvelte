// prevent ERR 500 on page reload
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export const load = ({ fetch }) => {
	const fetchContact = async () => {
		let id = localStorage.getItem('currentItemId');
		const res = await fetch('/api/instructors');
		const data = await res.json();
		let current = data.filter((item) => item.id == id);
		return current;
	};
	return {
		instructor: fetchContact()
	};
};
