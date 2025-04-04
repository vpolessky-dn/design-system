import { render } from '@testing-library/react';

import DnGrid from './dn-grid';

describe('DnGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DnGrid />);
    expect(baseElement).toBeTruthy();
  });
});
