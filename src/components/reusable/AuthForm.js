import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedbackComponent,
    TouchableNativeFeedbackComponent
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useTheme } from '../../assets/themes';
import {
    Input,
    Avatar,
    Card,
    Text,
    Button
} from 'react-native-elements';
const { colors } = useTheme();
let resheight = responsiveHeight(80) >= 350 ? 350 : responsiveHeight(80);
let reswidth = responsiveWidth(80) >= 350 ? 350 : responsiveWidth(80);
const AuthForm = ({
    imageTitle,
    appName,
    formInstructions,
    inputs,
    buttonText,
    buttonFunc,
    descText,
    descLink,
    desLinkFunc,
    btnLoading,
    btnDisabled,
    succesMsg,
    generalErrMsg,
    marginVertical,
    marginHorizontal,
    forgotPassText
}) => {
    const displayInputs = () => {
        if (inputs != undefined) {
            let Inputs = [];
            for (let key in inputs) {
                let keyboardType = inputs[key].type;
                let func = inputs[key].function;
                let errMsg = inputs[key].errmsg;
                let lefticon = inputs[key].lefticon;
                let passwordtype = false;
                let length = inputs[key].maxLength;
                let value = inputs[key].value;
                let onFocus = inputs[key].onFocus;
                let onBlur = inputs[key].onBlur;
                let focus = inputs[key].autoFocus;
                let inputstyle = inputs[key].inputstyle;
                let maxlength = inputs[key].maxLength;
                let autocompletetype = inputs[key].autoCompleteType;
                if (keyboardType == 'password') {
                    passwordtype = inputs[key].secureTextEntry;
                    keyboardType = 'default';
                }
                Inputs.push(
                    <Input placeholder={key}
                        autoCorrect={false}
                        key={key}
                        autoFocus={focus}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        maxLength={maxlength}
                        autoCompleteType={autocompletetype}
                        disableFullscreenUI={true}
                        selectionColor='#2196F3'
                        inputContainerStyle={[styles.inputContainerStyle,
                        { borderColor: colors.border }, inputstyle]}
                        inputStyle={[colors.text, { fontSize: 20, color: colors.text }]}
                        leftIcon={lefticon}
                        leftIconContainerStyle={{ margin: 15, marginRight: 12, }}
                        keyboardType={keyboardType}
                        onChangeText={func}
                        errorMessage={errMsg}
                        value={value}
                        errorStyle={styles.errorStyle}
                        placeholderTextColor={colors.border}
                        secureTextEntry={passwordtype}
                    />
                );

            }
            return Inputs;
        }
        return <Text h5 style={{ alignSelf: "center" }}>No input field specified</Text>;
    };

    const displayBtn = () => {
        if (succesMsg != '' && succesMsg != undefined) {
            return (<Card>
                <Text style={styles.formSuccessStyle}>
                    {succesMsg}
                </Text>
            </Card>);
        }
        return (<Button
            title={buttonText ? buttonText : 'Button'}
            buttonStyle={styles.buttonStyle}
            loading={btnLoading}
            onPress={buttonFunc}
            loadingProps={{ size: 30 }}
            disabled={btnDisabled}
            disabledStyle={{ backgroundColor: '#87CEEB' }}
        />);
    };
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
            >
                <View style={[styles.formContainer, { marginVertical: marginVertical }]}>
                    <View style={styles.avatarContainer}>
                        <Animatable.View
                            animation="swing"
                            useNativeDriver={true}
                            iterationCount="infinite"
                            style={{ alignItems: 'center' }}
                        >
                            <Avatar rounded title={imageTitle} size={120}
                                containerStyle={{
                                    borderWidth: 5,
                                    borderColor: colors.border,
                                    elevation: 1
                                }}
                                overlayContainerStyle={styles.imageStyle}
                                titleStyle={styles.imageTitleStyle}
                            />
                        </Animatable.View>
                    </View>
                    {/*<View style={styles.formHeadContainer}>
                                <Text style={[styles.textStyle, styles.appNameTextStyle, { color: colors.text }]}>
                                    {appName ? appName : 'AppName'}
                                </Text>
                                <Text h5 style={[styles.textStyle, { color: colors.text }]}>
                                    {formInstructions ? formInstructions : 'Form Details'}
                                </Text>
                                    </View>*/}
                    <View style={styles.formBottomContainer}>
                        {displayInputs()}
                        {
                            forgotPassText
                                ?
                                <TouchableOpacity style={{
                                    alignSelf: 'flex-end',
                                    marginHorizontal: 15,
                                    flex: 1,
                                    marginBottom: 8,
                                }}>
                                    <Text style={[styles.forgotPassTextStyle]}>
                                        {forgotPassText}
                                    </Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            generalErrMsg
                                ?
                                <Text style={styles.generalErrorStyle}>
                                    {generalErrMsg}
                                </Text>
                                : null
                        }
                        {displayBtn()}
                        <View style={styles.formLinksContainer}>
                            <Text h5 style={[styles.textStyle, { color: colors.text }]}>
                                {descText ? descText : 'Desc Text'}
                            </Text>
                            <TouchableOpacity onPress={desLinkFunc}>
                                <Text h5 style={[styles.textStyle, styles.linkStyle]}>
                                    {descLink ? descLink : 'Go Here'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        //borderWidth: 3
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    imageStyle: {
        backgroundColor: colors.border,
    },
    imageTitleStyle: {
        fontFamily: "cursive",
    },
    formHeadContainer: {
        //marginVertical: 2,
        alignItems: 'center',
        //borderWidth: 1,
    },
    formBottomContainer: {
        flex: 1,
        // borderWidth: 3,
        alignItems: 'center',
        padding: 5,
        marginVertical: 20,
    },
    appNameTextStyle: {
        fontSize: 25,
        fontWeight: 'bold'
        //fontStyle: 'italic'
    },
    textStyle: {
        color: 'black',
        fontFamily: 'FontAwesome',
        marginVertical: 1,
        //borderWidth: 3,
    },
    linkStyle: {
        color: '#2196F3',
        fontSize: 16,
        margin: 5,
        padding: 2,
        //borderWidth: 3,
    },
    forgotPassTextStyle: {
        color: '#2196F3',
        fontSize: 15,
    },
    formLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginVertical: 5,
        //borderWidth: 3,
    },
    inputContainerStyle: {
        borderWidth: 0,
        borderBottomWidth: 1,
        //borderRadius: 10,
        borderColor: 'black',
        width: responsiveWidth(85),
        height: 70,
        alignSelf: 'center',
        marginVertical: 0
    },
    buttonStyle: {
        width: responsiveWidth(80),
        marginVertical: 5,
        borderRadius: 5,
        //alignSelf: 'center',
        padding: 15,
    },
    errorStyle: {
        marginTop: 0,
    },
    formSuccessStyle: {
        color: '#4CAF50',
        alignSelf: 'center',
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    generalErrorStyle: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 11,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

export default AuthForm;