import { BOOKMARK } from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    timelineposts: [],
}

const handleBookMarking = (state, data) => {
    if (checkData(state) != true || checkData(data) != true ||
        checkData(data.key) != true || checkData(data.value) != true) {
        return state;
    }
    const { key, value } = data;
    switch (key) {
        case 'timelinepost':
            return { ...state, timelineposts: [...state.timelineposts, { ...value }] };
            break;
        default:
            return state;
            break;
    }
};

const BookMarksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOKMARK:
            return handleBookMarking(state, action.payload);
            break;
        default:
            return state;
            break;
    }
};

export default BookMarksReducer;
