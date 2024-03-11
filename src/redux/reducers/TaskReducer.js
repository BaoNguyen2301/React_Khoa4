/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  taskDetailModal: {
    "priorityTask": {
      "priorityId": 4,
      "priority": "Lowest"
    },
    "taskTypeDetail": {
      "id": 2,
      "taskType": "new task"
    },
    "assigness": [
      {
        "id": 5707,
        "avatar": "https://ui-avatars.com/api/?name=Banh my",
        "name": "Banh my",
        "alias": "banh-my"
      },
      {
        "id": 5676,
        "avatar": "https://ui-avatars.com/api/?name=cyber",
        "name": "cyber",
        "alias": "cyber"
      }
    ],
    "lstComment": [],
    "taskId": 11719,
    "taskName": "bao12334555",
    "alias": "bao12334555",
    "description": "<p>aaaaaaa</p>",
    "statusId": "1",
    "originalEstimate": 1,
    "timeTrackingSpent": 3,
    "timeTrackingRemaining": 2,
    "typeId": 0,
    "priorityId": 0,
    "projectId": 15079
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'first':
      return { ...state }

    default:
      return state
  }
}
