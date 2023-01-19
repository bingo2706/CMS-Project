import React from 'react';
import { useFetchAllcode } from '../../hooks/fetchAllcode';
import { TYPE_ALLCODE } from '../../utils/constant';
describe('UseFetchAllCode', () => {
    it('should be fine', () => {
        const setdata = jest.fn();
        const useStateMock = (useState) => [useState, setdata];
        jest.spyOn(React, 'useEffect').mockImplementation(() => {});
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        var { data: dataRole } = useFetchAllcode(TYPE_ALLCODE.ROLE);
    });
});
