import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	// get all images from and their public url db
	const { data: images, error } = await supabase.storage
		.from('images')
		.list('rte/course', { offset: 1, limit: 100 });
	// get public url for each image
	const imageUrls = images.map((image) => {
		// get public URL for each image
		let imgUrl = supabase.storage.from('images').getPublicUrl(`rte/course/${image.name}`)
			.data.publicUrl;
		// TODO: add error handling, if no public url is found
		// TODO: find why `.emptyFolderPlaceholder` return 500 error
		// if (image.name !== '.emptyFolderPlaceholder') {
		return { name: image.name, id: image.id, url: imgUrl };
		// }
	});

	// console.log('🚀 ~ file: +page.js ~ line 12 ~ load ~ images', images, imageUrls);

	if (error) {
		console.log(error);
	}

	return { imageUrls };
}
