export function sortById(array, order) {
	if (order === 'asc') {
		return array.sort((a, b) => a.id - b.id);
	} else if (order === 'desc') {
		return array.sort((a, b) => b.id - a.id);
	}

	// return array.sort((a, b) => {
	// 	if (order === 'desc') return b.order_num - a.order_num;
	// 	return a.order_num - b.order_num;
	// });
}
// delete `getData` after refactoring
export function getData(data) {
	for (let item in data) {
		return data[item];
	}
}

export function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(\d{2,3})(\d{3})(\d{4})$/);
	if (match) {
		return `(${match[1]} ) ${match[2]}-${match[3]}`;
	}
	return null;
}

