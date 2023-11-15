import fs from 'node:fs/promises';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCloudRootPath } from '@/lib/server/getCloudRootPath';

export const GET: RequestHandler = async ({ params }) => {
	const pathName = getCloudRootPath(params.path);

	try {
		const file = await fs.readFile(pathName);
		return new Response(file);
	} catch {
		throw error(404); // use 404 (not found) here
	}
};
