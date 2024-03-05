import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs/PriorityContant";

export const getAllPriority = (data) => ({
    type: GET_ALL_PRIORITY,
    arrPriority: data
})

export const getAllPrioritySaga = () => ({
    type: GET_ALL_PRIORITY_SAGA
})