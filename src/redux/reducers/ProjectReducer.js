/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  projectEdit: {
    "id": 0,
    "projectName": "string",
    "creator": 0,
    "description": "string",
    "categoryId": "string"
  },
  projectDetail: {

  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'EDIT_PROJECT':
      state.projectEdit = action.projectEditModel
      return { ...state }
    case 'PUT_DETAIL_SAGA':
      state.projectDetail = action.projectDetail
      return { ...state }
    default:
      return { ...state }
  }
}
