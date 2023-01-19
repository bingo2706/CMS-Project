import React from 'react';
import AddUser from '../../../../features/User/AddUser';
import { fireEvent, render } from '@testing-library/react';
import ProvideTheme from '../../../../hoc/ProvideTheme';
import { wait } from '@testing-library/user-event/dist/utils';
import TestRenderer from 'react-test-renderer';
describe('Add User component', () => {
    it('should be match snapshot', () => {
        const { container } = render(
            <ProvideTheme>
                <AddUser />,
            </ProvideTheme>,
        );
        expect(container).toMatchSnapshot();
    });
    it('openReviewImage', async () => {
        const { container, getByTestId } = render(
            <ProvideTheme>
                <AddUser />,
            </ProvideTheme>,
        );
        const imgReview = getByTestId('imgReview');

        fireEvent.click(imgReview);
        await wait(() => {
            const Lightbox = getByTestId('Lightbox');
            expect(Lightbox).toBeDefined();
        });
    });
    it('onchangeInput', () => {
        const { container, getAllByTestId, getByLabelText } = render(
            <ProvideTheme>
                <AddUser />,
            </ProvideTheme>,
        );
        const inputFirstName = getByLabelText('First Name');
        fireEvent.change(inputFirstName, { target: { value: '123', name: 'First Name' } });
    });
});
