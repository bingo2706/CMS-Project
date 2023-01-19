import React from 'react';
import ModalDelete from '../../../components/common/ModalDelete';
import { render, fireEvent } from '@testing-library/react';
import ProvideTheme from '../../../hoc/ProvideTheme';

describe('ModalDelete component', () => {
    it('should be render', () => {
        const { container, getByTestId } = render(
            <ProvideTheme>
                <ModalDelete handleClose={() => {}} handleAgree={() => {}} open={true} />
            </ProvideTheme>,
        );
        const buttonCancel = getByTestId('button-cancel');
        const buttonSave = getByTestId('Save');
        fireEvent.click(buttonCancel);
        fireEvent.click(buttonSave);
    });
});
