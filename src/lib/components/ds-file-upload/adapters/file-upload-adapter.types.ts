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
