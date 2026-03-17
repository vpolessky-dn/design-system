import { describe, expect, it } from 'vitest';
import { createUploadedFile } from './file-factory';

function readAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as ArrayBuffer);
		reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'));
		reader.readAsArrayBuffer(blob);
	});
}

describe('createUploadedFile', () => {
	const makeFile = (name = 'test.txt', content = 'hello') =>
		new File([content], name, { type: 'text/plain' });

	it('should expose originalFile that works with FileReader.readAsArrayBuffer', async () => {
		const uploaded = createUploadedFile(makeFile(), 'pending');

		expect(uploaded.originalFile).toBeInstanceOf(File);
		expect(uploaded.originalFile).toBeInstanceOf(Blob);

		const buffer = await readAsArrayBuffer(uploaded.originalFile);
		expect(buffer.byteLength).toBe(5);
	});

	it('should preserve originalFile through object spread (retry scenario)', async () => {
		const uploaded = createUploadedFile(makeFile('data.bin', 'bytes'), 'pending');
		const data = { ...uploaded, status: 'uploading' as const };

		expect(data.originalFile).toBeInstanceOf(File);

		const buffer = await readAsArrayBuffer(data.originalFile);
		expect(buffer.byteLength).toBe(5);
	});

	it('should set upload metadata correctly', () => {
		const uploaded = createUploadedFile(makeFile(), 'error', ['TOO_LARGE']);

		expect(uploaded.status).toBe('error');
		expect(uploaded.progress).toBe(0);
		expect(uploaded.errors).toEqual(['TOO_LARGE']);
		expect(uploaded.name).toBe('test.txt');
		expect(uploaded.size).toBe(5);
		expect(uploaded.type).toBe('text/plain');
		expect(uploaded.id).toMatch(/^test\.txt-/);
	});
});
