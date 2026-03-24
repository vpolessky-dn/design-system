import type { UploadedFile } from '../ds-file-upload-api.types';

/**
 * Converts UploadedFile[] to File[] for Ark UI's acceptedFiles prop.
 *
 * UploadedFile objects are plain objects with name/size/type (not File instances).
 * This is intentional: Ark UI's syncInputElement calls DataTransfer.items.add()
 * on each accepted file. Real File instances would succeed, causing Ark UI to
 * re-dispatch a change event that re-triggers the entire file processing flow.
 * Plain objects cause add() to silently fail, which is the correct behavior
 * when the file state is managed externally by our useFileUpload hook.
 */
export function toArkAcceptedFiles(files: UploadedFile[] | undefined): File[] | undefined {
	return files as File[] | undefined;
}
