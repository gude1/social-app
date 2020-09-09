import { } from '../actions/types';


const INITIAL_STATE = {
    settings: [],
    tosetpostrange: false,
};

const PostSettingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return INITIAL_STATE;
            break;
    }
};

export default PostSettingReducer;
