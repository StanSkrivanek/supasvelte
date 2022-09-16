import { writable } from 'svelte/store';
const courseDetails = writable(null);
export { courseDetails };

// export const updateDataStore = (key,init)=>{
//   const persisted = localStorage.getItem(key);
//   const initialValue = persisted ? JSON.parse(persisted) : init;

//   const courseDetails = writable(initialValue,()=>{
//     courseDetails.subscribe((value)=>{
//       localStorage.setItem(key,JSON.stringify(value));
//     });
//   });
//     return courseDetails;
// }

// export const courseDetails = updateDataStore('courseDetails',[]);

// export { updateDataStore };
