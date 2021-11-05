import RNFetchBlob from 'rn-fetch-blob';
import {Platform, Image, ToastAndroid, Alert, Linking} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
  AUTHROUTE,
  SETUPPROFILEROUTE,
  SETUPPOSTROUTE,
  MAINTABSROUTE,
} from '../routes';
import ImageResizer from 'react-native-image-resizer';
import {persistor} from '../store/index';
import moment from 'moment';
import {ADD_FCM_MEET_CONV} from '../actions/types';
import {setMeetupConvStatus} from '../actions/index';

export const deleteFile = data => {
  if (!isEmpty(data)) {
    RNFetchBlob.fs
      .unlink(data)
      .then(e => e)
      .catch(e => e);
  }
};

export const test = async () => {
  let dirs = RNFetchBlob.fs.dirs;
  RNFetchBlob.fs.exists;
  var t = true;
  t = await Promise.all(
    RNFetchBlob.fs
      .exists(dirs.PicturesDir + '/chai.jpg')
      .then(e => {
        return e;
      })
      .catch(e => e),
  );
};

/**
 * For dispatching actions and performing other actions
 *
 */
export const doDispatch = (store, data) => {
  if (isEmpty(store) || isEmpty(data)) {
    return null;
  }
  try {
    switch (data.type) {
      case ADD_FCM_MEET_CONV:
        store.dispatch(data);
        store.dispatch(
          setMeetupConvStatus([
            [data.payload.id],
            '1',
            data.payload.conversation_id,
          ]),
        );
        break;
      default:
        store.dispatch(data);
        break;
    }
  } catch (err) {
    console.warn('doDispatch', err.toString());
  }
};

/**
 * For showing toast message on android and alert on ios
 *
 * @param String message
 * @param Integer duration
 * @param Integer gravity
 *
 */
export const Toast = (message: String, duration: Number, gravity: Number) => {
  if (!checkData(message)) {
    return;
  }
  if (Platform.OS == 'android') {
    ToastAndroid.showWithGravity(
      message,
      duration || ToastAndroid.SHORT,
      gravity || ToastAndroid.BOTTOM,
    );
  } else {
    alert(message);
  }
};

export const logOut = after => {
  alert('Session expired! you are required to login');
  persistor.purge();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Signin',
            },
          },
        ],
      },
    },
  });
};

export const convertByteToKbMb = data => {
  //1mb == 1000000bytes
  //1kb == 1000bytes
  if (!checkData(data)) {
    return data;
  }
  let tokb = Math.floor(data / 1000);
  let tomb = Math.floor(data / 1000000);
  if (tokb >= 1000) {
    return `${tomb}mb`;
  } else {
    return `${tokb}kb`;
  }
};

/**
 * this function return info about a file
 */
export const getFileInfo = async file => {
  if (!checkData(file)) {
    return false;
  }

  const {fs} = RNFetchBlob;
  try {
    //let fileinfo = await fs.stat(`${fs.dirs.DownloadDir}/yo.jpeg`);
    //alert(JSON.stringify(fileinfo));
    //alert(JSON.stringify(fs.dirs.DownloadDir));
    let fileinfo = await fs.stat(file);
    return fileinfo;
  } catch (error) {
    return false;
    console.warn(error.toString());
  }
};

export const rnPath = data => {
  if (Platform.OS == 'android') {
    return `file://${data}`;
  }
  return data;
};

export const setRoute = store => {
  let {user, profile, postform, timelinepostform} = store;
  if (
    checkData(user) == false ||
    checkData(user.gender) == false ||
    checkData(user.token) == false
  ) {
    Navigation.setRoot(AUTHROUTE);
    //console.warn(checkData(user.gender));
    //console.warn(profile);
    //console.warn(posts);
  } else if (
    checkData(profile.campus) == false ||
    checkData(profile.profile_name) == false ||
    checkData(profile.bio) == false ||
    checkData(profile.avatar) == false
  ) {
    Navigation.setRoot(SETUPPROFILEROUTE);
  } else if (
    postform == undefined ||
    postform == null ||
    postform == '' ||
    postform == NaN ||
    postform.savedposts.length < 1 ||
    postform.savedposts.length == undefined
  ) {
    Navigation.setRoot(SETUPPOSTROUTE);
    //console.warn(user);
    //console.warn(profile);
    //console.warn(posts);
  } else {
    Navigation.setRoot(MAINTABSROUTE);
    //console.warn(timelinepostform);
    //console.warn(timelineposts);
    // console.warn(user);
    //console.warn(profile);
    //console.warn(posts);
  }
};

