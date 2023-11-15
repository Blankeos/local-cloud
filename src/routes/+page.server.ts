import { fail } from '@sveltejs/kit';
import { writeFileSync, readdirSync } from 'node:fs';
import type { PageServerLoad } from './$types';
import { getCloudRootPath } from '@/lib/server/getCloudRootPath';

export const load: PageServerLoad = ({ url, request }) => {
	const filenames = readdirSync(getCloudRootPath());

	const files: { fileName: string; url: string }[] = [];

	filenames.forEach((file) => {
		const protocol = request.headers.get('x-forwarded-proto') || 'http';

		files.push({
			fileName: file,
			url: `${protocol}://${url.host}/api/cloud/${file}`
		});
	});

	return {
		files
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const files: Array<File> = [];
		for (const entry of formData.entries()) {
			if (entry[0] === 'fileToUpload') {
				files.push(entry[1] as File);
			}
		}

		if (files.length === 0) {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		// Write the file to the cloud root path.
		let index = 0;
		for (const file of files) {
			writeFileSync(getCloudRootPath(file.name), Buffer.from(await file.arrayBuffer()));
			index = index + 1;
		}

		return {
			success: true
		};
	}
};
