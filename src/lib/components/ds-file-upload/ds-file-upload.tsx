import React, { useEffect, useRef } from 'react';
import { DsFileUploadProps } from './ds-file-upload.types';
import { FileUpload } from './components/file-upload';
import { useFileUpload } from './hooks';

/**
 * Design system File Upload component (with state management)
 */
const DsFileUpload: React.FC<DsFileUploadProps> = ({
	adapter,
	autoUpload = true,
	maxConcurrent = 3,
	metadata,
	onUploadComplete,
	onUploadError,
	onFilesAdded,
	onFileRemoved,
	onAllUploadsComplete,
	...props
}) => {
	const { getProps, files } = useFileUpload({
		adapter,
		autoUpload,
		maxConcurrent,
		metadata,
		onUploadComplete,
		onUploadError,
	});
	const prevUploadingCount = useRef(0);

	useEffect(() => {
		const uploadingCount = files.filter((f) => f.status === 'uploading').length;

		if (prevUploadingCount.current > 0 && uploadingCount === 0 && files.length > 0) {
			const allComplete = files.every(
				(f) => f.status === 'completed' || f.status === 'error' || f.status === 'cancelled',
			);

			if (allComplete) {
				onAllUploadsComplete?.();
			}
		}

		prevUploadingCount.current = uploadingCount;
	}, [files, onAllUploadsComplete]);

	const fileUploadProps = getProps({
		onFilesAdded,
		onFileRemoved,
	});

	return <FileUpload {...fileUploadProps} {...props} />;
};

export default DsFileUpload;
