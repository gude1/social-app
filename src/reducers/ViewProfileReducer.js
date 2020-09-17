import { RESET } from '../actions/types';

const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    loading: false,
};


export const ViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
            break;
    }
};

export default ViewProfileReducer;