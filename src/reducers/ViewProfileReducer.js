import { RESET } from '../actions/types';

const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    viewprofilepostsnexturl: null,
    viewpostloading: false,
};


export const ViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET:
            if (action.payload.key == 'viewprofileform') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    }
};

export default ViewProfileReducer;