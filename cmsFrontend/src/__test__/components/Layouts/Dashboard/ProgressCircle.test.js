import React from 'react';
import ProgressCircle from '../../../../components/Layouts/Dashboard/ProgressCircle';
import { render } from '@testing-library/react';

describe('ProgressCircle component', () => {
    it('should match title and subtitle', () => {
        const { getByTestId } = render(<ProgressCircle progress="0.75" size="40" />);
    });
});
