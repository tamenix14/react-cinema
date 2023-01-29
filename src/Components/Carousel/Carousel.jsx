import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Items/Items";

function CarouselSection() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: "./assets/img/banner_1.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: "./assets/img/banner_2.jpg",
    },
  ];

  return (
    <Carousel navButtonsProps={{ style: { opacity: 1 } }}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default CarouselSection;
