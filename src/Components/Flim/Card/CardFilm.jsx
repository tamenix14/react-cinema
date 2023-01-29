import React from "react";
import { Button, Film, Link } from "../../../Styled/styled";

export default function CardFilm(props) {
  return (
    <Film>
      <Link href="#" className="flim-info">
        <img className="info-image" src={props.info.Image} alt={props.info.Title} />
        <p className="info-title">{props.info.Title}</p>
        <p className="info-description">{props.info.Description}</p>
      </Link>
      <Button>Đặt vé</Button>
    </Film>
  );
}
