import Axios from "axios";
import {
  DOMAIN,
  STATUS_CODE,
  TOKEN,
} from "../../utils/constants/settingGlobal";
import { BOOKING_SUCCESS, GET_FILM_TICKET } from "../constant/TicketConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConst";

export const getFilmTicket = (id) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_TICKET,
          ticketData: data.content,
        });
      }
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const bookTicket = (infoTicket) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyDatVe/DatVe`,
        method: "POST",
        data: infoTicket,
        headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      });
      console.log("data", data);

      // Đặt vé thành công gọi api load lại phòng vé
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(getFilmTicket(infoTicket.maLichChieu));
      }

      await dispatch({
        type: BOOKING_SUCCESS,
      });

      dispatch({
        type: HIDE_LOADING,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
