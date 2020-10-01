import {
    SAVE_USER,
    UPDATE_USER,
    PROCESSING,
    SET_ERRORS,
    SET_MSGS,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    NAME_CHANGED,
    SET_APP_INFO,
    PHONE_CHANGED,
    USERNAME_CHANGED,
    UPDATE_BIO_CHANGED,
    UPDATE_CAMPUS_CHANGED,
    UPDATE_USERNAME_CHANGED,
    UPDATE_GENDER_CHANGED,
    UPDATE_PASSWORD_CHANGED,
    SET_UPDATE_PROFILE_ERRORS,
    NEW_PROFILE_PIC,
    SET_IMAGE_TRY,
    SET_PROFILE_DATA,
    UPDATE_POST_FORM_TEXT_CHANGED,
    UPDATE_POST_FORM_IMAGE_CHANGED,
    SET_GALLERY_PHOTOS,
    SET_SELECTED_LIST,
    UNSET_SELECTED_LIST,
    SET_GALLERY_PHOTOS_NUM,
    UPDATE_POST,
    REMOVE_POST,
    ADD_TIMELINE_POST,
    UPDATE_TIMELINE_POST,
    ADD_TIMELINE_POST_FORM,
    DELETE_TIMELINE_POST,
    DELETE_TIMELINE_POST_FORM,
    SET_TIMELINE_POST_FORM_LINKS,
    SET_TIMELINE_POST_LINKS,
    UPDATE_TIMELINE_POST_FORM,
    TIMELINE_POST_FORM_REFRESH,
    REMOVE_PROFILE_TIMELINE_POST,
    REMOVE_PROFILE_TIMELINE_POST_FORM,
    ADD_POST_COMMENT_FORM,
    PREPEND_TIMELINE_POST_FORM,
    UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES,
    UPDATE_TIMELINE_POST_PROFILE_CHANGES,
    PREPEND_TIMELINE_POST,
    POST_COMMENT_FORM_REFRESH,
    POST_COMMENT_FORM_DELETE,
    PREPEND_POST_COMMENT_FORM,
    REMOVE_POST_COMMENT_FORM,
    UPDATE_POST_COMMENT_FORM,
    SET_POST_COMMENT_FORM_LINK,
    ADD_POST_COMMENT_REPLY_FORM,
    PREPEND_POST_COMMENT_REPLY_FORM,
    POST_COMMENT_REPLY_FORM_DELETE,
    POST_COMMENT_REPLY_FORM_REFRESH,
    REMOVE_POST_COMMENT_REPLY_FORM,
    UPDATE_POST_COMMENT_REPLY_FORM,
    UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES,
    SET_POST_COMMENT_REPLY_FORM_LINK,
    ADD_LIKES_LIST_FORM,
    UPDATE_LIKES_LIST_FORM,
    PREPEND_LIKES_LIST_FORM,
    SET_LIKES_LIST_FORM_LINK,
    ADD_SHARES_LIST_FORM,
    UPDATE_SHARES_LIST_FORM,
    UPDATE_POST_COMMENT_FORM_PROFILE_CHANGES,
    PREPEND_SHARES_LIST_FORM,
    SET_SHARES_LIST_FORM_LINK,
    RESET,
    BOOKMARK,
    SET_TIMELINE_POST_FORM_PROFILE_CHANGES,
    SET_TIMELINE_POST_PROFILE_CHANGES,
    UPDATE_POST_SETTINGS,
    ADD_USER_VIEWPROFILEFORM_POSTS,
    PREPEND_USER_VIEWPROFILEFORM_POSTS,
    UPDATE_USER_VIEWPROFILEFORM_POSTS,
    SET_USER_VIEWPROFILEFORM,
    ADD_OTHERS_VIEWPROFILEFORM_POSTS,
    PREPEND_OTHERS_VIEWPROFILEFORM_POSTS,
    UPDATE_OTHERS_VIEWPROFILEFORM_POSTS,
    SET_OTHERS_VIEWPROFILEFORM,
    SET_USER_VIEWPROFILEFORM_LINK,
    SET_OTHERS_VIEWPROFILEFORM_LINK,
} from './types';
import auth from '../api/auth';
import session from '../api/session';
import axios from 'axios';
import { ToastAndroid, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { store, persistor } from '../store';
import {
    deleteFile,
    rnPath,
    setRoute,
    shouldNav,
    getAppInfo,
    test,
    checkData,
    getImageSize,
    resizeImage,
    image_exists,
    Toast,
    logOut
} from '../utilities';
import CameraRoll from "@react-native-community/cameraroll";

/**
 * GENERAL ACTION CREATORS
 */
export const setProcessing = (data, key) => {
    return {
        type: PROCESSING,
        payload: { key, value: data }
    };
};

/**
 * ACTION CREATORS FOR APPINFOREDUCER
 */
export const setAppInfo = (data) => {
    return {
        type: SET_APP_INFO,
        payload: { ...data }
    }
};



/**
 * ACTION CREATORS FOR AUTHREDUCER
 */
export const setErrors = (data, key) => {
    return {
        type: SET_ERRORS,
        payload: { key, value: data }
    };
};

export const setMsgs = (data, key) => {
    return {
        type: SET_MSGS,
        payload: { key, value: data }
    };
};

export const setEmail = (data, key) => {
    return {
        type: EMAIL_CHANGED,
        payload: { key, value: data }
    };
};

export const setName = (data, key) => {
    return {
        type: NAME_CHANGED,
        payload: { key, value: data }
    };
};

export const setUsername = (data, key) => {
    return {
        type: USERNAME_CHANGED,
        payload: { key, value: data }
    };
};

export const setPhone = (data, key) => {
    return {
        type: PHONE_CHANGED,
        payload: { key, value: data }
    };
};

export const setPassword = (data, key) => {
    return {
        type: PASSWORD_CHANGED,
        payload: { key, value: data }
    };
};

export const setReset = (key: String, value: String) => {
    return {
        type: RESET,
        payload: { key, value }
    };
};



export const signUp = ({ email, username, name, phone, password, Navigation, componentId }) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'signup'));
        dispatch(setErrors({
            nameerr: '',
            usernameerr: '',
            emailerr: '',
            phoneerr: '',
            passworderr: '',
            generalerrmsg: null,
        }, 'signup'));
        try {
            const response = await auth.post('register', {
                name,
                username,
                email,
                phone,
                password
            });
            const { errors, status, message, generalerrmsg } = response.data;

            switch (status) {
                case 400:
                    dispatch(setErrors(errors, 'signup'));
                    dispatch(setProcessing(false, 'signup'));
                    break;
                case 201:
                    //incomplete need to show modal that tells user to check mail
                    //dispatch(setMsgs(message, 'signup'));
                    alert('Signup Success! please check your email inbox for confirmation email');
                    Toast(message, ToastAndroid.LONG);
                    dispatch(setReset('signup'));
                    Navigation.push(componentId, {
                        component: {
                            name: 'Signin',
                        }
                    });
                    break;
                case 401:
                    Toast('Validation failed,Invalid request attempt');
                    break;
                case 500:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'signup'));
                    break;
                default:
                    dispatch(setErrors({ generalerrmsg }, 'signup'));
                    dispatch(setProcessing(false, 'signup'));
                    return;
                    break;
            }
        } catch (e) {
            if (e.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
            dispatch(setProcessing(false, 'signup'));
        }
    };
};



