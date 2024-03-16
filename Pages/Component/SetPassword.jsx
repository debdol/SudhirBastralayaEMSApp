import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Feather from 'react-native-vector-icons/dist/Feather'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { GlobalData } from '../../App'
import { Formik } from 'formik'
import { ScemaForSetPassword } from '../../Scema.js/Scema'
import { userGoToHomeFunction } from '../../Functions/Functions'

const SetPassword = ({ navigation, route }) => {
    const { getUserToken } = useContext(GlobalData);
    const [passwordVisible, setPasswordVisible] = useState();

    useEffect(() => {
        if (passwordVisible) {
            setTimeout(() => {
                setPasswordVisible(false);
            }, 5000);
        }
    }, [passwordVisible])

    const go_to_home_function = (values) => {
        let value = {
            email: route.params.email,
            newPassword: values.confirmPassword
        }
        const temp = userGoToHomeFunction(value, route.params.varifiedToken)
            .then((response) => {
                getUserToken(response.data.token);
            })
            .catch((error) => { console.log("error_resetpassword:", error.data) })
    }
    return (
        <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            onSubmit={(values) => {
                go_to_home_function(values);
            }}
            validationSchema={ScemaForSetPassword}
        >
            {({ handleChange, handleSubmit, handleBlur, errors, touched, values }) =>
            (<View style={styles.mainContainer}>
                <View style={styles.headingView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={30} color={"rgba(0, 71, 67, 0.7)"} />
                    </TouchableOpacity>
                    <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold" }]}>Set Password</Text>
                    <Text style={{ width: "10%" }}></Text>
                </View>
                <Image source={require("../../assets/Images/logo.png")} style={styles.logoImg} />
                <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "Amita-Bold", fontSize: 26 }]}>Sudhir Bastralaya</Text>
                <View style={styles.lebelAndInputView}>
                    <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold", fontSize: 16 }]}>Password</Text>
                    <View style={styles.iconAndInputView}>
                        {passwordVisible ? <Entypo name='lock-open' style={styles.icon} size={17} /> : <Entypo name='lock' style={styles.icon} size={17} />}
                        <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={styles.inputStyle}
                            placeholderTextColor={"rgb(100,100,100)"}
                            placeholder='password'
                            secureTextEntry={!passwordVisible ? true : false}
                            autoFocus
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Feather name='eye' style={styles.icon} size={17} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && touched.password ? (<Text style={{ color: "red", fontFamily: "MontserratAlternates-Regular" }}>{errors.password}</Text>) : null}
                </View>
                <View style={styles.lebelAndInputView}>
                    <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold", fontSize: 16 }]}>Confirm Password</Text>
                    <View style={styles.iconAndInputView}>
                        {passwordVisible ? <Entypo name='lock-open' style={styles.icon} size={17} /> : <Entypo name='lock' style={styles.icon} size={17} />}
                        <TextInput
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            style={styles.inputStyle}
                            placeholderTextColor={"rgb(100,100,100)"}
                            placeholder='confirm password'
                            secureTextEntry={!passwordVisible ? true : false}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Feather name='eye' style={styles.icon} size={17} />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && touched.confirmPassword ? (<Text style={{ color: "red", fontFamily: "MontserratAlternates-Regular" }}>{errors.confirmPassword}</Text>) : null}
                </View>
                <TouchableOpacity style={styles.signInBtn} onPress={() => { handleSubmit() }}>
                    <Text style={styles.signInBtnTxt}>Go to home</Text>
                    <Feather name='arrow-right' size={20} style={styles.signInBtnIcon} />
                </TouchableOpacity>
            </View>)
            }
        </Formik>
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
    headingView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },

    txt: {
        fontSize: 20,
        color: "#05ACFA"
    },
    logoImg: {
        alignSelf: "center",
        height: 110,
        width: 90,
        // borderColor:"red",
        // borderWidth:1,
    },
    icon: {
        color: "black"
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
        fontFamily: "Forza-Bold"
    },
    signInBtnIcon: {
        color: "white"
    },
    lebelAndInputView: {
        // borderColor:"red",
        // borderWidth:1,
        marginTop: 19,
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
        // borderColor:"red",
        // borderWidth:1,
    },
})
export default SetPassword