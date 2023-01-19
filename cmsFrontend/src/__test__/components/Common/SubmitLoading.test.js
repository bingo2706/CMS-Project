import React from 'react';
import SubmitLoading from '../../../components/common/SubmitLoading';
import { render } from '@testing-library/react';
import ProvideTheme from '../../../hoc/ProvideTheme';

describe('SubmitLoading component', () => {
    it('should be render', () => {
        const { container } = render(
            <ProvideTheme>
                <SubmitLoading loading={true} />
            </ProvideTheme>,
        );
    });
});
