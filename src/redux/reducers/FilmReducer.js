import { GET_FILM_API } from "../constants/FilmConst"

const initialState = {
  filmList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_FILM_API:
    state.filmList = action.filmList;
    return { ...state}

  default:
    return state
  }
}
