import { GET_ALL_PROJECT } from "../constants/Cyberbugs/ProjectContant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    projectList: [],
    arrProject:[] //Get all project cho dropdown
}


export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_PROJECT':
            state.projectList = action.listProject
            return { ...state }
        case GET_ALL_PROJECT: 
            return {...state, arrProject: action.arrProject}
        default:
            return { ...state }
    }
}
