import { call, put, takeLatest } from "redux-saga/effects"
import { priorityService } from "../../../services/PriorityService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs/PriorityContant"
import { getAllPriority } from "../../actions/CyberBugs/PriorityAction"

// eslint-disable-next-line require-yield
function * getAllPrioritySaga(action){
    try{
        const {data, status} = yield call(()=> priorityService.getAllPriority(action.id))
        if(status === STATUS_CODE.SUCCESS){
            yield put(getAllPriority(data.content))
        }
    }catch(err){
        console.log(err)
    }
}

export function * followGetAllPrioritySaga(){
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}