import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Modal, Pressable, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalData } from '../App';
import { launchImageLibrary } from 'react-native-image-picker';

import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Entypo from 'react-native-vector-icons/dist/Entypo'

import Loading from './Loading';
import { userEditProfileFunction, userEditProfileImageFunction } from '../Functions/Functions';

const EditProfile = ({ navigation, route }) => {
    const { postUserToken } = useContext(GlobalData);
    const [userData, setuserData] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        setuserData(route.params.userData)
    }, [route])
    // console.log("token:", postUserToken);
    const saveChanges = () => {
        setuserData();
        const totalData = {
            address: address,
        }
        let temp = userEditProfileFunction(totalData, postUserToken)
            .then((response) => {
                Alert.alert(response.data.message);
                navigation.goBack();
            })
            .catch((error) => { console.log("error_editprofile:", error.response.data) })
    }
    const imagePick = () => {
        let options = {
            storageOptions: {
                path: "image"
            }
        }
        launchImageLibrary(options, response => {
            if (response.assets) {
                setuserData();
                let imgData = {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type
                }
                let data = new FormData();
                data.append('profile_image', imgData);
                let temp = userEditProfileImageFunction(data, postUserToken)
                    .then((response) => {
                        navigation.goBack();
                        Alert.alert(response.data.message);
                    })
                    .catch((error) => console.log("error_update_profile_image:", error.response.data))
            }
        })
    }

    if (userData) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headingView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={30} color={"rgba(0, 71, 67, 0.7)"} />
                    </TouchableOpacity>
                    <Text style={[styles.todayTxt, { color: "black", fontFamily: "MontserratAlternates-Bold" }]}>Edit Profile</Text>
                    <Text style={{ width: "10%" }}></Text>
                </View>
                <View style={styles.infoView}>
                    <View style={{ alignSelf: "center" }}>
                        {userData.image ? <Image source={{ uri: userData.profile_image.path }} style={styles.profileImg} /> : null}
                    </View>
                    <TouchableOpacity style={styles.editImgIcon} onPress={() => imagePick()}>
                        <Entypo name='camera' size={22} style={{ color: "rgb(0, 71, 67)", }} />
                    </TouchableOpacity>
                    <View style={styles.lebelAndDataView}>
                        <View style={styles.lebelAndIconView}>
                            <Entypo name='location-pin' style={styles.icon} size={17} />
                            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Bold" }]}>Address</Text>
                        </View>
                        <TextInput placeholder={userData.address} onChangeText={(e) => setAddress(e)} style={styles.inputStyle} placeholderTextColor={"rgb(100,100,100)"} />
                    </View>
                </View>
                <TouchableOpacity style={styles.editProfile} onPress={saveChanges}>
                    <Text style={[styles.todayTxt, { color: "white", textAlign: "center", textAlignVertical: "center", height: "100%", fontFamily: "MontserratAlternates-Bold" }]}>Save Changes</Text>
                </TouchableOpacity>
            </View >
        )
    } else {
        return (<Loading />)
    }
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
    todayTxt: {
        fontSize: 20,
        color: "#05ACFA"
    },
    profileImg: {
        height: 90,
        width: 90,
        borderRadius: 45
    },
    editImgIcon: {
        position: "absolute",
        zIndex: 1,
        borderRadius: 40,
        borderColor: "white",
        backgroundColor: "white",
        padding: 3,
        borderWidth: 1,
        left: 189,
        top: 60
    },
    infoView: {
        borderColor: "#E0EAEF",
        borderWidth: 2,
        borderRadius: 9,
        flexDirection: "column",
        gap: 9,
        padding: 10
    },
    lebelAndDataView: {
        flexDirection: "column",
        gap: 9
    },
    lebelAndIconView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    inputStyle: {
        backgroundColor: "#DFE5EE",
        borderRadius: 5,
        padding: 9,
        color: "black"
    },
    icon: {
        color: "black"
    },
    editProfile: {
        // borderColor:"red",
        // borderWidth:1,
        borderRadius: 35,
        // padding: 6,
        height: 50,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "rgba(0, 71, 67, 0.7)",
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        bottom: 6,
        position: "absolute"
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
export default EditProfile