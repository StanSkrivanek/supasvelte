export function sortById(array, order) {
	// console.log("🚀 ~ file: helpers.js ~ line 2 ~ sortById ~ array", array)
	return array.sort((a, b) => {
		if (order === 'desc') return b.order_num - a.order_num;
		return a.order_num - b.order_num;
	});
}
// delete `getData` after refactoring
export function getData(data) {
	for (let item in data) {
		return data[item];
	}
}

// --------------------------------------------------
// Path: src/lib/utils/helperFunctions.js
// `ObjAry` is an array of rows from a supabase table
//searchTerm is user input
//
// objAry = data form fuzzy store

// --------------------------------------------------
