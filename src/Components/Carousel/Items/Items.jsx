import React from "react";
import { Paper } from '@mui/material'

function Items(props) {
  return (
  <Paper className="carousel-banner">
    {/* <div className="carousel-info">
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </div> */}
    <img className="carousel-image" src={props.item.img} alt={props.item.name} />
  </Paper>
  );
}

export default Items;
