import Axios from "axios";
import { DOMAIN, STATUS_CODE } from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";
import { GET_ALL_USERS, USER_LOGIN } from "../constant/UserConst";

export const userLoginAction = (loginData) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyNguoiDung/DangNhap`,
        method: "POST",
        data: loginData,
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: USER_LOGIN,
          loginData: data.content,
        });
        history.back();
      }
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_ALL_USERS,
          allUsers: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};