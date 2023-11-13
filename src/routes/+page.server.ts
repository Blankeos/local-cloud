import { fail } from '@sveltejs/kit';
import { writeFileSync, readdirSync } from 'node:fs';

export const load = () => {
	const filenames = readdirSync('static');

	const files: { fileName: string; url: string }[] = [];

	filenames.forEach((file) => {
		files.push({
			fileName: file,
			url: `http://localhost:5173/static/${file}`
		});
	});

	return {
		files
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log('uploading...', typeof formData.fileToUpload);

		if (!(formData.fileToUpload as File).name) {
			console.log(formData.fileToUpload, 'Asdas');
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		console.log('oging to upload');
		const { fileToUpload } = formData as { fileToUpload: File };

		// Write the file to the static folder
		writeFileSync(`static/${fileToUpload.name}`, Buffer.from(await fileToUpload.arrayBuffer()));

		console.log('done uploading');
		return {
			success: true
		};
	}
};
