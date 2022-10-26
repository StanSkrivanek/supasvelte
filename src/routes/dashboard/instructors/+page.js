export const load = ({ fetch }) => {
	const fetchContacts = async () => {
		const res = await fetch('/api/instructors');
		const data = await res.json();
		return data;
	};
	return {
		instructors: fetchContacts()
	};
};

