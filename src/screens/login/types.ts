import {EMAIL_INVALID_ERROR, EMAIL_REQUIRED_ERROR, PASSWORD_REQUIRED_ERROR} from "screens/login/constants";

export type LoginForm = {
    email: string,
    password: string
}

export type LoginErrors = {
    email: false | typeof EMAIL_REQUIRED_ERROR | typeof EMAIL_INVALID_ERROR,
    touchedEmail: boolean,
    password?: false | typeof PASSWORD_REQUIRED_ERROR,
    touchedPassword: boolean,
}