export const logIn = ({ email, password, Navigation, componentId }) => {

    return async (dispatch) => {
        dispatch(setProcessing(true, 'login'));
        dispatch(setErrors({
            nameerr: '',
            usernameerr: '',
            emailerr: '',
            phoneerr: '',
            passworderr: '',
            generalerrmsg: null,
        }, 'login'));
        try {
            const response = await auth.post('login', {
                email: email,
                password: password
            });
            const { errmsg, status, user, profile, posts } = response.data;
            /*console.warn(profile);
            return;*/
            switch (status) {
                case 302:
                    dispatch(saveUser(user));
                    if (checkData(posts)) {
                        dispatch(savePost(posts));
                    }
                    dispatch(setProfileData({ ...profile, avatarremote: profile.avatar[1] }));
                    getAppInfo(store.getState().profile, 'profile') == 'profiletrue' ?
                        dispatch(setAppInfo({ editprofileinformed: true })) : null;
                    getAppInfo(store.getState().posts, 'post') == 'posttrue' ?
                        dispatch(setAppInfo({ postinformed: true })) : null;
                    Toast('Login successful', ToastAndroid.SHORT);
                    dispatch(setProcessing(false, 'login'));
                    dispatch(setReset('login'));
                    setRoute(store.getState());
                    break;
                case 400:
                    dispatch(setProcessing(false, 'login'))
                    dispatch(setErrors({ generalerrmsg: errmsg }, 'login'));
                    break;
                case 401:
                    Toast('Validation failed,Invalid request attempt');
                    break;
                default:
                    dispatch(setProcessing(false, 'login'))
                    Toast('Something went wrong please try again', ToastAndroid.LONG);
                    dispatch(setErrors({ generalerrmsg: errmsg }, 'login'));
                    break;
            }
        } catch (e) {
            //alert(e.toString());
            //console.warn(e.toString())
            if (e.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
            dispatch(setProcessing(false, 'login'));

        }
    };

};

/**
 * ACTION CREATORS FOR PROFILEACTIONFORMREDUCER
 */
export const followProfileAction = (profileid, initAction, okAction, failedAction) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(profileid) != true) {
            Toast('Request incomplete', ToastAndroid.LONG);
            return;
        } else if (profileid == profile.profile_id) {
            Toast("You can't follow yourself", ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'profileactionfollowing'));
        initAction && initAction();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('profilefollowaction', { profileid }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'profileactionfollowing'));
                    Toast(message, ToastAndroid.LONG);
                    okAction && okAction();
                    break;
                case 400:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'profileactionfollowing'));
                    failedAction && failedAction();
                    break;
                case 401:
                    dispatch(setProcessing(false, 'profileactionfollowing'));
                    failedAction && failedAction();
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    dispatch(setProcessing(false, 'profileactionfollowing'));
                    Toast(errmsg, ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
                default:
                    dispatch(setProcessing(false, 'profileactionfollowing'));
                    Toast('action failed please try again', ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(setProcessing(false, 'profileactionfollowing'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('action failed please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
            failedAction && failedAction();
        }
    };
};

export const muteProfileAction = (profileid, initAction, okAction, failedAction) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(profileid) != true) {
            Toast('Request incomplete', ToastAndroid.LONG);
            return;
        } else if (profileid == profile.profile_id) {
            Toast("You can't mute yourself", ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'profileactionmuting'));
        initAction && initAction();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('profilemuteaction', { profileid }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'profileactionmuting'));
                    Toast(message, ToastAndroid.LONG);
                    okAction && okAction();
                    break;
                case 400:
                    dispatch(setProcessing(false, 'profileactionmuting'));
                    Toast(errmsg, ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
                case 401:
                    dispatch(setProcessing(false, 'profileactionmuting'));
                    failedAction && failedAction();
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    dispatch(setProcessing(false, 'profileactionmuting'));
                    Toast(errmsg, ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
                default:
                    Toast('action failed please try again', ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(setProcessing(false, 'profileactionmuting'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('action failed please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
            failedAction && failedAction();
        }
    };
};

export const blockProfileAction = (profileid, initAction, okAction, failedAction) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(profileid) != true) {
            Toast('Request incomplete', ToastAndroid.LONG);
            return;
        } else if (profileid == profile.profile_id) {
            Toast("You can't block yourself", ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'profileactionblocking'));
        initAction && initAction();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('profileblockaction', { profileid }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'profileactionblocking'));
                    Toast(message, ToastAndroid.LONG);
                    okAction && okAction();
                    break;
                case 400:
                    dispatch(setProcessing(false, 'profileactionblocking'));
                    Toast(errmsg, ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
                case 401:
                    dispatch(setProcessing(false, 'profileactionblocking'));
                    failedAction && failedAction();
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    dispatch(setProcessing(false, 'profileactionblocking'));
                    Toast(errmsg, ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
                default:
                    Toast('action failed please try again', ToastAndroid.LONG);
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'profileactionblocking'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('action failed please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
            failedAction && failedAction();
        }
    };
};

export const fetchAProfile = (profileid, initAction, okAction, failedAction) => {
    return async () => {
        if (!checkData(profileid)) {
            Toast('Missing terms to continue', ToastAndroid.SHORT);
            failedAction && failedAction();
        }
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            initAction && initAction();
            const response = await session.post('profileshow', { profileid }, options);
            const { errmsg, status, profile } = response.data;
            switch (status) {
                case 302:
                    okAction && okAction(profile);
                    break;
                case 404:
                    Toast('profile not found', ToastAndroid.SHORT);
                    failedAction && failedAction('cancel');
                    break;
                case 401:
                    failedAction && failedAction('cancel');
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.SHORT);
                    failedAction && failedAction('cancel');
                    break;
                default:
                    Toast(errmsg, ToastAndroid.SHORT);
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error could not fetch profile', ToastAndroid.LONG);
            } else {
                Toast('something went wrong profile not fetched', ToastAndroid.LONG);
            }
            failedAction && failedAction();
        }
    };
};



/**
 * ACTION CREATORS FOR LIKESLISTFORMREDUCER
 */
export const addToLikesListForm = (data: Array) => {
    return {
        type: ADD_LIKES_LIST_FORM,
        payload: data
    };
};

export const prependToLikesListForm = (data: Array) => {
    return {
        type: PREPEND_LIKES_LIST_FORM,
        payload: data
    };
};

export const updateLikesListForm = (data: Object) => {
    return {
        type: UPDATE_LIKES_LIST_FORM,
        payload: data
    };
};
export const setLikesListFormLink = (data: String) => {
    return {
        type: SET_LIKES_LIST_FORM_LINK,
        payload: data,
    }
};

export const fetchLikes = (requrl, reqdata) => {
    return async (dispatch) => {
        if (checkData(requrl) != true) {
            Toast('request term not specified', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'likeslistfetching'));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(requrl, reqdata, options);
            const { errmsg, status, likes_list, message, next_page_url } = response.data;
            // console.warn(response.data);
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'likeslistfetching'));
                    dispatch(addToLikesListForm(likes_list));
                    dispatch(setLikesListFormLink(next_page_url));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'likeslistfetching'));
                    logOut(() => persistor.purge());
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'likeslistfetching'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing('retry', 'likeslistfetching'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'likeslistfetching'));
                    Toast('something went wrong please try again', ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            // console.warn(err.toString());
            dispatch(setProcessing('retry', 'likeslistfetching'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
        }
    };
};

export const fetchMoreLikes = (reqdata) => {
    return async (dispatch) => {
        const { user, likeslistform } = store.getState();
        const { nextpageurl } = likeslistform;
        if (checkData(nextpageurl) != true) {
            dispatch(setProcessing('done', 'likeslistloadingmore'));
            return;
        }
        dispatch(setProcessing(true, 'likeslistloadingmore'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(nextpageurl, reqdata, options);
            const { errmsg, status, likes_list, message, next_page_url } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'likeslistloadingmore'));
                    dispatch(addToLikesListForm(likes_list));
                    dispatch(setLikesListFormLink(next_page_url));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'likeslistloadingmore'));
                    logOut(() => persistor.purge());
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'likeslistloadingmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing('retry', 'likeslistloadingmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'likeslistloadingmore'));
                    Toast('something went wrong please try again', ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing('retry', 'likeslistloadingmore'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
        }
    };
};

/**
 * ACTION CREATORS FOR SHARESLISTFORMREDUCER
 */
export const addToSharesListForm = (data: Array) => {
    return {
        type: ADD_SHARES_LIST_FORM,
        payload: data
    };
};

export const prependToSharesListForm = (data: Array) => {
    return {
        type: PREPEND_SHARES_LIST_FORM,
        payload: data
    };
};

export const updateSharesListForm = (data: Object) => {
    return {
        type: UPDATE_SHARES_LIST_FORM,
        payload: data
    };
};
export const setSharesListFormLink = (data: String) => {
    return {
        type: SET_SHARES_LIST_FORM_LINK,
        payload: data,
    }
};

export const fetchShares = (requrl, reqdata) => {
    return async (dispatch) => {
        if (checkData(requrl) != true) {
            Toast('request term not specified', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'shareslistfetching'));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(requrl, reqdata, options);
            const { errmsg, status, shares_list, message, next_page_url } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'shareslistfetching'));
                    dispatch(addToSharesListForm(shares_list));
                    dispatch(setSharesListFormLink(next_page_url));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'shareslistfetching'));
                    logOut(() => persistor.purge());
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'shareslistfetching'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing('retry', 'shareslistfetching'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'shareslistfetching'));
                    Toast('something went wrong please try again', ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing('retry', 'shareslistfetching'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
        }
    };
};

export const fetchMoreShares = (reqdata) => {
    return async (dispatch) => {
        const { user, shareslistform } = store.getState();
        const { nextpageurl } = shareslistform;
        if (checkData(nextpageurl) != true) {
            dispatch(setProcessing('done', 'shareslistloadingmore'));
            return;
        }
        dispatch(setProcessing(true, 'shareslistloadingmore'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(nextpageurl, reqdata, options);
            const { errmsg, status, shares_list, message, next_page_url } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'shareslistloadingmore'));
                    dispatch(addToSharesListForm(shares_list));
                    dispatch(setSharesListFormLink(next_page_url));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'shareslistloadingmore'));
                    logOut(() => persistor.purge());
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'shareslistloadingmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing('retry', 'shareslistloadingmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'shareslistloadingmore'));
                    Toast('something went wrong please try again', ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing('retry', 'shareslistloadingmore'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('Something went wrong please try again', ToastAndroid.LONG);
            }
        }
    };
};

/**
 * 
 * ACTION CREATORS FOR CERTAIN POST ACTIONS
 */
export const fetchProfilePosts = (profileid, initAction, okAction, failedAction) => {
    return async () => {
        if (!checkData(profileid)) {
            Toast('Missing terms to continue', ToastAndroid.SHORT);
            failedAction && failedAction();
        }
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            initAction && initAction();
            const response = await session.post('profileposts', { profileid }, options);
            const { errmsg, status, profile_posts, reqprofile, nextpageurl } = response.data;
            switch (status) {
                case 200:
                    okAction && okAction(profile_posts, reqprofile, nextpageurl);
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.SHORT);
                    failedAction && failedAction('cancel');
                    break;
                case 401:
                    failedAction && failedAction('cancel');
                    logOut(() => persistor.purge());
                    break;
                case 404:
                    Toast('profile has no post', ToastAndroid.SHORT);
                    failedAction && failedAction();
                    break;
                default:
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            //console.warn(err.toString())
            failedAction && failedAction();
        }
    };
};

