import { CLOUD_ROOT } from '$env/static/private';
import path from 'node:path';
import fs from 'node:fs';

/**
 * @param paths kwargs* of paths after the CLOUD_ROOT.
 * Don't pass anything to get the cloud root path only.
 * @returns a path to the file from the CLOUD_ROOT.
 */
export const getCloudRootPath = (...paths: string[]) => {
	const root = path.resolve(CLOUD_ROOT);

	// Cloud Root doesn't exist.
	if (!fs.existsSync(root)) {
		fs.mkdirSync(root);
	}

	return path.join(root, ...paths);
};
