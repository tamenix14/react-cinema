import Axios from "axios";
import {
  DOMAIN,
  STATUS_CODE,
  TOKEN,
} from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";
import {
  GET_FILM_BANNER,
  GET_FILM_LIST,
  GET_FILM_DETAILS,
  GET_INFO_FILM_EDIT,
} from "../constant/FilmConst";

export const getFilmBanner = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyPhim/LayDanhSachBanner`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_BANNER,
          filmBanner: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getFilmList = (filmName = "") => {
  return async (dispatch) => {
    try {
      if (filmName.trim() !== "") {
        let { data, status } = await Axios({
          url: `${DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${filmName}`,
          method: "GET",
        });
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_FILM_LIST,
            filmList: data.content,
          });
        }
      } else {
        let { data, status } = await Axios({
          url: `${DOMAIN}/QuanLyPhim/LayDanhSachPhim`,
          method: "GET",
        });
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_FILM_LIST,
            filmList: data.content,
          });
        }
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getFilmDetails = (id) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_DETAILS,
          filmDetails: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const uploadImageFilm = (formData) => {
  return async (dispatch) => {
    try {
      let { data } = await Axios({
        url: `${DOMAIN}/QuanLyPhim/ThemPhimUploadHinh`,
        method: "POST",
        data: formData,
      });
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getInfoEditFilm = (id) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_INFO_FILM_EDIT,
          filmInfo: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const updateFilm = (formData) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyPhim/CapNhatPhimUpload`,
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        data: formData,
      });
      if (status === STATUS_CODE.SUCCESS) {
        alert("Cập nhật phim thành công");
        dispatch(getFilmList());
        history.push("/admin/films");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const deleteFilm = (id) => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}//QuanLyPhim/XoaPhim?MaPhim=${id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      });
      if (status === STATUS_CODE.SUCCESS) {
        alert("Xóa phim thành công");
        dispatch(getFilmList());
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
