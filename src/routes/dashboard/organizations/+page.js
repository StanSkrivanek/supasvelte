export const load = ({ fetch }) => {
	const fetchContacts = async () => {
		const res = await fetch('/api/orgs');
		const data = await res.json();	
		return data;
	};
	return {
		orgs: fetchContacts()
	};
};
