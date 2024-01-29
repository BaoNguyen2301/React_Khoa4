import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay } from 'redux-saga/effects'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConstant'
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from '../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConstant'
function* getTaskApiSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // while(true){
        //     yield take('getTaskApiSaga');
        // console.log('111')
        // }
        let res = yield call(toDoListService.getTaskApi)
        yield delay(500);
        //sau khi lay gia tri thanh cong dung put(giong dispatch ben thunk)
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: res.data
            })
        } else {
            console.log('error')
        }

    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* followActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiSaga)
}

//add task api saga

function* addTaskApiSaga(action) {
    const { taskName } = action;
    try {
        const promise = yield call(() => { return toDoListService.addTaskApi(taskName) })
        if (promise.status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        } else {
            console.log('error')
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiSaga)
}
//delete task api saga
function* deleteTaskApiSaga(action) {
    const { taskName } = action;
    try {
        const { status } = yield call(() => { return toDoListService.deleteTaskApi(taskName) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function* followActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApiSaga)
}

//done task api saga
function * doneTaskApiSaga(action){
    const {taskName} = action;
    try{
        const {status} = yield call(()=>{return toDoListService.doneTaskApi(taskName)})
        if(status=== STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function * followActionDoneTaskApi(){
    yield takeLatest(CHECK_TASK_API, doneTaskApiSaga)
}

// reject task api saga

function * rejectTaskApiSaga(action){
    const {taskName} = action;
    try{
        const {status} = yield call(()=>{return toDoListService.rejectTaskApi(taskName)})
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function * followActionRejectTaskApi(){
    yield takeLatest(REJECT_TASK_API, rejectTaskApiSaga)
}

