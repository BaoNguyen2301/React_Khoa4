import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/CyberbugContant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant'

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