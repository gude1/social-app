import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Input,
  Text,
  Image,
  Avatar,
  Card,
  Icon,
  Overlay,
  Divider,
} from 'react-native-elements';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import CustomPicker from '../../components/reusable/Picker';
import pickerData from '../../assets/static/CampusList.json';
import GenderData from '../../assets/static/GenderList.json';
import {
  Header,
  OverlayWithImage,
  LoaderScreen,
} from '../../components/reusable/ResuableWidgets';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import session from '../../api/session';
import {rnPath, getAppInfo, checkData, Toast} from '../../utilities';
import {Navigation} from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../assets/themes';

const {colors} = useTheme();
let inputwidth = responsiveWidth(85);
let containerinputwidth = responsiveWidth(90);
inputwidth = inputwidth > 450 ? 450 : inputwidth;
containerinputwidth = containerinputwidth > 550 ? 550 : containerinputwidth;

const EditProfileScreen = ({
  navigation,
  user,
  profile,
  posts,
  profileform,
  navparent,
  componentId,
  setUpdateProfileChange,
  setUpdateUsername,
  saveProfileUpdate,
  setUpdateGender,
  setProcessing,
  setUpdateBio,
  editprofileinfo,
  fetchAProfile,
  setReset,
  setAppInfo,
  saveUser,
  setProfileData,
  setUpdateCampus,
  uploadProfilePic,
  screentype,
  updateUser,
}) => {
  const placeholderColor = '#606060';
  let lefticon =
    navparent == true ? (
      <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
      />
    ) : null;
  let lefticonpress = navparent == true ? setDimissNav() : null;
  const [modalstate, setModalState] = useState({
    chooseimagestate: false,
    screeninfomodal: false,
  });
  const [loaded, setLoaded] = useState(false);
  let righticon2 = null;
  let rightIcon2Press = null;

  /**
   * component function goes here
   */
  useEffect(() => {
    setUpdateProfileChange({
      updatedphone: user.phone,
      updatedusername: user.username,
      updatedprofile_name: profile.profile_name,
      updatedcampus: profile.campus,
      updatedbio: profile.bio,
      updatedgender: user.gender,
    });
    //fetch users profile
    fetchAProfile(profile.profile_id, null, (profile) => {
      setProfileData(profile);
      updateUser(profile.user);
    });
    const listener = {
      componentDidAppear: () => {
        //to show toast modal if profile is not here completed and pageinfo modal has already being shown
        if (
          editprofileinfo == true &&
          getAppInfo(profile, 'profile') == 'profilefalse'
        ) {
          Toast(
            'Make sure you upload your profile picture and complete your profile so as to continue into the app',
            ToastAndroid.LONG,
          );
        }
        if (!loaded) {
          setLoaded(true);
        }
      },
      componentDidDisappear: () => {
        //console.log('RNN', `componentDidDisappear`);
      },
    };
    // Register the listener to all events related to our component
    const unsubscribe = Navigation.events().bindComponent(
      listener,
      componentId,
    );
    return () => {
      setReset('updateprofileerrors');
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);

  //function to determine dismiss of navigation based on screentype
  function setDimissNav() {
    if (screentype == 'modal')
      return () => Navigation.dismissModal(componentId);
    else return () => Navigation.pop(componentId);
  }

  Navigation.mergeOptions(componentId, {
    statusBar: {
      backgroundColor: colors.statusbar,
      style: colors.statusbartext,
    },
    topBar: {
      visible: false,
    },
  });

  const openDeviceCamera = () => {
    setModalState({...modalstate, chooseimagestate: false});
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperActiveWidgetColor: '#2196F3',
      // cropperToolbarTitle: "Edit Photo",
      avoidEmptySpaceAroundImage: true,
      hideBottomControls: true,
      enableRotationGesture: true,
      showCropGuidelines: true,
      cropperToolbarColor: '#2196F3',
      cropperStatusBarColor: 'black',
    })
      .then((image) => {
        uploadProfilePic(image);
      })
      .catch((err) => {});
  };
  const openModal = () => {
    setModalState({...modalstate, chooseimagestate: true});
  };
  const openDeviceGallery = () => {
    setModalState({...modalstate, chooseimagestate: false});
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperActiveWidgetColor: '#2196F3',
      cropperToolbarTitle: 'Edit Photo',
      avoidEmptySpaceAroundImage: true,
      hideBottomControls: true,
      enableRotationGesture: false,
      showCropGuidelines: true,
      showCropFrame: true,
      cropperToolbarColor: '#2196F3',
      cropperStatusBarColor: 'black',
    })
      .then((image) => {
        uploadProfilePic(image);
      })
      .catch((err) => {});
  };
  /**
   * component function ends here
   */

  let {name, username, phone, gender} = user;
  let {bio, campus, avatar, profile_name} = profile;
  let {
    updateProfile: {
      updatedusername,
      updatedphone,
      updatedprofile_name,
      errors,
      updatedbio,
      updatedcampus,
      updatedgender,
      isProcessing,
      isProcessingImage,
    },
  } = profileform;
  let genderenable = gender == 'false' ? true : false;
  let gendericon =
    gender == null || gender == 'none' || gender == 'false'
      ? 'question'
      : gender;
  let genderfont = 'font-awesome';
  let loadingplaceholder = checkData(avatar[1]) ? (
    <ActivityIndicator size="large" color="#2196F3" />
  ) : null;
  avatar = checkData(avatar[1]) ? {uri: avatar[1]} : null;
  let profilemodaltext = isProcessing
    ? 'saving profile'
    : 'uploading profile picture';
  let profilemodalstate = false;
  /**
   * CONDITIONAL IF ELSE STATEMENTS STARTS HERE
   */
  //loadingplaceholder = <ActivityIndicator size="large" color="#2196F3" />;

  //show toast message to user asking to complete profile if editprofile info modal has already being displayed
  if (editprofileinfo == false || checkData(editprofileinfo) == false) {
    setTimeout(() => {
      setModalState({...modalstate, screeninfomodal: true});
      setAppInfo({editprofileinformed: true});
    }, 1000);
  }
  if (isProcessing == true || isProcessingImage == true) {
    profilemodalstate = true;
  }
  if (
    getAppInfo(posts, 'post') == 'postfalse' &&
    getAppInfo(profile, 'profile') == 'profiletrue' &&
    navparent != true
  ) {
    righticon2 = (
      <Text
        style={{
          fontSize: responsiveFontSize(2.8),
          color: '#2196F3',
        }}
      >
        Next
      </Text>
    );
    rightIcon2Press = () =>
      Navigation.push(componentId, {
        component: {
          name: 'CreatePost',
          passProps: {
            navparent: true,
          },
        },
      });
  }
  /**
   * CONDITIONAL IF ELSE STATEMENTS ENDS HERE
   */

  return (
    <SafeAreaView
      style={[styles.containerStyle, {backgroundColor: colors.background}]}
    >
      <Header
        headercolor={colors.card}
        headertext="Edit Profile"
        headertextcolor={colors.text}
        headertextsize={responsiveFontSize(2.9)}
        lefticon={lefticon}
        righticon={
          <Icon
            type="feather"
            name="user-check"
            color={colors.text}
            size={responsiveFontSize(4)}
          />
        }
        righticon2={righticon2}
        //saveProfileUpdate(username, bio, campus, gender)
        leftIconPress={lefticonpress}
        rightIconPress={() =>
          saveProfileUpdate(
            updatedusername,
            updatedprofile_name,
            updatedbio,
            updatedcampus,
            updatedgender,
            updatedphone,
          )
        }
        rightIcon2Press={rightIcon2Press}
      />

      <OverlayWithImage
        isVisible={modalstate.screeninfomodal}
        theme={colors}
        onAccept={() => setModalState({...modalstate, screeninfomodal: false})}
        overlaystyle={{opacity: 0.9}}
        imagesize={130}
        imagesource={require('../../assets/emojiimages/excited.jpeg')}
        overlaytext={`Hi ${username},upload your profile picture and fill your profile details to proceed`}
      />

      <Overlay
        isVisible={profilemodalstate}
        overlayStyle={{padding: 0, backgroundColor: colors.card}}
      >
        <Animatable.View
          animation="bounceIn"
          useNativeDriver={true}
          style={{alignItems: 'center'}}
        >
          <View style={[styles.overlayChildViewStyle]}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text
              style={[
                styles.overlayTextStyle,
                {color: colors.text, marginHorizontal: 5},
              ]}
            >
              {profilemodaltext}
            </Text>
          </View>
        </Animatable.View>
      </Overlay>
      <Overlay
        isVisible={modalstate.chooseimagestate}
        onBackdropPress={() =>
          setModalState({...modalstate, chooseimagestate: false})
        }
        overlayStyle={{padding: 0, backgroundColor: colors.card, opacity: 0.8}}
      >
        <Animatable.View
          animation="bounceIn"
          useNativeDriver={true}
          style={{alignItems: 'center'}}
        >
          <View style={[styles.overlayImageChildViewStyle]}>
            <TouchableOpacity
              onPressIn={() => openDeviceCamera()}
              style={[styles.imageModalListStyle]}
            >
              <Icon
                name="camera"
                type="evilicon"
                color={colors.text}
                size={40}
              />
              <Text style={[styles.overlayTextStyle, {color: colors.text}]}>
                Open Camera
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPressIn={() => openDeviceGallery()}
              style={[styles.imageModalListStyle]}
            >
              <Icon
                name="image"
                type="evilicon"
                color={colors.text}
                size={40}
              />
              <Text style={[styles.overlayTextStyle, {color: colors.text}]}>
                Open Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Overlay>
      {loaded == false ? (
        <LoaderScreen
          loaderIcon={
            <Icon
              type="antdesign"
              name="adduser"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}
        >
          <Animatable.View
            animation="fadeIn"
            useNativeDriver={true}
            style={[
              styles.containerStyle,
              {backgroundColor: colors.background},
            ]}
          >
            <View style={styles.formContainerStyle}>
              <View style={styles.formHeadContainerStyle}>
                <Avatar
                  source={avatar}
                  resizeMode="contain"
                  renderPlaceholderContent={loadingplaceholder}
                  size={150}
                  rounded
                  icon={{
                    name: 'user',
                    type: 'antdesign',
                    size: 60,
                    color: 'white',
                  }}
                  onAccessoryPress={() => {
                    openModal();
                  }}
                  accessory={{
                    type: 'evilicon',
                    name: 'camera',
                    size: 50,
                    color: 'white',
                  }}
                  showAccessory
                  placeholderStyle={{backgroundColor: colors.border}}
                  containerStyle={{
                    backgroundColor: colors.border,
                    borderWidth: 5,
                    elevation: 5,
                    borderColor: colors.card,
                  }}
                  overlayContainerStyle={styles.imageContainerStyle}
                  titleStyle={{fontSize: 20}}
                />
                <Text
                  style={{
                    color: colors.text,
                    fontSize: responsiveFontSize(2.5),
                  }}
                >
                  {' '}
                  {profile_name}
                </Text>
                <Text
                  style={{
                    color: colors.iconcolor,
                    fontSize: responsiveFontSize(2.1),
                  }}
                >
                  {' '}
                  {username}
                </Text>
              </View>
              <View style={styles.bottomFormContainerStyle}>
                <Input
                  label="Name"
                  labelStyle={[styles.labelStyle, {color: colors.text}]}
                  maxLength={25}
                  inputStyle={{color: colors.text}}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {borderColor: colors.border},
                  ]}
                  selectionColor="#2196F3"
                  containerStyle={styles.containerInputStyle}
                  placeholder="eg: John Doe"
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  placeholderTextColor={placeholderColor}
                  editable={false}
                  value={name}
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'user-o',
                    color: colors.iconcolor,
                    size: 25,
                  }}
                />

                <Input
                  containerStyle={styles.containerInputStyle}
                  inputStyle={{color: colors.text}}
                  label="Profilename"
                  autoCorrect={false}
                  maxLength={20}
                  errorStyle={[styles.errorStyle]}
                  selectionColor="#2196F3"
                  errorMessage={errors.profile_nameerr}
                  labelStyle={[styles.labelStyle, {color: colors.text}]}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {borderColor: colors.border},
                  ]}
                  placeholder="eg: cool"
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  placeholderTextColor={placeholderColor}
                  value={updatedprofile_name}
                  onChangeText={(txt) =>
                    setUpdateProfileChange({
                      updatedprofile_name: txt,
                    })
                  }
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'user-o',
                    color: colors.iconcolor,
                    size: 25,
                  }}
                />

                <Input
                  containerStyle={styles.containerInputStyle}
                  inputStyle={[styles.inputStyle, {color: colors.text}]}
                  label="Bio"
                  maxLength={150}
                  errorStyle={[styles.errorStyle]}
                  selectionColor="#2196F3"
                  labelStyle={[styles.labelStyle, {color: colors.text}]}
                  errorMessage={errors.bioerr}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {borderColor: colors.border},
                  ]}
                  placeholder="Tell us something about you..."
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  placeholderTextColor={placeholderColor}
                  value={updatedbio}
                  onChangeText={(txt) => setUpdateBio(txt)}
                  multiline={true}
                  leftIcon={{
                    type: 'feather',
                    name: 'edit-2',
                    color: colors.iconcolor,
                    size: 28,
                  }}
                />

                <Input
                  containerStyle={styles.containerInputStyle}
                  inputStyle={{color: colors.text}}
                  label="phone"
                  maxLength={11}
                  value={updatedphone}
                  selectionColor="#2196F3"
                  keyboardType="phone-pad"
                  errorMessage={errors.phoneerr}
                  labelStyle={[styles.labelStyle, {color: colors.text}]}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {borderColor: colors.border},
                  ]}
                  placeholder="eg: +234"
                  onChangeText={(txt) =>
                    setUpdateProfileChange({
                      updatedphone: txt,
                    })
                  }
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  placeholderTextColor={placeholderColor}
                  leftIcon={{
                    type: 'feather',
                    name: 'phone',
                    color: colors.text,
                    size: 28,
                  }}
                />

                <CustomPicker
                  containerPickerStyle={styles.containerInputStyle}
                  pickerContainerStyle={styles.inputContainerStyle}
                  mode="dropdown"
                  options={GenderData}
                  selectedValue={updatedgender}
                  errorMessage={errors.gendererr}
                  onValueChange={(itemValue, itemIndex) => {
                    setUpdateGender(itemValue);
                  }}
                  enabled={genderenable}
                  labelText="Gender"
                  borderColor={colors.border}
                  labelStyle={{color: colors.text}}
                  placeholderColor={placeholderColor}
                  backgroundColor={colors.card}
                  icon={{
                    type: genderfont,
                    name: gendericon,
                    color: colors.iconcolor,
                    size: 28,
                  }}
                />
                <CustomPicker
                  containerPickerStyle={styles.containerInputStyle}
                  pickerContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.campuserr}
                  selectedValue={updatedcampus}
                  onValueChange={(itemValue, itemIndex) => {
                    setUpdateCampus(itemValue);
                  }}
                  mode="dropdown"
                  options={pickerData}
                  labelText="Campus"
                  borderColor={colors.border}
                  labelStyle={{color: colors.text}}
                  placeholderColor={placeholderColor}
                  backgroundColor={colors.card}
                  icon={{
                    type: 'antdesign',
                    name: 'book',
                    color: colors.iconcolor,
                    size: 28,
                  }}
                />
                <Input
                  containerStyle={styles.containerInputStyle}
                  inputStyle={[styles.inputStyle, {color: colors.text}]}
                  label="Campus (optional)"
                  maxLength={50}
                  errorStyle={[styles.errorStyle]}
                  selectionColor="#2196F3"
                  labelStyle={[styles.labelStyle, {color: colors.text}]}
                  errorMessage={errors.campuserr}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {borderColor: colors.border},
                  ]}
                  placeholder="eg : oou oau"
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  placeholderTextColor={placeholderColor}
                  value={updatedcampus}
                  onChangeText={(txt) => setUpdateCampus(txt)}
                  multiline={true}
                  leftIcon={{
                    type: 'antdesign',
                    name: 'book',
                    color: colors.iconcolor,
                    size: 28,
                  }}
                />
              </View>
            </View>
          </Animatable.View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

