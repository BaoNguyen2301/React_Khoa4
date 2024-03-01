import {all} from 'redux-saga/effects';
import * as ToDoListSagaAction from './ToDoListSagaAction'
import * as UserCyberbugsSaga from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
export function * rootSaga (){
    // yield fork(getTaskApiSaga)
    yield all([
        ToDoListSagaAction.followActionGetTaskApi(),
        ToDoListSagaAction.followActionAddTaskApi(),
        ToDoListSagaAction.followActionDeleteTaskApi(),
        ToDoListSagaAction.followActionDoneTaskApi(),
        ToDoListSagaAction.followActionRejectTaskApi(),

        UserCyberbugsSaga.followSignin(),
        UserCyberbugsSaga.followGetUser(),
        UserCyberbugsSaga.followAddUserProject(),
        UserCyberbugsSaga.followDeleteUserProject(),
        
        ProjectCategorySaga.followGetAllProjectCategorySaga(),

        ProjectSaga.followCreateProjectSaga(),
        ProjectSaga.followGetListProjectSaga(),
        ProjectSaga.followUpdateProjectSaga(),
        ProjectSaga.followDeleteProjectSaga(),
        ProjectSaga.followGetProjectDetailSaga()

    ])
}