import React from 'react';
import { HandleLoginStart, HandleLogoutSuccess } from '../../../../redux/action/UserAction';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PROJECT } from '../../../../utils/constant';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('UserAction', () => {
    it('should be fine', async () => {
        const store = mockStore({ dataUser: {} });
        store.dispatch(
            HandleLoginStart({
                email: 'test',
                firstName: 'test',
            }),
        );
        store.dispatch(HandleLogoutSuccess());
        store.dispatch({
            type: PROJECT.GET_ALL_PROJECT_START,
            payload: {
                limit: '',
                offset: '',
                keyword: '',
                isDeleted: 0,
            },
        });
    });
});
