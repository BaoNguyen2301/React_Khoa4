import { call, put, takeLatest } from "redux-saga/effects"
import { taskTypeService } from "../../../services/TaskTypeService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_ALL_TASK_TYPE_SAGA, } from "../../constants/Cyberbugs/TaskTypeContant"
import { getAllTaskTypeAction } from "../../actions/CyberBugs/TaskTypeAction"

// eslint-disable-next-line require-yield
function* getAllTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => taskTypeService.getAllTaskType())
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllTaskTypeAction(data.content))
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}