import { GET_ALL_PROJECT } from "../../constants/Cyberbugs/ProjectContant";

export const getAllProject = (data) =>({
    type: GET_ALL_PROJECT,
    arrProject: data.content
})