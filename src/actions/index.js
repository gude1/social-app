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
  PREPEND_PRIVATECHATLIST,
  ADD_PRIVATECHATLIST,
  DELETE_PRIVATECHATLIST,
  UPDATE_PRIVATECHATLIST,
  ADD_FOLLOWINFO_LIST,
  UPDATE_FOLLOWINFO_LIST,
  ADD_FOLLOWINFO_URL,
  UPDATE_USER_VIEWPROFILEFORM_POSTS_ARRAY,
  UPDATE_OTHERS_VIEWPROFILEFORM_POSTS_ARRAY,
  SET_POST_COMMENT_FORM,
  SET_OTHERS_VIEWPROFILEFORM_POSTS,
  SET_USER_VIEWPROFILEFORM_POSTS,
  SET_POST_COMMENT_REPLY_FORM,
  SET_TIMELINE_POST_FORM,
  SET_TIMELINE_POST,
  SET_PROFILES_LIST,
  ADD_PROFILES_LIST,
  PREPEND_PROFILES_LIST,
  SET_PROFILES_LIST_NEXT_URL,
  ADD_SEARCH_LIST,
  PREPEND_SEARCH_LIST,
  SET_SEARCH_LIST,
  SET_SEARCH_LIST_NEXT_URL,
  SET_PROFILES_LIST_RESET,
  SET_SEARCH_LIST_RESET,
  UPDATE_PROFILES_LIST,
  UPDATE_SEARCH_LIST,
  UPDATE_PROFILE_CHANGED,
  SET_POST_COMMENT_OWNER_POST,
  SET_POST_COMMENT_FORM_OWNER_POST,
  UPDATE_POST_COMMENT_FORM_OWNER_POST,
  UPDATE_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
  SET_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
  ADD_PRIVATECHATLIST_TOSETREADARR,
  REMOVE_PRIVATECHATLIST_TOSETREADARR,
  SET_PRIVATE_CHATLIST_NEXTURL,
  PIN_PRIVATECHATLIST,
  UNPIN_PRIVATECHATLIST,
  ADD_OFFLINE_ACTION,
  DELETE_OFFLINE_ACTION,
  DELETE_OFFLINE_ACTIONS,
  ADD_PRIVATECHATLIST_EACH_CHAT_ARR,
  ADD_PRIVATECHAT,
  SET_PRIVATECHAT,
  SET_PRIVATECHATFORM,
  SET_PRIVATECHAT_LAST_FETCH_ARR,
  ADD_PRIVATECHAT_LAST_FETCH_ARR,
  REMOVE_PRIVATECHAT_LAST_FETCH_ARR,
  UPDATE_PRIVATECHATLIST_CHATS,
  REMOVE_PRIVATECHAT,
  REMOVE_PRIVATECHATLIST_CHATS,
  SET_PRIVATECHAT_PARTNER_PROFILE,
  SET_PRIVATECHAT_INFO,
  SET_PRIVATE_CHAT_CREATE_CHATID,
  UPDATE_SEARCH_PRIVATE_CHATLIST,
  SET_SEARCH_PRIVATE_CHATLIST_NEXTURL,
  SET_SEARCH_PRIVATE_CHATLIST_SEARCHWORD,
  UPDATE_MEETUP_FORM,
  UPDATE_MEETUP_FORM_ERRORS,
  APPEND_GIPHY_GALLERY_RESULTS,
  PREPEND_GIPHY_GALLERY_RESULTS,
  SET_GIPHY_GALLERY,
  UPDATE_GIPHY_GALLERY,
  ADD_MEETUPMAIN_REQUESTS,
  UPDATE_MEETUPMAIN_REQUEST,
  SET_MEETUPMAIN_URL,
  SET_MEETUPMAIN,
  SET_MEETUPMAIN_ERRORS,
  SET_MEETUPMAIN_MY_REQUESTS,
  ADD_MEETUPMAIN_MY_REQUESTS,
  UPDATE_MEETUPMAIN_MY_REQUESTS,
  REMOVE_MEETUPMAIN_REQUESTS,
  REMOVE_MEETUPMAIN_MY_REQUESTS,
  REMOVE_PROFILE_MEETUPMAIN,
  SET_MEETCONVLIST,
  UPDATE_MEETCONVLIST,
  SET_MEETUPCONVERSATION,
  UPDATE_MEETUPCONVERSATION,
  REMOVE_MEETUPCONVERSATION,
  UPDATE_ARRAY_PRIVATECHATLIST,
  UPDATE_MEETCONVLIST_CONVS,
  REMOVE_MEETCONVLIST_CONVS,
  UPDATE_MEETCONVLIST_CONVS_ARR,
  UPDATE_MEETUPCONVERSATION_ARR,
  REMOVE_MEETUPMAIN_MY_REQUESTS_ARR,
  REMOVE_MEETUPMAIN_REQUESTS_ARR,
  REMOVE_MEETCONVLIST,
  UPDATE_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  UPDATE_MENTIONS,
  SET_MENTIONS,
} from './types';
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
  logOut,
  getFileInfo,
  mvFile,
  cpFile,
  isEmpty,
} from '../utilities';
import auth from '../api/auth';
import session from '../api/session';
import axios from 'axios';
import {ToastAndroid, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {store, persistor} from '../store';
import CameraRoll from '@react-native-community/cameraroll';
import messaging from '@react-native-firebase/messaging';
import {GIPHY_API_KEY1, GIPHY_API_KEY2} from '../env';
import {SEARCH_INITIAL_STATE} from '../reducers/GiphyGalleryReducer';

/**
 * GENERAL ACTION CREATORS
 */
export const setProcessing = (data, key) => {
  return {
    type: PROCESSING,
    payload: {key, value: data},
  };
};

/**
 * ACTION CREATORS FOR APPINFOREDUCER
 */
export const setAppInfo = data => {
  return {
    type: SET_APP_INFO,
    payload: {...data},
  };
};

/**
 * ACTION CREATORS FOR AUTHREDUCER
 */
export const setErrors = (data, key) => {
  return {
    type: SET_ERRORS,
    payload: {key, value: data},
  };
};

export const setMsgs = (data, key) => {
  return {
    type: SET_MSGS,
    payload: {key, value: data},
  };
};

export const setEmail = (data, key) => {
  return {
    type: EMAIL_CHANGED,
    payload: {key, value: data},
  };
};

export const setName = (data, key) => {
  return {
    type: NAME_CHANGED,
    payload: {key, value: data},
  };
};

export const setUsername = (data, key) => {
  return {
    type: USERNAME_CHANGED,
    payload: {key, value: data},
  };
};

export const setPhone = (data, key) => {
  return {
    type: PHONE_CHANGED,
    payload: {key, value: data},
  };
};

export const setPassword = (data, key) => {
  return {
    type: PASSWORD_CHANGED,
    payload: {key, value: data},
  };
};

export const setReset = (key: String, value: String) => {
  return {
    type: RESET,
    payload: {key, value},
  };
};

export const signUp = ({
  email,
  username,
  name,
  phone,
  password,
  Navigation,
  componentId,
}) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'signup'));
    dispatch(
      setErrors(
        {
          nameerr: '',
          usernameerr: '',
          emailerr: '',
          phoneerr: '',
          passworderr: '',
          generalerrmsg: null,
        },
        'signup',
      ),
    );
    try {
      const device_token = await messaging().getToken();
      const response = await auth.post('register', {
        name,
        username,
        email,
        phone,
        password,
        device_token,
      });
      const {errors, status, message, errmsg} = response.data;

      switch (status) {
        case 400:
          dispatch(setErrors(errors, 'signup'));
          dispatch(setProcessing(false, 'signup'));
          break;
        case 201:
          //incomplete need to show modal that tells user to check mail
          //dispatch(setMsgs(message, 'signup'));
          alert(
            'Signup Success! please check your email inbox for confirmation email',
          );
          Toast(message, ToastAndroid.LONG);
          dispatch(setReset('signup'));
          Navigation.push(componentId, {
            component: {
              name: 'Signin',
            },
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
          dispatch(setErrors({generalerrmsg: errmsg}, 'signup'));
          dispatch(setProcessing(false, 'signup'));
          return;
          break;
      }
    } catch (e) {
      //alert(JSON.stringify(e));
      if (e.toString().indexOf('Network Error') > -1) {
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
      dispatch(setProcessing(false, 'signup'));
    }
  };
};

export const logIn = ({email, password, Navigation, componentId}) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'login'));
    dispatch(
      setErrors(
        {
          nameerr: '',
          usernameerr: '',
          emailerr: '',
          phoneerr: '',
          passworderr: '',
          generalerrmsg: null,
        },
        'login',
      ),
    );
    try {
      const device_token = await messaging().getToken();
      const response = await auth.post('login', {
        email: email,
        password: password,
        device_token,
      });
      const {
        errmsg,
        status,
        user,
        profile,
        meet_setting,
        posts,
      } = response.data;
      switch (status) {
        case 302:
          checkData(user) && dispatch(saveUser(user));
          checkData(posts) && dispatch(savePost(posts));
          dispatch(setProfileData({...profile}));
          checkData(meet_setting) && dispatch(updateMeetForm(meet_setting));
          getAppInfo(store.getState().profile, 'profile') == 'profiletrue'
            ? dispatch(setAppInfo({editprofileinformed: true}))
            : null;
          getAppInfo(store.getState().posts, 'post') == 'posttrue'
            ? dispatch(setAppInfo({postinformed: true}))
            : null;
          Toast('Login successful', ToastAndroid.SHORT);
          dispatch(setProcessing(false, 'login'));
          dispatch(setReset('login'));
          setRoute(store.getState());
          break;
        case 400:
          dispatch(setProcessing(false, 'login'));
          dispatch(setErrors({generalerrmsg: errmsg}, 'login'));
          break;
        case 401:
          Toast('Validation failed,Invalid request attempt');
          break;
        default:
          dispatch(setProcessing(false, 'login'));
          Toast('Something went wrong please try again', ToastAndroid.LONG);
          dispatch(setErrors({generalerrmsg: errmsg}, 'login'));
          break;
      }
    } catch (e) {
      if (e.toString().indexOf('Network Error') > -1) {
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
      dispatch(setProcessing(false, 'login'));
    }
  };
};

export const addDeviceToken = () => {
  return async dispatch => {
    dispatch(deleteOfflineAction({id: `addDeviceToken`}));
    try {
      const {user} = store.getState();
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const device_token = await messaging().getToken();
      const response = await session.post(
        'user/addDeviceToken',
        {device_token},
        options,
      );
      const {errmsg, message, userdetails, status} = response.data;
      switch (status) {
        case 200:
          checkData(userdetails) && dispatch(saveUser(userdetails));
          break;
        default:
          console.warn('addDeviceToken', errmsg);
          break;
      }
    } catch (err) {
      if (err.toString().indexOf('Network Error') > -1) {
        dispatch(
          addOfflineAction({
            id: `addDeviceToken`,
            funcName: 'addDeviceToken',
            param: [],
            override: true,
          }),
        );
      } else {
        console.warn('addDeviceToken', 'Something went wrong please try again');
      }
    }
  };
};

/**
 * ACTION CREATORS FOR PROFILEACTIONFORMREDUCER
 */
export const followProfileAction = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    const {user, profile} = store.getState();
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
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profilefollowaction',
        {profileid},
        options,
      );
      const {errmsg, message, status} = response.data;
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
        Toast(
          'action failed please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
      failedAction && failedAction();
    }
  };
};

export const muteProfileAction = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    const {user, profile} = store.getState();
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
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profilemuteaction',
        {profileid},
        options,
      );
      const {errmsg, message, status} = response.data;
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
        Toast(
          'action failed please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
      failedAction && failedAction();
    }
  };
};

export const blockProfileAction = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    const {user, profile} = store.getState();
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
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profileblockaction',
        {profileid},
        options,
      );
      const {errmsg, message, status} = response.data;
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
      alert(err.toString());
      dispatch(setProcessing(false, 'profileactionblocking'));
      if (err.toString().indexOf('Network Error') > -1) {
        Toast(
          'action failed please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
      failedAction && failedAction();
    }
  };
};

export const fetchAProfile = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async () => {
    if (!checkData(profileid)) {
      Toast('Missing terms to continue', ToastAndroid.SHORT);
      failedAction && failedAction();
    }
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      initAction && initAction();
      const response = await session.post('profileshow', {profileid}, options);
      const {errmsg, status, profile, known_followers_info} = response.data;
      switch (status) {
        case 302:
          okAction && okAction({...profile, known_followers_info});
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
    payload: data,
  };
};

export const prependToLikesListForm = (data: Array) => {
  return {
    type: PREPEND_LIKES_LIST_FORM,
    payload: data,
  };
};

export const updateLikesListForm = (data: Object) => {
  return {
    type: UPDATE_LIKES_LIST_FORM,
    payload: data,
  };
};
export const setLikesListFormLink = (data: String) => {
  return {
    type: SET_LIKES_LIST_FORM_LINK,
    payload: data,
  };
};

export const fetchLikes = (requrl, reqdata) => {
  return async dispatch => {
    if (checkData(requrl) != true) {
      Toast('request term not specified', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'likeslistfetching'));
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(requrl, reqdata, options);
      const {
        errmsg,
        status,
        likes_list,
        message,
        next_page_url,
      } = response.data;
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
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
    }
  };
};

