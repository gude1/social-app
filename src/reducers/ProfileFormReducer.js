import {
    UPDATE_BIO_CHANGED,
    UPDATE_USERNAME_CHANGED,
    UPDATE_CAMPUS_CHANGED,
    UPDATE_PASSWORD_CHANGED,
    UPDATE_GENDER_CHANGED,
    PROCESSING,
    SET_IMAGE_TRY,
    SET_UPDATE_PROFILE_ERRORS,
    RESET,
} from '../actions/types';
const ERRORS = {
    usernameerr: null,
    campuserr: null,
    bioerr: null,
    gendererr: null,
};
const INITIAL_STATE = {
    getimagetry: false,
    updateProfile: {
        isProcessing: false,
        isProcessingImage: false,
        updatedusername: null,
        updatedpassword: null,
        updatedcampus: null,
        updatedbio: null,
        updatedgender: null,
        errors: ERRORS
    }
};
const ProfileFormReducer = (state = INITIAL_STATE, action) => {
    if (action.payload != undefined) {
        var { key, value } = action.payload;
    }
    switch (action.type) {
        case UPDATE_USERNAME_CHANGED:
            return { ...state, updateProfile: { ...state.updateProfile, ...action.payload } }
            break;
        case UPDATE_BIO_CHANGED:
            return { ...state, updateProfile: { ...state.updateProfile, ...action.payload } }
            break;
        case UPDATE_CAMPUS_CHANGED:
            return { ...state, updateProfile: { ...state.updateProfile, ...action.payload } }
            break;
        case UPDATE_PASSWORD_CHANGED:
            return { ...state, updateProfile: { ...state.updateProfile, ...action.payload } }
            break;
        case UPDATE_GENDER_CHANGED:
            return { ...state, updateProfile: { ...state.updateProfile, ...action.payload } }
            break;
        case SET_UPDATE_PROFILE_ERRORS:
            return key == "updateProfile" ?
                {
                    ...state, updateProfile: {
                        ...state.updateProfile, errors: {
                            ...state.updateProfile.errors, ...value
                        }
                    }
                }
                : state
            break;
        case RESET:
            return key == "updateprofileerrors" ?
                {
                    ...state, updateProfile: {
                        ...state.updateProfile, errors: {
                            ...state.updateProfile.errors, ...ERRORS
                        }
                    }
                }
                : state
            break;
        case PROCESSING:
            if (key == "updateProfile") {
                return { ...state, updateProfile: { ...state.updateProfile, isProcessing: value } };
            } else if (key == "updateProfileImage") {
                return { ...state, updateProfile: { ...state.updateProfile, isProcessingImage: value } };
            }
            return state;
            break;
        case SET_IMAGE_TRY:
            return { ...state, getimagetry: action.payload };
        default:
            return state;
            break;
    }
};

export default ProfileFormReducer;