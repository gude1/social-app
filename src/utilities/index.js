import RNFetchBlob from 'rn-fetch-blob';
import { Platform, Image, ToastAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AUTHROUTE, SETUPPROFILEROUTE, SETUPPOSTROUTE, MAINTABSROUTE } from '../routes';
import ImageResizer from 'react-native-image-resizer';
import { persistor } from '../store/index';
export const deleteFile = (data) => {
    if (data != null && data != '' && data != undefined) {
        RNFetchBlob.fs.unlink(data)
            .then(e => e)
            .catch(e => e);
    }
};

export const test = async () => {
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.fs.exists
    var t = true;
    t = await Promise.all(
        RNFetchBlob.fs.exists(dirs.PicturesDir + '/chai.jpg')
            .then(e => { return e })
            .catch(e => e)
    );

}


/**
 * For showing toast message on android and alert on ios
 * 
 * @param String message
 * @param Integer duration
 * @param Integre gravity
 *
 */
export const Toast = (message: String, duration: Number, gravity: Number) => {
    if (!checkData(message)) {
        return;
    }
    if (Platform.OS == "android") {
        ToastAndroid.showWithGravity(message, duration || ToastAndroid.LONG, gravity || ToastAndroid.BOTTOM);
    } else {
        alert(message);
    }
};

export const logOut = (after) => {
    alert('Session expired! you are required to login');
    persistor.purge();
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Signin'
                        }
                    }
                ]
            }
        }
    });
};


export const rnPath = (data) => {
    if (Platform.OS == 'android') {
        return `file://${data}`;
    }
    return data;
};

export const setRoute = (store) => {
    let { user, profile, posts, timelinepostform, timelineposts } = store;
    if (checkData(user) == false
        || checkData(user.gender) == false
        || checkData(user.token) == false) {
        Navigation.setRoot(AUTHROUTE);
        //console.warn(checkData(user.gender));
        //console.warn(profile);
        //console.warn(posts);
    } else if (checkData(profile.campus) == false
        || checkData(profile.profile_name) == false
        || checkData(profile.bio) == false
        || checkData(profile.avatar) == false
    ) {
        Navigation.setRoot(SETUPPROFILEROUTE);
    } else if (posts == undefined || posts == null
        || posts == '' || posts == NaN || posts.length < 1 || posts.length == undefined) {
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

}
export const shouldNav = (componentId, store, name) => {
    let info = setUpInfo(store);
    return info == 'completed' ?
        Navigation.push(componentId, {
            component: {
                name: name,
                passProps: {
                    navparent: true
                }, options: {
                    animations: {
                        push: {
                            waitForRender: true,
                        }
                    }
                }
            }
        }) : info;
};

export const setUpInfo = (store) => {
    let { user, profile, posts } = store;
    if (checkData(user) == false
        || checkData(user.gender) == false
        || checkData(user.token) == false) {
        return 'userfalse';
    } else if (checkData(profile.campus) == false
        || checkData(profile.bio) == false
        || checkData(profile.campus) == false
        || checkData(profile.avatarremote) == false) {
        return 'profilefalse';
    } else if (posts == undefined || posts == null
        || posts == '' || posts == NaN || posts.length < 1 || posts.length == undefined) {
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
            if (checkData(user) == false
                || checkData(user.gender) == false
                || checkData(user.token) == false) {
                return 'userfalse';
            } else {
                return 'usertrue'
            }
            break;
        case 'profile':
            let profile = data;
            if (checkData(profile.campus) == false
                || checkData(profile.profile_name) == false
                || checkData(profile.bio) == false
                || checkData(profile.avatar) == false
            ) {
                return 'profilefalse';
            } else {
                return 'profiletrue'
            }
            break;
        case 'post':
            let posts = data;
            if (posts == undefined || posts == null
                || posts == '' || posts == NaN || posts.length < 1 || posts.length == undefined) {
                return 'postfalse';
            } else {
                return 'posttrue'
            }
            break;

        default:
            return 'unknownfalse';
            break;
    }
}

//function to determine if data has valid values
export function checkData(data) {
    if ((data != null && data != undefined && data != '') || data == '0') {
        return true;
    }
    return false;
}
//function to navigate to a screen
export const toNav = (navigator, componentId, componentName, props) => {
    if (checkData(navigator) == false || checkData(componentId) == false || checkData(componentName) == false) {
        return false;
    }
    navigator.push(componentId, {
        component: {
            name: componentName,
            animations: {
                push: {
                    waitForRender: true,
                }
            },
            passProps: {
                ...props
            },
        }
    })
};

export const cutText = (data, start, len, elipsis) => {
    start = start || 0;
    elipsis = elipsis || false;
    if (!checkData(data) || !checkData(len) || len <= 0) {
        return data;
    }
    if (data.length > len) {
        data = data.substr(start, len);
        return elipsis == true ? data + "..." : data;
    } else {
        return data;
    }
};

export const getImageSize = async (uri) => {
    let w = 0;
    let h = 0;
    if (checkData(uri) != true) {
        return { w, h };
    }
    const response = await Image.getSize(uri, (width, height) => {
        w = width;
        h = height;
    }, (e => e));
    return { w, h };
};

export const image_exists = async (uri) => {
    if (checkData(uri) != true) {
        return false;
    }
    let doesexists = false;
    const res = await Image.getSize(uri, (w, h) => {
        doesexists = true;
    }, (e) => {
        doesexists = false;
    });
    return doesexists;
};

export const resizeImage = async (uri, width, height, compressFormat, quality, rotation, outputpath, keepMeta) => {
    if (checkData(uri) != true || checkData(width) != true || checkData(height) != true) {
        return false;
    }
    compressFormat = checkData(compressFormat) ? compressFormat : 'JPEG';
    quality = checkData(quality) ? quality : 90;
    outputpath = checkData(outputpath) ? outputpath : null;
    rotation = checkData(rotation) ? rotation : 0;
    keepMeta = checkData(keepMeta) ? keepMeta : false;
    try {
        const res = await ImageResizer.createResizedImage(uri,
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
        //alert(e.toString());
        return false;
    }
};


export const toHumanReadableTime = (timeseconds) => {
    return timeseconds;
};
