import {all} from 'redux-saga/effects';
import * as ToDoListSagaAction from './ToDoListSagaAction'
import * as UserCyberbugsSaga from './Cyberbugs/UserCyberbugsSaga'
export function * rootSaga (){
    // yield fork(getTaskApiSaga)
    yield all([
        ToDoListSagaAction.followActionGetTaskApi(),
        ToDoListSagaAction.followActionAddTaskApi(),
        ToDoListSagaAction.followActionDeleteTaskApi(),
        ToDoListSagaAction.followActionDoneTaskApi(),
        ToDoListSagaAction.followActionRejectTaskApi(),

        UserCyberbugsSaga.followSignin()

    ])
}