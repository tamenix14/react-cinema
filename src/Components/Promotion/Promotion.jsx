import React from "react";
import { TitleH2,Link } from "../../Styled/styled";

export default function Promotion() {
  var promotionCard = [
    {
      name: "no1",
      img: "./assets/img/promotion_1.png",
    },
    {
      name: "no2",
      img: "./assets/img/promotion_2.jpg",
    },
    {
      name: "no3",
      img: "./assets/img/promotion_3.png",
    },
  ];

  return (
    <div>
      <TitleH2 className="promotion-title">Promotion</TitleH2>
      <ul className="promotion-list">
        {promotionCard.map((item, index) => {
          return (
            <li key={index}>
              <Link href="#">
                <img className="promotion-image" src={item.img} alt={item.name} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
