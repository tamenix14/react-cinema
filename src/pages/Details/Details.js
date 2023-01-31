import { Rate, Tabs } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFilmDetails } from "../../redux/action/FilmAction";

export default function Details() {
  // eslint-disable-next-line no-unused-vars
  const [tabPosition, setTabPosition] = useState("left");
  let dispatch = useDispatch();
  const { filmDetails } = useSelector((state) => state.FilmReducer);
  console.log(filmDetails);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getFilmDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFilmDetails = () => {
    return (
      <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
        <img
          alt={filmDetails.tenPhim}
          className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          src={filmDetails.hinhAnh}
          style={{
            width: "300px",
            height: "400px",
          }}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <span className="block mb-2">
            Ngày khởi chiếu:{" "}
            {moment(filmDetails.ngayKhoiChieu).format("MM-DD-YYYY")}
          </span>
          <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {filmDetails.tenPhim}
          </h2>
          <Rate
            className="mb-3"
            allowHalf
            value={filmDetails.danhGia / 2}
            disabled
          />
          <p className="leading-relaxed">{filmDetails.moTa}</p>
        </div>
      </div>
    );
  };

  const filmTheater = filmDetails.heThongRapChieu?.map((item, index) => ({
    ...item,
    label: (
      <img
        style={{
          width: "50px",
          height: "50px",
        }}
        src={item.logo}
        alt={item.maHeThongRap}
      />
    ),
    key: index,
    children: item.cumRapChieu?.map((htr, index) => {
      return (
        <div key={index}>
          <div className="flex mb-2">
            <img
              style={{
                marginRight: "10px",
                width: "70px",
                height: "70px",
              }}
              src={htr.hinhAnh}
              alt={htr.tenHeThongRap}
            />
            <div>
              <p>{htr.tenCumRap}</p>
              <p>{htr.diaChi}</p>
            </div>
          </div>
          <ul className="flex">
            {htr.lichChieuPhim?.map((lcp, index) => {
              return (
                <li key={index}>
                  <Link className="block mr-2 border p-2" to={`/checkout/${lcp.maLichChieu}`}>{moment(lcp.ngayChieuGioChieu).format("hh:mm A")}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }),
  }));

  return (
    <section className="container text-gray-700 body-font overflow-hidden bg-white mx-auto">
      <div className="container px-5 py-24 mx-auto">{renderFilmDetails()}</div>
      <Tabs tabPosition={tabPosition} items={filmTheater} />
    </section>
  );
}
