import axios from "axios";
import { attenDance, deleteNotifications, editProfile, editProfileImage, forgotPassWord, logIn, notifications, resetPassword, showEmpData, varifyOtp } from "../APIs/Api";

export const userAttenDanceFunction = async (token) => {
    return axios.get(attenDance, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const userNotificationFunction = async (token) => {
    return axios.get(notifications, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const userDataFunction = async (token) => {
    return axios.get(showEmpData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const userLoginFuntion = async (values) => {
    return axios.post(logIn, values)
}

export const userDeleteNotificationFunction = async (token) => {
    return axios.get(deleteNotifications, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const userEditProfileImageFunction = async (data, token) => {
    return axios.post(editProfileImage, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
}

export const userEditProfileFunction = async (data, token) => {
    return axios.put(editProfile, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const userOtpFunction = async (values) => {
    return axios.post(forgotPassWord, values)
}

export const userVarifyOtpFunction = async (values) => {
    return axios.post(varifyOtp, values)
}

export const userGoToHomeFunction = async (values, token) => {
    return axios.post(resetPassword, values, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}