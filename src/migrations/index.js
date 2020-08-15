const migrations = {
    0: (state) => {
        return {
            ...state,
            posts: [...state.posts],
        }
    },
};

export default migrations;