import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '../api/auth';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import * as actions from '../actions';
import {useTheme} from '../assets/themes';
import {Navigation} from 'react-native-navigation';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {checkData} from '../utilities/index';
import AuthForm from '../components/reusable/AuthForm';

const iconsColor = 'black';
const {colors} = useTheme();

const SignupScreen = ({
  auth,
  componentId,
  signUp,
  setName,
  setEmail,
  user,
  setPassword,
  setPhone,
  setUsername,
}) => {
  const inputerrors = auth.signup.errors;
  const loading = auth.signup.isProcessing;
  const disabled = auth.signup.isProcessing;
  const {email, username, name, phone, password} = auth.signup;
  const [secure, setSecure] = useState(true);
  const [styles, setStyles] = useState({
    nameinputstyle: null,
    usernameinputstyle: null,
    phoneinputstyle: null,
    emailinputstyle: null,
    passwordinputstyle: null,
  });
  const {
    nameinputstyle,
    passwordinputstyle,
    usernameinputstyle,
    phoneinputstyle,
    emailinputstyle,
  } = styles;
  const securefont = secure == true ? 'eye' : 'eye-off';
  let fontsize = responsiveFontSize(4.5);
  const checkSecure = () => {
    secure == true ? setSecure(false) : setSecure(true);
  };
  /**
   * functions
   */
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        console.log('RNN', `componentDidAppear`);
      },
      componentDidDisappear: () => {
        console.log('RNN', `componentDidDisappear`);
      },
    };
    // Register the listener to all events related to our component
    const unsubscribe = Navigation.events().bindComponent(
      listener,
      componentId,
    );
    return () => {
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);

  Navigation.mergeOptions(componentId, {
    statusBar: {
      backgroundColor: colors.statusbar,
      style: colors.statusbartext,
    },
    topBar: {
      visible: false,
    },
  });

  /**
   * functions
   */
  return (
    <SafeAreaView style={screenstyle.containerStyle}>
      <AuthForm
        imageTitle="CM"
        appName="Campus Meetup"
        formInstructions="Please fill the details and create account"
        descText="Already have an account?"
        descLink="Log in"
        desLinkFunc={() =>
          Navigation.push(componentId, {
            component: {
              name: 'Signin',
            },
          })
        }
        buttonText="Sign up"
        btnLoading={loading}
        generalErrMsg={inputerrors.signupgeneralerr}
        //succesMsg={smsg}
        btnDisabled={disabled}
        buttonFunc={() => {
          signUp({
            email,
            username,
            name,
            phone,
            password,
            Navigation,
            componentId,
          });
        }}
        marginVertical={40}
        inputs={[
          {
            type: 'default',
            key: 'FullName',
            //autoFocus: true,
            inputstyle: nameinputstyle,
            returnKeyType: 'next',
            autoCompleteType: 'name',
            maxLength: 50,
            onFocus: () => {
              setStyles({
                ...styles,
                //emailiconcolor: "#2196F3",
                nameinputstyle: {
                  borderBottomWidth: 2,
                  borderColor: '#2196F3',
                },
              });
            },
            onBlur: () => {
              setStyles({
                ...styles,
                //emailiconcolor: colors.text,
                nameinputstyle: null,
              });
            },
            value: name,
            function: (data) => {
              setName(data, 'signup');
            },
            errmsg: inputerrors.nameerr,
            lefticon: {
              type: 'feather',
              name: 'user',
              color: 'dimgray',
              size: fontsize,
            },
          },
          {
            type: 'default',
            key: 'Username',
            returnKeyType: 'next',
            value: username,
            autoCompleteType: 'username',
            maxLength: 15,
            inputstyle: usernameinputstyle,
            onFocus: () => {
              setStyles({
                ...styles,
                //emailiconcolor: "#2196F3",
                usernameinputstyle: {
                  borderBottomWidth: 2,
                  borderColor: '#2196F3',
                },
              });
            },
            onBlur: () => {
              setStyles({
                ...styles,
                //emailiconcolor: colors.text,
                usernameinputstyle: null,
              });
            },
            function: (data) => {
              setUsername(data, 'signup');
            },
            errmsg: inputerrors.usernameerr,
            lefticon: {
              type: 'font-awesome',
              name: 'user-o',
              color: 'dimgray',
              size: fontsize,
            },
          },
          {
            type: 'email-address',
            key: 'Email',
            autoCompleteType: 'email',
            value: email,
            returnKeyType: 'next',
            inputstyle: emailinputstyle,
            maxLength: 50,
            onFocus: () => {
              setStyles({
                ...styles,
                //emailiconcolor: "#2196F3",
                emailinputstyle: {
                  borderBottomWidth: 2,
                  borderColor: '#2196F3',
                },
              });
            },
            onBlur: () => {
              setStyles({
                ...styles,
                //emailiconcolor: colors.text,
                emailinputstyle: null,
              });
            },
            function: (data) => {
              setEmail(data, 'signup');
            },
            errmsg: inputerrors.emailerr,
            lefticon: {
              type: 'font-awesome',
              name: 'envelope-o',
              color: 'dimgray',
              size: fontsize,
            },
          },
          {
            type: 'phone-pad',
            key: 'Phone',
            autoCompleteType: 'tel',
            returnKeyType: 'next',
            value: phone,
            maxLength: 11,
            inputstyle: phoneinputstyle,
            onFocus: () => {
              setStyles({
                ...styles,
                //emailiconcolor: "#2196F3",
                phoneinputstyle: {
                  borderBottomWidth: 2,
                  borderColor: '#2196F3',
                },
              });
            },
            onBlur: () => {
              setStyles({
                ...styles,
                //emailiconcolor: colors.text,
                phoneinputstyle: null,
              });
            },
            function: (data) => {
              setPhone(data, 'signup');
            },
            errmsg: inputerrors.phoneerr,
            lefticon: {
              type: 'feather',
              name: 'phone',
              color: 'dimgray',
              size: fontsize,
            },
          },
          {
            type: 'password',
            key: 'Password',
            value: password,
            returnKeyType: 'done',
            maxLength: 15,
            autoCompleteType: 'password',
            inputstyle: passwordinputstyle,
            onSubmitEditing: (inputref) => {
              checkData(inputref) && inputref.blur();
              signUp({
                email,
                username,
                name,
                phone,
                password,
                Navigation,
                componentId,
              });
            },
            onFocus: () => {
              setStyles({
                ...styles,
                //emailiconcolor: "#2196F3",
                passwordinputstyle: {
                  borderBottomWidth: 2,
                  borderColor: '#2196F3',
                },
              });
            },
            onBlur: () => {
              setStyles({
                ...styles,
                //emailiconcolor: colors.text,
                passwordinputstyle: null,
              });
            },
            secureTextEntry: secure,
            function: (data) => {
              setPassword(data, 'signup');
            },
            errmsg: inputerrors.passworderr,
            lefticon: (
              <TouchableOpacity onPress={checkSecure}>
                <Icon name={securefont} size={fontsize} color={'dimgray'} />
              </TouchableOpacity>
            ),
          },
        ]}
        /*inputs={{
                'FullName': {
                    type: 'default',
                    //autoFocus: true,
                    inputstyle: nameinputstyle,
                    autoCompleteType: 'name',
                    maxLength: 50,
                    onFocus: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: "#2196F3",
                            nameinputstyle: {
                                borderBottomWidth: 2,
                                borderColor: "#2196F3",
                            }
                        })
                    },
                    onBlur: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: colors.text,
                            nameinputstyle: null
                        })
                    },
                    value: name,
                    function: (data) => { setName(data, 'signup'); },
                    errmsg: inputerrors.nameerr,
                    lefticon: { type: 'feather', name: 'user', color: 'dimgray', size: fontsize }
                },
                'Username': {
                    type: 'default',
                    value: username,
                    autoCompleteType: 'username',
                    maxLength: 15,
                    inputstyle: usernameinputstyle,
                    onFocus: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: "#2196F3",
                            usernameinputstyle: {
                                borderBottomWidth: 2,
                                borderColor: "#2196F3",
                            }
                        })
                    },
                    onBlur: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: colors.text,
                            usernameinputstyle: null
                        })
                    },
                    function: (data) => { setUsername(data, 'signup'); },
                    errmsg: inputerrors.usernameerr,
                    lefticon: { type: 'font-awesome', name: 'user-o', color: 'dimgray', size: fontsize }
                },
                'Email': {
                    type: 'email-address',
                    autoCompleteType: 'email',
                    value: email,
                    inputstyle: emailinputstyle,
                    maxLength: 50,
                    onFocus: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: "#2196F3",
                            emailinputstyle: {
                                borderBottomWidth: 2,
                                borderColor: "#2196F3",
                            }
                        })
                    },
                    onBlur: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: colors.text,
                            emailinputstyle: null
                        })
                    },
                    function: (data) => { setEmail(data, 'signup'); },
                    errmsg: inputerrors.emailerr,
                    lefticon: { type: 'font-awesome', name: 'envelope-o', color: 'dimgray', size: fontsize }
                },
                'Phone': {
                    type: 'phone-pad',
                    autoCompleteType: 'tel',
                    value: phone,
                    maxLength: 11,
                    inputstyle: phoneinputstyle,
                    onFocus: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: "#2196F3",
                            phoneinputstyle: {
                                borderBottomWidth: 2,
                                borderColor: "#2196F3",
                            }
                        })
                    },
                    onBlur: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: colors.text,
                            phoneinputstyle: null
                        })
                    },
                    function: (data) => { setPhone(data, 'signup'); },
                    errmsg: inputerrors.phoneerr,
                    lefticon: { type: 'feather', name: 'phone', color: 'dimgray', size: fontsize }
                },
                'Password': {
                    type: 'password',
                    value: password,
                    maxLength: 15,
                    autoCompleteType: 'password',
                    inputstyle: passwordinputstyle,
                    onFocus: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: "#2196F3",
                            passwordinputstyle: {
                                borderBottomWidth: 2,
                                borderColor: "#2196F3",
                            }
                        })
                    },
                    onBlur: () => {
                        setStyles({
                            ...styles,
                            //emailiconcolor: colors.text,
                            passwordinputstyle: null
                        })
                    },
                    secureTextEntry: secure,
                    function: (data) => { setPassword(data, 'signup'); },
                    errmsg: inputerrors.passworderr,
                    lefticon: (
                        <TouchableOpacity onPress={checkSecure}>
                            <Icon
                                name={securefont}
                                size={fontsize}
                                color={'dimgray'} />
                        </TouchableOpacity>
                    )
                }
            }}*/
      />
    </SafeAreaView>
  );
};

SignupScreen.options = {
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
  auth: state.auth,
});
const screenstyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default connect(mapStateToProps, actions)(SignupScreen);
