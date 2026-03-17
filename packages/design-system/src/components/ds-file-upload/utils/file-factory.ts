import type { FileError, UploadedFile, UploadFileStatus } from '../ds-file-upload-api.types';

/**
 * Creates an UploadedFile object from a File with additional metadata
 */
export function createUploadedFile(file: File, status: UploadFileStatus, errors?: FileError[]): UploadedFile {
	return {
		// eslint-disable-next-line @typescript-eslint/no-misused-spread -- name/size/type are re-declared below as own properties so they survive re-spreading in state updates
		...file,
		id: `${file.name}-${String(Date.now())}-${String(Math.random())}`,
		name: file.name,
		size: file.size,
		type: file.type,
		progress: 0,
		status,
		errors,
		originalFile: file,
	} satisfies UploadedFile;
}
