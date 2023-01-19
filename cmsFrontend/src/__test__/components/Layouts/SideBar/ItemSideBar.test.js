import React from 'react';
import ItemSidebar from '../../../../components/Layouts/Sidebar/ItemSidebar';
import { render } from '@testing-library/react';
import ProvideTheme from '../../../../hoc/ProvideTheme';

describe('ItemSidebar component', () => {
    it('should be render', () => {
        const { container } = render(
            <ProvideTheme>
                <React.Fragment>
                    <ItemSidebar />
                </React.Fragment>
            </ProvideTheme>,
        );
    });
});
