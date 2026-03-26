import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { FileUpload } from '../components/file-upload';
import type { UploadedFile } from '../ds-file-upload-api.types';

const createMockUploadedFile = (overrides: Partial<UploadedFile> = {}): UploadedFile => {
	const file = new File(['test'], 'test-document.pdf', { type: 'application/pdf' });

	return {
		// eslint-disable-next-line @typescript-eslint/no-misused-spread -- We're fine with losing the prototype here
		...file,
		id: 'test-file-1',
		name: 'test-document.pdf',
		size: 1024,
		type: 'application/pdf',
		progress: 0,
		status: 'pending',
		originalFile: file,
		...overrides,
	} satisfies UploadedFile;
};

describe('FileUpload', () => {
	it('should render the select file trigger button', async () => {
		await page.render(<FileUpload />);

		await expect.element(page.getByRole('button', { name: /select file/i })).toBeInTheDocument();
	});

	it('should hide info text when hideInfoText is true', async () => {
		await page.render(<FileUpload hideInfoText />);

		await expect.element(page.getByRole('button', { name: /select file/i })).toBeInTheDocument();
		await expect.element(page.getByText(/Only/)).not.toBeInTheDocument();
	});

	it('should render completed file with delete button', async () => {
		const onFileDelete = vi.fn();
		const file = createMockUploadedFile({ status: 'completed', progress: 100 });

		await page.render(<FileUpload files={[file]} onFileDelete={onFileDelete} />);

		await expect.element(page.getByText('test-document.pdf')).toBeInTheDocument();
		await expect.element(page.getByText('Upload complete')).toBeInTheDocument();

		await page.getByRole('button', { name: /delete/i }).click();

		expect(onFileDelete).toHaveBeenCalledWith('test-file-1');
	});

	it('should render uploading file with cancel button and progress', async () => {
		const onFileCancel = vi.fn();
		const file = createMockUploadedFile({ status: 'uploading', progress: 45 });

		await page.render(<FileUpload files={[file]} onFileCancel={onFileCancel} />);

		await expect.element(page.getByText('test-document.pdf')).toBeInTheDocument();
		await expect.element(page.getByText(/Uploading.*45%/)).toBeInTheDocument();

		await page.getByRole('button', { name: /cancel/i }).click();

		expect(onFileCancel).toHaveBeenCalledWith('test-file-1');
	});

	it('should render interrupted file with retry and remove buttons', async () => {
		const onFileRetry = vi.fn();
		const onFileRemove = vi.fn();
		const file = createMockUploadedFile({ status: 'interrupted' });

		await page.render(<FileUpload files={[file]} onFileRetry={onFileRetry} onFileRemove={onFileRemove} />);

		await expect.element(page.getByText('Upload interrupted')).toBeInTheDocument();

		await page.getByRole('button', { name: /retry/i }).click();

		expect(onFileRetry).toHaveBeenCalledWith('test-file-1');
	});

	it('should render cancelled file', async () => {
		const file = createMockUploadedFile({ status: 'cancelled' });

		await page.render(<FileUpload files={[file]} />);

		await expect.element(page.getByText('Upload cancelled')).toBeInTheDocument();
	});

	it('should render error file with error message and remove button', async () => {
		const onFileRemove = vi.fn();
		const file = createMockUploadedFile({ status: 'error', errors: ['FILE_TOO_LARGE'] });

		await page.render(<FileUpload files={[file]} onFileRemove={onFileRemove} />);

		await expect.element(page.getByText('File size exceeds the maximum limit')).toBeInTheDocument();

		await page.getByRole('button', { name: /remove/i }).click();

		expect(onFileRemove).toHaveBeenCalledWith('test-file-1');
	});

	it('should render TOO_MANY_FILES error message', async () => {
		const file = createMockUploadedFile({ status: 'error', errors: ['TOO_MANY_FILES'] });

		await page.render(<FileUpload files={[file]} />);

		await expect.element(page.getByText('Too many files selected')).toBeInTheDocument();
	});

	it('should render FILE_EXISTS error message', async () => {
		const file = createMockUploadedFile({ status: 'error', errors: ['FILE_EXISTS'] });

		await page.render(<FileUpload files={[file]} />);

		await expect.element(page.getByText('File already exists')).toBeInTheDocument();
	});
});
