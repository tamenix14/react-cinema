import {
  GET_FILM_BANNER,
  GET_FILM_DETAILS,
  GET_FILM_LIST,
  GET_INFO_FILM_EDIT,
  PHIM_DANG_CHIEU,
  PHIM_SAP_CHIEU,
} from "../constant/FilmConst";

const initialState = {
  filmBanner: [],
  filmList: [],
  dangChieu: true,
  sapChieu: true,
  filmListDefault: [],

  //Film detail
  filmDetails: {},

  // Info for edit film
  filmInfo: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILM_BANNER:
      state.filmBanner = action.filmBanner;
      return { ...state };

    case GET_FILM_LIST:
      state.filmList = action.filmList;
      state.filmListDefault = state.filmList;
      return { ...state };

    case PHIM_DANG_CHIEU:
      state.dangChieu = !action.dangChieu;
      state.filmList = state.filmListDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };

    case PHIM_SAP_CHIEU:
      state.sapChieu = !action.sapChieu;
      state.filmList = state.filmListDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };

    case GET_FILM_DETAILS:
      state.filmDetails = action.filmDetails;
      return { ...state };

    case GET_INFO_FILM_EDIT:
      state.filmInfo = action.filmInfo;
      return { ...state };

    default:
      return state;
  }
};
