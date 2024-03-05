import { GET_ALL_TASK_TYPE } from "../constants/Cyberbugs/TaskTypeContant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    arrTaskType: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TASK_TYPE:
            return { ...state, arrTaskType: action.arrTaskType }

        default:
            return state
    }
}
