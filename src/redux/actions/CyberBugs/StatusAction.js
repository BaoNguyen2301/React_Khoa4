import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/StatusContant";

export const getAllStatus = (data) =>({
    type: GET_ALL_STATUS,
    statusList: data
})

export const getAllStatusSaga = () =>({
    type: GET_ALL_STATUS_SAGA
})