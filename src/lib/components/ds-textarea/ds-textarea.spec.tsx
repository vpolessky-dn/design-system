import { render } from '@testing-library/react';
import DsTextarea from './ds-textarea';

describe('DsTextarea', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DsTextarea />);
		expect(baseElement).toBeTruthy();
	});
});