export const fetchMoreLikes = reqdata => {
  return async dispatch => {
    const {user, likeslistform} = store.getState();
    const {nextpageurl} = likeslistform;
    if (checkData(nextpageurl) != true) {
      dispatch(setProcessing('done', 'likeslistloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'likeslistloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(nextpageurl, reqdata, options);
      const {
        errmsg,
        status,
        likes_list,
        message,
        next_page_url,
      } = response.data;
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
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
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
    payload: data,
  };
};

export const prependToSharesListForm = (data: Array) => {
  return {
    type: PREPEND_SHARES_LIST_FORM,
    payload: data,
  };
};

export const updateSharesListForm = (data: Object) => {
  return {
    type: UPDATE_SHARES_LIST_FORM,
    payload: data,
  };
};
export const setSharesListFormLink = (data: String) => {
  return {
    type: SET_SHARES_LIST_FORM_LINK,
    payload: data,
  };
};

export const fetchShares = (requrl, reqdata) => {
  return async dispatch => {
    if (checkData(requrl) != true) {
      Toast('request term not specified', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'shareslistfetching'));
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(requrl, reqdata, options);
      const {
        errmsg,
        status,
        shares_list,
        message,
        next_page_url,
      } = response.data;
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
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('Something went wrong please try again', ToastAndroid.LONG);
      }
    }
  };
};

export const fetchMoreShares = reqdata => {
  return async dispatch => {
    const {user, shareslistform} = store.getState();
    const {nextpageurl} = shareslistform;
    if (checkData(nextpageurl) != true) {
      dispatch(setProcessing('done', 'shareslistloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'shareslistloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(nextpageurl, reqdata, options);
      const {
        errmsg,
        status,
        shares_list,
        message,
        next_page_url,
      } = response.data;
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
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
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
export const fetchProfilePosts = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async () => {
    if (!checkData(profileid)) {
      Toast('Missing terms to continue', ToastAndroid.SHORT);
      failedAction && failedAction();
    }
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      initAction && initAction();
      const response = await session.post('profileposts', {profileid}, options);
      const {
        errmsg,
        status,
        profile_posts,
        reqprofile,
        nextpageurl,
      } = response.data;
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

export const fetchMoreProfilePosts = (
  url,
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async () => {
    if (!checkData(profileid)) {
      Toast('Missing terms to continue', ToastAndroid.SHORT);
      failedAction && failedAction();
    }
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      initAction && initAction();
      const response = await session.post(url, {profileid}, options);
      const {
        errmsg,
        status,
        profile_posts,
        reqprofile,
        nextpageurl,
      } = response.data;
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
export const saveUser = data => {
  return {
    type: SAVE_USER,
    payload: data,
  };
};

export const updateUser = data => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};

/**
 * ACTION CREATORS FOR PROFILE REDUCER
 */
export const setProfilePic = image => {
  return {
    type: NEW_PROFILE_PIC,
    payload: image,
  };
};
export const setProfileData = data => {
  return {
    type: SET_PROFILE_DATA,
    payload: data,
  };
};
/**
 * ACTION CREATORS FOR PROFILEFORM REDUCER
 *
 */
export const setImageTry = data => {
  return {
    type: SET_IMAGE_TRY,
    payload: data,
  };
};

export const setUpdateProfileChange = (data: object) => {
  return {
    type: UPDATE_PROFILE_CHANGED,
    payload: data,
  };
};

export const setUpdateUsername = username => {
  return {
    type: UPDATE_USERNAME_CHANGED,
    payload: {updatedusername: username},
  };
};

export const setUpdateBio = bio => {
  return {
    type: UPDATE_BIO_CHANGED,
    payload: {updatedbio: bio},
  };
};

export const setUpdateCampus = campus => {
  return {
    type: UPDATE_CAMPUS_CHANGED,
    payload: {updatedcampus: campus},
  };
};

export const setUpdatePassword = pass => {
  return {
    type: UPDATE_PASSWORD_CHANGED,
    payload: {updatedpassword: pass},
  };
};
export const setUpdateGender = gender => {
  return {
    type: UPDATE_GENDER_CHANGED,
    payload: {updatedgender: gender},
  };
};

export const setUpdateProfileErrors = (data, key) => {
  return {
    type: SET_UPDATE_PROFILE_ERRORS,
    payload: {key, value: data},
  };
};

export const uploadProfilePic = image => {
  return async dispatch => {
    const {user, profile} = store.getState();
    const dirs = RNFetchBlob.fs.dirs;
    /*console.log(RNFetchBlob.fs.dirs)
        console.log(dirs.CacheDir)
        console.log(dirs.DCIMDir)
        console.log(dirs.SDCardDir)*/
    let {avatarremote, avatarlocal} = profile;
    let profilecompleted = getAppInfo(profile, 'profile'); //very essential determines wheter set root or wait
    dispatch(setProcessing(true, 'updateProfileImage'));
    try {
      let formdata = new FormData();
      formdata.append('avatar', {
        uri: image.path,
        type: image.mime,
        name: 'image.jpg',
      });
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('profileupdate', formdata, options);
      const {errors, profile, status} = response.data;
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
          dispatch(setProcessing(false, 'updateProfileImage'));
          checkData(errors.avatarerr) &&
            Toast(errors.avatarerr, ToastAndroid.LONG);
          checkData(errmsg) && Toast(errmsg, ToastAndroid.LONG);
          break;
        case 200:
          dispatch(updateUser({...profile.user}));
          //console.warn(e);
          delete profile.user;
          dispatch(setProfileData({...profile}));
          ImagePicker.clean();
          dispatch(setProcessing(false, 'updateProfileImage'));
          Toast('profile photo updated', ToastAndroid.SHORT);
          if (
            profilecompleted == 'profilefalse' &&
            getAppInfo(store.getState().profile, 'profile') == 'profiletrue' &&
            getAppInfo(store.getState().posts, 'post') == 'posttrue'
          ) {
            setRoute(store.getState());
          }
          break;
        default:
          ImagePicker.clean();
          dispatch(setProcessing(false, 'updateProfileImage'));
          checkData(errors.avatarerr) &&
            Toast(errors.avatarerr, ToastAndroid.LONG);
          checkData(errmsg) && Toast(errmsg, ToastAndroid.LONG);
          break;
      }
    } catch (e) {
      //alert(e.toString());
      //console.warn(e);
      ImagePicker.clean();
      dispatch(setProcessing(false, 'updateProfileImage'));
      Toast(
        'could not update profile picture possible a network error please try again',
        ToastAndroid.LONG,
      );
    }
  };
};

export const saveProfileUpdate = (
  updateusername,
  updateprofile_name,
  updatebio,
  updatecampus,
  updategender,
  updatephone,
) => {
  return async dispatch => {
    const {user, profile} = store.getState();
    let iserror = false;
    let profilecompleted = getAppInfo(profile, 'profile'); //very essential determines wheter set root or wait

    dispatch(setReset('updateprofileerrors'));
    dispatch(setProcessing(true, 'updateProfile'));

    if (checkData(updateprofile_name) != true) {
      dispatch(setProcessing(false, 'updateProfile'));
      dispatch(
        setUpdateProfileErrors(
          {profile_nameerr: 'The profilename field is required'},
          'updateProfile',
        ),
      );
      iserror = true;
    }
    if (checkData(updatebio) != true) {
      dispatch(setProcessing(false, 'updateProfile'));
      dispatch(
        setUpdateProfileErrors(
          {bioerr: 'The bio field is required'},
          'updateProfile',
        ),
      );
      iserror = true;
    }
    if (
      checkData(updategender) != true ||
      updategender == 'none' ||
      updategender == 'false'
    ) {
      dispatch(setProcessing(false, 'updateProfile'));
      //console.warn('updated gender');
      dispatch(
        setUpdateProfileErrors(
          {gendererr: 'The gender field is required'},
          'updateProfile',
        ),
      );
      iserror = true;
    }
    if (checkData(updatecampus) != true || updatecampus == 'none') {
      dispatch(setProcessing(false, 'updateProfile'));
      //console.warn('updated campus');
      dispatch(
        setUpdateProfileErrors(
          {campuserr: 'please input your campus'},
          'updateProfile',
        ),
      );
      iserror = true;
    }
    if (checkData(updatephone) != true || updatephone.length != 11) {
      dispatch(setProcessing(false, 'updateProfile'));
      //console.warn('updated campus');
      dispatch(
        setUpdateProfileErrors(
          {phoneerr: 'phone must be 11 digits'},
          'updateProfile',
        ),
      );
      iserror = true;
    }
    if (iserror) {
      Toast(
        'profile update failed please check and fill your inputs and try again',
        ToastAndroid.LONG,
      );
      return;
    }
    let requestData = {
      bio: updatebio,
      profile_name: updateprofile_name,
      phone: updatephone,
      campus: updatecampus,
    };
    if (!['male', 'female'].includes(user.gender)) {
      requestData = {...requestData, gender: updategender};
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profileupdate',
        requestData,
        options,
      );
      const {errors, errmsg, profile, status} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          //console.warn(profileupdate);
          dispatch(setReset('updateprofileerrors'));
          dispatch(setProfileData({...profile}));
          dispatch(updateUser({...profile.user}));
          dispatch(setProcessing(false, 'updateProfile'));
          dispatch(setImageTry(false));
          Toast('profile saved!', ToastAndroid.LONG);
          if (
            profilecompleted == 'profilefalse' &&
            getAppInfo(store.getState().profile, 'profile') == 'profiletrue' &&
            getAppInfo(store.getState().posts, 'post') == 'posttrue'
          ) {
            setRoute(store.getState());
          }
          break;
        case 400:
          dispatch(setReset('updateprofileerrors'));
          dispatch(setProcessing(false, 'updateProfile'));
          dispatch(setUpdateProfileErrors(errors, 'updateProfile'));
          Toast(
            'profile update failed please check your inputs and try again',
            ToastAndroid.LONG,
          );
          break;

        case 500:
          dispatch(setReset('updateprofileerrors'));
          dispatch(setProcessing(false, 'updateProfile'));
          dispatch(setUpdateProfileErrors(errors, 'updateprofile'));
          Toast(errmsg, ToastAndroid.LONG);
          break;
        case 401:
          dispatch(setReset('updateprofileerrors'));
          dispatch(setProcessing(false, 'updateProfile'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing(false, 'updateProfile'));
          Toast(
            'could not communicate with server please try again',
            ToastAndroid.LONG,
          );
          break;
      }
    } catch (e) {
      dispatch(setProcessing(false, 'updateProfile'));
      if (e.toString().indexOf('Network Error') != -1) {
        Toast(
          'could not connect to server please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast(
          'something went wrong could not update profile please try again',
          ToastAndroid.LONG,
        );
      }
    }
  };
};

/**
 * ACTION CREATORS FOR POSTFORM REDUCER
 */

export const setUpdatedPostFormText = data => {
  return {
    type: UPDATE_POST_FORM_TEXT_CHANGED,
    payload: data,
  };
};

export const setUpdatedPostFormImage = data => {
  return {
    type: UPDATE_POST_FORM_IMAGE_CHANGED,
    payload: data,
  };
};

//make post and upload to server starts here
export const makePost = (postimages, posttext, okAction, failedAction) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'POSTFORM'));
    const {user, posts} = store.getState();
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
      Toast(
        'Error occured while processing image please try again',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      return;
    }
    resizedimgcaches.forEach(imageObj => {
      formData.append('post_image[]', {
        uri: imageObj.resizedpostimage,
        type: 'image/jpeg',
        name: imageObj.resizedpostimage,
      });
      formData.append('thumb_post_image[]', {
        uri: imageObj.thumbpostimage,
        type: 'image/jpeg',
        name: imageObj.thumbpostimage,
      });
    });
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('post', formData, options);
      let {errors, errmsg, status, perror, post} = response.data;
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
          okAction && okAction();
          //if user didnt have any post before now probably the user is new to platform so navigate to homescreen
          if (
            postcompleted == 'postfalse' &&
            getAppInfo(store.getState().posts, 'post') == 'posttrue'
          ) {
            setRoute(store.getState());
          }
          break;
        case 400:
          if (errmsg) {
            Toast(errmsg, ToastAndroid.LONG);
          } else if (errors) {
            errors.errorposttext &&
              Toast(errors.errorposttext, ToastAndroid.LONG);
            errors.errthumbpostimage &&
              Toast(errors.errthumbpostimage, ToastAndroid.LONG);
            errors.errpostimage &&
              Toast(errors.errpostimage, ToastAndroid.LONG);
            errors.errthumbpostimages &&
              Toast(errors.errthumbpostimages, ToastAndroid.LONG);
            errors.errpostimages &&
              Toast(errors.errpostimages, ToastAndroid.LONG);
          } else {
            Toast('something went wrong please try again', ToastAndroid.LONG);
          }
          deleteMultiImage(resizedimgcaches);
          dispatch(setProcessing(false, 'POSTFORM'));
          failedAction && failedAction();
          break;
        case 500:
          Toast(errmsg, ToastAndroid.LONG);
          deleteMultiImage(resizedimgcaches);
          dispatch(setProcessing(false, 'POSTFORM'));
          failedAction && failedAction();
          break;
        case 401:
          deleteMultiImage(resizedimgcaches);
          dispatch(setProcessing(false, 'POSTFORM'));
          logOut(() => persistor.purge());
          failedAction && failedAction();
          break;
        default:
          deleteMultiImage(resizedimgcaches);
          dispatch(setProcessing(false, 'POSTFORM'));
          Toast('something went wrong please try again', ToastAndroid.LONG);
          failedAction && failedAction();
          break;
      }
    } catch (e) {
      //alert(e.toString());
      deleteMultiImage(resizedimgcaches);
      dispatch(setProcessing(false, 'POSTFORM'));
      failedAction && failedAction();
      if (e.toString().indexOf('Network Error') != -1) {
        Toast(
          'could not connect to server please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('something went wrong please try again', ToastAndroid.LONG);
      }
    }
  };
};

//handles the resizing of the post images
const resizeMultipleImage = async arr => {
  if (Array.isArray(arr) != true || arr.length < 1) {
    return null;
  }
  let resizedImages = [];
  resizedImages = await Promise.all(
    arr.map(async image => {
      //return image;
      let {w, h} = await getImageSize(image);
      let postimageuri = await resizeImage(image, 1500, 1500);
      let thumbimageuri = await resizeImage(image, 100, 100, null, 100);
      if (thumbimageuri == false || postimageuri == false) {
        return null;
      }
      return {
        resizedpostimage: postimageuri,
        thumbpostimage: thumbimageuri,
      };
    }),
  );
  return resizedImages;
};
//handles deleting of images cache
const deleteMultiImage = images => {
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
    payload: post,
  };
};
export const removePost = (postid: String) => {
  return {
    type: REMOVE_POST,
    payload: postid,
  };
};

/**
 * ACTION CREATOR FOR TIMELINEPOST REDUCER
 */
export const addTimelinePost = timelinepost => {
  return {
    type: ADD_TIMELINE_POST,
    payload: timelinepost,
  };
};

export const setTimelinePost = (data: Array) => {
  return {
    type: SET_TIMELINE_POST,
    payload: data,
  };
};

export const prependTimelinePost = (timelinepost: Array) => {
  return {
    type: PREPEND_TIMELINE_POST,
    payload: timelinepost,
  };
};

export const updateTimelinePost = timelinepost => {
  return {
    type: UPDATE_TIMELINE_POST,
    payload: timelinepost,
  };
};

export const setTimelinePostLinks = data => {
  return {
    type: SET_TIMELINE_POST_LINKS,
    payload: data,
  };
};

export const deleteTimeLinePost = postid => {
  return {
    type: DELETE_TIMELINE_POST,
    payload: postid,
  };
};

export const setTimelinePostProfileChanges = (data: Array) => {
  return {
    type: SET_TIMELINE_POST_PROFILE_CHANGES,
    payload: data,
  };
};
export const updateTimelinePostProfileChanges = (data: Object) => {
  return {
    type: UPDATE_TIMELINE_POST_PROFILE_CHANGES,
    payload: data,
  };
};
export const removeProfileTimeLinePost = profileid => {
  return {
    type: REMOVE_PROFILE_TIMELINE_POST,
    payload: profileid,
  };
};

/**
 * ACTION CREATOR FOR TIMELINEPOSTFORM REDUCER
 */
export const addTimelinePostForm = data => {
  return {
    type: ADD_TIMELINE_POST_FORM,
    payload: data,
  };
};

export const setTimelinePostForm = (data: Array) => {
  return {
    type: SET_TIMELINE_POST_FORM,
    payload: data,
  };
};

export const prependTimelinePostForm = (data: Array) => {
  return {
    type: PREPEND_TIMELINE_POST_FORM,
    payload: data,
  };
};

export const updateTimelinePostForm = (data, add) => {
  return {
    type: UPDATE_TIMELINE_POST_FORM,
    payload: {data, add},
  };
};
export const setTimelinePostFormLinks = data => {
  return {
    type: SET_TIMELINE_POST_FORM_LINKS,
    payload: data,
  };
};

export const setTimelinepostRefresh = value => {
  return {
    type: TIMELINE_POST_FORM_REFRESH,
    payload: value,
  };
};
export const deleteTimelinePostForm = postid => {
  return {
    type: DELETE_TIMELINE_POST_FORM,
    payload: postid,
  };
};

export const setTimelinePostFormProfileChanges = (data: Array) => {
  return {
    type: SET_TIMELINE_POST_FORM_PROFILE_CHANGES,
    payload: data,
  };
};

export const updateTimelinePostFormProfileChanges = (data: Object) => {
  return {
    type: UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES,
    payload: data,
  };
};

export const removeProfileTimeLinePostForm = profileid => {
  return {
    type: REMOVE_PROFILE_TIMELINE_POST_FORM,
    payload: profileid,
  };
};

export const fetchParticularPost = (
  postid,
  initAction,
  okAction,
  endAction,
) => {
  return async dispatch => {
    if (!checkData(postid)) {
      Toast('Post not found', ToastAndroid.LONG);
      dispatch(setProcessing(false, 'processfetchtimelinepostform'));
      return;
    }
    const {user} = store.getState();
    initAction && initAction();
    dispatch(setProcessing(true, 'processfetchtimelinepostform'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('postshow', {postid}, options);
      const {status, message, errmsg, blockmsg, postdetails} = response.data;
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
      if (err.toString().indexOf('Network Error') > -1) {
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast('something went wrong please try again', ToastAndroid.LONG);
      }
    }
  };
};

export const refreshTimelinePost = (data = []) => {
  return async dispatch => {
    dispatch(deleteOfflineAction({id: `refreshTimelinePost`}));
    dispatch(setTimelinepostRefresh(true));
    const {user} = store.getState();
    let okAction = data[0];
    let failedAction = data[1];
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('postlist', null, options);
      const {
        message,
        postlistrange,
        timelineposts,
        errmsg,
        links,
        status,
      } = response.data;
      //console.warn('refreshpost',response.data);
      //alert(JSON.stringify(response.data));
      dispatch(setTimelinepostRefresh(false));
      switch (status) {
        case 200:
          dispatch(setTimelinePostForm(timelineposts));
          dispatch(setTimelinePost(timelineposts));
          dispatch(setTimelinePostFormLinks(links));
          dispatch(setTimelinePostLinks(links));
          checkData(okAction) && okAction();
          break;
        default:
          checkData(failedAction) && failedAction();
          if (status == 401) {
            logOut(() => persistor.purge());
            return;
          }
          dispatch(setTimelinepostRefresh(false));
          Toast(
            'could not refresh feed',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (e) {
      console.warn(String(e));
      console.warn('refreshpost', e.toString());
      checkData(failedAction) && failedAction();
      dispatch(setTimelinepostRefresh(false));
      if (e.toString().indexOf('Network Error') > -1) {
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
        dispatch(
          addOfflineAction({
            id: `refreshTimelinePost`,
            funcName: 'refreshTimelinePost',
            param: data,
            override: true,
          }),
        );
      } else {
        Toast('could not refresh feed', ToastAndroid.LONG);
      }
    }
  };
};

//to like time line post
export const likeTimelinePostAction = (data = []) => {
  return async dispatch => {
    //console.warn('called');
    const {user, timelinepostform} = store.getState();
    let postid = data[0];
    let likestatus = data[1];
    dispatch(deleteOfflineAction({id: `likeTimelinePostAction${postid}`}));

    if (checkData(postid) != true || checkData(likestatus) != true) {
      return null;
    }

    let postitem = timelinepostform.timelineposts.find(
      item => item.postid == postid,
    );
    let numpostlikes = !isEmpty(postitem) ? Number(postitem.num_post_likes) : 0;
    if (!isEmpty(postitem)) {
      if (postitem.postliked == likestatus) {
        dispatch(
          updateTimelinePostForm({
            postid,
            num_post_likes:
              likestatus == 'postliked' ? numpostlikes + 1 : numpostlikes - 1,
            pendingpostliked: null,
          }),
        );
        return;
      }
      if (likestatus != postitem.pendingpostliked) {
        if (likestatus == 'postliked')
          numpostlikes = numpostlikes + 1 < 0 ? 1 : numpostlikes + 1;
        else numpostlikes = numpostlikes - 1 < 0 ? 0 : numpostlikes - 1;
      }
      dispatch(
        updateTimelinePostForm({
          postid,
          pendingpostliked: likestatus,
          num_post_likes: numpostlikes,
        }),
      );
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postlikeaction',
        {
          postid: postid,
        },
        options,
      );
      const {message, errmsg, postdetails, status} = response.data;
      //console.warn(response.data)
      switch (status) {
        case 200:
          //console.warn('like done');
          dispatch(
            updateTimelinePost({...postdetails, pendingpostliked: null}),
          );
          dispatch(
            updateTimelinePostForm({...postdetails, pendingpostliked: null}),
          );
          break;
        default:
          Toast(errmsg || 'action failed please try again');
          !isEmpty(postitem) &&
            dispatch(
              updateTimelinePostForm({
                postid,
                pendingpostliked:
                  likestatus == 'postliked' ? 'notliked' : 'postliked',
                num_post_likes:
                  likestatus == 'postliked'
                    ? numpostlikes - 1
                    : numpostlikes + 1,
              }),
            );
          break;
      }
    } catch (err) {
      console.warn('likeTimelinePostAction', String(err));
      if (err.toString().indexOf('Network Error') > -1) {
        dispatch(
          addOfflineAction({
            id: `likeTimelinePostAction${postid}`,
            funcName: 'likeTimelinePostAction',
            param: data,
            persist: true,
            override: true,
          }),
        );
        return;
      } else {
        Toast(
          likestatus == 'postliked'
            ? 'post liked failed'
            : 'post unlike failed',
        );
        !isEmpty(postitem) &&
          dispatch(
            updateTimelinePostForm({
              postid,
              pendingpostliked:
                likestatus == 'postliked' ? 'notliked' : 'postliked',
              num_post_likes:
                likestatus == 'postliked' ? numpostlikes - 1 : numpostlikes + 1,
            }),
          );
      }
    }
  };
};

//to share timelinepost
export const shareTimelinePostAction = (data = []) => {
  return async dispatch => {
    const {user, timelinepostform} = store.getState();
    let postid = data[0];
    let sharestatus = data[1];
    dispatch(deleteOfflineAction({id: `shareTimelinePostAction${postid}`}));

    if (checkData(postid) != true || checkData(sharestatus) != true) {
      return null;
    }
    dispatch(deleteOfflineAction({id: `shareTimelinePostAction${postid}`}));

    let postitem = timelinepostform.timelineposts.find(
      item => item.postid == postid,
    );
    let numshares = !isEmpty(postitem) ? Number(postitem.num_post_shares) : 0;
    if (!isEmpty(postitem)) {
      if (postitem.postshared == sharestatus) {
        dispatch(
          updateTimelinePostForm({
            postid,
            num_post_shares:
              sharestatus == 'postshared' ? numshares + 1 : numshares - 1,
            pendingpostshared: null,
          }),
        );
        return;
      }
      if (sharestatus != postitem.pendingpostshared) {
        if (sharestatus == 'postshared')
          numshares = numshares + 1 < 0 ? 1 : numshares + 1;
        elsenumshares = numshares - 1 < 0 ? 0 : numshares - 1;
      }
      dispatch(
        updateTimelinePostForm({
          postid,
          pendingpostshared: sharestatus,
          num_post_shares: numshares,
        }),
      );
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postshareaction',
        {
          postid: postid,
        },
        options,
      );
      const {message, errmsg, postdetails, status} = response.data;
      switch (status) {
        case 200:
          console.warn('share done');
          dispatch(updateTimelinePost({...postdetails}));
          dispatch(updateTimelinePostForm({...postdetails}));
          break;
        default:
          Toast(errmsg || 'action failed please try again');
          !isEmpty(postitem) &&
            dispatch(
              updateTimelinePostForm({
                postid,
                postshared:
                  sharestatus == 'postshared' ? 'notshared' : 'postshared',
                num_post_shares:
                  sharestatus == 'postshared' ? numshares - 1 : numshares + 1,
              }),
            );
          break;
      }
    } catch (err) {
      console.warn('shareTimelinePostAction', err.toString());
      if (err.toString().indexOf('Network Error') > -1) {
        dispatch(
          addOfflineAction({
            id: `shareTimelinePostAction${postid}`,
            funcName: 'shareTimelinePostAction',
            persist: true,
            param: data,
            override: true,
          }),
        );
      } else {
        Toast(
          sharestatus == 'postshared'
            ? 'post shared failed'
            : 'post unshare failed',
        );
        !isEmpty(postitem) &&
          dispatch(
            updateTimelinePostForm({
              postid,
              postshared:
                sharestatus == 'postshared' ? 'notshared' : 'postshared',
              num_post_shares:
                sharestatus == 'postshared' ? numshares - 1 : numshares + 1,
            }),
          );
      }
    }
  };
};

export const archiveTimelinePost = (postid, postprofileid) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'processarchivetimelinepostform'));
    const {user, profile} = store.getState();
    if (profile.profile_id != postprofileid) {
      Toast('You cant archive this post', ToastAndroid.LONG);
      return;
    } else if (checkData(postid) != true || checkData(postprofileid) != true) {
      Toast('Post not archived', ToastAndroid.LONG);
      return;
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postarchive',
        {
          postid: postid,
        },
        options,
      );
      const {errmsg, message, resetpost, status} = response.data;
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
        Toast(
          'Network error please check your internet connection',
          ToastAndroid.LONG,
        );
      } else {
        Toast(`Post not archived`, ToastAndroid.LONG);
      }

      //console.warn(String(err));
    }
  };
};

