import { FileUploadFileMimeType } from '@ark-ui/react';
import { AcceptedFileType, EXTENSIONS_MAP, FileExtension } from '../types/accept-types';

/**
 * Extract file extensions from accept configuration
 * @param accept Array of accepted file types
 * @returns Array of file extensions
 */
export function getFileExtensions(accept: AcceptedFileType[]): FileExtension[] {
	return accept.flatMap((item) => {
		if (typeof item === 'string') {
			const extensions = EXTENSIONS_MAP[item];
			if (!extensions) {
				console.warn(
					`[FileUpload] No extensions found for MIME type: ${item}. Please provide custom extensions.`,
				);
				return [];
			}
			return extensions;
		}
		return item.extensions;
	});
}

/**
 * Extract MIME types from accept configuration
 * @param accept Array of accepted file types
 * @returns Array of MIME types
 */
export function getMimeTypes(accept: AcceptedFileType[]): FileUploadFileMimeType[] {
	return accept.map((item) => (typeof item === 'string' ? item : item.mimeType));
}

/**
 * Convert accept configuration to Ark UI format
 * @param accept Array of accepted file types
 * @returns Record mapping MIME types to extensions (Ark UI format)
 */
export function toArkUIAccept(accept: AcceptedFileType[]): Partial<Record<FileUploadFileMimeType, string[]>> {
	return accept.reduce(
		(acc, item) => {
			const mimeType = typeof item === 'string' ? item : item.mimeType;
			const extensions = typeof item === 'string' ? (EXTENSIONS_MAP[item] ?? []) : item.extensions;
			acc[mimeType] = extensions;
			return acc;
		},
		{} as Partial<Record<FileUploadFileMimeType, string[]>>,
	);
}
