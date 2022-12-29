import { PROJECT } from '../../utils/constant';
const initState = {
    dataProject: [],
    dataProjectTrash: [],
    isLoading: false,
};

const ProjectReducer = (state = initState, action) => {
    switch (action.type) {
        case PROJECT.GET_ALL_PROJECT_PENDING:
           
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        case PROJECT.GET_ALL_PROJECT_SUCCESS:
            return {
                ...state,
                [action.payload.isTrash ? 'dataProjectTrash' : 'dataProject']: action.payload.data,
                isLoading: action.payload.isLoading,
            };

        default:
            return state;
    }
};

export default ProjectReducer;
