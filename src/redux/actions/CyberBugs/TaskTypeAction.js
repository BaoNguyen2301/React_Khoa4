import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/Cyberbugs/TaskTypeContant";

export const getAllTaskTypeAction = (data) => ({
    type: GET_ALL_TASK_TYPE,
    arrTaskType: data
})

export const getAllTaskTypeActionSaga = () => ({
    type: GET_ALL_TASK_TYPE_SAGA
})