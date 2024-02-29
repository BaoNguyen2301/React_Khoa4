import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/CyberbugContant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { userService } from '../../../services/UserService'




function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => { return cyberbugsService.signinCyberBugs(action.userLogin) })
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: USLOGIN,
                userLogin: data.content
            })
        }


        let history = yield select(state => state.HistoryReducer.history)
        history.push('/home')
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga)
}

//--------------------------Get User-------------------------

function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => { return userService.getUser(action.keyWord) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_USER_SEARCH',
                listUserSearch: data.content
            })
        }

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga)
}

//--------------------------Add User-------------------------

function* addUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => { return userService.assignUserProject(action.userProject) })
        
        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followAddUserProject() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga)
}

//--------------------------Delete User-------------------------

function* deleteUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => { return userService.deleteUserFromProject(action.userDelete) })
        
        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followDeleteUserProject() {
    yield takeLatest('DELETE_USER_PROJECT_API', deleteUserProjectSaga)
}