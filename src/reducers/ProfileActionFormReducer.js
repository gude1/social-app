import { PROCESSING, RESET } from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    followingprofile: false,
    mutingprofile: false,
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'profileactionfollowing':
            return { ...state, followingprofile: value };
            break;
        case 'profileactionmuting':
            return { ...state, mutingprofile: value };
            break;
        default:
            return state;
            break;
    }
};

const ProfileActionFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESSING:
            return handleProcessing(action.payload.key, action.payload.value, state);
            break;
        case RESET:
            return INITIAL_STATE;
            break;
        default:
            return state;
            break;
    };
};

export default ProfileActionFormReducer;