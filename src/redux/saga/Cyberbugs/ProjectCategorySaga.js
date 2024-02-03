import axios from 'axios'
import { take, fork, takeEvery, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsService'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/CyberbugContant'

function * getAllProjectCategorySaga(action){
    try{
        const {data, status} = yield call(()=>{ return cyberbugsService.getAllProjectCategory()})
        console.log(data)
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }
       
    }catch(err){
        console.log(err)
    }
}

export function * followGetAllProjectCategorySaga(){
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}

