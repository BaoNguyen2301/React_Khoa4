/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "string"
      }
}

export default (state = initialState, action) => {
  switch (action.type) {

  case 'first':
    return { ...state}

  default:
    return { ...state}
  }
}
