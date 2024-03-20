import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, GET_TASK_DETAIL, REMOVE_USER_ASSIGNESS } from "../constants/Cyberbugs/TaskContant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  taskDetailModal: {
    "statusCode": 200,
    "message": "Xử lý thành công!",
    "content": {
      "priorityTask": {
        "priorityId": 3,
        "priority": "Low"
      },
      "taskTypeDetail": {
        "id": 2,
        "taskType": "new task"
      },
      "assigness": [],
      "lstComment": [],
      "taskId": 11740,
      "taskName": "task 1a",
      "alias": "task-1a",
      "description": "<p>aaaaaaaaa</p>",
      "statusId": "3",
      "originalEstimate": 10,
      "timeTrackingSpent": 5,
      "timeTrackingRemaining": 5,
      "typeId": 2,
      "priorityId": 3,
      "projectId": 15099
    },
    "dateTime": "2024-03-18T15:26:43.614202+07:00"
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_TASK_DETAIL:
      return { ...state, taskDetailModal: action.taskDetailModal }

    case CHANGE_TASK_MODEL:
      const { name, value } = action;
      return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
    case CHANGE_ASSIGNESS:
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected]
      return { ...state }
    case REMOVE_USER_ASSIGNESS:
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
      return { ...state }
    default:
      return state
  }
}