export const fetchMoreProfilePosts = (url, profileid, initAction, okAction, failedAction) => {
    return async () => {
        if (!checkData(profileid)) {
            Toast('Missing terms to continue', ToastAndroid.SHORT);
            failedAction && failedAction();
        }
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            initAction && initAction();
            const response = await session.post(url, { profileid }, options);
            const { errmsg, status, profile_posts, reqprofile, nextpageurl } = response.data;
            switch (status) {
                case 200:
                    okAction && okAction(profile_posts, reqprofile, nextpageurl);
                    break;
                case 404:
                    Toast('profile has no post', ToastAndroid.SHORT);
                    failedAction && failedAction();
                    break;
                case 401:
                    failedAction && failedAction('cancel');
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.SHORT);
                    failedAction && failedAction('cancel');
                    break;
                default:
                    failedAction && failedAction();
                    break;
            }
        } catch (err) {
            //alert(err.toString())
            failedAction && failedAction();
        }
    };
};


/**
 * 
 * ACTION CREATORS FOR USERREDUCER
 */
export const saveUser = (data) => {
    return {
        type: SAVE_USER,
        payload: data
    };
};

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    };
};


/**
 * ACTION CREATORS FOR PROFILE REDUCER
 */
export const setProfilePic = (image) => {
    return {
        type: NEW_PROFILE_PIC,
        payload: image
    }
};
export const setProfileData = (data) => {
    return {
        type: SET_PROFILE_DATA,
        payload: data
    };
};
/**
 * ACTION CREATORS FOR PROFILEFORM REDUCER
 * 
 */
export const setImageTry = (data) => {
    return {
        type: SET_IMAGE_TRY,
        payload: data
    }
};

export const setUpdateUsername = (username) => {
    return {
        type: UPDATE_USERNAME_CHANGED,
        payload: { updatedusername: username },
    }
};

export const setUpdateBio = (bio) => {
    return {
        type: UPDATE_BIO_CHANGED,
        payload: { updatedbio: bio },
    }
};

export const setUpdateCampus = (campus) => {
    return {
        type: UPDATE_CAMPUS_CHANGED,
        payload: { updatedcampus: campus },
    }
};

export const setUpdatePassword = (pass) => {
    return {
        type: UPDATE_PASSWORD_CHANGED,
        payload: { updatedpassword: pass },
    }
};
export const setUpdateGender = (gender) => {
    return {
        type: UPDATE_GENDER_CHANGED,
        payload: { updatedgender: gender },
    }
};

export const setUpdateProfileErrors = (data, key) => {
    return {
        type: SET_UPDATE_PROFILE_ERRORS,
        payload: { key, value: data }
    };
};

export const uploadProfilePic = (image) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        const dirs = RNFetchBlob.fs.dirs;
        /*console.log(RNFetchBlob.fs.dirs)
        console.log(dirs.CacheDir)
        console.log(dirs.DCIMDir)
        console.log(dirs.SDCardDir)*/
        let { avatarremote, avatarlocal } = profile;
        let profilecompleted = getAppInfo(profile, 'profile');//very essential determines wheter set root or wait
        dispatch(setProcessing(true, 'updateProfileImage'));
        try {
            let formdata = new FormData();
            formdata.append('avatar', {
                uri: image.path,
                type: image.mime,
                name: "image.jpg"
            });
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('profileupdate', formdata, options);
            const { errors, profileupdate, status } = response.data;
            switch (status) {
                case 401:
                    deleteFile(image.path);
                    ImagePicker.clean();
                    dispatch(setProcessing(false, 'updateProfileImage'));
                    logOut(() => persistor.purge());
                    break;
                case 400:
                    deleteFile(image.path);
                    ImagePicker.clean();
                    Toast(errors.avatarerr, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'updateProfileImage'));
                    break;
                case 200:
                    let c = image.path.split('/');
                    let e = image.path.split('///');
                    let d = profileupdate.avatar.split('/');
                    deleteFile(avatarlocal);
                    RNFetchBlob.fs.createFile(`${dirs.CacheDir}/${d[7]}`,
                        `${e[1]}`,
                        'uri')
                        .then(e => {
                            //console.warn(e);
                            dispatch(setProfileData({
                                avatarlocal: rnPath(e), avatarremote: profileupdate.avatar
                            }));
                            dispatch(setImageTry(false));
                            deleteFile(image.path);
                            ImagePicker.clean();
                            dispatch(setProcessing(false, 'updateProfileImage'));
                            Toast('profile photo updated', ToastAndroid.SHORT);
                            if (profilecompleted == 'profilefalse' &&
                                getAppInfo(store.getState().profile, 'profile') == 'profiletrue' &&
                                getAppInfo(store.getState().posts, 'post') == 'posttrue') {
                                setRoute(store.getState());
                            }
                        })
                        .catch(e => {
                            //console.warn(e);
                            dispatch(setProfileData({
                                avatarlocal: '', avatarremote: profileupdate.avatar
                            }));
                            dispatch(setImageTry(false));
                            deleteFile(image.path);
                            ImagePicker.clean();
                            dispatch(setProcessing(false, 'updateProfileImage'));
                            Toast('profile photo updated', ToastAndroid.SHORT);
                        });
                    break;
                default:
                    deleteFile(image.path);
                    ImagePicker.clean();
                    dispatch(setProcessing(false, 'updateProfileImage'));
                    break;
            }

        } catch (e) {
            //alert(e.toString());
            //console.warn(e);
            deleteFile(image.path);
            ImagePicker.clean().catch(e => alert(e));
            dispatch(setProcessing(false, 'updateProfileImage'));
            Toast('could not update profile picture possible a network error please try again',
                ToastAndroid.LONG);
        }
    }
};



export const saveProfileUpdate = (updateusername, updatebio, updatecampus, updategender, componentId) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        let profilecompleted = getAppInfo(profile, 'profile');//very essential determines wheter set root or wait
        //dispatch(setReset('updateprofileerrors'));
        dispatch(setProcessing(true, 'updateProfile'));
        if (checkData(updateusername) != true) {
            dispatch(setProcessing(false, 'updateProfile'));
            dispatch(setUpdateProfileErrors({ usernameerr: "The username field is required" }, 'updateProfile'));
            Toast('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updatebio) != true) {
            dispatch(setProcessing(false, 'updateProfile'));
            dispatch(setUpdateProfileErrors({ 'bioerr': "The bio field is required" }, 'updateProfile'));
            Toast('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updategender) != true || updategender == "none" || updategender == 'false') {
            dispatch(setProcessing(false, 'updateProfile'));
            //console.warn('updated gender');
            dispatch(setUpdateProfileErrors({ gendererr: "The gender field is required" }, 'updateProfile'));
            Toast('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updatecampus) != true || updatecampus == "none") {
            dispatch(setProcessing(false, 'updateProfile'));
            //console.warn('updated campus');
            dispatch(setUpdateProfileErrors({ "campuserr": "please input your campus" }, 'updateProfile'));
            Toast('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        }

        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('profileupdate', {
                bio: updatebio,
                username: updateusername,
                campus: updatecampus,
                gender: updategender
            }, options);
            const { errors, errmsg, profileupdate, status, u } = response.data;
            switch (status) {
                case 200:
                    //console.warn(profileupdate);
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProfileData({ ...profileupdate, avatarremote: profileupdate.avatar }));
                    dispatch(updateUser({
                        username: profileupdate.username,
                        gender: profileupdate.gender
                    }));
                    dispatch(setProcessing(false, 'updateProfile'));
                    dispatch(setImageTry(false));
                    Toast('profile saved!', ToastAndroid.LONG);
                    if (profilecompleted == 'profilefalse' &&
                        getAppInfo(store.getState().profile, 'profile') == 'profiletrue' &&
                        getAppInfo(store.getState().posts, 'post') == 'posttrue') {
                        setRoute(store.getState());
                    }
                    break;
                case 400:
                    // console.warn(errors);
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProcessing(false, 'updateProfile'));
                    dispatch(setUpdateProfileErrors(errors, 'updateProfile'));
                    Toast('profile update failed please check your inputs and try again',
                        ToastAndroid.LONG);
                    break;

                case 500:
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProcessing(false, 'updateProfile'));
                    dispatch(setUpdateProfileErrors(errors, 'updateprofile'));
                    Toast(errmsg,
                        ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProcessing(false, 'updateProfile'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'updateProfile'));
                    Toast('could not communicate with server please try again',
                        ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'updateProfile'));
            if (e.toString().indexOf('Network Error') != -1) {
                Toast('could not connect to server please check your internet connection',
                    ToastAndroid.LONG
                );
            } else {
                Toast('something went wrong could not update profile please try again',
                    ToastAndroid.LONG
                );
            }
        }
    }
};


/**
 * ACTION CREATORS FOR POSTFORM REDUCER
 */

export const setUpdatedPostFormText = (data) => {
    return {
        type: UPDATE_POST_FORM_TEXT_CHANGED,
        payload: data,
    };
};

export const setUpdatedPostFormImage = (data) => {
    return {
        type: UPDATE_POST_FORM_IMAGE_CHANGED,
        payload: data
    }
}

