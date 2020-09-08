import { checkData } from "../utilities/index";

checkData
const migrations = {
    0: (state) => {
        return {
            ...state,
            posts: [...state.posts],
        }
    },
    1: (state) => {
        return {
            ...state,
            timelineposts: {
                ...state.timelineposts,
                profilechanges: checkData(state.timelineposts.profilechanges) ?
                    [...state.timelineposts.profilechanges] : []
            }
        }
    }
};

export default migrations;