export const blackListTimelinePost = (postid, postprofileid) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'processblacklisttimelinepostform'));
    const {user, profile} = store.getState();
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
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'blacklistpostaction',
        {
          postid: postid,
        },
        options,
      );
      const {errmsg, message, status} = response.data;
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
          ToastAndroid.LONG,
        );
      } else {
        Toast('action failed please retry', ToastAndroid.LONG);
      }
    }
  };
};

export const muteProfileTimelinePost = profileid => {
  return async dispatch => {
    dispatch(setProcessing(true, 'processmutetimelinepostform'));
    const {user, profile} = store.getState();
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
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'muteprofilepostaction',
        {
          profileid: profileid,
        },
        options,
      );
      const {errmsg, message, status} = response.data;
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
          ToastAndroid.LONG,
        );
      } else {
        Toast('action failed please retry', ToastAndroid.LONG);
      }
    }
  };
};

export const deleteTimelinePost = (postid, postprofileid) => {
  return async dispatch => {
    dispatch(setProcessing(true, 'processdeletetimelinepostform'));
    const {user, profile} = store.getState();
    if (profile.profile_id != postprofileid) {
      Toast('You cant delete this post', ToastAndroid.LONG);
      return;
    } else if (checkData(postid) != true || checkData(postprofileid) != true) {
      Toast('Post not deleted', ToastAndroid.LONG);
      return;
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postdelete',
        {
          postid: postid,
        },
        options,
      );
      const {errmsg, message, status, resetpost} = response.data;
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
          Toast('post not deleted please try again', ToastAndroid.LONG);
          break;
        case 500:
          dispatch(setProcessing(false, 'processdeletetimelinepostform'));
          Toast('post not deleted please try again', ToastAndroid.LONG);
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
          Toast('post not deleted please try again', ToastAndroid.LONG);
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'processdeletetimelinepostform'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast(
          'action failed please check your internet connection and try again',
          ToastAndroid.LONG,
        );
      } else {
        Toast(`Post not deleted please try again`, ToastAndroid.LONG);
      }

      //console.warn(String(err))
    }
  };
};

export const fetchMoreTimelinePost = () => {
  return async dispatch => {
    dispatch(setProcessing(true, 'processloadmoretimelinepostform'));
    try {
      const {user, timelinepostform} = store.getState();
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      if (
        !Array.isArray(timelinepostform.links) ||
        timelinepostform.links.length < 1
      ) {
        dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
        return;
      }
      const response = await session.post(
        'postlist',
        {links: timelinepostform.links},
        options,
      );
      const {
        message,
        postlistrange,
        timelineposts,
        errmsg,
        links,
        status,
      } = response.data;
      dispatch(setProcessing(false, 'processloadmoretimelinepostform'));
      switch (status) {
        case 200:
          dispatch(addTimelinePostForm(timelineposts));
          dispatch(addTimelinePost(timelineposts));
          dispatch(setTimelinePostFormLinks(links));
          dispatch(setTimelinePostLinks(links));
          break;
        default:
          if (status == 401) {
            logOut(() => persistor.purge());
            return;
          }
          Toast(errmsg);
          break;
      }
    } catch (err) {
      console.warn('fetchMoreTimelinePost', err.toString());
      if (err.toString().indexOf('Network Error') > -1) {
        Toast('Network error please check your internet connection');
      } else {
        Toast('Failed to load');
      }
    }
  };
};

/**/

export const fetchTimelinePost = () => {
  return async dispatch => {
    dispatch(setProcessing(true, 'timelinepostform'));
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
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
        withincampuspostsnexturl,
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
          Toast(
            'could not refresh feed',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (e) {
      dispatch(setProcessing('failed', 'timelinepostform'));
      Toast('could not refresh feed', ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  };
};
export const bookMarkTimelinePost = postid => {
  return async dispatch => {};
};
/**
 * ACTION CREATORS FOR POSTSETTING REDUCER
 */
export const updatePostSetting = (data = {}) => {
  return {
    type: UPDATE_POST_SETTINGS,
    payload: data,
  };
};

export const postSettingUpdate = toupdatedata => {
  return async dispatch => {
    if (!checkData(toupdatedata)) {
      return;
    }
    const {user} = store.getState();
    let prevpostsetting = store.getState().postsetting;
    dispatch(updatePostSetting(toupdatedata));
    dispatch(setProcessing(true, 'postsettingprocess'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'updatepostsetting',
        toupdatedata,
        options,
      );
      const {errmsg, status, message, postsetting} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          dispatch(updatePostSetting(postsetting));
          dispatch(setProcessing(false, 'postsettingprocess'));
          Toast(message, ToastAndroid.LONG);
          break;
        case 401:
          dispatch(setProcessing(false, 'postsettingprocess'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(updatePostSetting(prevpostsetting));
          dispatch(setProcessing(false, 'postsettingprocess'));
          (errmsg && Toast(errmsg, ToastAndroid.LONG)) ||
            Toast('something went wrong please try again', ToastAndroid.LONG);
          break;
      }
    } catch (e) {
      // console.warn(e.toString());
      dispatch(updatePostSetting(prevpostsetting));
      dispatch(setProcessing(false, 'postsettingprocess'));
      if (e.toString().indexOf('Network Error') != -1) {
        Toast('Network Error!', ToastAndroid.LONG);
      } else {
        Toast(`something went wrong please try again`, ToastAndroid.LONG);
      }
    }
  };
};

export const getPostSetting = () => {
  return async dispatch => {
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('getpostsetting', null, options);
      const {errmsg, status, message, postsetting} = response.data;
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
          dispatch(
            updatePostSetting({
              timeline_post_range: 'all',
            }),
          );
          break;
        default:
          errmsg && Toast(errmsg, ToastAndroid.LONG);
          break;
      }
    } catch (e) {
      //console.warn(e.toString());
      if (e.toString().indexOf('Network Error') != -1) {
        Toast('Network Error!', ToastAndroid.LONG);
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
    payload: data,
  };
};

export const setPostCommentFormOwnerPost = (data: Object) => {
  return {
    type: SET_POST_COMMENT_FORM_OWNER_POST,
    payload: data,
  };
};

export const updatePostCommentFormOwnerPost = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_FORM_OWNER_POST,
    payload: data,
  };
};

export const updatePostCommentForm = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_FORM,
    payload: data,
  };
};

export const updatePostCommentArrayForm = (data: Array, type: String) => {
  return {
    type: UPDATE_POST_COMMENT_FORM,
    payload: {data, type},
  };
};

export const setPostCommentFormLink = (data: String) => {
  return {
    type: SET_POST_COMMENT_FORM_LINK,
    payload: data,
  };
};

export const setPostCommentForm = (data: Array) => {
  return {
    type: SET_POST_COMMENT_FORM,
    payload: data,
  };
};

export const setPostCommentFormRefresh = (data: Boolean) => {
  return {
    type: POST_COMMENT_FORM_REFRESH,
    payload: data,
  };
};

export const prependPostCommentForm = (data: Array) => {
  return {
    type: PREPEND_POST_COMMENT_FORM,
    payload: data,
  };
};

export const removePostCommentForm = (commentid: String) => {
  return {
    type: REMOVE_POST_COMMENT_FORM,
    payload: commentid,
  };
};

export const updatePostCommentFormProfileChanges = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_FORM_PROFILE_CHANGES,
    payload: data,
  };
};

//to fetch post comment
export const fetchPostComment = postid => {
  return async dispatch => {
    if (checkData(postid) != true) {
      Toast('Could not fetch comments please try again', ToastAndroid.LONG);
      dispatch(setProcessing('retry', 'postcommentformfetching'));
      return;
    }
    dispatch(setProcessing(true, 'postcommentformfetching'));
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentlist',
        {
          postid,
        },
        options,
      );
      const {
        errmsg,
        message,
        ownerpost,
        hiddens,
        status,
        comments,
        nextpageurl,
      } = response.data;
      switch (status) {
        case 302:
          dispatch(setProcessing(false, 'postcommentformfetching'));
          dispatch(setPostCommentForm(comments));
          dispatch(setPostCommentFormLink(nextpageurl));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
          dispatch(updateTimelinePost(ownerpost));
          dispatch(updateTimelinePostForm(ownerpost));
          hiddens == true &&
            Toast(
              'some comments are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
  return async dispatch => {
    if (
      checkData(postid) != true ||
      checkData(commentid) != true ||
      checkData(comment_text) != true
    ) {
      //console.warn('yo');
      return;
    }
    const {user} = store.getState();
    let onretryschema = {
      commentid,
      created_at: new Date().getTime(),
      sendingmsg: 'Tap to retry',
      onRetry: () =>
        dispatch(retryPostComment(postid, commentid, comment_text)),
    };
    dispatch(
      updatePostCommentForm({
        onRetry: () => {},
        commentid: commentid,
        created_at: new Date().getTime(),
        sendingmsg: 'posting...',
      }),
    );

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcomment',
        {
          postid,
          comment_text,
        },
        options,
      );
      const {errmsg, ownerpost, message, status, comment} = response.data;
      switch (status) {
        case 201:
          dispatch(removePostCommentForm(commentid));
          dispatch(prependPostCommentForm([comment]));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
          dispatch(updateTimelinePost(ownerpost));
          dispatch(updateTimelinePostForm(ownerpost));
          //alert(JSON.stringify(comment));
          break;
        case 400:
          dispatch(updatePostCommentForm(onretryschema));
          break;
        case 404:
          dispatch(removePostCommentForm(commentid));
          break;
        case 412:
          dispatch(removePostCommentForm(commentid));
          Toast(errmsg, ToastAndroid.LONG);
          break;
        case 401:
          dispatch(removePostCommentForm(commentid));
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
      console.warn(err.toString());
      dispatch(updatePostCommentForm(onretryschema));
    }
  };
};

//to make a post comment starts here
export const makePostComment = (postid, comment_text) => {
  return async dispatch => {
    if (checkData(postid) != true || checkData(comment_text) != true) {
      return;
    }
    const {user, profile} = store.getState();
    let tempid = String(Math.floor(Math.random() * 1000000));
    let onretryschema = {
      commentid: tempid,
      created_at: new Date().getTime(),
      sendingmsg: 'Tap to retry',
      onRetry: () => dispatch(retryPostComment(postid, tempid, comment_text)),
    };

    dispatch(
      prependPostCommentForm([
        {
          postid,
          comment_text,
          onRetry: () => {},
          commentid: tempid,
          created_at: new Date().getTime(),
          sendingmsg: 'posting...',
          profile: {
            ...profile,
            user: {...user},
          },
        },
      ]),
    );

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcomment',
        {
          postid,
          comment_text,
        },
        options,
      );
      const {errmsg, ownerpost, message, status, comment} = response.data;
      switch (status) {
        case 201:
          dispatch(removePostCommentForm(tempid));
          dispatch(prependPostCommentForm([comment]));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
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
  };
};

export const likePostComment = (commentid, likestatus, numlikes) => {
  return async dispatch => {
    if (
      checkData(commentid) != true ||
      checkData(likestatus) != true ||
      checkData(numlikes) != true
    ) {
      return;
    }
    dispatch(
      updatePostCommentForm({
        commentid: commentid,
        commentliked: likestatus,
        num_likes: numlikes,
      }),
    );
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentlikeaction',
        {
          commentid: commentid,
        },
        options,
      );
      const {errmsg, status, message, comment} = response.data;
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
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          logOut(() => persistor.purge());
          break;
        case 412:
          Toast(errmsg, ToastAndroid.LONG);
          dispatch(
            updatePostCommentForm({
              commentid: commentid,
              commentliked: likestatus ? false : true,
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          break;
        default:
          Toast(errmsg, ToastAndroid.LONG);
          dispatch(
            updatePostCommentForm({
              commentid: commentid,
              commentliked: likestatus ? false : true,
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          break;
      }
    } catch (err) {}
  };
};

export const refreshPostComment = postid => {
  return async dispatch => {
    dispatch(setPostCommentFormRefresh(true));
    if (checkData(postid) != true) {
      dispatch(setPostCommentFormRefresh(false));
      Toast('Failed to refresh', ToastAndroid.LONG);
      return;
    }
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentlist',
        {
          postid,
        },
        options,
      );
      const {
        errmsg,
        message,
        ownerpost,
        hiddens,
        status,
        comments,
        nextpageurl,
      } = response.data;

      switch (status) {
        case 302:
          dispatch(setPostCommentFormRefresh(false));
          dispatch(setPostCommentForm(comments));
          dispatch(setPostCommentFormLink(nextpageurl));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
          dispatch(updateTimelinePost(ownerpost));
          dispatch(updateTimelinePostForm(ownerpost));
          hiddens == true &&
            Toast(
              'some comments are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
      //console.warn(err.toString());
      dispatch(setPostCommentFormRefresh(false));
      Toast('failed to refresh', ToastAndroid.LONG);
    }
  };
};

export const loadMorePostComment = postid => {
  return async dispatch => {
    const {user, postcommentform} = store.getState();
    if (
      checkData(postcommentform.nexturl) != true ||
      checkData(postid) != true
    ) {
      dispatch(setProcessing('none', 'postcommentformloadmore'));
      return;
    }
    dispatch(setProcessing(true, 'postcommentformloadmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        postcommentform.nexturl,
        {postid},
        options,
      );
      const {
        errmsg,
        message,
        ownerpost,
        hiddens,
        status,
        comments,
        nextpageurl,
      } = response.data;
      switch (status) {
        case 302:
          dispatch(setProcessing(false, 'postcommentformloadmore'));
          dispatch(addPostCommentForm(comments));
          dispatch(setPostCommentFormLink(nextpageurl));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
          dispatch(updateTimelinePost(ownerpost));
          dispatch(updateTimelinePostForm(ownerpost));
          hiddens == true &&
            Toast(
              'some comments are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
  };
};

export const deletePostComment = (postcommentid, ownerid) => {
  return async dispatch => {
    const {user, profile} = store.getState();
    if (
      checkData(postcommentid) != true ||
      checkData(ownerid) != true ||
      ownerid != profile.profile_id
    ) {
      Toast('Could not delete comment', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'postcommentformdeleting'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentdelete',
        {postcommentid},
        options,
      );
      const {errmsg, status, message, ownerpost} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'postcommentformdeleting'));
          dispatch(updatePostCommentFormOwnerPost(ownerpost));
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
  };
};

export const hidePostCommentAction = (commentid, ownerid) => {
  return async dispatch => {
    const {user, profile} = store.getState();
    if (
      checkData(commentid) != true ||
      checkData(ownerid) != true ||
      ownerid != profile.profile_id
    ) {
      Toast('Could not hide comment', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'postcommentformhiding'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommenthide',
        {commentid},
        options,
      );
      const {errmsg, status, hidden, message} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'postcommentformhiding'));
          dispatch(
            updatePostCommentForm({
              commentid,
              hidden: hidden,
            }),
          );
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
      Toast(
        'something went wrong could not hide comment please try again',
        ToastAndroid.LONG,
      );
    }
  };
};

/**
 * ACTION CREATORS FOR POSTCOMMENTREPLYFORM REDUCER
 */
export const addPostCommentReplyForm = (data: Array) => {
  return {
    type: ADD_POST_COMMENT_REPLY_FORM,
    payload: data,
  };
};

export const setPostCommentReplyFormOwnerComment = (data: Object) => {
  return {
    type: SET_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
    payload: data,
  };
};

export const updatePostCommentReplyFormOwnerComment = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
    payload: data,
  };
};

export const setPostCommentReplyForm = (data: Array) => {
  return {
    type: SET_POST_COMMENT_REPLY_FORM,
    payload: data,
  };
};

export const updatePostCommentReplyForm = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_REPLY_FORM,
    payload: data,
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
    payload: data,
  };
};

export const prependPostCommentReplyForm = (data: Array) => {
  return {
    type: PREPEND_POST_COMMENT_REPLY_FORM,
    payload: data,
  };
};

export const removePostCommentReplyForm = (commentid: String) => {
  return {
    type: REMOVE_POST_COMMENT_REPLY_FORM,
    payload: commentid,
  };
};

export const updatePostCommentReplyFormProfileChanges = (data: Object) => {
  return {
    type: UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES,
    payload: data,
  };
};

