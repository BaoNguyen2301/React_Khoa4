import { USER_SIGNIN_API } from "../../constants/Cyberbugs/CyberbugContant";

export const signinCyberbugsAction = (email, password) => ({
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
})