export const downloadFile = (
  todownloadpath,
  todownloadfrompath,
  okAction,
  failedAction,
) => {
  if (!checkData(todownloadpath) || !checkData(todownloadfrompath)) {
    Toast(`Missing values to continue`);
    return;
  }
  RNFetchBlob.config({
    path: todownloadpath,
  })
    .fetch('GET', todownloadfrompath)
    .then(res => {
      checkData(okAction) && okAction(res);
    })
    .catch(err => {
      Toast(`Error: ${err.message}`);
      checkData(failedAction) && failedAction(err);
    });
};

export const cpFile = async (from: String, to: String, del: Boolean) => {
  const {fs} = RNFetchBlob;
  if (!checkData(from) || !checkData(to)) {
    console.warn('incorrect input');
    return false;
  }
  try {
    let c = await fs.cp(from, to);
    if (del == true) {
      deleteFile(from);
    }
    return true;
  } catch (err) {
    console.warn('err', err.toString());
    return false;
  }
};

export const shouldNav = (componentId, store, name) => {
  let info = setUpInfo(store);
  return info == 'completed'
    ? Navigation.push(componentId, {
        component: {
          name: name,
          passProps: {
            navparent: true,
          },
          options: {
            animations: {
              push: {
                waitForRender: true,
              },
            },
          },
        },
      })
    : info;
};

export const setUpInfo = store => {
  let {user, profile, posts} = store;
  if (
    checkData(user) == false ||
    checkData(user.gender) == false ||
    checkData(user.token) == false
  ) {
    return 'userfalse';
  } else if (
    checkData(profile.campus) == false ||
    checkData(profile.bio) == false ||
    checkData(profile.campus) == false ||
    checkData(profile.avatarremote) == false
  ) {
    return 'profilefalse';
  } else if (
    posts == undefined ||
    posts == null ||
    posts == '' ||
    posts == NaN ||
    posts.length < 1 ||
    posts.length == undefined
  ) {
    return 'postfalse';
  } else {
    return 'completed';
  }
};

//get situation on users interacvtion on app
export const getAppInfo = (data, name) => {
  switch (name) {
    case 'user':
      let user = data;
      if (
        checkData(user) == false ||
        checkData(user.gender) == false ||
        checkData(user.token) == false
      ) {
        return 'userfalse';
      } else {
        return 'usertrue';
      }
      break;
    case 'profile':
      let profile = data;
      if (
        checkData(profile.campus) == false ||
        checkData(profile.profile_name) == false ||
        checkData(profile.bio) == false ||
        checkData(profile.avatar) == false
      ) {
        return 'profilefalse';
      } else {
        return 'profiletrue';
      }
      break;
    case 'post':
      let posts = data;
      if (
        posts == undefined ||
        posts == null ||
        posts == '' ||
        posts == NaN ||
        posts.length < 1 ||
        posts.length == undefined
      ) {
        return 'postfalse';
      } else {
        return 'posttrue';
      }
      break;

    default:
      return 'unknownfalse';
      break;
  }
};

export const handleTime = data => {
  let rightnow = moment();
  if (!checkData(data)) {
    return data;
  }
  return data;
  let toparsedata = moment(data);
  let diffsec = Math.floor(rightnow.diff(data, 'seconds', true));
  let diffmin = Math.floor(rightnow.diff(data, 'minutes', true));
  let diffhour = Math.floor(rightnow.diff(data, 'hours', true));
  let diffday = Math.floor(rightnow.diff(data, 'days', true));
  let diffweek = Math.floor(rightnow.diff(data, 'weeks', true));
  if (diffsec < 60) {
    return `${diffsec}s`;
  } else if (diffmin < 60) {
    return `${diffmin}m`;
  } else if (diffhour < 24) {
    return `${diffhour}h`;
  } else if (diffday < 7) {
    return `${diffday}d`;
  } else if (diffweek < 7) {
    return `${diffweek}w`;
  } else {
    return toparsedata.format('MMM D YYYY');
  }
};