//to fetch postcommentreplies
export const fetchPostCommentReply = originid => {
  return async dispatch => {
    if (checkData(originid) != true) {
      Toast('Could not fetch replies please try again', ToastAndroid.LONG);
      dispatch(setProcessing('retry', 'postcommentreplyformfetching'));
      return;
    }
    dispatch(setProcessing(true, 'postcommentreplyformfetching'));
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreplylist',
        {
          originid,
        },
        options,
      );
      const {
        errmsg,
        message,
        origin,
        hiddens,
        status,
        replies,
        nextpageurl,
      } = response.data;
      switch (status) {
        case 302:
          dispatch(setProcessing(false, 'postcommentreplyformfetching'));
          dispatch(setPostCommentReplyForm(replies));
          dispatch(setPostCommentReplyFormLink(nextpageurl));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
          hiddens == true &&
            Toast(
              'some replies are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
          ToastAndroid.LONG,
        );
      } else {
        Toast(`could not fetch replies please try again`, ToastAndroid.LONG);
      }
    }
  };
};

export const loadMorePostCommentReply = originid => {
  return async dispatch => {
    const {user, postcommentreplyform} = store.getState();
    if (
      checkData(postcommentreplyform.nexturl) != true ||
      checkData(originid) != true
    ) {
      dispatch(setProcessing('none', 'postcommentreplyformloadmore'));
      return;
    }
    dispatch(setProcessing(true, 'postcommentreplyformloadmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        postcommentreplyform.nexturl,
        {originid},
        options,
      );
      const {
        errmsg,
        message,
        origin,
        hiddens,
        status,
        replies,
        nextpageurl,
      } = response.data;
      switch (status) {
        case 302:
          dispatch(setProcessing(false, 'postcommentreplyformloadmore'));
          dispatch(addPostCommentReplyForm(replies));
          dispatch(setPostCommentReplyFormLink(nextpageurl));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
          hiddens == true &&
            Toast(
              'some replies are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
  };
};

export const likePostCommentReply = (replyid, likestatus, numlikes) => {
  return async dispatch => {
    if (
      checkData(replyid) != true ||
      checkData(likestatus) != true ||
      checkData(numlikes) != true
    ) {
      return;
    }
    dispatch(
      updatePostCommentReplyForm({
        replyid,
        replyliked: likestatus,
        num_likes: numlikes,
      }),
    );
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreplylikeaction',
        {
          replyid,
        },
        options,
      );
      const {errmsg, status, message, reply} = response.data;
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
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          logOut(() => persistor.purge());
          break;
        case 412:
          Toast(errmsg, ToastAndroid.LONG);
          dispatch(
            updatePostCommentReplyForm({
              replyid,
              replyliked: likestatus ? false : true,
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          break;
        default:
          Toast(errmsg, ToastAndroid.LONG);
          dispatch(
            updatePostCommentReplyForm({
              replyid,
              replyliked: likestatus ? false : true,
              num_likes: likestatus ? numlikes - 1 : numlikes + 1,
            }),
          );
          break;
      }
    } catch (err) {}
  };
};

export const refreshPostCommentReply = originid => {
  return async dispatch => {
    dispatch(setPostCommentReplyFormRefresh(true));
    if (checkData(originid) != true) {
      dispatch(setPostCommentReplyFormRefresh(false));
      Toast('Failed to refresh', ToastAndroid.LONG);
      return;
    }
    const {user} = store.getState();
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreplylist',
        {
          originid,
        },
        options,
      );
      const {
        errmsg,
        message,
        origin,
        hiddens,
        status,
        replies,
        nextpageurl,
      } = response.data;
      switch (status) {
        case 302:
          dispatch(setPostCommentReplyFormRefresh(false));
          dispatch(setPostCommentReplyForm(replies));
          dispatch(setPostCommentReplyFormLink(nextpageurl));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
          hiddens == true &&
            Toast(
              'some replies are hidden by author',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
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
          ToastAndroid.LONG,
        );
      } else {
        Toast(`failed to refresh`, ToastAndroid.LONG);
      }
    }
  };
};

//to make a postcommentreply starts here
export const makePostCommentReply = (originid, reply_text) => {
  return async dispatch => {
    if (checkData(originid) != true || checkData(reply_text) != true) {
      return;
    }
    const {user, profile} = store.getState();
    let tempid = String(Math.floor(Math.random() * 1000000));
    let onretryschema = {
      replyid: tempid,
      created_at: new Date().getTime(),
      sendingmsg: 'Tap to retry',
      onRetry: () => dispatch(retryPostComment(originid, tempid, reply_text)),
    };

    dispatch(
      prependPostCommentReplyForm([
        {
          originid,
          reply_text,
          onRetry: () => {},
          replyid: tempid,
          sendingmsg: 'posting...',
          created_at: new Date().getTime(),
          profile: {
            ...profile,
            user: {...user},
          },
        },
      ]),
    );

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreply',
        {
          originid,
          reply_text,
        },
        options,
      );
      const {errmsg, origin, message, status, reply} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 201:
          dispatch(removePostCommentReplyForm(tempid));
          dispatch(prependPostCommentReplyForm([reply]));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
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
          ToastAndroid.LONG,
        );
      } else {
        Toast(`could not post reply please try again`, ToastAndroid.LONG);
      }
    }
  };
};

//to retry posting a comment if it fails
export const retryPostCommentReply = (originid, replyid, reply_text) => {
  return async dispatch => {
    if (
      checkData(originid) != true ||
      checkData(replyid) != true ||
      checkData(reply_text) != true
    ) {
      //console.warn('yo');
      return;
    }
    const {user} = store.getState();
    let onretryschema = {
      replyid,
      created_at: 'Tap to retry',
      onRetry: () => dispatch(retryPostComment(originid, replyid, reply_text)),
    };
    dispatch(
      updatePostCommentReplyForm({
        onRetry: () => {},
        replyid,
        created_at: 'posting...',
      }),
    );

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcomment',
        {
          postid,
          comment_text,
        },
        options,
      );
      const {errmsg, origin, message, status, reply} = response.data;
      switch (status) {
        case 201:
          dispatch(removePostCommentReplyForm(replyid));
          dispatch(prependPostCommentReplyForm([reply]));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
          //alert(JSON.stringify(comment));
          break;
        case 400:
          dispatch(updatePostCommentReplyForm(onretryschema));
          break;
        case 404:
          dispatch(removePostCommentReplyForm(replyid));
          break;
        case 412:
          dispatch(removePostCommentReplyForm(replyid));
          Toast(errmsg, ToastAndroid.LONG);
          break;
        case 401:
          dispatch(removePostCommentReplyForm(replyid));
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
      console.warn(err.toString());
      dispatch(updatePostCommentReplyForm(onretryschema));
    }
  };
};

export const deletePostCommentReply = (replyid, ownerid) => {
  return async dispatch => {
    const {user, profile} = store.getState();
    if (
      checkData(replyid) != true ||
      checkData(ownerid) != true ||
      ownerid != profile.profile_id
    ) {
      Toast('Could not delete reply', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'postcommentreplyformdeleting'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreplydelete',
        {replyid},
        options,
      );
      const {errmsg, status, message, origin} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'postcommentreplyformdeleting'));
          dispatch(removePostCommentReplyForm(replyid));
          checkData(origin.replyid)
            ? dispatch(updatePostCommentReplyForm(origin))
            : dispatch(updatePostCommentForm(origin));
          dispatch(updatePostCommentReplyFormOwnerComment(origin));
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
          ToastAndroid.LONG,
        );
      } else {
        Toast(`could not delete replies please try again`, ToastAndroid.LONG);
      }
    }
  };
};

export const hidePostCommentReply = (replyid, ownerid) => {
  return async dispatch => {
    const {user, profile} = store.getState();
    if (
      checkData(replyid) != true ||
      checkData(ownerid) != true ||
      ownerid != profile.profile_id
    ) {
      Toast('Could not hide reply', ToastAndroid.LONG);
      return;
    }
    dispatch(setProcessing(true, 'postcommentreplyformhiding'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'postcommentreplyhide',
        {replyid},
        options,
      );
      const {errmsg, status, hidden, message} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'postcommentreplyformhiding'));
          dispatch(
            updatePostCommentReplyForm({
              replyid,
              hidden: hidden,
            }),
          );
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
          ToastAndroid.LONG,
        );
      } else {
        Toast(
          'something went wrong could not hide reply please try again',
          ToastAndroid.LONG,
        );
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
    payload: data,
  };
};

