import { call, delay, put, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberBugs";
import { GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskContant";

/* eslint-disable require-yield */
function * createTaskSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data, status} = yield call (()=> taskService.createTask(action.taskObject))

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }

        openNotificationWithIcon('success', 'Create task successfuly!')
        
        yield put({type: 'CLOSE_DRAWER'})
    }catch(err){
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * followCreateTaskSaga(){
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga)
}

//----------------Get Task Detail----------------

function * getTaskDetailSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data, status} = yield call (()=> taskService.getTaskDetail(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put ({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }

        
    }catch(err){
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * followGetTaskDetailSaga(){
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}