import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Alert, Modal, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CheckBox from 'react-native-check-box'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Feather from 'react-native-vector-icons/dist/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GlobalData } from '../../App'
import { Formik } from 'formik'
import Loading from '../../Components/Loading'
import { ScemaForLogin } from '../../Scema.js/Scema'
import messaging from '@react-native-firebase/messaging';
import { userLoginFuntion } from '../../Functions/Functions'

const LogIn = ({ navigation }) => {
    const { getMainPage, getUserToken, } = useContext(GlobalData);
    const [fcmToken, setFcmToken] = useState();

    const fcmTokenHandler = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        setFcmToken(token);
        // console.log("token:", token);
    }
    useEffect(() => { fcmTokenHandler() }, []);

    const [check, setCheck] = useState();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (passwordVisible) {
            setTimeout(() => {
                setPasswordVisible(false);
            }, 5000);
        }
    }, [passwordVisible]);

    const storeUserToken = async (token) => {
        AsyncStorage.setItem("user_token", token);
    }
    const signInFunction = (values) => {
        if (fcmToken) {
            values.fcm = fcmToken;
            let temp = userLoginFuntion(values)
                .then((Response) => {
                    getMainPage(<Loading />);
                    getUserToken(Response.data.token);
                    if (check) {
                        storeUserToken(Response.data.token);
                    }
                })
                .catch((error) => {
                    setModalVisible(true);
                    setErrorMsg(error.response.data.error)
                    // console.log(error)
                })
        }
        // resetForm({ values: '' });
    }
    const showPassword = () => {
        setPasswordVisible(!passwordVisible)
    }
    return (
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-150} style={{ flex: 1 }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    signInFunction(values);
                }}
                validationSchema={ScemaForLogin}
            >
                {({ handleChange, handleSubmit, handleBlur, errors, touched, values }) => (
                    <View style={styles.mainContainer}>
                        <View style={{}}>
                            <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold" }]}>Sign In</Text>
                            <Image source={require("../../assets/Images/logo.png")} style={styles.logoImg} />
                            <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "Amita-Bold", fontSize: 26 }]}>Sudhir Bastralaya</Text>
                        </View>
                        <View style={{ marginTop: 40, flexDirection: "column", gap: 13 }}>
                            <View style={styles.lebelAndInputView}>
                                <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold", fontSize: 16 }]}>Email</Text>
                                <View style={styles.iconAndInputView}>
                                    <Fontisto name='email' style={styles.icon} size={17} />
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholderTextColor={"rgb(100,100,100)"}
                                        placeholder='write your email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        autoFocus
                                    />
                                </View>
                                {errors.email && touched.email ? (<Text style={{ color: "red", marginBottom: 9, fontFamily: "MontserratAlternates-Regular" }}>{errors.email}</Text>) : null}
                            </View>
                            <View style={styles.lebelAndInputView}>
                                <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold", fontSize: 16 }]}>Password</Text>
                                <View style={styles.iconAndInputView}>
                                    {passwordVisible ? <Entypo name='lock-open' style={styles.icon} size={17} /> : <Entypo name='lock' style={styles.icon} size={17} />}
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholderTextColor={"rgb(100,100,100)"}
                                        placeholder='password' secureTextEntry={!passwordVisible ? true : false}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <TouchableOpacity onPress={() => showPassword()}>
                                        <Feather name='eye' style={styles.icon} size={17} />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && touched.password ? (<Text style={{ color: "red", marginBottom: 9, fontFamily: "MontserratAlternates-Regular" }}>{errors.password}</Text>) : null}
                            </View>
                        </View>
                        <View style={styles.footerView}>
                            <View style={styles.checkBoxAndTitleView}>
                                <CheckBox
                                    // style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        setCheck(!check);
                                    }}
                                    isChecked={check}
                                    checkedCheckBoxColor={"#004743"}
                                />
                                <TouchableOpacity onPress={() => setCheck(!check)}>
                                    <Text style={[styles.txt, { color: "black", fontSize: 16 }]}>Remember me!</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ borderBottomColor: "green", borderBottomWidth: 2 }} onPress={() => navigation.navigate("ForgotPassWord")}>
                                <Text style={[styles.txt, { color: "black", fontSize: 16 }]}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.signInBtn} onPress={() => handleSubmit()}>
                            <Text style={styles.signInBtnTxt}>Sign In</Text>
                            <Feather name='arrow-right' size={20} style={styles.signInBtnIcon} />
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{errorMsg}</Text>
                                    <Pressable
                                        style={[styles.button]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Ok</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // borderColor:"red",
        // borderWidth:1,
        flexDirection: "column",
        gap: 9,
        padding: 20
    },
    txt: {
        fontSize: 20,
    },
    logoImg: {
        alignSelf: "center",
        height: 110,
        width: 90,
        // borderColor:"red",
        // borderWidth:1,
    },
    lebelAndInputView: {
        // borderColor:"red",
        // borderWidth:1,
        flexDirection: "column",
        gap: 6
    },
    iconAndInputView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DFE5EE",
        borderRadius: 9,
        padding: 9,
        // borderColor:"red",
        // borderWidth:1,
    },
    icon: {
        color: "black"
    },
    inputStyle: {
        backgroundColor: "#DFE5EE",
        borderRadius: 5,
        padding: 9,
        width: "90%",
        color: "black"
        // borderColor:"red",
        // borderWidth:1,
    },
    footerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 9
    },
    checkBoxAndTitleView: {
        flexDirection: "row",
        alignItems: "center",
        // borderColor:"red",
        // borderWidth:1
    },
    signInBtn: {
        // borderColor:"red",
        // borderWidth:1,
        flexDirection: "row",
        gap: 9,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        height: 50,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "rgba(0, 71, 67, 0.7)",
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: "absolute",
        bottom: 6,
    },
    signInBtnTxt: {
        color: "white",
        fontFamily: "MontserratAlternates-Bold"
    },
    signInBtnIcon: {
        color: "white"
    },
    //Modal Style
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: "rgba(0, 71, 67, 0.7)",
        height: 40,
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: "black"
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
})
export default LogIn