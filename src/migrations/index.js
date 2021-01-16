import { checkData } from "../utilities/index";

const migrations = {
    0: (state) => {
        return {
            ...state,
            posts: [...state.posts],
            privatechatlistform: {
                ...state.privatechatlistform,
                chatlist: []
            }
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