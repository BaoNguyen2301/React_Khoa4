import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/CyberbugContant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE, TOKEN, USER_LOGIN} from '../../../util/constants/settingSystem'




function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(()=> {return cyberbugsService.signinCyberBugs(action.userLogin)})
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content)) 
        
        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        let history = yield select (state => state.HistoryReducer.history)
        history.push('/home')
    }catch(err){
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga)
}