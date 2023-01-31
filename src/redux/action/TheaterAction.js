import Axios from "axios";
import {
  DOMAIN,
  STATUS_CODE,
  TOKEN,
} from "../../utils/constants/settingGlobal";
import { GET_THEATER } from "../constant/TheaterConst";

export const getTheater = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyRap/LayThongTinLichChieuHeThongRap`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_THEATER,
          theaterData: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const createFilmSchedule = (values) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyDatVe/TaoLichChieu`,
        method: "POST",
        data: values,
        headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      });
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