//make post and upload to server starts here
export const makePost = (postimages, posttext) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'POSTFORM'));
        const { user, posts } = store.getState();
        let postcompleted = getAppInfo(posts, 'post');
        if (checkData(postimages) != true || postimages.length < 1) {
            dispatch(setProcessing(false, 'POSTFORM'));
            Toast('Post Images not found', ToastAndroid.LONG, ToastAndroid.CENTER);
            return;
        } else if (checkData(posttext) != true && checkData(postimages) != true) {
            dispatch(setProcessing(false, 'POSTFORM'));
            Toast('Post is empty', ToastAndroid.LONG, ToastAndroid.CENTER);
            return;
        }
        var formData = new FormData();
        formData.append('anonymous', 0);
        if (checkData(posttext)) {
            formData.append('post_text', posttext);
        }
        let resizedimgcaches = await resizeMultipleImage(postimages);
        resizedimgcaches = resizedimgcaches.filter(e => e != null);

        /*return;*/
        if (resizedimgcaches.length != postimages.length) {
            dispatch(setProcessing(false, 'POSTFORM'));
            Toast('Error occured while processing image please try again',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            return;
        }
        resizedimgcaches.forEach(imageObj => {
            formData.append('post_image[]', {
                uri: imageObj.resizedpostimage,
                type: 'image/jpeg',
                name: imageObj.resizedpostimage
            });
            formData.append('thumb_post_image[]', {
                uri: imageObj.thumbpostimage,
                type: 'image/jpeg',
                name: imageObj.thumbpostimage
            });
        });
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('post', formData, options);
            let { errors, errmsg, status, perror, post } = response.data;
            switch (status) {
                case 200:
                    dispatch(prependTimelinePostForm([post]));
                    dispatch(prependTimelinePost([post]));
                    Toast('Posted!', ToastAndroid.LONG);
                    if (checkData(perror)) {
                        Toast(perror, ToastAndroid.LONG);
                        //perror from backend means not all images were succefull uploaded to backend
                    }
                    if (checkData(post)) {
                        dispatch(savePost(post));
                    }
                    dispatch(setProcessing(false, 'POSTFORM'));
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setReset('POSTFORM'));
                    if (postcompleted == 'postfalse' && getAppInfo(store.getState().posts, 'post') == 'posttrue') {
                        setRoute(store.getState());
                    } else {
                        //console.warn('Navigate to postshow page');
                    }
                    break;
                case 400:
                    if (errmsg) {
                        Toast(errmsg,
                            ToastAndroid.LONG
                        );
                    } else if (errors) {
                        errors.errorposttext && Toast(errors.errorposttext, ToastAndroid.LONG);
                        errors.errthumbpostimage && Toast(errors.errthumbpostimage, ToastAndroid.LONG);
                        errors.errpostimage && Toast(errors.errpostimage, ToastAndroid.LONG);
                        errors.errthumbpostimages && Toast(errors.errthumbpostimages, ToastAndroid.LONG);
                        errors.errpostimages && Toast(errors.errpostimages, ToastAndroid.LONG);
                    } else {
                        Toast('something went wrong please try again', ToastAndroid.LONG);
                    }
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    break;
                case 500:
                    Toast(errmsg,
                        ToastAndroid.LONG
                    );
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    break;
                case 401:
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    Toast('something went wrong please try again',
                        ToastAndroid.LONG
                    );
                    break;
            }
        } catch (e) {
            //alert(e.toString());
            deleteMultiImage(resizedimgcaches);
            dispatch(setProcessing(false, 'POSTFORM'));
            if (e.toString().indexOf('Network Error') != -1) {
                Toast('could not connect to server please check your internet connection',
                    ToastAndroid.LONG
                );
            } else {
                Toast('something went wrong please try again',
                    ToastAndroid.LONG
                );
            }
        }

    };
};

//handles the resizing of the post images
const resizeMultipleImage = async (arr) => {
    if (Array.isArray(arr) != true || arr.length < 1) {
        return null;
    }
    let resizedImages = [];
    resizedImages = await Promise.all(arr.map(async (image) => {
        //return image;
        let { w, h } = await getImageSize(image);
        let postimageuri = await resizeImage(image, 1500, 1500);
        let thumbimageuri = await resizeImage(image, 100, 100, null, 100);
        if (thumbimageuri == false || postimageuri == false) {
            return null;
        }
        return {
            resizedpostimage: postimageuri,
            thumbpostimage: thumbimageuri
        }
    }));
    return resizedImages;
};
//handles deleting of images cache
const deleteMultiImage = (images) => {
    if (checkData(images)) {
        images.forEach(imageObj => {
            if (imageObj.resizedpostimage.indexOf('com.campusmeetup/cache') > -1) {
                deleteFile(imageObj.resizedpostimage);
            }
            deleteFile(imageObj.thumbpostimage);
        });
    }
};

//make post and upload to server ends here

/**
 * ACTION CREATOR FOR POST REDUCER
 */
export const savePost = (post: Object) => {
    return {
        type: UPDATE_POST,
        payload: post
    }
};
export const removePost = (postid: String) => {
    return {
        type: REMOVE_POST,
        payload: postid,
    }
};


/**
 * ACTION CREATOR FOR TIMELINEPOST REDUCER
 */
export const addTimelinePost = (timelinepost) => {
    return {
        type: ADD_TIMELINE_POST,
        payload: timelinepost
    }
};

export const prependTimelinePost = (timelinepost: Array) => {
    return {
        type: PREPEND_TIMELINE_POST,
        payload: timelinepost
    }
};

export const updateTimelinePost = (timelinepost) => {
    return {
        type: UPDATE_TIMELINE_POST,
        payload: timelinepost
    }
};

export const setTimelinePostLinks = (data) => {
    return {
        type: SET_TIMELINE_POST_LINKS,
        payload: data
    };
};

export const deleteTimeLinePost = (postid) => {
    return {
        type: DELETE_TIMELINE_POST,
        payload: postid
    }
};

export const setTimelinePostProfileChanges = (data: Array) => {
    return {
        type: SET_TIMELINE_POST_PROFILE_CHANGES,
        payload: data
    }
};
export const updateTimelinePostProfileChanges = (data: Object) => {
    return {
        type: UPDATE_TIMELINE_POST_PROFILE_CHANGES,
        payload: data
    }
};
export const removeProfileTimeLinePost = (profileid) => {
    return {
        type: REMOVE_PROFILE_TIMELINE_POST,
        payload: profileid
    }
};

/**
 * ACTION CREATOR FOR TIMELINEPOSTFORM REDUCER
 */
export const addTimelinePostForm = (data) => {
    return {
        type: ADD_TIMELINE_POST_FORM,
        payload: data
    }
}
export const prependTimelinePostForm = (data: Array) => {
    return {
        type: PREPEND_TIMELINE_POST_FORM,
        payload: data
    }
};

export const updateTimelinePostForm = (data) => {
    return {
        type: UPDATE_TIMELINE_POST_FORM,
        payload: data
    }
}
export const setTimelinePostFormLinks = (data) => {
    return {
        type: SET_TIMELINE_POST_FORM_LINKS,
        payload: data
    };
};

export const setTimelinepostRefresh = (value) => {
    return {
        type: TIMELINE_POST_FORM_REFRESH,
        payload: value,
    };
};
export const deleteTimelinePostForm = (postid) => {
    return {
        type: DELETE_TIMELINE_POST_FORM,
        payload: postid
    }
};

export const setTimelinePostFormProfileChanges = (data: Array) => {
    return {
        type: SET_TIMELINE_POST_FORM_PROFILE_CHANGES,
        payload: data
    }
}

export const updateTimelinePostFormProfileChanges = (data: Object) => {
    return {
        type: UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES,
        payload: data
    }
}

export const removeProfileTimeLinePostForm = (profileid) => {
    return {
        type: REMOVE_PROFILE_TIMELINE_POST_FORM,
        payload: profileid
    }
};

export const fetchParticularPost = (postid, initAction, okAction, endAction) => {
    return async (dispatch) => {
        if (!checkData(postid)) {
            Toast('Post not found', ToastAndroid.LONG);
            dispatch(setProcessing(false, 'processfetchtimelinepostform'));
            return;
        }
        const { user, } = store.getState();
        initAction && initAction();
        dispatch(setProcessing(true, 'processfetchtimelinepostform'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postshow', { postid }, options);
            const { status, message, errmsg, blockmsg, postdetails } = response.data;
            endAction && endAction();
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processfetchtimelinepostform'));
                    dispatch(updateTimelinePostForm(postdetails));
                    blockmsg && ToastAndroid.show(blockmsg, ToastAndroid.LONG);
                    okAction && okAction();
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'processfetchtimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'processfetchtimelinepostform'));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    dispatch(setProcessing('retry', 'processfetchtimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 412:
                    dispatch(setProcessing(false, 'processfetchtimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'processfetchtimelinepostform'));
                    Toast('something went wrong please try again', ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            endAction && endAction();
            //console.warn(err.toString());
            dispatch(setProcessing('retry', 'processfetchtimelinepostform'));
            if (err.toString().indexOf('Network Error') > - 1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('something went wrong please try again', ToastAndroid.LONG);
            }
        }
    };
};





export const refreshTimelinePost = (okAction, failedAction) => {
    return async (dispatch) => {
        dispatch(setTimelinepostRefresh(true));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postlist', null, options);
            const {
                message,
                postlistrange,
                generalpostnexturl,
                timelineposts,
                errmsg,
                status,
                followedpostnexturl,
                withincampuspostsnexturl
            } = response.data;
            //console.warn(response.data);
            //alert(JSON.stringify(response.data));
            switch (postlistrange) {
                case 'all':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm(timelineposts));
                    dispatch(addTimelinePost(timelineposts));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                    ));
                    okAction && okAction();
                    break;
                case 'campus':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm(timelineposts));
                    dispatch(addTimelinePost(timelineposts));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                    ));
                    okAction && okAction();
                    break;
                case 'followedpost':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm(timelineposts));
                    dispatch(addTimelinePost(timelineposts));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl].filter(url => checkData(url))
                    ));
                    okAction && okAction();
                    break;
                default:
                    failedAction && failedAction();
                    if (status == 401) {
                        logOut(() => persistor.purge());
                        return;
                    }
                    dispatch(setTimelinepostRefresh('failed'));
                    Toast('could not refresh feed',
                        ToastAndroid.LONG, ToastAndroid.CENTER);
                    break;
            }
        } catch (e) {
            //alert(JSON.stringify(e));
            //console.warn(e.toString())
            failedAction && failedAction();
            dispatch(setTimelinepostRefresh('failed'));
            if (e.toString().indexOf('Network Error') > - 1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast('could not refresh feed', ToastAndroid.LONG);
            }
        }
    };
};

