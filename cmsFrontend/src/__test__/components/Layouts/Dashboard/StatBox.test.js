import React from 'react';
import StatBox from '../../../../components/Layouts/Dashboard/StatBox';
import { render } from '@testing-library/react';

describe('StatBox component', () => {
    it('should match title and subtitle', () => {
        const { getByTestId } = render(<StatBox title="32,441" subtitle="New Client" />);
        const title = getByTestId('title');
        const subtitle = getByTestId('subtitle');

        expect(title.innerHTML).toBe('32,441');
        expect(subtitle.innerHTML).toBe('New Client');
    });
});
