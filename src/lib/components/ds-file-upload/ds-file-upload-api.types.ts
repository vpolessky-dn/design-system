import { FileUploadFileError } from '@ark-ui/react';

export type FileError = FileUploadFileError;
export type UploadFileStatus = 'pending' | 'uploading' | 'interrupted' | 'completed' | 'error' | 'cancelled';

export interface UploadFile extends File {
	id: string;
	progress: number;
	status: UploadFileStatus;
	errors?: FileError[];
}

export interface FileUploadOptions {
	file: File;
	fileId: string;
	metadata?: Record<string, string>;
	onProgress?: (progress: number) => void;
	signal?: AbortSignal;
}

export type FileUploadResult =
	| {
			success: true;
			url: string;
			metadata?: Record<string, string | number>;
	  }
	| {
			success: false;
			error: string;
			isRetryable?: boolean;
	  };

export interface FileUploadAdapter {
	upload: (options: FileUploadOptions) => Promise<FileUploadResult>;
	cancel?: (fileId: string) => Promise<void>;
}
