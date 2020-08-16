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
    POST_COMMENT_FORM_REFRESH,
    POST_COMMENT_FORM_DELETE,
    PREPEND_POST_COMMENT_FORM,
    REMOVE_POST_COMMENT_FORM,
    UPDATE_POST_COMMENT_FORM,
    SET_POST_COMMENT_FORM_LINK,
    BOOKMARK,
    RESET,
} from './types';
import auth from '../api/auth';
import session from '../api/session';
import axios from 'axios';
import { ToastAndroid, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { store } from '../store';
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
    image_exists
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

export const setReset = (key) => {
    return {
        type: RESET,
        payload: { key }
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
                    ToastAndroid.show(message, ToastAndroid.LONG);
                    dispatch(setReset('signup'));
                    Navigation.push(componentId, {
                        component: {
                            name: 'Signin',
                        }
                    });
                    break;
                case 500:
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    dispatch(setProcessing(false, 'signup'));
                    break;
                default:
                    dispatch(setErrors({ generalerrmsg }, 'signup'));
                    dispatch(setProcessing(false, 'signup'));
                    return;
                    break;
            }
        } catch (e) {
            if (e.toString().search('Failed to connect')) {
                ToastAndroid.show('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Something went wrong please try again', ToastAndroid.LONG);
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
                    ToastAndroid.show('Login successful', ToastAndroid.SHORT);
                    dispatch(setProcessing(false, 'login'));
                    dispatch(setReset('login'));
                    setRoute(store.getState());
                    break;
                case 400:
                    dispatch(setProcessing(false, 'login'))
                    dispatch(setErrors({ generalerrmsg: errmsg }, 'login'));
                    break;
                default:
                    dispatch(setProcessing(false, 'login'))
                    ToastAndroid.show('Something went wrong please try again', ToastAndroid.LONG);
                    dispatch(setErrors({ generalerrmsg: errmsg }, 'login'));
                    break;
            }
        } catch (e) {
            //console.warn(e.toString())
            if (e.toString().search('Failed to connect')) {
                ToastAndroid.show('Network error please check your internet connection', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Something went wrong please try again', ToastAndroid.LONG);
            }
            dispatch(setProcessing(false, 'login'))

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
                    ToastAndroid.show('Your session has expired you are required to login',
                        ToastAndroid.LONG);
                    break;
                case 400:
                    deleteFile(image.path);
                    ImagePicker.clean();
                    ToastAndroid.show(errors.avatarerr, ToastAndroid.LONG);
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
                            ToastAndroid.show('profile photo updated', ToastAndroid.SHORT);
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
                            ToastAndroid.show('profile photo updated', ToastAndroid.SHORT);
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
            ToastAndroid.show('could not update profile picture possible a network error please try again',
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
            ToastAndroid.show('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updatebio) != true) {
            dispatch(setProcessing(false, 'updateProfile'));
            dispatch(setUpdateProfileErrors({ 'bioerr': "The bio field is required" }, 'updateProfile'));
            ToastAndroid.show('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updategender) != true || updategender == "none" || updategender == 'false') {
            dispatch(setProcessing(false, 'updateProfile'));
            //console.warn('updated gender');
            dispatch(setUpdateProfileErrors({ gendererr: "The gender field is required" }, 'updateProfile'));
            ToastAndroid.show('profile update failed please check your inputs and try again',
                ToastAndroid.LONG);
            return;
        } else if (checkData(updatecampus) != true || updatecampus == "none") {
            dispatch(setProcessing(false, 'updateProfile'));
            //console.warn('updated campus');
            dispatch(setUpdateProfileErrors({ "campuserr": "please input your campus" }, 'updateProfile'));
            ToastAndroid.show('profile update failed please check your inputs and try again',
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
                    ToastAndroid.show('profile saved!', ToastAndroid.LONG);
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
                    ToastAndroid.show('profile update failed please check your inputs and try again',
                        ToastAndroid.LONG);
                    break;

                case 500:
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProcessing(false, 'updateProfile'));
                    dispatch(setUpdateProfileErrors(errors, 'updateprofile'));
                    ToastAndroid.show(errmsg,
                        ToastAndroid.LONG);
                    break;
                case 401:
                    dispatch(setReset('updateprofileerrors'));
                    dispatch(setProcessing(false, 'updateProfile'));
                    ToastAndroid.show('Your session has expired you are required to login',
                        ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing(false, 'updateProfile'));
                    ToastAndroid.show('could not communicate with server please try again',
                        ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'updateProfile'));
            if (e.toString().indexOf('Network Error') != -1) {
                ToastAndroid.show('could not connect to server please check your internet connection',
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show('something went wrong could not update profile please try again',
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
            ToastAndroid.showWithGravity('Post Images not found', ToastAndroid.LONG, ToastAndroid.CENTER);
            return;
        } else if (checkData(posttext) != true && checkData(postimages) != true) {
            dispatch(setProcessing(false, 'POSTFORM'));
            ToastAndroid.showWithGravity('Post is empty', ToastAndroid.LONG, ToastAndroid.CENTER);
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
            ToastAndroid.showWithGravity('Error occured while processing image please try again',
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
                    ToastAndroid.show('Posted!', ToastAndroid.LONG);
                    if (checkData(perror)) {
                        ToastAndroid.show(perror, ToastAndroid.LONG);
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
                        console.warn('Navigate to postshow page');
                    }
                    break;
                case 400:
                    ToastAndroid.show(`could not make post please try again ${errmsg}`,
                        ToastAndroid.LONG
                    );
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    break;
                case 500:
                    ToastAndroid.show('something went wrong please try again',
                        ToastAndroid.LONG
                    );
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    break;
                case 401:
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    break;
                default:
                    deleteMultiImage(resizedimgcaches);
                    dispatch(setProcessing(false, 'POSTFORM'));
                    ToastAndroid.show('something went wrong please try again',
                        ToastAndroid.LONG
                    );
                    break;
            }
        } catch (e) {
            deleteMultiImage(resizedimgcaches);
            dispatch(setProcessing(false, 'POSTFORM'));
            if (e.toString().indexOf('Network Error') != -1) {
                ToastAndroid.show('could not connect to server please check your internet connection',
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show('something went wrong please try again',
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
        let thumbimageuri = await resizeImage(image, 100, 100, null, 100);
        if (w < 320 || w > 1080 || h < 500 || h > 1080) {
            var postimageuri = await resizeImage(image, 1080, 1080);
        } else {
            var postimageuri = image;
        }

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
export const savePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: post
    }
};
export const removePost = (postid) => {
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
export const removeProfileTimeLinePostForm = (profileid) => {
    return {
        type: REMOVE_PROFILE_TIMELINE_POST_FORM,
        payload: profileid
    }
};



export const refreshTimelinePost = () => {
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
                generalposts,
                generalpostnexturl,
                followedposts,
                followedpostnexturl,
                withincampusposts,
                withincampuspostsnexturl
            } = response.data;

            switch (postlistrange) {
                case 'all':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm([...followedposts, ...generalposts]));
                    dispatch(addTimelinePost([...followedposts, ...generalposts]));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                    ));
                    break;
                case 'campus':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm([...followedposts, ...withincampusposts]));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                    ));
                    break;
                case 'followedpost':
                    dispatch(setReset('timelinepostform'));
                    dispatch(setReset('timelinepost'));
                    dispatch(addTimelinePostForm([...followedposts]));
                    dispatch(setTimelinePostFormLinks(
                        [followedpostnexturl].filter(url => checkData(url))
                    ));
                    dispatch(setTimelinePostLinks(
                        [followedpostnexturl].filter(url => checkData(url))
                    ));
                    break;
                default:
                    dispatch(setTimelinepostRefresh('failed'));
                    ToastAndroid.showWithGravity('could not refresh feed',
                        ToastAndroid.LONG, ToastAndroid.CENTER);
                    break;
            }
        } catch (e) {
            dispatch(setTimelinepostRefresh('failed'));
            ToastAndroid.showWithGravity(`could not refresh feed`,
                ToastAndroid.LONG, ToastAndroid.CENTER);
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
            switch (status) {
                case 200:
                    dispatch(updateTimelinePost({ ...postdetails }));
                    dispatch(updateTimelinePostForm({ ...postdetails }));
                    break;
                case 401:
                    break;
                case 500:
                    ToastAndroid.show('could not like post please try again', ToastAndroid.LONG);
                    break;
                case 400:
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    ToastAndroid.show('something went wrong please try again later', ToastAndroid.LONG);
                    break;
            }
        } catch (error) {
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
                    break;
                case 500:
                    ToastAndroid.show('could not share post please try again', ToastAndroid.LONG);
                    break;
                case 400:
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                default:
                    ToastAndroid.show('something went wrong please try again later', ToastAndroid.LONG);
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
            ToastAndroid.show('You cant archive this post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            ToastAndroid.show('Post not archived', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postarchive', {
                postid: postid
            }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    dispatch(deleteTimeLinePost(postid));
                    dispatch(deleteTimelinePostForm(postid));
                    dispatch(removePost(postid));
                    ToastAndroid.show(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    ToastAndroid.show(`${errmsg}`, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    ToastAndroid.show(`${errmsg}`, ToastAndroid.LONG);
                    break;
                case 401:
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    ToastAndroid.show(`${errmsg}`, ToastAndroid.LONG);
                    break;
                default:
                    dispatch(setProcessing(false, 'processarchivetimelinepostform'));
                    ToastAndroid.show(`${errmsg}`, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'processarchivetimelinepostform'));
            ToastAndroid.show(`Post not archived ${String(err)}`, ToastAndroid.LONG);
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
            ToastAndroid.show('You cant blacklist your own post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
            ToastAndroid.show('action failed please retry', ToastAndroid.LONG);
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
                    ToastAndroid.show(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 401:

                    break;
                default:
                    dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
                    ToastAndroid.show('action failed please retry', ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'processblacklisttimelinepostform'));
            if (e.toString().indexOf('Network Error') != -1) {
                ToastAndroid.show(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show('action failed please retry', ToastAndroid.LONG);
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
            ToastAndroid.show('You cant mute your own profile posts', ToastAndroid.LONG);
            return;
        } else if (checkData(profileid) != true) {
            dispatch(setProcessing(false, 'processmutetimelinepostform'));
            ToastAndroid.show('something went wrong please try again', ToastAndroid.LONG);
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
                    ToastAndroid.show(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 401:

                    break;
                default:
                    dispatch(setProcessing(false, 'processmutetimelinepostform'));
                    ToastAndroid.show('action failed please retry', ToastAndroid.LONG);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing(false, 'processmutetimelinepostform'));
            if (e.toString().indexOf('Network Error') != -1) {
                ToastAndroid.show(
                    'action failed please check your internet connection and try again',
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show('action failed please retry', ToastAndroid.LONG);
            }
        }
    };
};

export const deleteTimelinePost = (postid, postprofileid) => {
    return async (dispatch) => {
        dispatch(setProcessing(true, 'processdeletetimelinepostform'));
        const { user, profile } = store.getState();
        if (profile.profile_id != postprofileid) {
            ToastAndroid.show('You cant delete this post', ToastAndroid.LONG);
            return;
        } else if (checkData(postid) != true || checkData(postprofileid) != true) {
            ToastAndroid.show('Post not deleted', ToastAndroid.LONG);
            return;
        }
        try {
            const options = {
                headers: { 'Authorization': `Bearer ${user.token}` }
            };
            const response = await session.post('postdelete', {
                postid: postid
            }, options);
            const { errmsg, message, status } = response.data;
            switch (status) {
                case 200:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    dispatch(deleteTimeLinePost(postid));
                    dispatch(deleteTimelinePostForm(postid));
                    dispatch(removePost(postid));
                    ToastAndroid.show(message, ToastAndroid.LONG);
                    break;
                case 400:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    ToastAndroid.show('post not deleted please try again', ToastAndroid.LONG)
                    break;
                case 500:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    ToastAndroid.show('post not deleted please try again', ToastAndroid.LONG)
                    break;
                case 401:
                    break;
                default:
                    dispatch(setProcessing(false, 'processdeletetimelinepostform'));
                    ToastAndroid.show('post not deleted please try again', ToastAndroid.LONG)
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'processdeletetimelinepostform'));
            ToastAndroid.show(`Post not deleted please try again`, ToastAndroid.LONG);
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
                axios.post(url, null, options)
            );
        });
        axios.all(reqArr)
            .then(resultarr => {
                resultarr.forEach(result => {
                    const {
                        message,
                        postlistrange,
                        generalposts,
                        generalpostnexturl,
                        followedposts,
                        followedpostnexturl,
                        withincampusposts,
                        withincampuspostsnexturl
                    } = result.data;
                    let arr = [];
                    switch (postlistrange) {
                        case 'all':
                            dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
                            dispatch(addTimelinePostForm([...followedposts, ...generalposts]));
                            dispatch(addTimelinePost([...followedposts, ...generalposts]));
                            dispatch(setTimelinePostFormLinks(
                                [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                            ));
                            dispatch(setTimelinePostLinks(
                                [followedpostnexturl, generalpostnexturl].filter(url => checkData(url))
                            ));
                            break;
                        case 'campus':
                            dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
                            dispatch(addTimelinePostForm([...followedposts, ...withincampusposts]));
                            dispatch(setTimelinePostFormLinks(
                                [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                            ));
                            dispatch(setTimelinePostLinks(
                                [followedpostnexturl, withincampuspostsnexturl].filter(url => checkData(url))
                            ));
                            break;
                        case 'followedpost':
                            dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
                            dispatch(addTimelinePostForm([...followedposts]));
                            dispatch(setTimelinePostFormLinks(
                                [followedpostnexturl].filter(url => checkData(url))
                            ));
                            dispatch(setTimelinePostLinks(
                                [followedpostnexturl].filter(url => checkData(url))
                            ));
                            break;
                        default:
                            dispatch(setProcessing('retry', 'processloadmoretimelinepostform'));
                            ToastAndroid.show('something went wrong please try again',
                                ToastAndroid.LONG);
                            break;
                    }

                });//foreach loop
            })
            .catch(e => {
                dispatch(setProcessing('retry', 'processloadmoretimelinepostform'));
                ToastAndroid.show(`could not load more posts please try again`, ToastAndroid.LONG);
            });

    };
};

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
                    ToastAndroid.showWithGravity('could not refresh feed',
                        ToastAndroid.LONG, ToastAndroid.CENTER);
                    break;
            }
        } catch (e) {
            dispatch(setProcessing('failed', 'timelinepostform'));
            ToastAndroid.showWithGravity('could not refresh feed',
                ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }
};
export const bookMarkTimelinePost = (postid) => {
    return async (dispatch) => {

    }
}

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

//to fetch post comment
export const fetchPostComment = (postid) => {
    return async (dispatch) => {
        dispatch(setReset('postcommentform'));
        if (checkData(postid) != true) {
            ToastAndroid.show('Could not fetch comments please try again', ToastAndroid.LONG);
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
            const { errmsg, message, ownerpost, status, comments, nextpageurl } = response.data;

            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    break;
                case 400:
                    dispatch(setProcessing('retry', 'postcommentformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentformfetching'));
                    //ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
                case 401:
                    break;
                default:
                    dispatch(setProcessing('retry', 'postcommentformfetching'));
                    //ToastAndroid.show('Could not fetch comments please try again', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
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
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 404:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 401:
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
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 404:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 412:
                    dispatch(removePostCommentForm(tempid));
                    break;
                case 401:
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
                    dispatch(updatePostCommentForm(comment));
                    //alert(JSON.stringify(comment));
                    break;
                case 401:
                    break;
                default:
                    break;
            }
        } catch (err) {
        }
    }
}

export const refreshPostComment = (postid) => {
    return async (dispatch) => {
        dispatch(setPostCommentFormRefresh(true));
        if (checkData(postid) != true) {
            dispatch(setPostCommentFormRefresh(false));
            ToastAndroid.show('Failed to refresh', ToastAndroid.LONG);
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
            const { errmsg, message, ownerpost, status, comments, nextpageurl } = response.data;

            switch (status) {
                case 302:
                    dispatch(setReset('postcommentform'));
                    dispatch(setPostCommentFormRefresh(false));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    break;
                case 400:
                    dispatch(setPostCommentFormRefresh(false));
                    ToastAndroid.show('failed to refresh', ToastAndroid.LONG);
                    break;
                case 404:
                    dispatch(setPostCommentFormRefresh(false));
                    ToastAndroid.show('failed to refresh', ToastAndroid.LONG);
                    break;
                case 401:
                    break;
                default:
                    dispatch(setPostCommentFormRefresh(false));
                    ToastAndroid.show('failed to refresh', ToastAndroid.LONG);
                    break;
            }

        } catch (err) {
            // console.warn(err.toString());
            dispatch(setPostCommentFormRefresh(false));
            ToastAndroid.show('failed to refresh', ToastAndroid.LONG);
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
            const { errmsg, message, ownerpost, status, comments, nextpageurl } = response.data
            switch (status) {
                case 302:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    dispatch(addPostCommentForm(comments));
                    dispatch(setPostCommentFormLink(nextpageurl));
                    dispatch(updateTimelinePost(ownerpost));
                    dispatch(updateTimelinePostForm(ownerpost));
                    break;
                case 400:
                    // console.warn(errmsg);
                    dispatch(setProcessing('retry', 'postcommentformloadmore'));
                    break;
                case 404:
                    dispatch(setProcessing(false, 'postcommentformloadmore'));
                    break;
                case 401:
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
            ToastAndroid.show('Could not delete comment', ToastAndroid.LONG);
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
                    break;
                default:
                    dispatch(setProcessing(false, 'postcommentformdeleting'));
                    ToastAndroid.show(errmsg, ToastAndroid.LONG);
                    break;
            }
        } catch (err) {
            dispatch(setProcessing(false, 'postcommentformdeleting'));
            alert(err.toString())
            //alert(JSON.stringify(err));
            ToastAndroid.show('could not post comment please try gain', ToastAndroid.LONG);
        }
    }
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