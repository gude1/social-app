import { REMOVE_POST, UPDATE_POST } from '../actions/types';
const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_POST:
            return [{ ...action.payload }];
            break;
        case REMOVE_POST:
            let updatedstate = state.filter(item => item.postid != action.payload);
            return updatedstate;
            break;
        default:
            return state;
            break;
    };
};