//to like time line post
export const likeTimelinePostAction = (postid, likestatus, numpostlikes) => {
    return async (dispatch) => {
        if (checkData(postid) != true ||
            checkData(likestatus) != true ||
            checkData(numpostlikes) != true) {
            return null;
        }
        dispatch(updateTimelinePostForm({
            postid, postliked: likestatus,
            num_post_likes: numpostlikes
        }));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postlikeaction', {
                postid: postid,
            }, options);
            const { message, errmsg, postdetails, status } = response.data;
            //console.warn(response.data)
            switch (status) {
                case 200:
                    dispatch(updateTimelinePost({ ...postdetails }));
                    dispatch(updateTimelinePostForm({ ...postdetails }));
                    break;
                case 500:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postliked: likestatus == "postliked" ? 'notliked' : 'postliked',
                        num_post_likes: likestatus == "postliked" ? numpostlikes - 1 : numpostlikes + 1,
                    }));
                    break;
                case 400:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postliked: likestatus == "postliked" ? 'notliked' : 'postliked',
                        num_post_likes: likestatus == "postliked" ? numpostlikes - 1 : numpostlikes + 1,
                    }));
                    break;
                case 401:
                    dispatch(updateTimelinePostForm({
                        postid, postliked: likestatus == "postliked" ? 'notliked' : 'postliked',
                        num_post_likes: likestatus == "postliked" ? numpostlikes - 1 : numpostlikes + 1,
                    }));
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postliked: likestatus == "postliked" ? 'notliked' : 'postliked',
                        num_post_likes: likestatus == "postliked" ? numpostlikes - 1 : numpostlikes + 1,
                    }));
                    break;
                default:
                    Toast('action failed please try again', ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postliked: likestatus == "postliked" ? 'notliked' : 'postliked',
                        num_post_likes: likestatus == "postliked" ? numpostlikes - 1 : numpostlikes + 1,
                    }));
                    break;
            }
        } catch (error) {
            console.warn(error);
            //ToastAndroid.show('could not like post posibbly a network error', ToastAndroid.LONG);
        }
        //dispatch(addTimelinePostForm([{ profile: { user: {}, avatar: [null] } }]));

    }
};

//to share timelinepost
export const shareTimelinePostAction = (postid, sharestatus, numpostshares) => {
    return async (dispatch) => {
        if (checkData(postid) != true ||
            checkData(sharestatus) != true ||
            checkData(numpostshares) != true) {
            return null;
        }
        dispatch(updateTimelinePostForm({
            postid, postshared: sharestatus,
            num_post_shares: numpostshares
        }));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postshareaction', {
                postid: postid,
            }, options);
            const { message, errmsg, postdetails, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(updateTimelinePost({ ...postdetails }));
                    dispatch(updateTimelinePostForm({ ...postdetails }));
                    break;
                case 401:
                    dispatch(updateTimelinePostForm({
                        postid, postshared: sharestatus == "postshared" ? "notshared" : "postshared",
                        num_post_shares: sharestatus == "postshared" ? numpostshares - 1 : numpostshares + 1
                    }));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    Toast('could not share post please try again', ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postshared: sharestatus == "postshared" ? "notshared" : "postshared",
                        num_post_shares: sharestatus == "postshared" ? numpostshares - 1 : numpostshares + 1
                    }));
                    break;
                case 400:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postshared: sharestatus == "postshared" ? "notshared" : "postshared",
                        num_post_shares: sharestatus == "postshared" ? numpostshares - 1 : numpostshares + 1
                    }));
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postshared: sharestatus == "postshared" ? "notshared" : "postshared",
                        num_post_shares: sharestatus == "postshared" ? numpostshares - 1 : numpostshares + 1
                    }));
                    break;
                default:
                    Toast('action failed please try again', ToastAndroid.LONG);
                    dispatch(updateTimelinePostForm({
                        postid, postshared: sharestatus == "postshared" ? "notshared" : "postshared",
                        num_post_shares: sharestatus == "postshared" ? numpostshares - 1 : numpostshares + 1
                    }));
                    break;
            }
        } catch (error) {
            //ToastAndroid.show('could not share post posibbly a network error', ToastAndroid.LONG);

            //console.warn(error.toString());
        }
    }
};

export const archiveTimelinePost = (postid, postprofileid) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processarchivetimelinepostform'));
        const { user, profile } = store.getState();
        if (profile.profile_id != postprofileid) {
            Toast('You cant archive this post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            Toast('Post not archived', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postarchive', {
                postid: postid
            }, options);
            const { errmsg, message, resetpost, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    dispatch(deleteTimeLinePost(postid));
                    dispatch(deleteTimelinePostForm(postid));
                    dispatch(removePost(postid));
                    //alert(JSON.stringify(resetpost));
                    if (checkData(resetpost)) {
                        dispatch(savePost(resetpost));
                    }
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    Toast(`${errmsg}`, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    Toast(`${errmsg}`, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    Toast(`${errmsg}`, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    Toast(`${errmsg}`, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'processarchivetimelinepostform'));
            if (err.toString().indexOf('Network Error') > -1) {
                Toast('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                Toast(`Post not archived`, ToastAndroid.LONG);;
            }

            //console.warn(String(err));
        }
    }
}

export const blackListTimelinePost = (postid, postprofileid) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processblacklisttimelinepostform'));
        const { user, profile } = store.getState();
        if (profile.profile_id == postprofileid) {
            dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
            Toast('You cant blacklist your own post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
            Toast('action failed please retry', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('blacklistpostaction', {
                postid: postid
            }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    dispatch(deleteTimeLinePost(postid));
                    dispatch(deleteTimelinePostForm(postid));
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    Toast('action failed please retry', ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
            if (e.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast('action failed please retry', ToastAndroid.LONG);
            }
        }
    }
}

export const muteProfileTimelinePost = (profileid) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processmutetimelinepostform'));
        const { user, profile } = store.getState();
        if (profile.profile_id == profileid) {
            dispatch(setProcessing(false, 'processmutetimelinepostform'));
            Toast('You cant mute your own profile posts', ToastAndroid.LONG);
            return;
        } else if (checkData(profileid) != true) {
            dispatch(setProcessing(false, 'processmutetimelinepostform'));
            Toast('something went wrong please try again', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('muteprofilepostaction', {
                profileid: profileid
            }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    dispatch(removeProfileTimeLinePostForm(profileid));
                    dispatch(removeProfileTimeLinePost(profileid));
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    Toast('action failed please retry', ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'processmutetimelinepostform'));
            if (e.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast('action failed please retry', ToastAndroid.LONG);
            }
        }
    };
};

export const deleteTimelinePost = (postid, postprofileid) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processdeletetimelinepostform'));
        const { user, profile } = store.getState();
        if (profile.profile_id != postprofileid) {
            Toast('You cant delete this post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            Toast('Post not deleted', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postdelete', {
                postid: postid
            }, options);
            const { errmsg, message, status, resetpost } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    dispatch(deleteTimeLinePost(postid));
                    dispatch(deleteTimelinePostForm(postid));
                    dispatch(removePost(postid));
                    if (checkData(resetpost)) {
                        dispatch(savePost(resetpost));
                    }
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    Toast('post not deleted please try again', ToastAndroid.LONG)
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    Toast('post not deleted please try again', ToastAndroid.LONG)
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    Toast('post not deleted please try again', ToastAndroid.LONG)
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'processdeletetimelinepostform'));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`Post not deleted please try again`, ToastAndroid.LONG);
            }

            //console.warn(String(err))
        }
    }
}

