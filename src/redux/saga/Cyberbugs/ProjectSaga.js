import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/CyberbugContant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant'
import { projectService } from '../../../services/ProjectService'
import {openNotificationWithIcon } from '../../../util/Notification/notificationCyberBugs'

function* createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => { return cyberbugsService.createProjectAuthorization(action.newProject) })
        if (status === STATUS_CODE.SUCCESS) {
            let history = yield select(state => state.HistoryReducer.history)
            history.push('/projectmanagement')
        }

    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}


//---------------------------------

function* getListProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberbugsService.getListProject())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT',
                listProject: data.content
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* followGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga)
}

//-----------------Update Project ----------------------

function* updateProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => { return cyberbugsService.updateProject(action.projectUpdate) })
        if (status === STATUS_CODE.SUCCESS) {
            // let history = yield select(state => state.HistoryReducer.history)
            // history.push('/projectmanagement')
            yield put ({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            yield put ({
                type: 'CLOSE_DRAWER'
            })
        }

    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga)
}

//-----------------Delete Project ----------------------

function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => { return projectService.deleteProject(action.idProject) })
        if (status === STATUS_CODE.SUCCESS) {   
            openNotificationWithIcon('success', 'Delete project successfuly!')
            yield put ({
                type: 'GET_LIST_PROJECT_SAGA'
            })
        }else{
            openNotificationWithIcon('error', 'Delete project fail!')
        }
        

    } catch (err) {
        console.log(err)
        openNotificationWithIcon('error', 'Delete project fail!')
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga)
}