import ModalEditUser from '../../../../components/Layouts/User/ModalEditUser';
import { render, fireEvent } from '@testing-library/react';
import ProvideTheme from '../../../../hoc/ProvideTheme';
describe('ModalEditUser component', () => {
    it('rendering', () => {
        const { container, getByTestId, getByPlaceholderText, getByLabelText } = render(
            <ProvideTheme>
                <ModalEditUser
                    open={true}
                    handleClose={() => {}}
                    handleUpdateUser={() => {}}
                    data={{ firstName: 'data.firstName', lastName: 'data.lastName', phonenumber: 'data.phonenumber', dob: 'data.dob' }}
                />
            </ProvideTheme>,
        );
        const buttonSave = getByTestId('button-save');
        const buttonCancel = getByTestId('button-cancel');
        const datePicker = getByPlaceholderText('dd/mm/yyyy');
        fireEvent.click(buttonCancel);
        fireEvent.click(buttonSave);
        fireEvent.change(datePicker, { target: { value: '12/12/2022' } });

        const TextFieldFirstName = getByLabelText('First Name');
        fireEvent.change(TextFieldFirstName, { target: { value: '123', name: 'First Name' } });
    });
});
