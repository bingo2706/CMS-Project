import { PROJECT } from '../../utils/constant';
const initState = {
    dataProject: [],
};

const ProjectReducer = (state = initState, action) => {
    switch (action.type) {
        case PROJECT.GET_ALL_PROJECT_SUCCESS:
            return {
                ...state,
                dataProject: action.payload,
            };
        default:
            return state;
    }
};

export default ProjectReducer;
