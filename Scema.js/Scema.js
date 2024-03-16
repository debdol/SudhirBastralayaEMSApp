import * as yup from 'yup'
export const ScemaForLogin = yup.object().shape({
    email: yup.string().email("Please enter valid email").required('Email is Required'),
    password: yup.string().min(6, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
});
export const ScemaForForgotPassword = yup.object().shape({
    email: yup.string().email("Please enter valid email").required('Email is Required'),
});
export const ScemaForSetPassword = yup.object().shape({
    password: yup.string().min(6, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
    confirmPassword: yup.string().min(6, ({ min }) => `confirmPassword must be at least ${min} characters`).required('confirmPassword is required'),
})