//function to check if object contains property specified
export const hasProperty = (obj = {}, props = []) => {
  if (isEmpty(obj) || !Array.isArray(props)) {
    return false;
  }
  let check = props.filter(propname => {
    return obj[propname] ? true : false;
  });
  return check.length == props.length;
};

//function to determine if data has valid values
export function checkData(data) {
  if ((data != null && data != undefined && data != '') || data == '0') {
    return true;
  }
  return false;
}

export const isEmpty = data => {
  if (!checkData(data)) return true;
  if (data.constructor == Array && data.length < 1) return true;
  else if (data.constructor == String && data.length < 1) return true;
  else if (data.constructor == Object && Object.keys(data).length == 0)
    return true;
  else return false;
};

export const customAlert = (
  title = '',
  subtitle = '',
  okAction,
  failedAction,
) => {
  if (isEmpty(title) || !checkData(okAction)) {
    return;
  }
  Alert.alert(title, subtitle, [
    {
      text: 'Ok',
      onPress: okAction,
    },
    {
      text: 'Cancel',
      onPress: failedAction,
      style: 'cancel',
    },
  ]);
};

//function to navigate to a screen
export const toNav = (navigator, componentId, componentName, props) => {
  if (
    checkData(navigator) == false ||
    checkData(componentId) == false ||
    checkData(componentName) == false
  ) {
    return false;
  }
  navigator.push(componentId, {
    component: {
      name: componentName,
      animations: {
        push: {
          waitForRender: true,
        },
      },
      passProps: {
        ...props,
      },
    },
  });
};

export const cutText = (data, start, len, elipsis) => {
  start = start || 0;
  elipsis = elipsis || false;
  if (!checkData(data) || !checkData(len) || len <= 0) {
    return data;
  }
  if (data.length > len) {
    data = data.substr(start, len);
    return elipsis == true ? data + '...' : data;
  } else {
    return data;
  }
};

export const getImageSize = async uri => {
  let w = 0;
  let h = 0;
  if (checkData(uri) != true) {
    return {w, h};
  }
  const response = await Image.getSize(
    uri,
    (width, height) => {
      w = width;
      h = height;
    },
    e => e,
  );
  return {w, h};
};

export const image_exists = async uri => {
  if (checkData(uri) != true) {
    return false;
  }
  let doesexists = false;
  const res = await Image.getSize(
    uri,
    (w, h) => {
      doesexists = true;
    },
    e => {
      doesexists = false;
    },
  );
  return doesexists;
};

export const LinkingHandler = () => {
  function handleUrlPress(url, matchIndex /*: number*/) {
    if (url.slice(0, 4) != 'http') {
      Linking.openURL(`http://${url}`);
    } else {
      Linking.openURL(`${url}`);
    }
  }

  function handlePhonePress(url, matchIndex /*: number*/) {
    if (url.slice(0, 3) != 'tel') {
      Linking.openURL(`tel:${url}`);
    } else {
      Linking.openURL(`${url}`);
    }
  }

  function handleEmailPress(url, matchIndex /*: number*/) {
    if (url.slice(0, 6) != 'mailto') {
      Linking.openURL(`mailto:${url}`);
    } else {
      Linking.openURL(`${url}`);
    }
  }
  return {handleEmailPress, handlePhonePress, handleUrlPress};
};

export const resizeImage = async (
  uri,
  width,
  height,
  compressFormat,
  quality,
  rotation,
  outputpath,
  keepMeta,
) => {
  if (
    checkData(uri) != true ||
    checkData(width) != true ||
    checkData(height) != true
  ) {
    return false;
  }
  compressFormat = checkData(compressFormat) ? compressFormat : 'JPEG';
  quality = checkData(quality) ? quality : 90;
  outputpath = checkData(outputpath) ? outputpath : null;
  rotation = checkData(rotation) ? rotation : 0;
  keepMeta = checkData(keepMeta) ? keepMeta : false;
  try {
    const res = await ImageResizer.createResizedImage(
      uri,
      width,
      height,
      compressFormat,
      quality,
      rotation,
      outputpath,
      keepMeta,
    );
    return res.uri;
  } catch (e) {
    alert(e.toString());
    return false;
  }
};

export const toHumanReadableTime = timeseconds => {
  return timeseconds;
};
