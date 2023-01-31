import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFilmBanner } from "../../redux/action/FilmAction";

const contentStyle = {
  // height: "700px",
  width: "100%",
  height: "100%",
};

export default function CarouselComponent() {
  const { filmBanner } = useSelector((state) => state.FilmReducer);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmBanner());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RightArrow = () => {
    return (
        <button>awdawdawd</button>
    )
}

const LeftArrow = () => {
    return (
      <button>awdawdawd</button>
    )
}

  const renderFilmBanner = () => {
    return filmBanner.map((item, index) => {
      return (
        <div key={index}>
          <img style={contentStyle} src={item.hinhAnh} alt={item.maBanner} />
        </div>
      );
    });
  };

  return (
    <Carousel style={{marginBottom: "100px"}} effect="fade" autoplay draggable={true} prevArrow={LeftArrow()}
    nextArrow={RightArrow()}>
      {renderFilmBanner()}
    </Carousel>
  );
}