export const fetchMoreTimelinePost = () => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processloadmoretimelinepostform'));
        let checkPost = (data) => {
            if (Array.isArray(data) && data.length > 0) {
                return true;
            }
            return false;
        };
        const { user, timelinepostform } = store.getState();
        const options = {
            headers: { 'Authorization': `Bearer ${user.token}` }
        };
        let data = timelinepostform.links;
        if (!Array.isArray(data) || data.length < 1) {
            dispatch(setProcessing('complete', 'processloadmoretimelinepostform'));
            return;
        }
        let reqArr = [];
        data.forEach(url => {
            reqArr.push(
                session.post(url, null, options)
            );
        });
        axios.all(reqArr)
            .then(axios.spread((result1, result2) => {
                let postarr = [];
                let postlinksarr = [];
                if (checkData(result1)) {
                    result1 = structurePost(result1);
                    postarr = [...postarr, ...result1[0]];
                    postlinksarr = [...postlinksarr, ...result1[1]];
                }
                if (checkData(result2)) {
                    result2 = structurePost(result2);
                    postarr = [...postarr, ...result2[0]];
                    postlinksarr = [...postlinksarr, ...result2[1]];
                }

                if (postarr.length < 1) {
                    dispatch(setProcessing('retry', 'processloadmoretimelinepostform'));
                    Toast(
                        'something went wrong try again',
                        ToastAndroid.LONG
                    );
                } else {
                    postarr.sort((item1, item2) => item2.id - item1.id);
                    dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
                    dispatch(addTimelinePostForm(postarr));
                    dispatch(addTimelinePost(postarr));
                    dispatch(setTimelinePostFormLinks(postlinksarr));
                    dispatch(setTimelinePostLinks(postlinksarr));

                }

            }))
            .catch(e => {
                //alert(e.toString());
                dispatch(setProcessing('retry', 'processloadmoretimelinepostform'));
                if (e.toString().indexOf('Network Error') != -1) {
                    Toast(
                        'action failed please check your internet connection and try again',
                        ToastAndroid.LONG
                    );
                } else {
                    Toast(`could not load more posts please try again`, ToastAndroid.LONG);
                }


            });

    };
};

const structurePost = (result: Array) => {
    let {
            message,
        postlistrange,
        status,
        generalpostnexturl,
        timelineposts,
        followedpostnexturl,
        withincampuspostsnexturl
        } = result.data;
    switch (postlistrange) {
        case 'all':
            return [
                timelineposts,
                [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
            ]
            break;
        case 'campus':
            return [
                timelineposts,
                [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
            ]
            break;
        case 'followedpost':
            return [
                timelineposts,
                [followedpostnexturl].filter(url => checkData(url))
            ];
            break;
        default:
            if (status == 401) {
                logOut(() => persistor.purge());
            }
            return [];
            break;
    }
};
/**/


export const fetchTimelinePost = () => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'timelinepostform'));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postlist', null, options);
            const {
                message,
                postlistrange,
                status,
                generalposts,
                generalpostnexturl,
                followedposts,
                followedpostnexturl,
                withincampusposts,
                withincampuspostsnexturl
            } = response.data;
            switch (postlistrange) {
                case 'all':
                    dispatch(setProcessing(false, 'timelinepostform'));
                    dispatch(addTimelinePostForm([...followedposts, ...generalposts]));
                    dispatch(addTimelinePost([...followedposts, ...generalposts]));
                    // dispatch(setTimelinepostLinks([followedpostnexturl, generalpostnexturl]));
                    break;
                case 'campus':
                    dispatch(setProcessing(false, 'timelinepostform'));
                    dispatch(addTimelinePostForm([...followedposts, ...generalposts]));
                    dispatch(addTimelinePost([...followedposts, ...generalposts]));
                    //dispatch(setTimelinepostLinks([followedpostnexturl, withincampuspostsnexturl]));
                    break;
                case 'followedpost':
                    dispatch(setProcessing(false, 'timelinepostform'));
                    dispatch(addTimelinePostForm([...followedposts, ...generalposts]));
                    dispatch(addTimelinePost([...followedposts, ...generalposts]));
                    //dispatch(setTimelinepostLinks([followedpostnexturl]));
                    break;
                default:
                    dispatch(setProcessing('failed', 'timelinepostform'));
                    if (status == 401) {
                        logOut(() => persistor.purge());
                        return;
                    }
                    Toast('could not refresh feed',
                        ToastAndroid.LONG, ToastAndroid.CENTER);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing('failed', 'timelinepostform'));
            Toast('could not refresh feed',
                ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }
};
export const bookMarkTimelinePost = (postid) => {
    return async (dispatch) => {

    }
}
/**
 * ACTION CREATORS FOR POSTSETTING REDUCER
 */
export const updatePostSetting = (data: Object) => {
    return {
        type: UPDATE_POST_SETTINGS,
        payload: data
    };
};

export const postSettingUpdate = (toupdatedata) => {
    return async (dispatch) => {
        if (!checkData(toupdatedata)) {
            return;
        }
        const { user } = store.getState();
        let prevpostsetting = store.getState().postsetting;
        dispatch(updatePostSetting(toupdatedata));
        dispatch(setProcessing(true, 'postsettingprocess'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('updatepostsetting', toupdatedata, options);
            const { errmsg, status, message, postsetting } = response.data;
            //console.warn(response.data);
            switch (status) {
                case 200:
                    dispatch(updatePostSetting(postsetting));
                    dispatch(setProcessing(false, 'postsettingprocess'));
                    Toast(message, ToastAndroid.LONG)
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postsettingprocess'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(updatePostSetting(prevpostsetting));
                    dispatch(setProcessing(false, 'postsettingprocess'));
                    errmsg && Toast(errmsg, ToastAndroid.LONG) ||
                        Toast('something went wrong please try again', ToastAndroid.LONG)
                    break;
            }
        } catch (e) {
            // console.warn(e.toString());
            dispatch(updatePostSetting(prevpostsetting));
            dispatch(setProcessing(false, 'postsettingprocess'));
            if (e.toString().indexOf('Network Error') != -1) {
                Toast(
                    'Network Error!',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`something went wrong please try again`, ToastAndroid.LONG);
            }
        }

    };
};


export const getPostSetting = () => {
    return async (dispatch) => {
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('getpostsetting', null, options);
            const { errmsg, status, message, postsetting } = response.data;
            //console.warn(response.data);
            switch (status) {
                case 200:
                    dispatch(updatePostSetting(postsetting));
                    ///ToastAndroid.show(message, ToastAndroid.LONG)
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postsettingprocess'));
                    logOut(() => persistor.purge());
                    break;
                case 404:
                    dispatch(updatePostSetting({
                        timeline_post_range: 'all'
                    }));
                    break;
                default:
                    errmsg && Toast(errmsg, ToastAndroid.LONG)
                    break;
            }
        } catch (e) {
            //console.warn(e.toString());
            if (e.toString().indexOf('Network Error') != -1) {
                Toast(
                    'Network Error!',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`something went wrong please try again`, ToastAndroid.LONG);
            }
        }

    };
};



/**
 * ACTION CREATORS FOR POSTCOMMENTFORM REDUCER
 */
export const addPostCommentForm = (data: Array) => {
    return {
        type: ADD_POST_COMMENT_FORM,
        payload: data
    };
};

export const updatePostCommentForm = (data: Object) => {
    return {
        type: UPDATE_POST_COMMENT_FORM,
        payload: data
    };
};

export const setPostCommentFormLink = (data: String) => {
    return {
        type: SET_POST_COMMENT_FORM_LINK,
        payload: data,
    };
};

export const setPostCommentFormRefresh = (data: Boolean) => {
    return {
        type: POST_COMMENT_FORM_REFRESH,
        payload: data
    };
};

export const prependPostCommentForm = (data: Array) => {
    return {
        type: PREPEND_POST_COMMENT_FORM,
        payload: data
    };
};

export const removePostCommentForm = (commentid: String) => {
    return {
        type: REMOVE_POST_COMMENT_FORM,
        payload: commentid
    }
};

export const updatePostCommentFormProfileChanges = (data: Object) => {
    return {
        type: UPDATE_POST_COMMENT_FORM_PROFILE_CHANGES,
        payload: data
    }
}

//to fetch post comment
export const fetchPostComment = (postid) => {
    return async (dispatch) => {
        if (checkData(postid) != true) {
            Toast('Could not fetch comments please try again', ToastAndroid.LONG);
            dispatch(setProcessing('retry', 'postcommentformfetching'));
            return;
        }
        dispatch(setProcessing(true, 'postcommentformfetching'));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentlist', {
                postid
            }, options);
            const { errmsg, message, ownerpost, hiddens, status, comments, nextpageurl } = response.data;
            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    hiddens == true && Toast(
                        'some comments are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'postcommentformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing('retry', 'postcommentformfetching'));
                    //ToastAndroid.show('Could not fetch comments please try again', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
            //alert(err.toString());
            // console.warn(err.toString());
            dispatch(setProcessing('retry', 'postcommentformfetching'));
            //ToastAndroid.show('Could not fetch comments please try again', ToastAndroid.LONG);
        }

    };
};

//to retry posting a comment if it fails
export const retryPostComment = (postid, commentid, comment_text) => {
    return async (dispatch) => {
        if (checkData(postid) != true || checkData(commentid) != true || checkData(comment_text) != true) {
            //console.warn('yo');
            return;
        }
        const { user } = store.getState();
        let onretryschema = {
            commentid,
            created_at: 'Tap to retry',
            onRetry: () => dispatch(retryPostComment(postid, commentid, comment_text))
        };
        dispatch(updatePostCommentForm({
            onRetry: () => { },
            commentid: commentid,
            created_at: 'posting...',
        }));

        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcomment', {
                postid,
                comment_text,
            }, options);
            const { errmsg, ownerpost, message, status, comment } = response.data;
            switch (status) {
                case 201:
                    dispatch(removePostCommentForm(tempid));
                    dispatch(prependPostCommentForm([comment]));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    //alert(JSON.stringify(comment));
                    break;
                case 400:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
                case 404:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentForm(tempid));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(removePostCommentForm(tempid));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
                default:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
            }
        } catch (err) {
            // console.warn(err);
            dispatch(updatePostCommentForm(onretryschema));
        }

    };
}

