import { useState } from 'react';
import React from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    StyleSheet
} from 'react-native';
import AuthForm from '../components/reusable/AuthForm';
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from '../assets/themes';
import { Navigation } from 'react-native-navigation';
import auth from '../api/auth';
import { connect } from 'react-redux';
import {
    responsiveFontSize,
    responsiveWidth,
} from "react-native-responsive-dimensions";
//import { persistStore, persistReducer } from 'redux-persist';
import * as actions from '../actions';
import { checkData } from '../utilities/index';


const { colors } = useTheme();
const iconsColor = "black";
const SigninScreen = ({
    saveUser,
    componentId,
    testfcmarr,
    setEmail,
    setPassword,
    auth,
    logIn,
}) => {
    const inputerrors = auth.login.errors;
    //console.warn(inputerrors);
    const loading = auth.login.isProcessing;
    const disabled = auth.login.isProcessing;
    const { email, password } = auth.login;
    const [secure, setSecure] = useState(true);
    const [styles, setStyles] = useState({
        emailiconcolor: 'dimgray',
        emailinputstyle: null,
        passwordiconcolor: 'dimgray',
        passwordinputstyle: null,
    });
    const {
        emailiconcolor,
        emailinputstyle,
        passwordiconcolor,
        passwordinputstyle } = styles;
    let fontsize = responsiveFontSize(4.5);
    const securefont = secure == true ? 'eye' : 'eye-off';
    /**
     * functions
     */
    const checkSecure = () => {
        secure == true ? setSecure(false) : setSecure(true);
    };

    Navigation.mergeOptions(componentId, {
        statusBar: {
            backgroundColor: colors.statusbar,
            style: colors.statusbartext
        },
        topBar: {
            visible: false,
        },
    });
    /**
     * functions
     */
    return (
        <SafeAreaView style={[screenstyle.containerStyle, { backgroundColor: colors.background }]} >
            <View style={[screenstyle.containerStyle, { backgroundColor: colors.background }]}>
                <AuthForm
                    imageTitle='CM'
                    appName='CampusMeet'
                    formInstructions='Please login to continue using this app'
                    descText="Don't have an account?"
                    descLink='Sign Up'
                    desLinkFunc={() => Navigation.pop(componentId)}
                    buttonText='Log in'
                    //buttonFunc={() => console.warn(testfcmarr, testfcmarr.length)}
                    buttonFunc={() => logIn({ email, password, Navigation, componentId })}
                    generalErrMsg={inputerrors.generalerrmsg}
                    btnLoading={loading}
                    btnDisabled={disabled}
                    marginVertical={30}
                    forgotPassText="Forgot Password?"
                    inputs={[{
                        type: 'email-address',
                        key: "Email",
                        maxLength: 50,
                        inputstyle: emailinputstyle,
                        autoCompleteType: 'email',
                        returnKeyType: "next",
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
                        //autoFocus: true,
                        value: email,
                        function: (data) => { setEmail(data, 'login'); },
                        errmsg: inputerrors.emailerr,
                        lefticon: { type: 'font-awesome', name: 'envelope-o', color: emailiconcolor, size: fontsize }
                    },
                    {
                        type: 'password',
                        key: "Password",
                        autoCompleteType: 'password',
                        returnKeyType: "done",
                        inputstyle: passwordinputstyle,
                        onSubmitEditing: (inputref) => {
                            checkData(inputref) && inputref.blur();
                            logIn({ email, password, Navigation, componentId });
                        },
                        onFocus: () => {
                            setStyles({
                                ...styles,
                                // passwordiconcolor: "#2196F3",
                                passwordinputstyle: {
                                    borderBottomWidth: 2,
                                    borderColor: "#2196F3",
                                }
                            })
                        },
                        onBlur: () => {
                            setStyles({
                                ...styles,
                                //passwordiconcolor: colors.text,
                                passwordinputstyle: null
                            })
                        },
                        value: password,
                        secureTextEntry: secure,
                        function: (data) => { setPassword(data, 'login'); },
                        errmsg: inputerrors.passworderr,
                        lefticon: (
                            <TouchableOpacity onPress={checkSecure}>
                                <Icon
                                    name={securefont}
                                    size={fontsize}
                                    color={passwordiconcolor}
                                />
                            </TouchableOpacity>
                        )
                    }]}
                />
            </View>
        </SafeAreaView>
    )


};

SigninScreen.options = {
    statusBar: {
        backgroundColor: colors.statusbar,
        style: colors.statusbartext
    },
    topBar: {
        visible: false,
    },
};

const mapStateToProps = state => ({
    auth: state.auth,
    testfcmarr: state.testfcmarr
});

const screenstyle = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});

export default connect(mapStateToProps, actions)(SigninScreen);
