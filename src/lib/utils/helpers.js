export function sortById(objAry, order) {
	return objAry.sort((a, b) => {
		if (order === 'des') return b.id - a.id;
		return a.id - b.id;
	});
}
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
