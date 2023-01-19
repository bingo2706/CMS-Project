import React from 'react';
import { changeLanguageStart } from '../../../../redux/action/LanguageAction';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('LanguageAction', () => {
    it('should be fine', async () => {
        const store = mockStore({ language: 'vi' });
        store.dispatch(changeLanguageStart('en'));
    });
});
