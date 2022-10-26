export const load = ({ fetch }) => {
	const fetchCourses = async () => {
		const res = await fetch('/api/courses');
		const data = await res.json();
		return data;
	};
	return {
		courses: fetchCourses()
	};
};
