import { call, put, takeLatest } from "redux-saga/effects"
import { statusService } from "../../../services/StatusService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/StatusContant"
import { getAllStatus } from "../../actions/CyberBugs/StatusAction"

/* eslint-disable require-yield */
function * getAllStatusSaga(){
    try{
        const{data, status} = yield call(()=> statusService.getAllStatus())
        if(status === STATUS_CODE.SUCCESS){
            yield put(
                getAllStatus(data.content)
            )
        }
    }catch(err){
        console.log(err)
    }
}

export function * followGetAllStatusSaga(){
    yield takeLatest (GET_ALL_STATUS_SAGA, getAllStatusSaga)
}