export const setUserViewProfileFormPost = (data: Array) => {
  return {
    type: SET_USER_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const prependUserViewProfileFormPost = (data: Array) => {
  return {
    type: PREPEND_USER_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const updateUserViewProfileFormPostArray = (
  data: Array,
  type: String,
) => {
  return {
    type: UPDATE_USER_VIEWPROFILEFORM_POSTS_ARRAY,
    payload: {data, type},
  };
};

export const updateUserViewProfileFormPost = (data: Object) => {
  return {
    type: UPDATE_USER_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const setUserViewProfileForm = (data: Object) => {
  return {
    type: SET_USER_VIEWPROFILEFORM,
    payload: data,
  };
};

export const setUserViewProfileFormLink = data => {
  return {
    type: SET_USER_VIEWPROFILEFORM_LINK,
    payload: data,
  };
};

/**
 * ACTION CREATOR FOR OTHERSVIEWPROFILE REDUCER
 *
 */
export const addOthersViewProfileFormPost = (data: Array) => {
  return {
    type: ADD_OTHERS_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const setOthersViewProfileFormPost = (data: Array) => {
  return {
    type: SET_OTHERS_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const prependOthersViewProfileFormPost = (data: Array) => {
  return {
    type: PREPEND_OTHERS_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const updateOthersViewProfileFormPost = (data: Object) => {
  return {
    type: UPDATE_OTHERS_VIEWPROFILEFORM_POSTS,
    payload: data,
  };
};

export const updateOthersViewProfileFormPostArray = (
  data: Array,
  type: String,
) => {
  return {
    type: UPDATE_OTHERS_VIEWPROFILEFORM_POSTS_ARRAY,
    payload: {data, type},
  };
};

export const setOthersViewProfileForm = (data: Object) => {
  return {
    type: SET_OTHERS_VIEWPROFILEFORM,
    payload: data,
  };
};

export const setOthersViewProfileFormLink = data => {
  return {
    type: SET_OTHERS_VIEWPROFILEFORM_LINK,
    payload: data,
  };
};

/**
 * ACTION CREATOR FOR PRIVATECHATLIST REDUCER
 *
 */
export const prependPrivateChatList = (data: Array) => {
  return {
    type: PREPEND_PRIVATECHATLIST,
    payload: data,
  };
};

export const addPrivateChatList = (data: Array) => {
  return {
    type: ADD_PRIVATECHATLIST,
    payload: data,
  };
};

export const updatePrivateChatList = (data: Object) => {
  return {
    type: UPDATE_PRIVATECHATLIST,
    payload: data,
  };
};

export const deletePrivateChatList = (data: String) => {
  return {
    type: DELETE_PRIVATECHATLIST,
    payload: data,
  };
};

export const addPrivateChatListReadArr = (data: Array) => {
  return {
    type: ADD_PRIVATECHATLIST_TOSETREADARR,
    payload: data,
  };
};

export const setPrivateChatListNextUrl = (data: String) => {
  return {
    type: SET_PRIVATE_CHATLIST_NEXTURL,
    payload: data,
  };
};

export const removePrivateChatListReadArr = (data: Array) => {
  return {
    type: REMOVE_PRIVATECHATLIST_TOSETREADARR,
    payload: data,
  };
};

export const updatePrivateChatListChats = (data: Object) => {
  return {
    type: UPDATE_PRIVATECHATLIST_CHATS,
    payload: data,
  };
};

export const removePrivateChatListChats = (data: Object) => {
  return {
    type: REMOVE_PRIVATECHATLIST_CHATS,
    payload: data,
  };
};

/*export const addPrivateChatListEachChatArr = (data: Array) => {
    return {
        type: ADD_PRIVATECHATLIST_EACH_CHAT_ARR,
        payload: data,
    };
};*/

export const fetchPrivateChatList = () => {
  return async dispatch => {
    const {user} = store.getState();
    dispatch(setProcessing(true, 'privatechatlistloading'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('privatechatlist', null, options);
      const {status, chatlist, errmsg} = response.data;
      //console.warn(response.data.chatlist);
      //console.warn(response.data.chatlist.length)
      switch (status) {
        case 200:
          chatlist.forEach(item => {
            dispatch(updatePrivateChatList(item));
          });
          //dispatch(addPrivateChatListEachChatArr(each_related_chat_arr));
          dispatch(setProcessing(false, 'privatechatlistloading'));
          break;
        case 404:
          dispatch(setProcessing(false, 'privatechatlistloading'));
          break;
        case 401:
          dispatch(setProcessing(false, 'privatechatlistloading'));
          logOut(() => persistor.purge());
          break;
        case 500:
          dispatch(
            addOfflineAction({
              id: 'fetchpchatlist8383',
              funcName: 'fetchPrivateChatList',
              param: null,
              override: true,
              //persist: true,
            }),
          );
          break;
        default:
          dispatch(setProcessing(false, 'privatechatlistloading'));
          Toast(
            'something went wrong chatlist could not be fetched',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (err) {
      console.warn('fetchPrivateChatList', err.toString());
      dispatch(setProcessing('retry', 'privatechatlistloading'));
      if (err.toString().indexOf('Network Error') != -1) {
        dispatch(
          addOfflineAction({
            id: 'fetchpchatlist8383',
            funcName: 'fetchPrivateChatList',
            param: null,
            override: true,
            //persist: true,
          }),
        );
      } else if (err.indexOf('500') != -1) {
        dispatch(
          addOfflineAction({
            id: 'fetchpchatlist8383',
            funcName: 'fetchPrivateChatList',
            param: null,
            override: true,
            //persist: true,
          }),
        );
      }
    }
  };
};

export const fetchPreviousChatList = () => {
  return async dispatch => {
    const {user, privatechatlistform} = store.getState();
    if (
      privatechatlistform.chatlist.length < 1 ||
      privatechatlistform.loadingmore == 'done'
    ) {
      return;
    }
    dispatch(setProcessing(true, 'privatechatlistloadingmore'));
    let chat_list = privatechatlistform.chatlist;
    let max_chat = chat_list[0];
    let min_chat = chat_list[chat_list.length - 1];
    let blacklist = chat_list.map(item => item.create_chatid);
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'privatechatlist',
        {
          limiter: [max_chat.id, min_chat.id],
          black_list: blacklist,
        },
        options,
      );
      const {status, chatlist, errmsg} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          chatlist.forEach(item => {
            dispatch(updatePrivateChatList(item));
          });
          dispatch(setProcessing(false, 'privatechatlistloadingmore'));
          break;
        case 404:
          dispatch(setProcessing('done', 'privatechatlistloadingmore'));
          break;
        case 401:
          dispatch(setProcessing(false, 'privatechatlistloadingmore'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing('failed', 'privatechatlistloadingmore'));
          Toast(
            'something went wrong chatlist could not be fetched',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (err) {
      console.warn('fetchPreviousChatList', err.toString());
      dispatch(setProcessing(false, 'privatechatlistloadingmore'));
      /*if (err.toString().indexOf('Network Error') != -1) {
                Toast(
                    'Nework error!',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }*/
    }
  };
};

export const pinPrivateChatList = id => {
  return async dispatch => {
    try {
      const {privatechatlistform} = store.getState();
      if (!checkData(id)) {
        Toast('chat not pinned, missing values');
        return;
      } else if (
        !privatechatlistform.chatlist.find(
          item =>
            item.create_chatid == id || item.partnerprofile.profile_id == id,
        )
      ) {
        Toast('chat to pin not found');
        return;
      } else if (privatechatlistform.pinnedchatarr.length >= 3) {
        Toast('A max of 3 chats can be pinned');
        return;
      } else if (privatechatlistform.pinnedchatarr.includes(id)) {
        Toast('chat already pinned');
        return;
      } else {
        dispatch({
          type: PIN_PRIVATECHATLIST,
          payload: id,
        });
      }
    } catch (err) {
      console.warn(err.toString());
    }
  };
};

export const unPinPrivateChatList = id => {
  return async dispatch => {
    try {
      const {privatechatlistform} = store.getState();
      if (!checkData(id)) {
        Toast('Failed to unpin, missing values');
        return;
      }
      dispatch({
        type: UNPIN_PRIVATECHATLIST,
        payload: id,
      });
    } catch (err) {
      Toast('Failed to unpin');
      console.warn(err.toString());
    }
  };
};

const arrangeToString = data => {
  if (!Array.isArray(data)) {
    return '';
  }
  return String(data.sort((item1, item2) => item1 - item2));
};

export const setChatListArrayRead = data => {
  return async dispatch => {
    const {user, privatechatlistform} = store.getState();
    let tosetreadarr = privatechatlistform.tosetreadarr || [];
    let onSuccess = null;
    let onFail = null;
    if (Array.isArray(data) && data.length > 0) {
      onSuccess = data[0];
      onFail = data[1];
    }
    if (!checkData(tosetreadarr) || tosetreadarr.length < 1) {
      return;
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'setprivatechatarrread',
        {
          chat_arr: tosetreadarr,
        },
        options,
      );
      const {status, message, set_to_read_arr, errmsg} = response.data;
      switch (status) {
        case 200:
          dispatch(removePrivateChatListReadArr(set_to_read_arr));
          //console.warn('PRIVATECHATLISTTREAD', 'worked');
          checkData(onSuccess) && onSuccess();
          break;
        case 401:
          checkData(onFail) && onFail();
          break;
        case 500:
          checkData(onFail) && onFail();
          dispatch(
            addOfflineAction({
              id: `setchatlistreadarr1344`,
              funcName: 'setChatListArrayRead',
              param: data,
              override: true,
              //persist: true,
            }),
          );
          break;
        default:
          checkData(onFail) && onFail();
          break;
      }
    } catch (err) {
      console.warn('setChatListArrayRead', err.toString());
      checkData(onFail) && onFail();
      if (err.toString().indexOf('Network Error') != -1) {
        dispatch(
          addOfflineAction({
            id: `setchatlistreadarr1344`,
            funcName: 'setChatListArrayRead',
            param: data,
            override: true,
            //persist: true,
          }),
        );
      } else if (err.indexOf('500') != -1) {
        dispatch(
          addOfflineAction({
            id: `setchatlistreadarr1344`,
            funcName: 'setChatListArrayRead',
            param: data,
            override: true,
            //persist: true,
          }),
        );
      }
    }
  };
};

export const delPrivateChatList = (id: String) => {
  return async dispatch => {
    const {user, privatechatlistform, profile} = store.getState();
    let chatobj = privatechatlistform.chatlist.find(
      item => item.create_chatid == id || item.partnerprofile.profile_id == id,
    );
    if (!checkData(id) || !checkData(chatobj)) {
      Toast('cannot delete chat incomplete request');
      return;
    }
    dispatch(setProcessing(true, 'privatechatlistdeleting'));
    chatobj = {...chatobj, chats: [...chatobj.chats]};
    let limiterchat = chatobj.chats
      .sort((item1, item2) => item2.created_at - item1.created_at)
      .find(item => item.deleted != true && checkData(item.private_chatid));

    if (!checkData(limiterchat)) {
      dispatch(deletePrivateChatList(id));
      dispatch({
        type: UNPIN_PRIVATECHATLIST,
        payload: id,
      });
      dispatch(setProcessing(false, 'privatechatlistdeleting'));
      return;
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'deleteprivatechat',
        {
          create_chatid: id,
          limit_id: limiterchat.id,
        },
        options,
      );
      const {status, errmsg, message} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          dispatch(deletePrivateChatList(id));
          dispatch({
            type: UNPIN_PRIVATECHATLIST,
            payload: id,
          });
          dispatch(setProcessing(false, 'privatechatlistdeleting'));
          break;
        case 500:
          Toast(errmsg, null, ToastAndroid.CENTER);
          dispatch(setProcessing(false, 'privatechatlistdeleting'));
          break;
        case 400:
          Toast(errmsg, null, ToastAndroid.CENTER);
          dispatch(setProcessing(false, 'privatechatlistdeleting'));
          break;
        default:
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
          dispatch(setProcessing(false, 'privatechatlistdeleting'));
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      dispatch(setProcessing(false, 'privatechatlistdeleting'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast(
          'chat not deleted please check your network',
          null,
          ToastAndroid.CENTER,
        );
      } else {
        Toast(
          'chat not deleted something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

/**
 * ACTION CREATOR FOR SEARCHPRIVATECHATLIST REDUCER
 *
 */

export const updateSearchPrivateChatList = (data = {}) => {
  return {
    type: UPDATE_SEARCH_PRIVATE_CHATLIST,
    payload: data,
  };
};

export const setSearchPrivateChatListSearchWord = (data = '') => {
  return {
    type: SET_SEARCH_PRIVATE_CHATLIST_SEARCHWORD,
    payload: data,
  };
};

export const setSearchPrivateChatListNextUrl = (data: String) => {
  return {
    type: SET_SEARCH_PRIVATE_CHATLIST_NEXTURL,
    payload: data,
  };
};

export const searchPrivateChatList = (name: String) => {
  return async dispatch => {
    if (!checkData(name)) {
      //console.warn(name);
      return;
    }
    dispatch(setProcessing(true, 'searchprivatechatlistfetching'));
    const {user, privatechatlistform, network, profile} = store.getState();
    let chatlistform = {...privatechatlistform};
    let profiles = [];
    if (network.isConnected != true) {
      //console.warn('newtoek', network.isConnected);
      if (name[0] == '@') {
        name = name.substring(1);
        profiles = chatlistform.chatlist.filter(chatitem =>
          chatitem.partnerprofile.user.username.includes(name),
        );
      } else {
        profiles = chatlistform.chatlist.filter(chatitem =>
          chatitem.partnerprofile.profile_name.includes(name),
        );
      }
      if (!checkData(profiles) || profiles.length > 1) {
        dispatch(setProcessing('none c', 'searchprivatechatlistfetching'));
        return;
      }
      profiles.forEach(searchitem => {
        //console.warn(searchitem.partnerprofile);
        dispatch(
          updateSearchPrivateChatList({profile: searchitem.partnerprofile}),
        );
      });
      dispatch(setProcessing(false, 'searchprivatechatlistfetching'));
      return;
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'searchprivatechatlist',
        {name},
        options,
      );
      const {status, lists, next_url, message} = response.data;
      switch (status) {
        case 200:
          lists.forEach(searchitem => {
            dispatch(updateSearchPrivateChatList(searchitem));
          });
          dispatch(setSearchPrivateChatListSearchWord(name));
          dispatch(setSearchPrivateChatListNextUrl(next_url));
          dispatch(setProcessing(false, 'searchprivatechatlistfetching'));
          break;
        case 404:
          dispatch(setProcessing('none', 'searchprivatechatlistfetching'));
          break;
        case 401:
          break;
        default:
          dispatch(setProcessing('none', 'searchprivatechatlistfetching'));
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      dispatch(setProcessing('failed', 'searchprivatechatlistfetching'));
      /* if (err.toString().indexOf('Network Error') != -1) {
                 dispatch(setProcessing('none c', 'searchprivatechatlistfetching'));
             } else {
                 dispatch(setProcessing('failed', 'searchprivatechatlistfetching'));
             }*/
    }
  };
};

export const searchMorePrivateChatList = () => {
  return async dispatch => {
    const {user, searchprivatechatlist, profile} = store.getState();
    if (
      !checkData(searchprivatechatlist.next_url) ||
      !checkData(searchprivatechatlist.searchword)
    ) {
      return;
    }
    dispatch(setProcessing(true, 'searchprivatechatlistloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        nexturl,
        {
          name: searchprivatechatlist.searchword,
        },
        options,
      );
      const {status, lists, next_url, errmsg, message} = response.data;
      switch (status) {
        case 200:
          lists.forEach(searchitem => {
            dispatch(updateSearchPrivateChatList(searchitem));
          });
          dispatch(setSearchPrivateChatListSearchWord(name));
          dispatch(setSearchPrivateChatListNextUrl(next_url));
          dispatch(setProcessing(false, 'searchprivatechatlistfetching'));
          break;
        case 404:
          Toast(errmsg);
          dispatch(setProcessing(false, 'searchprivatechatlistloadingmore'));
          break;
        case 401:
          break;
        default:
          Toast('Something went wrong,please try again');
          dispatch(setProcessing(false, 'searchprivatechatlistloadingmore'));
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'searchprivatechatlistloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('Network error');
      } else {
        Toast('Something went wrong, please try again');
      }
    }
  };
};

/**
 * ACTION CREATOR FOR PRIVATECHAT REDUCER
 *
 */
export const addPrivateChat = (data: Array, create_chatid: String) => {
  return {
    type: ADD_PRIVATECHAT,
    payload: data,
    create_chatid,
  };
};

export const removePrivateChat = (data: Object, create_chatid: String) => {
  return {
    type: REMOVE_PRIVATECHAT,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatForm = (data: Object) => {
  return {
    type: SET_PRIVATECHATFORM,
    payload: data,
    // create_chatid
  };
};

export const setPrivateChat = (data: Array, create_chatid: String) => {
  return {
    type: SET_PRIVATECHAT,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatFetchArr = (data: Array, create_chatid: String) => {
  return {
    type: SET_PRIVATECHAT_LAST_FETCH_ARR,
    payload: data,
    create_chatid,
  };
};

export const addPrivateChatFetchArr = (data: Array, create_chatid: String) => {
  return {
    type: ADD_PRIVATECHAT_LAST_FETCH_ARR,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatCreateChatid = (
  data: String,
  create_chatid: String,
) => {
  return {
    type: SET_PRIVATE_CHAT_CREATE_CHATID,
    payload: data,
    create_chatid,
  };
};

export const removePrivateChatFetchArr = (
  data: Array,
  create_chatid: String,
) => {
  return {
    type: REMOVE_PRIVATECHAT_LAST_FETCH_ARR,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatInfo = (data: Object, create_chatid: String) => {
  return {
    type: SET_PRIVATECHAT_INFO,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatPartnerProfile = (
  data: Object,
  create_chatid: String,
) => {
  return {
    type: SET_PRIVATECHAT_PARTNER_PROFILE,
    payload: data,
    create_chatid,
  };
};

export const setPrivateChatLastFetchToRead = (data: Array) => {
  return async dispatch => {
    const {user} = store.getState();
    let onSuccess = null;
    let onFail = null;
    let last_fetch_arr = null;
    let create_chatid = null;
    if (Array.isArray(data) && data.length > 0) {
      onSuccess = data[2];
      onFail = data[3];
      create_chatid = data[0];
      last_fetch_arr = data[1];
    }
    if (
      !Array.isArray(last_fetch_arr) ||
      last_fetch_arr.length < 1 ||
      !checkData(create_chatid)
    ) {
      return;
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'setprivatechatarrread',
        {
          chat_arr: last_fetch_arr,
        },
        options,
      );
      const {status, message, set_to_read_arr, errmsg} = response.data;
      //console.warn(response.data);
      switch (status) {
        case 200:
          dispatch(removePrivateChatListReadArr(set_to_read_arr));
          //console.warn('rests & agg', set_to_read_arr);

          dispatch(removePrivateChatFetchArr(set_to_read_arr, create_chatid));
          checkData(onSuccess) && onSuccess();
          break;
        case 400:
          checkData(onFail) && onFail();
          break;
        case 500:
          checkData(onFail) && onFail();
          dispatch(
            addOfflineAction({
              id: `setprivatechatarrread${create_chatid}`,
              funcName: 'setPrivateChatLastFetchToRead',
              param: data,
              override: true,
            }),
          );
          break;
        case 401:
          break;
        default:
          checkData(onFail) && onFail();
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      checkData(onFail) && onFail();
      let errmsg = err.message;
      if (errmsg.indexOf('Network Error') != -1) {
        dispatch(
          addOfflineAction({
            id: `setprivatechatarrread${create_chatid}`,
            funcName: 'setPrivateChatLastFetchToRead',
            param: data,
            override: true,
          }),
        );
      } else if (errmsg.indexOf('500') != -1) {
        dispatch(
          addOfflineAction({
            id: `setprivatechatarrread${create_chatid}`,
            funcName: 'setPrivateChatLastFetchToRead',
            param: data,
            override: true,
          }),
        );
      }
    }
  };
};

export const fetchPrivateChats = data => {
  return async dispatch => {
    let {user} = store.getState(); //showprivatechatandupdateread
    let createchatid = data[0];
    let partner_id = data[2];
    if (!checkData(data[0]) && data[3] != true) {
      return;
    }
    //console.warn(createchatid || partner_id);
    dispatch(
      deleteOfflineAction({
        id: `fetchprivatechat${createchatid || partner_id}`,
      }),
    );
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'showprivatechatandupdateread',
        {
          create_chatid: data[0],
          partner_id: data[2],
          findpartnerchat: data[3],
        },
        options,
      );
      const {
        status,
        message,
        errmsg,
        partnerprofile,
        create_chatid,
        private_chats,
        last_fetch_arr,
      } = response.data;
      if (status != 200 && checkData(create_chatid)) {
        dispatch(
          setPrivateChatCreateChatid(create_chatid, createchatid || partner_id),
        );
      }
      switch (status) {
        case 200:
          //console.warn('fetcgprivatechat', private_chats);
          dispatch(
            setPrivateChatPartnerProfile(
              partnerprofile,
              createchatid || partner_id,
            ),
          );
          dispatch(
            setProcessing(
              `200*${createchatid || partner_id}`,
              'privatechatformfetchstatus',
            ),
          );
          checkData(data[1]) && dispatch(removePrivateChatListReadArr(data[1]));
          dispatch(
            updatePrivateChatListChats({
              partnerprofile,
              create_chatid,
              chats: private_chats,
              last_fetch_arr,
            }),
          );
          dispatch(addPrivateChat(private_chats, createchatid || partner_id));
          dispatch(
            setPrivateChatFetchArr(last_fetch_arr, createchatid || partner_id),
          );
          checkData(create_chatid) &&
            dispatch(
              setPrivateChatCreateChatid(
                create_chatid,
                createchatid || partner_id,
              ),
            );
          break;
        case 400:
          Toast('chats not updated');
          break;
        case 404:
          Toast(errmsg);
          break;
        case 401:
          break;
        case 500:
          dispatch(
            addOfflineAction({
              id: `fetchprivatechat${createchatid || partner_id}`,
              funcName: 'fetchPrivateChats',
              param: data,
              override: true,
            }),
          );
          break;
        default:
          Toast('chats not updated');
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      if (err.toString().indexOf('Network Error') != -1) {
        dispatch(
          addOfflineAction({
            id: `fetchprivatechat${createchatid || partner_id}`,
            funcName: 'fetchPrivateChats',
            param: data,
            override: true,
          }),
        );
      } else if (err.toString().indexOf('500') != -1) {
        dispatch(
          addOfflineAction({
            id: `fetchprivatechat${createchatid || partner_id}`,
            funcName: 'fetchPrivateChats',
            param: data,
            override: true,
          }),
        );
      }
    }
  };
  deleteFile;
};

const setChatPics = async (chatpics: Array) => {
  //return async (dispatch) => {
  if (!Array.isArray(chatpics) || chatpics.length < 1) {
    return [];
  }
  let {fs} = RNFetchBlob;
  return (chatpics = await Promise.all(
    chatpics.map(async (item, index) => {
      let {type, size, path, filename} = await getFileInfo(item.chatpic);
      let thumbchatpic = await resizeImage(item.chatpic, 50, 50);
      //console.warn(size);
      if (size >= 8000000) {
        item.chatpic = await resizeImage(item.chatpic, 1000, 1000);
      } else {
        let newpath = `${fs.dirs.MainBundleDir}/${Math.floor(
          Math.random() * 10000,
        )}.jpg`;
        let moved = await cpFile(item.chatpic, newpath);
        if (moved == true) {
          item.chatpic = newpath;
        }
      }
      return {chatpic: rnPath(item.chatpic), thumbchatpic};
    }),
  ));
  //}
};

const saveChatPics = async (from: String, to: String) => {
  let {fs} = RNFetchBlob;
  //console.warn('directory',fs.dirs);
  let chatimagedir = `/storage/emulated/0/CampusMeetup/ChatImages/`;
  try {
    let isdir = await fs.isDir(chatimagedir);
    if (!isdir) {
      await fs.mkdir(chatimagedir);
    }
    cpFile(from, to, true);
  } catch (err) {
    // console.warn('save pics', err.toString());
  }
};

export const sendPrivateChat = (data: Object) => {
  return async dispatch => {
    if (
      !checkData(data) ||
      !checkData(data.reqobj) ||
      !checkData(data.chatSchema)
    ) {
      Toast('chat not sent');
      return;
    }
    let {user} = store.getState();
    let receiver_id = data.chatSchema.receiver_id;
    try {
      dispatch(
        deleteOfflineAction({id: `sendprivatechat${data.chatSchema.id}`}),
      );
      dispatch(
        addPrivateChat([data.chatSchema], data.create_chatid || receiver_id),
      );
      dispatch(
        updatePrivateChatListChats({
          chats: [data.chatSchema],
          partnerprofile: data.chatSchema.partnerprofile,
          create_chatid: data.create_chatid,
        }),
      );
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      let formData = new FormData();
      if (checkData(data.reqobj.chat_msg)) {
        formData.append('chat_msg', data.reqobj.chat_msg);
      }
      formData.append('receiver_id', data.reqobj.receiver_id);
      if (
        Array.isArray(data.reqobj.chat_pics) &&
        data.reqobj.chat_pics.length > 0
      ) {
        //console.warn('e reach b=here')
        if (data.chatSchema.imagehandled != 'yes') {
          data.reqobj.chat_pics = await setChatPics(data.reqobj.chat_pics);
        }
        data.reqobj.chat_pics.forEach(imageObj => {
          formData.append('chat_pics[]', {
            uri: imageObj.chatpic,
            type: 'image/jpeg',
            name: imageObj.chatpic,
          });
          formData.append('thumb_chat_pics[]', {
            uri: imageObj.thumbchatpic,
            type: 'image/jpeg',
            name: imageObj.thumbchatpic,
          });
        });
        data.chatSchema.imagehandled = 'yes';
        data.chatSchema.chat_pics = data.reqobj.chat_pics;
      }
      const response = await session.post('sendprivatechat', formData, options);
      const {
        status,
        errmsg,
        create_chatid,
        message,
        partnerprofile,
        private_chat,
        warning_msg,
      } = response.data;
      switch (status) {
        case 200:
          if (
            Array.isArray(private_chat.chat_pics) &&
            private_chat.chat_pics.length > 0
          ) {
            let {fs} = RNFetchBlob;
            let dbimgname = private_chat.chat_pics[0].chatpic.split('/')[6];
            dbimgname = `/storage/emulated/0/CampusMeetup/ChatImages/${dbimgname}`;
            await saveChatPics(data.reqobj.chat_pics[0].chatpic, dbimgname);
          }
          // if (partnerprofile.profileblockedu != true) {
          dispatch(
            setPrivateChatPartnerProfile(
              partnerprofile,
              data.create_chatid || receiver_id,
            ),
          );
          //}
          dispatch(
            removePrivateChat(
              data.chatSchema,
              data.create_chatid || receiver_id,
            ),
          );
          dispatch(removePrivateChatListChats(data.chatSchema));
          dispatch(
            addPrivateChat([private_chat], data.create_chatid || receiver_id),
          );
          dispatch(
            updatePrivateChatListChats({
              partnerprofile,
              chats: [private_chat],
              create_chatid,
            }),
          );
          checkData(create_chatid) &&
            dispatch(
              setPrivateChatCreateChatid(
                create_chatid,
                data.create_chatid || receiver_id,
              ),
            );
          break;
        case 400:
          Toast(errmsg);
          dispatch(
            addPrivateChat(
              [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              data.create_chatid,
            ),
          );
          dispatch(
            updatePrivateChatListChats({
              chats: [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              partnerprofile: data.chatSchema.partnerprofile,
              create_chatid: data.create_chatid,
            }),
          );
          break;
        case 401:
          break;
        case 412:
          Toast(errmsg);
          break;
        case 500:
          dispatch(
            addPrivateChat(
              [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              data.create_chatid,
            ),
          );
          dispatch(
            updatePrivateChatListChats({
              chats: [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              partnerprofile: data.chatSchema.partnerprofile,
              create_chatid: data.create_chatid,
            }),
          );
          dispatch(
            addOfflineAction({
              id: `sendprivatechat${data.chatSchema.id}`,
              funcName: 'sendPrivateChat',
              param: data,
              persist: true,
              override: true,
            }),
          );
          break;
        default:
          dispatch(
            addPrivateChat(
              [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              data.create_chatid,
            ),
          );
          dispatch(
            updatePrivateChatListChats({
              chats: [
                {
                  ...data.chatSchema,
                  chat_pics: data.reqobj.chat_pics,
                  read: 'failed',
                },
              ],
              partnerprofile: data.chatSchema.partnerprofile,
              create_chatid: data.create_chatid,
            }),
          );
          break;
      }
    } catch (err) {
      console.warn('sendchat', err.toString());
      dispatch(
        addPrivateChat(
          [
            {
              ...data.chatSchema,
              chat_pics: data.reqobj.chat_pics,
              read: 'failed',
            },
          ],
          data.create_chatid,
        ),
      );
      dispatch(
        updatePrivateChatListChats({
          chats: [
            {
              ...data.chatSchema,
              chat_pics: data.reqobj.chat_pics,
              read: 'failed',
            },
          ],
          partnerprofile: data.chatSchema.partnerprofile,
          create_chatid: data.create_chatid,
        }),
      );
      if (err.toString().indexOf('Network Error') != -1) {
        // console.warn('hhh');
        dispatch(
          addOfflineAction({
            id: `sendprivatechat${data.chatSchema.id}`,
            funcName: 'sendPrivateChat',
            persist: true,
            param: data,
            override: true,
          }),
        );
      } else if (err.toString().indexOf('500') != -1) {
        dispatch(
          addOfflineAction({
            id: `sendprivatechat${data.chatSchema.id}`,
            funcName: 'sendPrivateChat',
            param: data,
            persist: true,
            override: true,
          }),
        );
      }
    }
  };
};

export const getPrivateChatInfo = (create_chatid: String) => {
  return async dispatch => {
    if (!checkData(create_chatid)) {
      return;
    }
    try {
      const {user} = store.getState();
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      dispatch(
        setProcessing(
          true + `*${create_chatid}`,
          'privatechatformfetchchatinfo',
        ),
      );
      //console.warn('moving');
      const response = await session.post(
        'getaprivatechatinfo',
        {create_chatid},
        options,
      );
      const {status, message, errmsg, private_chatinfo} = response.data;
      switch (status) {
        case 200:
          dispatch(setPrivateChatInfo(private_chatinfo, create_chatid));
          dispatch(
            setProcessing(
              false + `*${create_chatid}`,
              'privatechatformfetchchatinfo',
            ),
          );
          break;
        case 401:
          dispatch(
            setProcessing(
              false + `*${create_chatid}`,
              'privatechatformfetchchatinfo',
            ),
          );
          break;
        default:
          dispatch(
            setProcessing(
              `retry*${create_chatid}`,
              'privatechatformfetchchatinfo',
            ),
          );
          break;
      }
    } catch (err) {
      // console.warn(err.toString())
      dispatch(
        setProcessing(`retry*${create_chatid}`, 'privatechatformfetchchatinfo'),
      );
    }
  };
};

export const clearAPrivateChat = (initAction, okAction, failedAction) => {
  return async dispatch => {
    try {
      const {user, privatechatform} = store.getState();
      if (
        !checkData(privatechatform) ||
        !checkData(privatechatform.chats) ||
        !Array.isArray(privatechatform.chats) ||
        privatechatform.chats.length < 1
      ) {
        alert(`No chat to clear`);
        return;
      }
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      checkData(initAction) && initAction();
      let limiter_chat = [...privatechatform.chats]
        .sort((item1, item2) => item2.created_at - item1.created_at)
        .find(item => item.deleted != true && checkData(item.private_chatid));
      if (!checkData(limiter_chat)) {
        checkData(okAction) && okAction();
        return;
      }

      const response = await session.post(
        'deleteprivatechat',
        {
          create_chatid: privatechatform.create_chatid,
          limit_id: limiter_chat.id,
        },
        options,
      );
      const {status, errmsg, message} = response.data;
      switch (status) {
        case 200:
          checkData(okAction) && okAction();
          break;
        case 500:
          Toast(errmsg, null, ToastAndroid.CENTER);
          checkData(failedAction) && failedAction();
          break;
        case 400:
          Toast(errmsg, null, ToastAndroid.CENTER);
          checkData(failedAction) && failedAction();
          break;
        default:
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
          checkData(failedAction) && failedAction();
          break;
      }
    } catch (e) {
      console.warn(`${e.toString()}`);
      if (err.toString().indexOf('Network Error') != -1) {
        Toast(
          'chat not cleared please check your network',
          null,
          ToastAndroid.CENTER,
        );
      } else {
        Toast(
          'chat not cleared something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
      checkData(failedAction) && failedAction();
    }
  };
};

export const deleteAPrivateChat = (chatitem: Object) => {
  return async dispatch => {
    if (!checkData(chatitem)) {
      Toast('chat not deleted missing values to continue');
    }
    try {
      const {user, profile, privatechatform} = store.getState();
      let partner_id =
        chatitem.sender_id == profile.profile_id
          ? chatitem.receiver_id
          : chatitem.sender_id;
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      if (chatitem.read == 'failed' && !checkData(chatitem.private_chatid)) {
        //console.warn('failedgrowth', chatitem);
        dispatch(
          addPrivateChat(
            [{...chatitem, deleted: true}],
            chatitem.create_chatid || partner_id,
          ),
        );
        //dispatch(removePrivateChat(chatitem, chatitem.create_chatid));
        dispatch(
          removePrivateChatListChats({
            ...chatitem,
            partnerprofile: privatechatform.partnerprofile,
          }),
        );
        dispatch(deleteOfflineAction({id: `sendprivatechat${chatitem.id}`}));
        if (
          Array.isArray(chatitem.chat_pics) &&
          chatitem.chat_pics.length > 0
        ) {
          chatitem.chat_pics.forEach(item => {
            deleteFile(`${item.chatpic}`);
          });
        }
        return;
      }
      // console.warn('Inside function', chatitem);
      dispatch(
        setProcessing(
          true + `*${chatitem.create_chatid || partner_id}`,
          'privatechatformdeleting',
        ),
      );
      const response = await session.post(
        'deleteaprivatechat',
        {chatid: chatitem.private_chatid},
        options,
      );
      const {status, errmsg, message} = response.data;
      dispatch(
        setProcessing(
          false + `*${chatitem.create_chatid || partner_id}`,
          'privatechatformdeleting',
        ),
      );
      switch (status) {
        case 200:
          dispatch(
            addPrivateChat(
              [{...chatitem, deleted: true}],
              chatitem.create_chatid || partner_id,
            ),
          );
          dispatch(
            removePrivateChatListChats({
              ...chatitem,
              partnerprofile: privatechatform.partnerprofile,
            }),
          );
          dispatch(deleteOfflineAction({id: `sendprivatechat${chatitem.id}`}));
          if (
            Array.isArray(chatitem.chat_pics) &&
            chatitem.chat_pics.length > 0
          ) {
            chatitem.chat_pics.forEach(item => {
              let imageuri = item.chatpic.split('/');
              imageuri = imageuri[imageuri.length - 1];
              deleteFile(
                `/storage/emulated/0/CampusMeetup/ChatImages/${imageuri}`,
              );
            });
          }
          break;
        case 401:
          break;
        case 400:
          Toast('Chat not deleted please try again');
          break;
        case 500:
          Toast('Chat not deleted please try again');
          break;
        default:
          Toast('Chat not deleted please try again');
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      dispatch(
        setProcessing(
          false + `*${chatitem.create_chatid || partner_id}`,
          'privatechatformdeleting',
        ),
      );
      Toast('Chat not deleted please try again');
    }
  };
};

/**
 * ACTION CREATOR FOR FOLLOWINFO REDUCER
 *
 */
export const addFollowInfoList = (data: Array) => {
  return {
    type: ADD_FOLLOWINFO_LIST,
    payload: data,
  };
};

export const updateFollowInfoList = (data: Object) => {
  return {
    type: UPDATE_FOLLOWINFO_LIST,
    payload: data,
  };
};

export const addFollowInfoUrl = (data: String) => {
  return {
    type: ADD_FOLLOWINFO_URL,
    payload: data,
  };
};

export const fetchProfileFollowers = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user} = store.getState();
    dispatch(setProcessing(true, 'followinfoloading'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profilefollowerslist',
        {profile_id: profileid},
        options,
      );
      let {errmsg, profile, status, followers_list, next_url} = response.data;
      switch (status) {
        case 200:
          followers_list = followers_list.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(followers_list));
          dispatch(addFollowInfoUrl(next_url));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloading'));
          logOut(() => persistor.purge());
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloading'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchMoreProfileFollowers = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user, followinfo} = store.getState();
    if (!checkData(followinfo.nexturl)) {
      dispatch(setProcessing('done', 'followinfoloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'followinfoloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        followinfo.nexturl,
        {profile_id: profileid},
        options,
      );
      let {errmsg, profile, status, followers_list, next_url} = response.data;
      switch (status) {
        case 200:
          followers_list = followers_list.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(followers_list));
          dispatch(addFollowInfoUrl(next_url));
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          logOut(() => persistor.purge());
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchProfilesFollowing = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user} = store.getState();
    dispatch(setProcessing(true, 'followinfoloading'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profilesfollowinglist',
        {profile_id: profileid},
        options,
      );
      let {errmsg, profile, status, followings_list, next_url} = response.data;
      switch (status) {
        case 200:
          followings_list = followings_list.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(followings_list));
          dispatch(addFollowInfoUrl(next_url));
          dispatch(setProcessing(false, 'followinfoloading'));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloading'));
          logOut(() => persistor.purge());
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloading'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchMoreProfilesFollowing = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user, followinfo} = store.getState();
    if (!checkData(followinfo.nexturl)) {
      dispatch(setProcessing('done', 'followinfoloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'followinfoloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        followinfo.nexturl,
        {profile_id: profileid},
        options,
      );
      let {errmsg, profile, status, followings_list, next_url} = response.data;
      switch (status) {
        case 200:
          followings_list = followings_list.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(followings_list));
          dispatch(addFollowInfoUrl(next_url));
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          logOut(() => persistor.purge());
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloadingmore'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchKnownProfileFollowers = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user} = store.getState();
    dispatch(setProcessing(true, 'followinfoloading'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'uknowprofilesfollowerslist',
        {profileid},
        options,
      );
      let {
        errmsg,
        message,
        status,
        related_profiles,
        next_page_url,
      } = response.data;
      switch (status) {
        case 200:
          related_profiles = related_profiles.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(related_profiles));
          dispatch(addFollowInfoUrl(next_page_url));
          dispatch(setProcessing(false, 'followinfoloading'));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloading'));
          logOut(() => persistor.purge());
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloading'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchMoreKnownProfileFollowers = (
  profileid,
  initAction,
  okAction,
  failedAction,
) => {
  return async dispatch => {
    if (!checkData(profileid)) {
      Toast('Missing values to continue');
    }
    const {user, followinfo} = store.getState();
    if (!checkData(followinfo.nexturl)) {
      dispatch(setProcessing('done', 'followinfoloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'followinfoloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        followinfo.nexturl,
        {profileid},
        options,
      );
      let {
        errmsg,
        message,
        status,
        related_profiles,
        next_page_url,
      } = response.data;
      switch (status) {
        case 200:
          related_profiles = related_profiles.map(item => {
            return {profile: item};
          });
          dispatch(addFollowInfoList(related_profiles));
          dispatch(addFollowInfoUrl(next_page_url));
          dispatch(setProcessing(false, 'followinfoloading'));
          okAction && okAction();
          break;
        case 400:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 412:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        case 401:
          dispatch(setProcessing(false, 'followinfoloading'));
          logOut(() => persistor.purge());
          break;
        case 404:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast(errmsg);
          break;
        default:
          dispatch(setProcessing(false, 'followinfoloading'));
          Toast('something went wrong');
          break;
      }
    } catch (err) {
      //console.warn(err.toString());
      dispatch(setProcessing('retry', 'followinfoloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

/**
 * ACTION CREATOR FOR USERLIST REDUCER
 *
 */

// for profiles list
export const setProfilesList = (data: Array) => {
  return {
    type: SET_PROFILES_LIST,
    payload: data,
  };
};

export const addProfilesList = (data: Array) => {
  return {
    type: ADD_PROFILES_LIST,
    payload: data,
  };
};

export const updateProfilesList = (data: Object) => {
  return {
    type: UPDATE_PROFILES_LIST,
    payload: data,
  };
};

export const PrependProfilesList = (data: Array) => {
  return {
    type: PREPEND_PROFILES_LIST,
    payload: data,
  };
};

export const setProfilesListUrl = (data: Array) => {
  return {
    type: SET_PROFILES_LIST_NEXT_URL,
    payload: data,
  };
};

export const setProfilesListReset = () => {
  return {
    type: SET_PROFILES_LIST_RESET,
  };
};

//for searchlist
export const setSearchList = (data: Array) => {
  return {
    type: SET_SEARCH_LIST,
    payload: data,
  };
};

export const addSearchList = (data: Array) => {
  return {
    type: ADD_SEARCH_LIST,
    payload: data,
  };
};

export const updateSearchList = (data: Object) => {
  return {
    type: UPDATE_SEARCH_LIST,
    payload: data,
  };
};

export const PrependSearchList = (data: Array) => {
  return {
    type: PREPEND_SEARCH_LIST,
    payload: data,
  };
};

export const setSearchListUrl = (data: Array) => {
  return {
    type: SET_SEARCH_LIST_NEXT_URL,
    payload: data,
  };
};

export const setSearchListReset = () => {
  return {
    type: SET_SEARCH_LIST_RESET,
  };
};

export const fetchProfiles = () => {
  return async dispatch => {
    const {user, userslist} = store.getState();
    dispatch(setProcessing(true, 'profileslistfetching'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('profileslist', null, options);
      let {errmsg, status, results, message, offset_links} = response.data;
      switch (status) {
        case 200:
          results = results.map(item => {
            return {id: item.id, profile: item};
          });
          dispatch(setProfilesList(results));
          dispatch(setProfilesListUrl(offset_links));
          dispatch(setProcessing(false, 'profileslistfetching'));
          break;
        case 404:
          dispatch(setProcessing('retry', 'profileslistfetching'));
          break;
        case 401:
          dispatch(setProcessing(false, 'profileslistfetching'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing('retry', 'profileslistfetching'));
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (err) {
      dispatch(setProcessing('retry', 'profileslistfetching'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchMoreProfiles = () => {
  return async dispatch => {
    const {user, userslist} = store.getState();
    dispatch(setProcessing(true, 'profileslistloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'profileslist',
        {
          delimiter_arr: userslist.profileslistnexturl,
        },
        options,
      );
      let {errmsg, status, results, message, offset_links} = response.data;
      switch (status) {
        case 200:
          results = results.map(item => {
            return {id: item.id, profile: item};
          });
          dispatch(addProfilesList(results));
          dispatch(setProfilesListUrl(offset_links));
          dispatch(setProcessing(false, 'profileslistloadingmore'));
          break;
        case 404:
          dispatch(setProcessing(false, 'profileslistloadingmore'));
          break;
        case 401:
          dispatch(setProcessing(false, 'profileslistloadingmore'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing(false, 'profileslistloadingmore'));
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'profileslistloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const fetchSearchList = keyword => {
  return async dispatch => {
    if (!checkData(keyword)) {
      return;
    }
    const {user, userslist} = store.getState();
    dispatch(setSearchListReset());
    dispatch(setProcessing(true, 'searchlistfetching'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('profilesearch', {keyword}, options);
      let {errmsg, status, results, message, next_url} = response.data;
      switch (status) {
        case 200:
          results = results.map(item => {
            let profile = item.profile;
            delete item.profile;
            return {profile: {...profile, user: item}};
          });
          dispatch(setSearchList(results));
          dispatch(setSearchListUrl(next_url));
          dispatch(setProcessing(keyword, 'setsearchlistkeyword'));
          dispatch(setProcessing(false, 'searchlistfetching'));
          break;
        case 404:
          dispatch(setProcessing('noresult', 'searchlistfetching'));
          break;
        case 401:
          dispatch(setProcessing(false, 'searchlistfetching'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing('retry', 'searchlistfetching'));
          //Toast('something went wrong please try again', null, ToastAndroid.CENTER);
          break;
      }
    } catch (err) {
      dispatch(setProcessing('retry', 'searchlistfetching'));
      if (err.toString().indexOf('Network Error') != -1) {
        // Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        //Toast('something went wrong please try again', null, ToastAndroid.CENTER);
      }
    }
  };
};

export const fetchMoreSearchList = () => {
  return async dispatch => {
    const {user, userslist} = store.getState();
    if (
      !checkData(userslist.searchlistnexturl) ||
      !checkData(userslist.searchword)
    ) {
      dispatch(setProcessing('done', 'searchlistloadingmore'));
      return;
    }
    dispatch(setProcessing(true, 'searchlistloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        userslist.searchlistnexturl,
        {keyword: userslist.searchword},
        options,
      );
      let {errmsg, status, results, message, next_url} = response.data;
      switch (status) {
        case 200:
          results = results.map(item => {
            let profile = item.profile;
            delete item.profile;
            return {profile: {...profile, user: item}};
          });
          dispatch(addSearchList(results));
          dispatch(setSearchListUrl(next_url));
          dispatch(setProcessing(false, 'searchlistloadingmore'));
          break;
        case 404:
          dispatch(setProcessing('done', 'searchlistloadingmore'));
          break;
        case 401:
          dispatch(setProcessing(false, 'searchlistloadingmore'));
          logOut(() => persistor.purge());
          break;
        default:
          dispatch(setProcessing(false, 'searchlistloadingmore'));
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      dispatch(setProcessing(false, 'searchlistloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

/**
 * ACTION CREATOR FOR MEETUP REDUCER
 *
 */
export const updateMeetForm = (data: Object) => {
  return {
    type: UPDATE_MEETUP_FORM,
    payload: data,
  };
};

export const updateMeetFormErrors = (data: Object) => {
  return {
    type: UPDATE_MEETUP_FORM_ERRORS,
    payload: data,
  };
};

export const saveMeetupDetails = (data: Array, okAction, failedAction) => {
  return async dispatch => {
    const {user} = store.getState();
    let meetupname = data[0];
    let meetupavatar = data[1];
    let avatarname = data[2];
    if (!checkData(data)) {
      Toast('Missing values to continue');
      return;
    }
    dispatch(setProcessing(true, 'meetupformprocessing'));
    dispatch(
      updateMeetFormErrors({
        meetup_name_err: null,
        avatar_name_err: null,
        meetup_avatar_err: null,
      }),
    );
    setTimeout(async () => {
      let reqdata = new FormData();
      if (checkData(meetupname)) {
        reqdata.append('meetup_name', meetupname);
      } else if (checkData(avatarname)) {
        reqdata.append('avatar_name', avatarname);
      } else if (checkData(meetupavatar)) {
        reqdata.append('meetup_avatar', {
          uri: meetupavatar,
          type: 'image/gif',
          name: meetupavatar,
        });
      } else {
        Toast('Missing values to continue');
        return;
      }

      try {
        const options = {
          headers: {Authorization: `Bearer ${user.token}`},
        };
        const response = await session.post(
          'updatemeetupsetting',
          reqdata,
          options,
        );
        const {status, errors, errmsg, meetup_setting, message} = response.data;
        //console.warn('responsedata', response.data);
        dispatch(setProcessing(false, 'meetupformprocessing'));
        switch (status) {
          case 200:
            console.warn('savemeetdetailsfun', meetup_setting);
            dispatch(updateMeetForm(meetup_setting));
            Toast('Meet details updated');
            checkData(okAction) && okAction();
            break;
          case 400:
            dispatch(updateMeetFormErrors(errors));
            checkData(failedAction) && failedAction();
            break;
          case 401:
            checkData(failedAction) && failedAction();
            break;
          case 500:
            Toast(errmsg);
            checkData(failedAction) && failedAction();
            break;
          default:
            Toast('something went wrong please try again');
            checkData(failedAction) && failedAction();
            break;
        }
      } catch (err) {
        dispatch(setProcessing(false, 'meetupformprocessing'));
        console.warn(err.toString());
        if (err.toString().indexOf('Network Error') != -1) {
          Toast('network error!', null, ToastAndroid.CENTER);
        } else {
          Toast(
            'something went wrong please try again',
            null,
            ToastAndroid.CENTER,
          );
        }
      }
    }, 300);
  };
};

/**
 * ACTION CREATOR FOR GIPHYGALLERY REDUCER
 *
 */
export const appendGiphyGalleryResults = (data: Array) => {
  return {
    type: APPEND_GIPHY_GALLERY_RESULTS,
    payload: data,
  };
};

export const prependGiphyGalleryResults = (data: Array) => {
  return {
    type: PREPEND_GIPHY_GALLERY_RESULTS,
    payload: data,
  };
};

export const setGiphyGallery = (data: Object) => {
  return {
    type: SET_GIPHY_GALLERY,
    payload: data,
  };
};

export const updateGiphyGallery = (data: Object) => {
  return {
    type: UPDATE_GIPHY_GALLERY,
    payload: data,
  };
};

export const fetchGiphyGifs = () => {
  return async dispatch => {
    const {giphygallery, profile} = store.getState();
    dispatch(setProcessing(true, 'giphygalleryfetching'));
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=cartoon&api_key=${GIPHY_API_KEY2}&limit=50&rating=g`,
      );
      const {pagination, meta, data} = response.data;
      //console.warn(pagination);
      switch (meta.status) {
        case 200:
          let results = data.map((item, index) => {
            return {
              fixed_width: item.images.fixed_width,
              preview_gif: item.images.preview_gif,
            };
          });
          dispatch(
            setGiphyGallery({
              results,
              offset: pagination.count + giphygallery.offset,
            }),
          );
          if (checkData(pagination.total_count) && pagination.total_count < 1) {
            dispatch(updateGiphyGallery({loadingmore: 'done'}));
          }
          break;
        default:
          Toast('Could not fetch giphy gifs', null, ToastAndroid.CENTER);
          dispatch(setProcessing('retry', 'giphygalleryfetching'));
          break;
      }
    } catch (err) {
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
      dispatch(setProcessing('retry', 'giphygalleryfetching'));
    }
  };
};

export const fetchMoreGiphyGifs = () => {
  return async dispatch => {
    const {giphygallery, profile} = store.getState();
    dispatch(setProcessing(true, 'giphygalleryloadingmore'));
    //console.warn('offset', giphygallery.offset);
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=cartoon&api_key=${GIPHY_API_KEY2}&limit=50&offset=${
          giphygallery.offset
        }&rating=g`,
      );
      const {pagination, meta, data} = response.data;
      // console.warn(pagination);
      switch (meta.status) {
        case 200:
          let results = data.map((item, index) => {
            return {
              fixed_width: item.images.fixed_width,
              preview_gif: item.images.preview_gif,
            };
          });
          dispatch(prependGiphyGalleryResults(results));
          dispatch(
            updateGiphyGallery({
              offset: pagination.count + giphygallery.offset,
            }),
          );
          if (checkData(pagination.total_count) && pagination.total_count < 1) {
            dispatch(updateGiphyGallery({loadingmore: 'done'}));
          }
          dispatch(setProcessing(false, 'giphygalleryloadingmore'));
          break;
        default:
          Toast('Could not fetch giphy gifs', null, ToastAndroid.CENTER);
          dispatch(setProcessing(false, 'giphygalleryloadingmore'));
          break;
      }
    } catch (err) {
      console.warn(err.toString());
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
      dispatch(setProcessing(false, 'giphygalleryloadingmore'));
    }
  };
};

export const searchGiphyGifs = searchtxt => {
  return async dispatch => {
    if (!checkData(searchtxt)) {
      return;
    }
    const {giphygallery, profile} = store.getState();
    dispatch(
      updateGiphyGallery({
        searchobj: SEARCH_INITIAL_STATE,
      }),
    );
    dispatch(setProcessing(true, 'giphysearchgalleryfetching'));
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchtxt}&api_key=${GIPHY_API_KEY2}&limit=200&rating=g`,
      );
      const {pagination, meta, data} = response.data;
      console.warn(pagination);
      switch (meta.status) {
        case 200:
          let results = data.map((item, index) => {
            return {
              fixed_width: item.images.fixed_width,
              preview_gif: item.images.preview_gif,
            };
          });
          dispatch(
            updateGiphyGallery({
              searchobj: {
                ...giphygallery.searchobj,
                results: results,
                fetching: false,
              },
            }),
          );
          break;
        default:
          Toast('search results failed', null, ToastAndroid.CENTER);
          dispatch(setProcessing('retry', 'giphysearchgalleryfetching'));
          break;
      }
    } catch (err) {
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
      } else {
        Toast('search results failed', null, ToastAndroid.CENTER);
      }
      dispatch(setProcessing('retry', 'giphysearchgalleryfetching'));
    }
  };
};

/**
 * ACTION CREATOR FOR MEETUPMAIN REDUCER
 *
 */
export const addMeetupMainRequests = (data = []) => {
  return {
    type: ADD_MEETUPMAIN_REQUESTS,
    payload: data,
  };
};

export const removeMeetupMainRequests = (data = '') => {
  return {
    type: REMOVE_MEETUPMAIN_REQUESTS,
    payload: data,
  };
};

export const removeMeetupMainRequestsArr = (data = []) => {
  return {
    type: REMOVE_MEETUPMAIN_REQUESTS_ARR,
    payload: data,
  };
};

export const updateMeetupMainRequest = (data = {}) => {
  return {
    type: UPDATE_MEETUPMAIN_REQUEST,
    payload: data,
  };
};

export const setMeetupMain = (data = {}) => {
  return {
    type: SET_MEETUPMAIN,
    payload: data,
  };
};

export const setMeetupMainRequestErrors = (data = {}) => {
  return {
    type: SET_MEETUPMAIN_ERRORS,
    payload: data,
  };
};

export const addMeetupMainMyRequests = (data = []) => {
  return {
    type: ADD_MEETUPMAIN_MY_REQUESTS,
    payload: data,
  };
};

export const removeMeetupMainMyRequests = (data = '') => {
  return {
    type: REMOVE_MEETUPMAIN_MY_REQUESTS,
    payload: data,
  };
};

export const removeMeetupMainMyRequestsArr = (data = []) => {
  return {
    type: REMOVE_MEETUPMAIN_MY_REQUESTS_ARR,
    payload: data,
  };
};

export const updateMeetupMainMyRequest = (data = {}) => {
  return {
    type: UPDATE_MEETUPMAIN_MY_REQUESTS,
    payload: data,
  };
};

export const removeProfileMeetupMain = (data = '') => {
  return {
    type: REMOVE_PROFILE_MEETUPMAIN,
    payload: data,
  };
};

export const setMeetupMainUrl = (data = '') => {
  return {
    type: SET_MEETUPMAIN_URL,
    payload: data,
  };
};

export const fetchMyMeetSetting = (data = []) => {
  return async dispatch => {
    let okAction = data[0];
    let failedAction = data[1];
    try {
      const {user, profile} = store.getState();
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'meetsetting',
        {ownerid: profile.profile_id},
        options,
      );
      const {errmsg, meet_setting, msg, status} = response.data;
      switch (status) {
        case 200:
          dispatch(updateMeetForm(meet_setting));
          checkData(okAction) && okAction();
          break;
        default:
          checkData(failedAction) && failedAction();
          break;
      }
    } catch (err) {
      //console.warn(`${err.toString()} from meetsetting`);
      checkData(failedAction) && failedAction();
      if (err.toString().indexOf('Network Error') != -1) {
        dispatch(
          addOfflineAction({
            id: `fetchmymeetsetting`,
            funcName: 'fetchMyMeetSetting',
            param: data,
            override: true,
          }),
        );
      }
    }
  };
};

export const fetchMeetRequests = data => {
  return async dispatch => {
    dispatch(deleteOfflineAction({id: `fetchmeetreq`}));

    const {user, meetupmain} = store.getState();
    data = data || [];
    let reqobj = {...reqobj, ...meetupmain.options};

    if (checkData(data[0])) {
      reqobj['request_category'] = data[0];
    }
    if (reqobj.campus == 'none') {
      reqobj['campus'] = null;
    }
    if (!isEmpty(meetupmain.blacklist)) {
      reqobj['blacklist'] = meetupmain.blacklist;
    }

    dispatch(setProcessing(true, 'meetupmainfetching'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('meetupreqlist', reqobj, options);
      const {
        status,
        errmsg,
        message,
        meetup_list,
        my_num_req_left,
        next_url,
      } = response.data;
      //alert(JSON.stringify(next_url));
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupmainfetching'));
          //console.warn('meetup_list', meetup_list);
          meetup_list.forEach(item => {
            // console.warn('item', item);
            if (item) dispatch(updateMeetupMainRequest(item));
          });
          dispatch(setMeetupMainUrl(next_url));
          break;
        case 404:
          Toast(errmsg, ToastAndroid.LONG);
          dispatch(setProcessing('retry', 'meetupmainfetching'));
          break;
        case 500:
          Toasst(errmsg, ToastAndroid.LONG);
          dispatch(setProcessing('retry', 'meetupmainfetching'));
          dispatch(
            addOfflineAction({
              id: `fetchmeetreq`,
              funcName: 'fetchMeetRequests',
              param: data,
              override: true,
            }),
          );
          break;
        default:
          Toast('Request failed please try again');
          dispatch(setProcessing('retry', 'meetupmainfetching'));
          break;
      }
    } catch (err) {
      console.warn(`${err.toString()}  from meetrequest`);
      dispatch(setProcessing('retry', 'meetupmainfetching'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast(
          'seems like their is no network connectivity meet requests will be fetched once network returns',
        );
        dispatch(
          addOfflineAction({
            id: `fetchmeetreq`,
            funcName: 'fetchMeetRequests',
            param: data,
            override: true,
          }),
        );
      } else {
        Toast('fetch request failed');
      }
    }
  };
};

export const fetchMoreMeetRequests = () => {
  return async dispatch => {
    const {user, meetupmain} = store.getState();
    let reqobj = {...reqobj, ...meetupmain.options};

    if (reqobj.campus == 'none') {
      reqobj['campus'] = null;
    }
    if (!isEmpty(meetupmain.blacklist)) {
      reqobj['blacklist'] = meetupmain.blacklist;
    }
    dispatch(setProcessing(true, 'meetupmainloadingmore'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };

      if (!meetupmain.next_url) {
        dispatch(setProcessing(false, 'meetupmainloadingmore'));
        Toast('Nothing to load yet', null, ToastAndroid.CENTER);
        return;
      }
      if (reqobj.campus == 'none') {
        reqobj['campus'] = null;
      }
      const response = await session.post(meetupmain.next_url, reqobj, options);
      const {
        status,
        errmsg,
        message,
        meetup_list,
        my_num_req_left,
        next_url,
      } = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupmainloadingmore'));
          meetup_list.forEach(item => {
            if (item) dispatch(updateMeetupMainRequest(item));
          });
          dispatch(setMeetupMainUrl(next_url));
          break;
        case 404:
          Toast('Nothing to load yet');
          dispatch(setProcessing(false, 'meetupmainloadingmore'));
          break;
        case 500:
          Toast(errmsg);
          dispatch(setProcessing(false, 'meetupmainloadingmore'));
          break;
        default:
          Toast('Request failed please try again');
          dispatch(setProcessing(false, 'meetupmainloadingmore'));
          break;
      }
    } catch (err) {
      console.warn(`${err.toString()}  from fetchmoremeetrequest`);
      dispatch(setProcessing(false, 'meetupmainloadingmore'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!');
      } else {
        Toast('fetch request failed');
      }
    }
  };
};

export const fetchMyMeetRequests = () => {
  return async dispatch => {
    dispatch(deleteOfflineAction({id: `fetchmymeetreqs`}));
    const {user} = store.getState();
    dispatch(setProcessing(true, 'meetupmainmyreqfetching'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('mymeetupreqs', null, options);
      const {status, message, meetup_reqs, next_page_url} = response.data;
      switch (status) {
        case 200:
          //console.warn('meet_reqs_mine', meetup_reqs);
          meetup_reqs.forEach(item => {
            dispatch(updateMeetupMainMyRequest(item));
          });
          dispatch(setProcessing(false, 'meetupmainmyreqfetching'));
          break;
        case 404:
          Toast(errmsg);
          dispatch(setProcessing('retry', 'meetupmainmyreqfetching'));
          break;
        default:
          Toast('something went wrong please try again');
          dispatch(setProcessing('retry', 'meetupmainmyreqfetching'));
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'meetupmainmyreqfetching'));
      //console.warn('fetchMyRequests',`${err.toString()}`);
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!');
        dispatch(
          addOfflineAction({
            id: `fetchmymeetreqs`,
            funcName: 'fetchMyMeetRequests',
            param: [],
            override: true,
          }),
        );
      } else {
        Toast('request failed');
      }
    }
  };
};

export const createMeetRequest = (data, initAction, failedAction) => {
  return async dispatch => {
    //dispatch(deleteOfflineAction({ id: `createMeetRequest${data[6]}` }));
    const {user, profile, meetupmain, meetupform} = store.getState();
    if (!Array.isArray(data) || data.length < 3) {
      Toast('Missing values to continue', null, ToastAndroid.CENTER);
      return;
    } else if (data[0].length < 3 || data[0].length > 200) {
      Toast(
        'Request message must be between 3-200 characters',
        null,
        ToastAndroid.CENTER,
      );
      return;
    }

    let tempid = data[6] || String(Math.floor(Math.random() * 1000000));
    let reqobj = {
      request_msg: data[0],
      request_category: data[1],
      request_mood: data[2],
    };

    let meetreqschema = {
      request_id: tempid,
      schema: true,
      creating: true,
      created_at: new Date().getTime(),
      expires_after: new Date().getTime() * (24 * 3600),
      deleted: 0,
      requester_meet_profile: {...meetupform},
      requester_profile: {...profile, user: user},
      ...reqobj,
    };

    if (checkData(data[3])) {
      reqobj['expires_after'] = data[3];
    }
    if (checkData(data[4])) {
      reobj['request_addr'] = data[4];
    }
    if (checkData(data[5])) {
      reqobj['request_location'] = data[5];
    }

    data[6] = tempid;
    let retryschema = {
      ...meetreqschema,
      creating: 'retry',
    };
    dispatch(updateMeetupMainMyRequest(meetreqschema));
    checkData(initAction) && initAction();
    // dispatch(setProcessing(true, 'meetupmaincreating'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('addmeetupreq', reqobj, options);
      const {
        status,
        errors,
        errmsg,
        meetup_req,
        num_req_left,
        message,
      } = response.data;
      switch (status) {
        case 200:
          Toast(message, null, ToastAndroid.CENTER);
          dispatch(removeMeetupMainMyRequests(tempid));
          dispatch(updateMeetupMainMyRequest(meetup_req));
          //dispatch(setProcessing(false, 'meetupmaincreating'));
          break;
        case 500:
          Toast(errmsg, null, ToastAndroid.CENTER);
          checkData(failedAction) && failedAction();
          dispatch(updateMeetupMainMyRequest(retryschema));
          /*dispatch(addOfflineAction({
                        id: `createMeetRequest${tempid}`,
                        funcName: 'createMeetRequest',
                        param: data,
                        override: true,
                    }));*/
          //dispatch(setProcessing(false, 'meetupmaincreating'));
          break;
        case 400:
          Toast(errmsg, null, ToastAndroid.CENTER);
          checkData(failedAction) && failedAction();
          dispatch(updateMeetupMainMyRequest(retryschema));
          dispatch(setMeetupMainRequestErrors(errors));
          break;
        default:
          Toast(errmsg);
          dispatch(updateMeetupMainMyRequest(retryschema));
          checkData(failedAction) && failedAction();
          //dispatch(setProcessing(false, 'meetupmaincreating'));
          break;
      }
    } catch (err) {
      //console.warn(`${err.toString()}`);
      dispatch(updateMeetupMainMyRequest(retryschema));
      //dispatch(setProcessing(false, 'meetupmaincreating'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!', null, ToastAndroid.CENTER);
        dispatch(
          addOfflineAction({
            id: `createMeetRequest${tempid}`,
            funcName: 'createMeetRequest',
            param: data,
            override: true,
          }),
        );
      } else {
        console.warn(`${err.toString()}`);
        Toast(
          'something went wrong please try again',
          null,
          ToastAndroid.CENTER,
        );
      }
      checkData(failedAction) && failedAction();
    }
  };
};

export const deleteMeetRequest = meetreqid => {
  return async dispatch => {
    if (!checkData(meetreqid)) {
      Toast('missing values to continue!', null, ToastAndroid.CENTER);
      return;
    }
    const {user, profile, meetupmain} = store.getState();
    let todelmeetreq = [...meetupmain.requests, ...meetupmain.myrequests].find(
      item => item.request_id == meetreqid,
    );
    if (!checkData(todelmeetreq)) {
      Toast('Meet request to delete not found');
      return;
    } else if (todelmeetreq.requester_id != profile.profile_id) {
      let blacklist = meetupmain.blacklist || [];
      if (!blacklist.includes(meetreqid)) {
        blacklist.push(meetreqid);
      }
      dispatch(setMeetupMain({blacklist: blacklist}));
      dispatch(removeMeetupMainMyRequests(meetreqid));
      dispatch(removeMeetupMainRequests(meetreqid));
      Toast('Meet removed');
      return;
    } else if (checkData(todelmeetreq.schema)) {
      dispatch(removeMeetupMainMyRequests(meetreqid));
      dispatch(removeMeetupMainRequests(meetreqid));
      Toast('Meet removed');
    }

    dispatch(setProcessing(true, 'meetupmaindeleting'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'deletemeetupreq',
        {meetup_reqid: meetreqid},
        options,
      );
      const {status, errmsg, message} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupmaindeleting'));
          dispatch(removeMeetupMainMyRequests(meetreqid));
          dispatch(removeMeetupMainRequests(meetreqid));
          Toast(message, null, ToastAndroid.CENTER);
          break;
        case 500:
          dispatch(setProcessing(false, 'meetupmaindeleting'));
          Toast(errmsg, null, ToastAndroid.CENTER);
          break;
        default:
          dispatch(setProcessing(false, 'meetupmaindeleting'));
          Toast(errmsg, null, ToastAndroid.CENTER);
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'meetupmaindeleting'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!, failed to delete', null, ToastAndroid.CENTER);
      } else {
        Toast(
          'could not delete, something went wrong',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

export const blackListMeetProfile = meet_profile_id => {
  return async dispatch => {
    const {user, profile} = store.getState();
    if (!checkData(meet_profile_id)) {
      Toast('Missing values to continue');
      return;
    }
    dispatch(setProcessing(true, 'meetupmainblacklisting'));

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'meetblacklistaction',
        {profile_id: meet_profile_id},
        options,
      );
      const {status, errmsg, message} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupmainblacklisting'));
          dispatch(removeProfileMeetupMain(meet_profile_id));
          Toast(message, null, ToastAndroid.CENTER);
          break;
        case 500:
          dispatch(setProcessing(false, 'meetupmainblacklisting'));
          Toast(errmsg, null, ToastAndroid.CENTER);
          break;
        default:
          dispatch(setProcessing(false, 'meetupmainblacklisting'));
          Toast(errmsg, null, ToastAndroid.CENTER);
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'meetupmainblacklisting'));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast(
          'network error!, failed to perform action',
          null,
          ToastAndroid.CENTER,
        );
      } else {
        Toast(
          'could not perform action, something went wrong',
          null,
          ToastAndroid.CENTER,
        );
      }
    }
  };
};

/**
 * ACTION CREATOR FOR MEETUPCONVLIST REDUCER
 */
export const setMeetupConvList = (data = {}) => {
  return {
    type: SET_MEETCONVLIST,
    payload: data,
  };
};

export const updateMeetConvList = (data = {}) => {
  return {
    type: UPDATE_MEETCONVLIST,
    payload: data,
  };
};

export const updateMeetConvListConvs = (data = {}) => {
  return {
    type: UPDATE_MEETCONVLIST_CONVS,
    payload: data,
  };
};

export const updateMeetConvListConvsArr = (data = {}) => {
  return {
    type: UPDATE_MEETCONVLIST_CONVS_ARR,
    payload: data,
  };
};

export const removeMeetConvList = (data = []) => {
  return {
    type: REMOVE_MEETCONVLIST,
    payload: data,
  };
};

export const removeMeetConvListConvs = (data = {}) => {
  return {
    type: REMOVE_MEETCONVLIST_CONVS,
    payload: data,
  };
};

export const fetchMeetConv = () => {
  return async dispatch => {
    const {user, profile} = store.getState();
    dispatch(setProcessing(true, 'meetupconvlistfetching'));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('meetupreqconvlist', null, options);
      const {status, errmsg, message, meet_convs} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupconvlistfetching'));
          meet_convs.forEach(item => {
            dispatch(updateMeetConvListConvsArr(item));
          });
          break;
        case 404:
          dispatch(setProcessing('retry', 'meetupconvlistfetching'));
          break;
        default:
          dispatch(setProcessing('retry', 'meetupconvlistfetching'));
          break;
      }
    } catch (err) {
      dispatch(setProcessing('retry', 'meetupconvlistfetching'));
      console.warn(`${err.toString()}`);
    }
  };
};

export const fetchNewMeetConv = () => {
  return async dispatch => {
    const {user, profile, meetupconvlist} = store.getState();
    dispatch(setProcessing(true, 'meetupconvlistrefreshing'));
    let max = meetupconvlist.list.reduce((item1, item2) => {
      return Math.max(item1.id, item2.id);
    });
    max = typeof max == 'object' ? max.id : max;
    if (!checkData(max)) {
      dispatch(setProcessing(false, 'meetupconvlistrefreshing'));
      Toast('Missing values to continue');
      return;
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('meetupreqconvlist', {max}, options);
      const {status, errmsg, message, meet_convs} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupconvlistrefreshing'));
          meet_convs.map(item => {
            dispatch(updateMeetConvListConvsArr(item));
          });
          break;
        case 404:
          dispatch(setProcessing(false, 'meetupconvlistrefreshing'));
          break;
        default:
          dispatch(setProcessing(false, 'meetupconvlistrefreshing'));
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'meetupconvlistrefreshing'));
      console.warn(`${err.toString()}`);
    }
  };
};

export const fetchLaterMeetConv = () => {
  return async dispatch => {
    let {user, profile, meetupconvlist} = store.getState();
    dispatch(setProcessing(true, 'meetupconvlistloadingmore'));
    let min = meetupconvlist.list.reduce((item1, item2) => {
      return Math.min(item1.id, item2.id);
    });
    min = typeof min == 'object' ? min.id : min;
    if (!checkData(min)) {
      dispatch(setProcessing(false, 'meetupconvlistloadingmore'));
      Toast('Missing values to continue');
      return;
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('meetupreqconvlist', {min}, options);
      const {status, errmsg, message, meet_convs} = response.data;
      switch (status) {
        case 200:
          dispatch(setProcessing(false, 'meetupconvlistloadingmore'));
          meet_convs.map(item => {
            dispatch(updateMeetConvListConvsArr(item));
          });
          break;
        case 404:
          dispatch(setProcessing(false, 'meetupconvlistloadingmore'));
          break;
        default:
          dispatch(setProcessing(false, 'meetupconvlistloadingmore'));
          break;
      }
    } catch (err) {
      dispatch(setProcessing(false, 'meetupconvlistloadingmore'));
      console.warn(`${err.toString()}`);
    }
  };
};

/**
 * ACTION CREATORS FOR MEETUPCONVERSATION REDUCER
 *
 */

export const setMeetupConversation = (data = {}) => {
  return {
    type: SET_MEETUPCONVERSATION,
    payload: data,
  };
};

export const updateMeetupConversation = (data = {}, conversation_id = '') => {
  return {
    type: UPDATE_MEETUPCONVERSATION,
    payload: data,
    conversation_id,
  };
};

export const updateMeetupConversationArr = (
  data = [],
  conversation_id = '',
) => {
  return {
    type: UPDATE_MEETUPCONVERSATION_ARR,
    payload: data,
    conversation_id,
  };
};

export const removeMeetupConversation = (data = {}, conversation_id = '') => {
  return {
    type: REMOVE_MEETUPCONVERSATION,
    payload: data,
    conversation_id,
  };
};

export const setMeetupConvStatus = (data = []) => {
  return async dispatch => {
    dispatch(deleteOfflineAction({id: `setMeetupConvStatus${String(data)}`}));
    let options = ['1', '2'];
    if (
      !Array.isArray(data) ||
      data.length < 2 ||
      !Array.isArray(data[0]) ||
      data[0].length < 1 ||
      !options.includes(data[1])
    ) {
      console.warn('setMeetupConvStatus', 'wrong input');
      return;
    }
    let {user, meetupconvs} = store.getState();
    let reqobj = {arr: data[0]};
    if (!isEmpty(data[2]) && meetupconvs.conversation_id == data[2]) {
      reqobj['type'] = options[1];
    } else {
      reqobj['type'] = data[1];
    }
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('setmeetconvstatus', reqobj, options);
      const {status, errmsg, message} = response.data;
      switch (status) {
        case 200:
          console.warn('setMeetupConvStatus', message);
          break;
        default:
          console.warn('setMeetupConvStatus', errmsg);
          break;
      }
    } catch (err) {
      if (err.toString().indexOf('Network Error') != -1) {
        console.warn('setMeetupConvStatus', `${err.toString()}`);
        dispatch(
          addOfflineAction({
            id: `setMeetupConvStatus${String(data)}`,
            funcName: 'setMeetupConvStatus',
            param: data,
            persist: true,
            override: true,
          }),
        );
        //Toast('network error!, failed to perform action', null, ToastAndroid.CENTER);
      } else {
        console.warn('setMeetupConvStatus', `${err.toString()}`);
        //Toast('could not perform action, something went wrong', null, ToastAndroid.CENTER);
      }
    }
  };
};

export const fetchMeetConversations = (data, okAction, afterAction) => {
  return async dispatch => {
    if (!Array.isArray(data) || data.length < 2) {
      return;
    }
    let {user, profile, meetupconvs} = store.getState();
    dispatch(deleteOfflineAction({id: `fetchMeetConversations${data[0]}`}));
    let reqobj = {};
    reqobj['conversation_id'] = data[0];
    reqobj['request_id'] = data[1];
    if (!isEmpty(data[2])) {
      reqobj['min'] = data[2];
    }

    if (!isEmpty(data[3])) {
      reqobj['max'] = data[3];
    }

    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'getandreadmeetconvs',
        reqobj,
        options,
      );
      const {status, errmsg, convs} = response.data;
      switch (status) {
        case 200:
          //console.warn('successfull', convs);
          dispatch(
            updateMeetConvListConvsArr({
              conversation_id: data[0],
              conv_list: convs,
            }),
          );
          dispatch(updateMeetupConversationArr(convs, data[0]));
          checkData(okAction) && okAction();
          checkData(afterAction) && afterAction();
          break;
        case 400:
          Toast('failed to refresh conversations');
          console.log(errmsg);
          checkData(afterAction) && afterAction();
          break;
        case 500:
          Toast('failed to refresh conversations');
          console.log(errmsg);
          checkData(afterAction) && afterAction();
          break;
        default:
          Toast('failed to refresh conversations');
          console.log(errmsg);
          checkData(afterAction) && afterAction();
          break;
      }
    } catch (err) {
      console.warn('fetchMeetConversations', [err.toString(), reqobj]);
      checkData(afterAction) && afterAction();
      if (err.toString().indexOf('Network Error') != -1) {
        //Toast('network error!');
        dispatch(
          addOfflineAction({
            id: `fetchMeetConversations${data[0]}`,
            funcName: 'fetchMeetConversations',
            param: data,
            override: true,
          }),
        );
      }
    }
  };
};

const setConvPic = async imageuri => {
  if (isEmpty(imageuri)) {
    console.warn('setConvPic', 'imageuri is empty');
    return;
  }
  let {fs} = RNFetchBlob;
  let chatpic = imageuri;
  let thumbchatpic = await resizeImage(imageuri, 50, 50);
  let {file, size, path, filename} = await getFileInfo(imageuri);
  let ext = filename.split('.')[1];
  if (size > 6000000) {
    chat_pic = await resizeImage(imageuri, 1000, 1000);
  } else {
    let newpath = `${fs.dirs.MainBundleDir}/${Math.floor(
      Math.random() * 10000,
    )}.${ext}`;
    let moved = await cpFile(imageuri, newpath);
    if (moved) {
      chatpic = newpath;
    }
  }

  return {chatpic: rnPath(chatpic), thumbchatpic, ext};
};

const saveConvPic = async (convpic, from) => {
  if (isEmpty(convpic) || isEmpty(from)) {
    return false;
  }
  let {fs} = RNFetchBlob;
  //console.warn('directory',fs.dirs);
  let convimagedir = `/storage/emulated/0/CampusMeetup/MeetConversations/sent/`;
  let to = `${convimagedir}${convpic.split('/')[6]}`;
  try {
    let isdir = await fs.isDir(convimagedir);
    if (!isdir) {
      await fs.mkdir(convimagedir);
    }
    cpFile(from, to, true);
  } catch (err) {
    console.warn('saveConvPic', err.toString());
  }
};

export const sendMeetConversation = (data = []) => {
  return async dispatch => {
    if (
      !Array.isArray(data) ||
      data.length < 1 ||
      isEmpty(data[0]) ||
      isEmpty(data[1]) ||
      (isEmpty(data[2]) && isEmpty(data[3]))
    ) {
      return;
    }
    dispatch(deleteOfflineAction({id: `sendMeetConversation${data[0]}`}));
    let {user, profile, meetupconvs} = store.getState();
    let formdata = new FormData();
    let convschema = {
      conversation_id: data[0],
      created_at: Math.round(new Date().getTime() / 1000),
      sender_id: profile.profile_id,
      status: 'sending',
      id: data[4] || `${new Date().getTime()}`,
    };
    data[4] = convschema.id;

    formdata.append('request_id', data[1]);

    if (!isEmpty(data[2])) {
      formdata.append('chat_msg', data[2]);
      convschema['chat_msg'] = data[2];
    }
    if (!isEmpty(data[3])) {
      let chat_pic = null;
      if (data[3].processed != true) {
        chat_pic = await setConvPic(data[3].chat_pic);
      } else {
        chat_pic = data[3];
      }
      let {chatpic, thumbchatpic, ext} = chat_pic;
      formdata.append('chat_pic', {
        uri: chatpic,
        type: `image/${ext}`,
        name: chatpic,
      });
      formdata.append('thumb_chat_pic', {
        uri: thumbchatpic,
        type: `image/${ext}`,
        name: thumbchatpic,
      });

      data[3] = {chatpic, thumbchatpic, ext, processed: true};
      convschema['chat_pic'] = data[3];
    }

    dispatch(updateMeetupConversation(convschema, data[0]));
    dispatch(updateMeetConvListConvs(convschema));
    try {
      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post(
        'addmeetupreqconv',
        formdata,
        options,
      );
      const {status, errmsg, message, conv} = response.data;
      switch (status) {
        case 200:
          console.warn(200);
          if (!isEmpty(conv.chat_pic)) {
            await saveConvPic(conv.chat_pic.chatpic, data[3].chatpic);
          }
          dispatch(removeMeetupConversation(convschema, data[0]));
          dispatch(updateMeetupConversation(conv, data[0]));
          dispatch(removeMeetConvListConvs(convschema));
          dispatch(updateMeetConvListConvs(conv));
          break;
        default:
          Toast(errmsg);
          //console.warn('sendMeetConversation', errmsg);
          dispatch(
            updateMeetupConversation(
              {
                ...convschema,
                status: 'failed',
                data,
              },
              data[0],
            ),
          );

          dispatch(
            updateMeetConvListConvs({
              ...convschema,
              data,
              status: 'failed',
            }),
          );
          break;
      }
    } catch (err) {
      console.warn('sendMeetConversation', err.toString());
      dispatch(
        updateMeetupConversation(
          {
            ...convschema,
            status: 'failed',
            data,
          },
          data[0],
        ),
      );

      dispatch(
        updateMeetConvListConvs({
          ...convschema,
          status: 'failed',
          data,
        }),
      );

      if (err.toString().indexOf('Network Error') != -1) {
        //Toast('network error!');
        dispatch(
          addOfflineAction({
            id: `sendMeetConversation${data[0]}`,
            funcName: 'sendMeetConversation',
            param: data,
            persist: true,
            override: true,
          }),
        );
      }
    }
  };
};

/**
 * ACTION CREATOR FOR NOTIFICATION REDUCER
 *
 */

export const updateNotifications = (data = []) => {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: data,
  };
};

export const setNotifications = (data = []) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: data,
  };
};

export const updateMentions = (data = []) => {
  return {
    type: UPDATE_MENTIONS,
    payload: data,
  };
};

export const setMentions = (data = []) => {
  return {
    type: SET_MENTIONS,
    payload: data,
  };
};

export const fetchNotifications = (data = []) => {
  return async dispatch => {
    let processtxt = 'loadingnotifications';
    if (!isEmpty(data)) {
      processtxt = 'loadingmorenotifications';
    }
    dispatch(setProcessing(true, processtxt));
    let max = null;
    let min = null;
    try {
      let {user, mynotes} = store.getState();
      if (data[1] == true) {
        max = mynotes.notifications
          .map(item => item.id)
          .reduce((a, b) => Math.max(a, b));
      } else if (data[0] == true) {
        min = mynotes.notifications
          .map(item => item.id)
          .reduce((a, b) => Math.min(a, b));
      }

      const options = {
        headers: {Authorization: `Bearer ${user.token}`},
      };
      const response = await session.post('fetchnotes', {max, min}, options);
      const {status, errmsg, message, notes} = response.data;
      switch (status) {
        case 200:
          //console.warn('200', notes);
          dispatch(updateNotifications(notes));
          dispatch(setProcessing(false, processtxt));
          break;
        default:
          Toast(errmsg);
          //console.warn(response.data);
          dispatch(setProcessing(false, processtxt));
          break;
      }
    } catch (err) {
      console.warn('err', err.toString());
      dispatch(setProcessing(false, processtxt));
      if (err.toString().indexOf('Network Error') != -1) {
        Toast('network error!');
      } else {
        Toast('something went wrong please try again!');
      }
    }
  };
};

/**
 * ACTION CREATOR FOR BOOKMARKS REDUCER
 *
 */
export const bookMark = (data: Object, key: String) => {
  return {
    type: BOOKMARK,
    payload: {key, value: data},
  };
};

/**
 * ACTION CREATOR FOR OFFLINEACTIONS REDUCER
 *
 */

export const addOfflineAction = (data: Object) => {
  return {
    type: ADD_OFFLINE_ACTION,
    payload: data,
  };
};

export const deleteOfflineAction = (data: Object) => {
  return {
    type: DELETE_OFFLINE_ACTION,
    payload: data,
  };
};

export const deleteOfflineActions = (data: Array) => {
  return {
    type: DELETE_OFFLINE_ACTIONS,
    payload: {
      ids: data,
    },
  };
};

/**
 * ACTION CREATOR FOR PHOTO GALLERY REDUCER
 *
 */

export const setGalleryPhotos = data => {
  return {
    type: SET_GALLERY_PHOTOS,
    payload: data,
  };
};

export const setGalleryPhotosnum = data => {
  return {
    type: SET_GALLERY_PHOTOS_NUM,
    payload: data,
  };
};

export const setSelected = data => {
  return {
    type: SET_SELECTED_LIST,
    payload: data,
  };
};

export const getGalleryPhotos = () => {
  return async dispatch => {
    CameraRoll.getPhotos({
      first: 5000,
      assetType: 'Photos',
    })
      .then(async data => {
        let media = [];
        media = data.edges.map(d => ({
          photo: d.node.image.uri,
          key: d.node.image.filename,
          thumb: d.node.image.uri,
          caption: d.node.image.filename,
        }));
        dispatch(setGalleryPhotos(media));
        dispatch(setGalleryPhotosnum(media.length));
      })
      .catch(err => {
        console.warn(err);
        dispatch(setErrors('photos not found', 'photogallery'));
      });
  };
};
