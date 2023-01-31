import { Tabs } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import CarouselComponent from "../../components/Carousel/Carousel";
import { getTheater } from "../../redux/action/TheaterAction";

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [tabPosition, setTabPosition] = useState("left");

  const dispatch = useDispatch();
  const { theaterData } = useSelector((state) => state.TheaterReducer);
  console.log(theaterData);

  useEffect(() => {
    dispatch(getTheater());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Truyền value + label vào Tabs của antd
  const TabsData = theaterData?.map((item, index) => ({
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
    children: (
      <Tabs
        tabPosition={tabPosition}
        items={item.lstCumRap.map((list, index) => ({
          ...list,
          label: (
            <div className="flex">
              <img
                style={{ width: "80px", height: "80px" }}
                src={list.hinhAnh}
                alt={list.tenCumRap}
              />
              <div>
                <p>{list.tenCumRap}</p>
              </div>
            </div>
          ),
          key: index,
          children: list.danhSachPhim.slice(0,10).map((phim, index) => {
            return (
              <div key={index}>
                <div className="flex">
                  <img
                    style={{ width: "90px", height: "90px" }}
                    src={phim.hinhAnh}
                    alt={phim.tenPhim}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                    }}
                  />
                  <div>
                    <p>{phim.tenPhim}</p>
                  </div>
                </div>
                <div className="border-b">
                  {phim.lstLichChieuTheoPhim.slice(0,15).map((lich, index) => {
                    return (
                      <Link to="/" key={index} className="inline-flex border mr-2 mb-2" style={{wordBreak: "break-all", color: "blue"}}>
                        {moment(lich.ngayChieuGioChieu).format("hh:mm A")}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }),
        }))}
      />
    ),
  }));

  return (
    <div>
      <CarouselComponent />
      <div className="container mx-auto">
        <Card />
        <Tabs tabPosition={tabPosition} items={TabsData} />
      </div>
    </div>
  );
}
