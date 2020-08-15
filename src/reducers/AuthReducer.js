
import {
    PROCESSING,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    NAME_CHANGED,
    USERNAME_CHANGED,
    PHONE_CHANGED,
    SET_ERRORS,
    SET_MSGS,
    RESET,
} from '../actions/types';

const PROPERTY = {
    email: '',
    name: '',
    username: '',
    password: '',
    phone: '',
    msgs: null,
    isProcessing: false,
    errors: {
        nameerr: '',
        usernameerr: '',
        emailerr: '',
        phoneerr: '',
        passworderr: '',
        generalerrmsg: null,
    },
};

const INITIAL_STATE = {
    signup: { ...PROPERTY },
    login: { ...PROPERTY },
};

export default (state = INITIAL_STATE, action) => {
    if (action.payload != undefined) {
        var { key, value } = action.payload;
    }
    switch (action.type) {
        case PROCESSING:
            if (key == "signup") {
                return { ...state, signup: { ...state[key], isProcessing: value } };
            } else if (key == "login") {
                return { ...state, login: { ...state[key], isProcessing: value } };
            }
            return state;
            break;
        case EMAIL_CHANGED:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], email: value } }
                :
                { ...state, login: { ...state[key], email: value } }
            break;
        case NAME_CHANGED:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], name: value } }
                :
                { ...state, login: { ...state[key], name: value } }
            break;
        case USERNAME_CHANGED:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], username: value } }
                :
                { ...state, login: { ...state[key], username: value } }
            break;
        case PHONE_CHANGED:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], phone: value } }
                :
                { ...state, login: { ...state[key], phone: value } }
            break;
        case PASSWORD_CHANGED:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], password: value } }
                :
                { ...state, login: { ...state[key], password: value } }
            break;
        case SET_ERRORS:
            return (key == "signup") ?
                { ...state, signup: { ...state[key], errors: { ...state[key].errors, ...value } } }
                :
                { ...state, login: { ...state[key], errors: { ...state[key].errors, ...value } } }
            break;
        case SET_MSGS:
            //let { key, value } = action.payload;
            return (key == "signup") ?
                { ...state, signup: { ...state[key], msgs: value } }
                :
                { ...state, login: { ...state[key], msgs: value } }
            break;
        case RESET:
            //let { key, value } = action.payload;
            return (key == "signup") ?
                { ...state, signup: { ...PROPERTY } }
                :
                { ...state, login: { ...PROPERTY } }
            break;
        default:
            return state;
            break;
    }

};