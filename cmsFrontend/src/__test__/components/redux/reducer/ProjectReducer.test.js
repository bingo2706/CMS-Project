import ProjectReducer from '../../../../redux/Reducer/ProjectReducer';
import { PROJECT } from '../../../../utils/constant';
describe('ProjectReducer', () => {
    const initState = {
        dataProject: [],
        dataProjectTrash: [],
        isLoading: false,
    };
    it('GET_ALL_PROJECT_PENDING', () => {
        ProjectReducer(initState, {
            type: PROJECT.GET_ALL_PROJECT_PENDING,
            payload: {
                isLoading: true,
            },
        });
    });
    it('GET_ALL_PROJECT_SUCCESS_TRASH_SUCCESS', () => {
        ProjectReducer(initState, {
            type: PROJECT.GET_ALL_PROJECT_SUCCESS,
            payload: {
                isLoading: false,
                isTrash: true,
                data: {
                    test: 'test',
                },
            },
        });
    });
    it('GET_ALL_PROJECT_SUCCESS_TRASH_FALSE', () => {
        ProjectReducer(initState, {
            type: PROJECT.GET_ALL_PROJECT_SUCCESS,
            payload: {
                isLoading: false,
                isTrash: false,
                data: {
                    test: 'test',
                },
            },
        });
    });
    it('DEFAULT', () => {
        ProjectReducer(initState, {
            type: 'DEFAULT',
        });
    });
});