//to make a post comment starts here
export const makePostComment = (postid, comment_text) => {
    return async (dispatch) => {
        if (checkData(postid) != true || checkData(comment_text) != true) {
            return;
        }
        const { user, profile } = store.getState();
        let tempid = String(Math.floor(Math.random() * 1000000));
        let onretryschema = {
            commentid: tempid,
            created_at: 'Tap to retry',
            onRetry: () => dispatch(retryPostComment(postid, tempid, comment_text))
        };

        dispatch(prependPostCommentForm([{
            postid,
            comment_text,
            onRetry: () => { },
            commentid: tempid,
            created_at: 'posting...',
            profile: {
                avatar: [
                    profile.avatarremote,
                    profile.avatarlocal
                ], user: { username: user.username }
            }
        }]));

        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcomment', {
                postid,
                comment_text,
            }, options);
            const { errmsg, ownerpost, message, status, comment } = response.data;
            switch (status) {
                case 201:
                    dispatch(removePostCommentForm(tempid));
                    dispatch(prependPostCommentForm([comment]));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    //alert(JSON.stringify(comment));
                    break;
                case 400:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
                case 404:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentForm(tempid));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(removePostCommentForm(tempid));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
                default:
                    dispatch(updatePostCommentForm(onretryschema));
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(updatePostCommentForm(onretryschema));
        }

    }
};

export const likePostComment = (commentid, likestatus, numlikes) => {
    return async (dispatch) => {
        if (checkData(commentid) != true ||
            checkData(likestatus) != true ||
            checkData(numlikes) != true) {
            return;
        }
        dispatch(
            updatePostCommentForm({
                commentid: commentid,
                commentliked: likestatus,
                num_likes: numlikes
            })
        );
        const { user } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentlikeaction', {
                commentid: commentid
            }, options);
            const { errmsg, status, message, comment } = response.data;
            switch (status) {
                case 200:
                    //alert(JSON.stringify(comment));
                    dispatch(updatePostCommentForm(comment));
                    break;
                case 401:
                    dispatch(
                        updatePostCommentForm({
                            commentid: commentid,
                            commentliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(
                        updatePostCommentForm({
                            commentid: commentid,
                            commentliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    break;
                default:
                    Toast(errmsg, ToastAndroid.LONG)
                    dispatch(
                        updatePostCommentForm({
                            commentid: commentid,
                            commentliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    break;
            }
        } catch (err) {
        }
    }
};

export const refreshPostComment = (postid) => {
    return async (dispatch) => {
        dispatch(setPostCommentFormRefresh(true));
        if (checkData(postid) != true) {
            dispatch(setPostCommentFormRefresh(false));
            Toast('Failed to refresh', ToastAndroid.LONG);
            return;
        }
        const { user } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentlist', {
                postid
            }, options);
            const { errmsg, message, ownerpost, hiddens, status, comments, nextpageurl } = response.data;

            switch (status) {
                case 302:
                    dispatch(setReset('postcommentform'));
                    dispatch(setPostCommentFormRefresh(false));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    hiddens == true && Toast(
                        'some comments are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    dispatch(setPostCommentFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setPostCommentFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setPostCommentFormRefresh(false));
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    dispatch(setPostCommentFormRefresh(false));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setPostCommentFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
            // console.warn(err.toString());
            dispatch(setPostCommentFormRefresh(false));
            Toast('failed to refresh', ToastAndroid.LONG);
        }
    }
};

export const loadMorePostComment = (postid) => {
    return async (dispatch) => {
        const { user, postcommentform } = store.getState();
        if (checkData(postcommentform.nexturl) != true ||
            checkData(postid) != true) {
            dispatch(setProcessing('none', 'postcommentformloadmore'));
            return;
        }
        dispatch(setProcessing(true, 'postcommentformloadmore'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(postcommentform.nexturl, { postid }, options);
            const { errmsg, message, ownerpost, hiddens, status, comments, nextpageurl } = response.data;
            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    hiddens == true && Toast(
                        'some comments are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    // console.warn(errmsg);
                    dispatch(setProcessing('retry', 'postcommentformloadmore'));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    logOut(() => persistor.purge());
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    break;
                case 412:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing('retry', 'postcommentformloadmore'));
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(setProcessing('retry', 'postcommentformloadmore'));
        }
    }
};

export const deletePostComment = (postcommentid, ownerid) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(postcommentid) != true || checkData(ownerid) != true || ownerid != profile.profile_id) {
            Toast('Could not delete comment', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'postcommentformdeleting'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentdelete', { postcommentid }, options);
            const { errmsg, status, message, ownerpost } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'postcommentformdeleting'));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    dispatch(removePostCommentForm(postcommentid));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentformdeleting'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'postcommentformdeleting'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'postcommentformdeleting'));
            //alert(err.toString())
            //alert(JSON.stringify(err));
            Toast('could not delete comment please try gain', ToastAndroid.LONG);
        }
    }
};

export const hidePostCommentAction = (commentid, ownerid) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(commentid) != true ||
            checkData(ownerid) != true ||
            ownerid != profile.profile_id) {
            Toast('Could not hide comment', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'postcommentformhiding'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommenthide', { commentid }, options);
            const { errmsg, status, hidden, message } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'postcommentformhiding'));
                    dispatch(updatePostCommentForm({
                        commentid,
                        hidden: hidden
                    }));
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentformhiding'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'postcommentformhiding'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'postcommentformhiding'));
            //alert(err.toString());
            Toast('something went wrong could not hide comment please try again', ToastAndroid.LONG)
        }
    };
};

/**
 * ACTION CREATORS FOR POSTCOMMENTREPLYFORM REDUCER
 */
export const addPostCommentReplyForm = (data: Array) => {
    return {
        type: ADD_POST_COMMENT_REPLY_FORM,
        payload: data
    };
};

export const updatePostCommentReplyForm = (data: Object) => {
    return {
        type: UPDATE_POST_COMMENT_REPLY_FORM,
        payload: data
    };
};

export const setPostCommentReplyFormLink = (data: String) => {
    return {
        type: SET_POST_COMMENT_REPLY_FORM_LINK,
        payload: data,
    };
};

export const setPostCommentReplyFormRefresh = (data: Boolean) => {
    return {
        type: POST_COMMENT_REPLY_FORM_REFRESH,
        payload: data
    };
};

export const prependPostCommentReplyForm = (data: Array) => {
    return {
        type: PREPEND_POST_COMMENT_REPLY_FORM,
        payload: data
    };
};

export const removePostCommentReplyForm = (commentid: String) => {
    return {
        type: REMOVE_POST_COMMENT_REPLY_FORM,
        payload: commentid
    }
};

export const updatePostCommentReplyFormProfileChanges = (data: Object) => {
    return {
        type: UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES,
        payload: data
    }
};

//to fetch postcommentreplies
export const fetchPostCommentReply = (originid) => {
    return async (dispatch) => {
        if (checkData(originid) != true) {
            Toast('Could not fetch replies please try again', ToastAndroid.LONG);
            dispatch(setProcessing('retry', 'postcommentreplyformfetching'));
            return;
        }
        dispatch(setProcessing(true, 'postcommentreplyformfetching'));
        const { user, } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreplylist', {
                originid
            }, options);
            const { errmsg, message, origin, hiddens, status, replies, nextpageurl } = response.data;
            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentreplyformfetching'));
                    dispatch(addPostCommentReplyForm(replies));
                    dispatch(setPostCommentReplyFormLink(nextpageurl));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    hiddens == true && Toast(
                        'some replies are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'postcommentreplyformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentreplyformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'postcommentreplyformfetching'));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentreplyformfetching'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing('retry', 'postcommentreplyformfetching'));
                    //ToastAndroid.show('Could not fetch comments please try again', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
            //console.warn(err.toString());
            dispatch(setProcessing('retry', 'postcommentreplyformfetching'));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`could not fetch replies please try again`, ToastAndroid.LONG);
            }
        }
    };
};

