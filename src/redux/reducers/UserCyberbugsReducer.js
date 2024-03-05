import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs/CyberbugContant";


let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  // arrUser: [] //Array user cho the Select trong formCreateTask
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin
      return {...state}
    }
    case 'GET_USER_SEARCH': {
      state.userSearch = action.listUserSearch;
      return {...state}
    }
    default:
      return { ...state }
  }
}
