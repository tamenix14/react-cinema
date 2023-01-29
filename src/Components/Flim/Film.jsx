import React, { useEffect, useState } from "react";
import Axios from "axios";
// Tab
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Carousel
import Carousel from "react-material-ui-carousel";

// Import
import CardFilm from "./Card/CardFilm";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { GET_FILM_API } from "../../redux/constants/FilmConst";

export default function Flim() {

  const { filmList } = useSelector((state) => state.FilmReducer);

  let dispatch = useDispatch();

  const getAllFilms = () => {
    let promise = new Axios({
      url: `http://svcy.myclass.vn/api/Movie/GetMovie`,
      method: "GET",
    });
    promise.then((result) => {
      dispatch({
        type: GET_FILM_API,
        filmList: result.data,
      });
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
  console.log(filmList);

  useEffect(() => {
    getAllFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Config carousel multiple
  const sliderItems = filmList.length > 4 ? 4 : filmList.length;

  const items = [];

  for (let i = 0; i < filmList.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <div className="film-carousel">
          {filmList.slice(i, i + sliderItems).map((film, index) => {
            return <CardFilm key={index} info={film} />;
          })}
        </div>
      );
    }
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs" centered>
          <Tab sx={{ color: "white" }} label="Phim đang chiếu" value="1" />
          <Tab sx={{ color: "white" }} label="Phim sắp chiếu" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        {filmList.length > 1 ? (
          <Carousel
            indicators={false}
            autoPlay={false}
            navButtonsProps={{ style: { opacity: 1 } }}
          >
            {items}
          </Carousel>
        ) : (
          <p className="text-center">Hiện tại không có phim đang chiếu !!</p>
        )}
      </TabPanel>
      <TabPanel value="2">
        {/* {filmsSoon.length > 1 ? (
          <Carousel>
            {filmsSoon.map((film, index) => {
              return <CardFilm key={index} info={film} />;
            })}
          </Carousel>
        ) : (
          <p className="text-center">Hiện tại không có phim gì sắp chiếu !!</p>
        )} */}
      </TabPanel>
    </TabContext>
  );
}