export const loadMorePostCommentReply = (originid) => {
    return async (dispatch) => {
        const { user, postcommentreplyform } = store.getState();
        if (checkData(postcommentreplyform.nexturl) != true ||
            checkData(originid) != true) {
            dispatch(setProcessing('none', 'postcommentreplyformloadmore'));
            return;
        }
        dispatch(setProcessing(true, 'postcommentreplyformloadmore'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post(postcommentreplyform.nexturl, { originid }, options);
            const { errmsg, message, origin, hiddens, status, replies, nextpageurl } = response.data;
            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentreplyformloadmore'));
                    dispatch(addPostCommentReplyForm(replies));
                    dispatch(setPostCommentReplyFormLink(nextpageurl));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    hiddens == true && Toast(
                        'some replies are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    // console.warn(errmsg);
                    dispatch(setProcessing('retry', 'postcommentreplyformloadmore'));
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentreplyformloadmore'));
                    break;
                case 412:
                    dispatch(setProcessing(false, 'postcommentreplyformloadmore'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentreplyformloadmore'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing('retry', 'postcommentreplyformloadmore'));
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(setProcessing('retry', 'postcommentreplyformloadmore'));
        }
    }
};


export const likePostCommentReply = (replyid, likestatus, numlikes) => {
    return async (dispatch) => {
        if (checkData(replyid) != true ||
            checkData(likestatus) != true ||
            checkData(numlikes) != true) {
            return;
        }
        dispatch(
            updatePostCommentReplyForm({
                replyid,
                replyliked: likestatus,
                num_likes: numlikes
            })
        );
        const { user } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreplylikeaction', {
                replyid
            }, options);
            const { errmsg, status, message, reply } = response.data;
            switch (status) {
                case 200:
                    //alert(JSON.stringify(comment));
                    dispatch(updatePostCommentReplyForm(reply));
                    break;
                case 401:
                    dispatch(
                        updatePostCommentReplyForm({
                            replyid,
                            replyliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    Toast(errmsg, ToastAndroid.LONG);
                    dispatch(
                        updatePostCommentReplyForm({
                            replyid,
                            replyliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    break;
                default:
                    Toast(errmsg, ToastAndroid.LONG)
                    dispatch(
                        updatePostCommentReplyForm({
                            replyid,
                            replyliked: likestatus ? false : true,
                            num_likes: likestatus ? numlikes - 1 : numlikes + 1
                        })
                    );
                    break;
            }
        } catch (err) {
        }
    }
}



export const refreshPostCommentReply = (originid) => {
    return async (dispatch) => {
        dispatch(setPostCommentReplyFormRefresh(true));
        if (checkData(originid) != true) {
            dispatch(setPostCommentReplyFormRefresh(false));
            Toast('Failed to refresh', ToastAndroid.LONG);
            return;
        }
        const { user } = store.getState();
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreplylist', {
                originid
            }, options);
            const { errmsg, message, origin, hiddens, status, replies, nextpageurl } = response.data;
            switch (status) {
                case 302:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    dispatch(setReset('postcommentreplyform'));
                    dispatch(addPostCommentReplyForm(replies));
                    dispatch(setPostCommentReplyFormLink(nextpageurl));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    hiddens == true && Toast(
                        'some replies are hidden by author',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    break;
                case 400:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    logOut(() => persistor.purge());
                    break;
                case 412:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setPostCommentReplyFormRefresh(false));
                    Toast('failed to refresh', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
            dispatch(setPostCommentReplyFormRefresh(false));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`failed to refresh`, ToastAndroid.LONG);
            }
        }
    }
};



//to make a postcommentreply starts here
export const makePostCommentReply = (originid, reply_text) => {
    return async (dispatch) => {
        if (checkData(originid) != true || checkData(reply_text) != true) {
            return;
        }
        const { user, profile } = store.getState();
        let tempid = String(Math.floor(Math.random() * 1000000));
        let onretryschema = {
            replyid: tempid,
            created_at: 'Tap to retry',
            onRetry: () => dispatch(retryPostComment(originid, tempid, comment_text))
        };

        dispatch(prependPostCommentReplyForm([{
            originid,
            reply_text,
            onRetry: () => { },
            replyid: tempid,
            created_at: 'posting...',
            profile: {
                avatar: [
                    profile.avatarremote,
                    profile.avatarlocal
                ], user: { username: user.username }
            }
        }]));

        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreply', {
                originid,
                reply_text,
            }, options);
            const { errmsg, origin, message, status, reply } = response.data;
            switch (status) {
                case 201:
                    dispatch(removePostCommentReplyForm(tempid));
                    dispatch(prependPostCommentReplyForm([reply]));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    //alert(JSON.stringify(comment));
                    break;
                case 400:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
                case 404:
                    dispatch(removePostCommentReplyForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentReplyForm(tempid));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(removePostCommentReplyForm(tempid));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
                default:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
            }
        } catch (err) {
            //console.warn(err.toString());
            dispatch(updatePostCommentReplyForm(onretryschema));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`could not post reply please try again`, ToastAndroid.LONG);
            }
        }

    }
};

//to retry posting a comment if it fails
export const retryPostCommentReply = (originid, replyid, reply_text) => {
    return async (dispatch) => {
        if (checkData(originid) != true || checkData(replyid) != true || checkData(reply_text) != true) {
            //console.warn('yo');
            return;
        }
        const { user } = store.getState();
        let onretryschema = {
            replyid: tempid,
            created_at: 'Tap to retry',
            onRetry: () => dispatch(retryPostComment(originid, tempid, comment_text))
        };
        dispatch(updatePostCommentReplyForm({
            onRetry: () => { },
            replyid,
            created_at: 'posting...',
        }));

        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcomment', {
                postid,
                comment_text,
            }, options);
            const { errmsg, origin, message, status, reply } = response.data;
            switch (status) {
                case 201:
                    dispatch(removePostCommentReplyForm(tempid));
                    dispatch(prependPostCommentReplyForm([reply]));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    //alert(JSON.stringify(comment));
                    break;
                case 400:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
                case 404:
                    dispatch(removePostCommentReplyForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentReplyForm(tempid));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(removePostCommentReplyForm(tempid));
                    logOut(() => persistor.purge());
                    break;
                case 500:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
                default:
                    dispatch(updatePostCommentReplyForm(onretryschema));
                    break;
            }
        } catch (err) {
            // console.warn(err);
            dispatch(updatePostCommentReplyForm(onretryschema));
        }

    };
};

export const deletePostCommentReply = (replyid, ownerid) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(replyid) != true || checkData(ownerid) != true || ownerid != profile.profile_id) {
            Toast('Could not delete reply', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'postcommentreplyformdeleting'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreplydelete', { replyid }, options);
            const { errmsg, status, message, origin } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'postcommentreplyformdeleting'));
                    dispatch(removePostCommentReplyForm(replyid));
                    checkData(origin.replyid) ? dispatch(updatePostCommentReplyForm(origin))
                        : dispatch(updatePostCommentForm(origin));
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentreplyformdeleting'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'postcommentreplyformdeleting'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'postcommentreplyformdeleting'));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast(`could not delete replies please try again`, ToastAndroid.LONG);
            }
        }
    }
};

export const hidePostCommentReply = (replyid, ownerid) => {
    return async (dispatch) => {
        const { user, profile } = store.getState();
        if (checkData(replyid) != true ||
            checkData(ownerid) != true ||
            ownerid != profile.profile_id) {
            Toast('Could not hide reply', ToastAndroid.LONG);
            return;
        }
        dispatch(setProcessing(true, 'postcommentreplyformhiding'));
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postcommentreplyhide', { replyid }, options);
            const { errmsg, status, hidden, message } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'postcommentreplyformhiding'));
                    dispatch(updatePostCommentReplyForm({
                        replyid,
                        hidden: hidden
                    }));
                    Toast(message, ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setProcessing(false, 'postcommentreplyformhiding'));
                    logOut(() => persistor.purge());
                    break;
                default:
                    dispatch(setProcessing(false, 'postcommentreplyformhiding'));
                    Toast(errmsg, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'postcommentreplyformhiding'));
            if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                Toast('something went wrong could not hide reply please try again', ToastAndroid.LONG)
            }
        }
    };
};

/**
 * ACTION CREATOR FOR USERVIEWPROFILE REDUCER
 * 
 */
export const addUserViewProfileFormPost = (data: Array) => {
    return {
        type: ADD_USER_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const prependUserViewProfileFormPost = (data: Array) => {
    return {
        type: PREPEND_USER_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const updateUserViewProfileFormPost = (data: Object) => {
    return {
        type: UPDATE_USER_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const setUserViewProfileForm = (data: Object) => {
    return {
        type: SET_USER_VIEWPROFILEFORM,
        payload: data
    };
};

export const setUserViewProfileFormLink = (data) => {
    return {
        type: SET_USER_VIEWPROFILEFORM_LINK,
        payload: data
    };
};


/**
 * ACTION CREATOR FOR OTHERSVIEWPROFILE REDUCER
 * 
 */
export const addOthersViewProfileFormPost = (data: Array) => {
    return {
        type: ADD_OTHERS_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const prependOthersViewProfileFormPost = (data: Array) => {
    return {
        type: PREPEND_OTHERS_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const updateOthersViewProfileFormPost = (data: Object) => {
    return {
        type: UPDATE_OTHERS_VIEWPROFILEFORM_POSTS,
        payload: data
    };
};

export const setOthersViewProfileForm = (data: Object) => {
    return {
        type: SET_OTHERS_VIEWPROFILEFORM,
        payload: data
    };
};

export const setOthersViewProfileFormLink = (data) => {
    return {
        type: SET_OTHERS_VIEWPROFILEFORM_LINK,
        payload: data
    };
};

/**
 * ACTION CREATOR FOR BOOKMARKS REDUCER
 * 
 */
export const bookMark = (data: Object, key: String) => {
    return {
        type: BOOKMARK,
        payload: { key, value: data },
    }
};


/**
 * ACTION CREATOR FOR PHOTO GALLERY REDUCER
 * 
 */

export const setGalleryPhotos = (data) => {
    return {
        type: SET_GALLERY_PHOTOS,
        payload: data
    };
};

export const setGalleryPhotosnum = (data) => {
    return {
        type: SET_GALLERY_PHOTOS_NUM,
        payload: data
    };
};

export const setSelected = (data) => {
    return {
        type: SET_SELECTED_LIST,
        payload: data
    };
};


export const getGalleryPhotos = () => {
    return async (dispatch) => {
        CameraRoll.getPhotos({
            first: 5000,
            assetType: 'Photos',
        })
            .then(async (data) => {
                let media = [];
                media = data.edges.map((d) => (
                    {
                        photo: d.node.image.uri,
                        key: d.node.image.filename,
                        thumb: d.node.image.uri,
                        caption: d.node.image.filename,
                    }
                ));
                dispatch(setGalleryPhotos(media));
                dispatch(setGalleryPhotosnum(media.length));
            })
            .catch((err) => {
                console.warn(err);
                dispatch(setErrors('photos not found', 'photogallery'));
            });
    };
};