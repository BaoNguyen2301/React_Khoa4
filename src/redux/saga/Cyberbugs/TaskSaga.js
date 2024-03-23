/* eslint-disable default-case */
import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberBugs";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGNESS, UPDATE_TASK_STATUS_SAGA } from "../../constants/Cyberbugs/TaskContant";

/* eslint-disable require-yield */
function* createTaskSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => taskService.createTask(action.taskObject))

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
        }

        openNotificationWithIcon('success', 'Create task successfuly!')

        yield put({ type: 'CLOSE_DRAWER' })
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga)
}

//----------------Get Task Detail----------------

function* getTaskDetailSaga(action) {
    // yield put({
    //     type: DISPLAY_LOADING
    // })
    yield delay(500);
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })


        }

    } catch (err) {
        console.log(err)
    }
    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function* followGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

//----------------Update Task Status----------------

function* updateTaskStatusSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.updateStatusTask(action.taskStatusUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL_SAGA',
                projectId: action.taskStatusUpdate.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskStatusUpdate.taskId
            })

            openNotificationWithIcon('success', 'Update task successfuly!')

            // yield put({ type: 'CLOSE_DRAWER' })
        }


    } catch (err) {
        console.log(err)
    }
}

export function* followUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga)
}


//----------------------Update Task------------------------------

function* handleChangePostApi(action) {
    const { value, name, userSelected, userId } = action
    //Goi action lam thay doi task detail modal
    switch (action.actionType) {
        case CHANGE_TASK_MODEL: {
            yield put({
                type: CHANGE_TASK_MODEL,
                name,
                value
            })
            break;
        }
        case CHANGE_ASSIGNESS: {
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
            break;
        }
        case REMOVE_USER_ASSIGNESS: {
            yield put({
                type: REMOVE_USER_ASSIGNESS,
                userId
            })
            break;
        }
    }
    //Save qua api update
    //Lay du lieu tu state.taskDetailModal
    let { taskDetailModal } = yield select(state => state.TaskReducer)
    //Bien doi du lieu state.taskDetailModal thanh du lieu api can
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    })
    const taskUpdateApi = { ...taskDetailModal, listUserAsign }

    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function* followHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi)
}