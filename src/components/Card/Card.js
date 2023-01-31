import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFilmList } from "../../redux/action/FilmAction";
import { Carousel } from "antd";
import {
  PHIM_DANG_CHIEU,
  PHIM_SAP_CHIEU,
} from "../../redux/constant/FilmConst";

export default function Card() {
  const { filmList } = useSelector((state) => state.FilmReducer);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFilmCard = () => {
    return filmList?.map((item, index) => {
      return (
        <div key={index} className="flip">
          <div
            className="front"
            style={{ backgroundImage: `url(${item.hinhAnh})` }}
          ></div>
          <div className="back">
            <h3 className="card-title text-xl text-center">{item.tenPhim}</h3>
            <p className="card-description text-justify">{item.moTa}</p>
            <Link className="button-primary" to={`/detail/${item.maPhim}`}>
              Details
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <section>
      <div className="text-center">
        <button className="mx-5"
          onClick={() => {
            const action = { type: PHIM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          Phim đang chiếu
        </button>
        <button className="mx-5"
          onClick={() => {
            const action = { type: PHIM_SAP_CHIEU };
            dispatch(action);
          }}
        >
          Phim sắp chiếu
        </button>
      </div>
      <Carousel
        className="carousel-card"
        draggable={true}
        slidesToShow={4}
        slidesToScroll={1}
        // rows={2}
      >
        {renderFilmCard()}
      </Carousel>
    </section>
  );
}
