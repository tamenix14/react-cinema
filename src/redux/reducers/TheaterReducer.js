import { GET_THEATER } from "../constant/TheaterConst";

const initialState = {
  theaterData: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_THEATER:
      state.theaterData = action.theaterData;
      return { ...state };

    default:
      return state;
  }
};
