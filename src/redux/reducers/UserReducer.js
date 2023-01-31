import { TOKEN } from "../../utils/constants/settingGlobal";
import { GET_ALL_USERS, USER_LOGIN } from "../constant/UserConst";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  allUsers: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      const { loginData } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(loginData));
      localStorage.setItem(TOKEN, loginData.accessToken);
      return { ...state, userLogin: loginData };
    case GET_ALL_USERS:
      state.allUsers = action.allUsers;
      return { ...state };
    default:
      return state;
  }
};
