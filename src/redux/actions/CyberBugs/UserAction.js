import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserContant";


export const getAllProjectByIdSaga = (idProject) => ({
    type: GET_USER_BY_PROJECT_ID_SAGA,
    idProject
})