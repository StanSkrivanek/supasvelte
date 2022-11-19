
// prevent ERR 500 on page reload
export const ssr = false;

export const load = ({ fetch }) => {
	let id = localStorage.getItem('currentItemId');
	const fetchCourses = async () => {
		const res = await fetch('/api/open');
		const data = await res.json();


		let item = data.filter((org) => org.id == id);
		// console.log('🚀 ~ file: +page.js ~ line 13 ~ fetchCourses ~ item', item)
		return item;
	};
	return {
		course: fetchCourses()
	};
};