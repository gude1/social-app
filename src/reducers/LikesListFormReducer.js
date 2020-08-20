import { } from '../actions/types';

const INITIAL_STATE = {
    likeslist: [],
    refreshing: false,
    fetching: false,
    loadingmore: false,
};

const LikesListFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.payload) {
        default:
            return state;
            break;
    }
};
export default LikesListFormReducer;