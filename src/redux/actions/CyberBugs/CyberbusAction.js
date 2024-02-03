import { GET_ALL_PROJECT_CATEGORY_SAGA, USER_SIGNIN_API } from "../../constants/Cyberbugs/CyberbugContant";

export const signinCyberbugsAction = (email, password) => ({
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
})

export const getAllProjectCategoryAction = () => ({
    type: GET_ALL_PROJECT_CATEGORY_SAGA
})