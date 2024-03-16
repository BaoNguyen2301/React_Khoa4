import {all} from 'redux-saga/effects';
import * as ToDoListSagaAction from './ToDoListSagaAction'
import * as UserCyberbugsSaga from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga'
import * as PrioritySaga from './Cyberbugs/PrioritySaga'
import * as TaskSaga from './Cyberbugs/TaskSaga'
import * as StatusSaga from './Cyberbugs/StatusSaga'
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
        UserCyberbugsSaga.followGetUserByProjectSaga(),
        
        ProjectCategorySaga.followGetAllProjectCategorySaga(),

        ProjectSaga.followCreateProjectSaga(),
        ProjectSaga.followGetListProjectSaga(),
        ProjectSaga.followUpdateProjectSaga(),
        ProjectSaga.followDeleteProjectSaga(),
        ProjectSaga.followGetProjectDetailSaga(),
        ProjectSaga.followGetAllProjectSaga(),

        TaskTypeSaga.followGetAllTaskTypeSaga(),

        PrioritySaga.followGetAllPrioritySaga(),

        TaskSaga.followCreateTaskSaga(),
        TaskSaga.followGetTaskDetailSaga(),
        TaskSaga.followUpdateTaskStatusSaga(),

        StatusSaga.followGetAllStatusSaga()

    ])
}