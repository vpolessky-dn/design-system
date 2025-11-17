import { FileUploadFileMimeType } from '@ark-ui/react';

/**
 * File extension with leading dot
 * @example '.pdf', '.jpg', '.csv'
 */
export type FileExtension = `.${string}`;

/**
 * Accepted file type configuration
 * - Use string shorthand for common MIME types (uses built-in extensions map)
 * - Use object form to override or provide custom extensions
 */
export type AcceptedFileType =
	| FileUploadFileMimeType
	| {
			mimeType: FileUploadFileMimeType;
			extensions: [FileExtension, ...FileExtension[]];
	  };

/**
 * Built-in extensions map for common MIME types
 */
export const EXTENSIONS_MAP: Partial<Record<FileUploadFileMimeType, FileExtension[]>> = {
	// Documents
	'application/pdf': ['.pdf'],
	'text/plain': ['.txt'],
	'text/csv': ['.csv'],
	'application/json': ['.json'],
	'application/xml': ['.xml'],
	'text/html': ['.html', '.htm'],

	// Archives
	'application/zip': ['.zip'],
	'application/x-zip-compressed': ['.zip'],
	'application/x-rar-compressed': ['.rar'],
	'application/x-7z-compressed': ['.7z'],
	'application/gzip': ['.gz'],
	'application/x-tar': ['.tar'],

	// Microsoft Office
	'application/msword': ['.doc'],
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
	'application/vnd.ms-excel': ['.xls'],
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
	'application/vnd.ms-powerpoint': ['.ppt'],
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],

	// Images - specific types
	'image/png': ['.png'],
	'image/jpeg': ['.jpg', '.jpeg'],
	'image/gif': ['.gif'],
	'image/webp': ['.webp'],
	'image/svg+xml': ['.svg'],
	'image/bmp': ['.bmp'],
	'image/tiff': ['.tiff', '.tif'],
	'image/x-icon': ['.ico'],

	// Images - wildcard
	'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.tif'],

	// Audio
	'audio/mpeg': ['.mp3'],
	'audio/wav': ['.wav'],
	'audio/ogg': ['.ogg'],
	'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],

	// Video
	'video/mp4': ['.mp4'],
	'video/mpeg': ['.mpeg', '.mpg'],
	'video/quicktime': ['.mov'],
	'video/x-msvideo': ['.avi'],
	'video/webm': ['.webm'],
	'video/*': ['.mp4', '.mpeg', '.mpg', '.mov', '.avi', '.webm', '.mkv'],
} as const;
