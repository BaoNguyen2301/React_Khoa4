import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs/CyberbugContant";
import { GET_USER_BY_PROJECT_ID } from "../constants/Cyberbugs/UserContant";


let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: []
  // arrUser: [] //Array user cho the Select trong formCreateTask
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin
      return { ...state }
    }
    case 'GET_USER_SEARCH': {
      state.userSearch = action.listUserSearch;
      return { ...state }
    }
    case GET_USER_BY_PROJECT_ID:
      return { ...state, arrUser: action.arrUser }
    default:
      return { ...state }
  }
}