EditProfileScreen.options = {
  statusBar: {
    backgroundColor: colors.statusbar,
    style: colors.statusbartext,
  },
  topBar: {
    visible: false,
  },
};
const mapStateToProps = (state) => ({
  user: state.user,
  editprofileinfo: state.appinfo.editprofileinformed,
  posts: state.posts,
  profile: state.profile,
  profileform: state.profileform,
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainerStyle: {
    flex: 1,
  },
  formHeadContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  bottomFormContainerStyle: {
    alignItems: 'center',
    padding: 5,
  },
  inputStyle: {
    //borderWidth: 1,
    //borderColor: 'red',
  },
  inputContainerStyle: {
    marginVertical: 8,
    width: inputwidth,
    borderBottomWidth: 1,
  },
  containerInputStyle: {
    width: containerinputwidth,
    alignItems: 'center',
  },
  imageContainerStyle: {
    backgroundColor: colors.border,
  },
  leftIconContainerStyle: {
    margin: 5,
    marginRight: 12,
    borderWidth: 0,
  },
  labelStyle: {
    alignSelf: 'flex-start',
  },
  saveBtnContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    //borderWidth: 1,
  },
  saveBtnStyle: {
    color: '#2196F3',
    fontSize: 18,
    fontFamily: '',
  },
  overlayChildViewStyle: {
    justifyContent: 'center',
    height: 80,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayImageChildViewStyle: {
    height: 100,
    width: 250,
  },
  overlayTextStyle: {
    fontSize: 17,
  },
  imageModalListStyle: {
    //borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorStyle: {
    marginTop: 0,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});

export default connect(mapStateToProps, actions)(EditProfileScreen);
