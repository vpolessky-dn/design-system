import { FileUploadAdapter, FileUploadOptions, FileUploadResult } from './file-upload-adapter.types';

export class MyCustomFileUploadAdapter implements FileUploadAdapter {
	constructor(
		private config: {
			bucket: string;
			region: string;
			getPresignedUrl: (fileName: string) => Promise<string>;
		},
	) {}

	async upload(options: FileUploadOptions): Promise<FileUploadResult> {
		try {
			const presignedUrl = await this.config.getPresignedUrl(options.file.name);

			const xhr = new XMLHttpRequest();

			return new Promise((resolve, reject) => {
				xhr.upload.addEventListener('progress', (e) => {
					if (e.lengthComputable && options.onProgress) {
						options.onProgress((e.loaded / e.total) * 100);
					}
				});

				xhr.addEventListener('load', () => {
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve({ success: true, url: presignedUrl });
					} else {
						resolve({ success: false, error: `Upload failed: ${xhr.statusText}` });
					}
				});

				xhr.addEventListener('error', () => {
					resolve({ success: false, error: 'Network error' });
				});

				if (options.signal) {
					options.signal.addEventListener('abort', () => {
						xhr.abort();
						resolve({ success: false, error: 'Upload cancelled' });
					});
				}

				xhr.open('PUT', presignedUrl);
				xhr.setRequestHeader('Content-Type', options.file.type || 'application/octet-stream');
				xhr.send(options.file);
			});
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Upload failed',
			};
		}
	}
}
