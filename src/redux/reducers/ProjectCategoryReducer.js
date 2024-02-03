import { GET_ALL_PROJECT_CATEGORY } from "../constants/Cyberbugs/CyberbugContant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    arrProjectCategory:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_PROJECT_CATEGORY:
    state.arrProjectCategory = action.data
    return { ...state}

  default:
    return { ...state}
  }
}
