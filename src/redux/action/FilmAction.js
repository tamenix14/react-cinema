import Axios from "axios";
import { GET_FILM_API } from "../constants/FilmConst";

// export const getFilmApi = () => {
//   return (dispatch) => {
//     let promise = new Axios({
//       url: `http://svcy.myclass.vn/api/Movie/GetMovie`,
//       method: "GET",
//     });
//     promise.then((result) => {
//       dispatch({
//         type: GET_FILM_API,
//         filmList: result.data,
//       });
//     });
//     promise.catch((errors) => {
//       alert(errors.response.data);
//     });
//   };
// };