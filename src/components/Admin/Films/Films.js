import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { deleteFilm, getFilmList } from "../../../redux/action/FilmAction";
import { NavLink } from "react-router-dom";
import Search from "antd/es/input/Search";

export default function Films() {
  const { filmListDefault } = useSelector((state) => state.FilmReducer);

  const dispatch = useDispatch();

  // console.log(filmListDefault);

  useEffect(() => {
    dispatch(getFilmList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "maPhim",
      key: "maPhim",
      width: 80,
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      sortDirections: ["descend"],
    },
    {
      title: "Group id",
      dataIndex: "maNhom",
      key: "maNhom",
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return (
          <img
            className="w-[80px] h-[80px]"
            key={index}
            src={record.hinhAnh}
            alt={index}
          />
        );
      },
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
      width: 400,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 150,
      render: (text, record, index) => {
        return (
          <a href={record.trailer} key={index}>
            {record.trailer}
          </a>
        );
      },
    },
    {
      title: "Premiere date",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      width: 200,
      render: (text, record, index) => {
        return (
          <p key={index}>
            {moment(record.ngayKhoiChieu).format("MM-DD-YYYY | HH:MM A")}
          </p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, film) => {
        return (
          <>
            <NavLink
              key={1}
              to={`/admin/films/addschedule/${film.maPhim}`}
              className="mr-5 hover:text-blue-500"
            >
              <CalendarOutlined />
            </NavLink>
            <NavLink
              key={1}
              to={`/admin/films/editfilm/${film.maPhim}`}
              className="mr-5 hover:text-orange-500"
            >
              <EditOutlined />
            </NavLink>
            <span
              key={2}
              className="hover:text-red-500 cursor-pointer"
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa phim" + film.tenPhim)) {
                  dispatch(deleteFilm(film.maPhim));
                }
              }}
            >
              <DeleteOutlined />
            </span>
          </>
        );
      },
    },
  ];

  const onSearch = (value) => {
    console.log(value)
    // gọi api
    dispatch(getFilmList(value))
  }

  return (
    <div>
      <Search className="mb-5"
        placeholder="Input search text"
        size="large"
        onSearch={onSearch}
        // Thử debounce search
      />
      <Table
      columns={columns}
      rowKey={"maPhim"}
      dataSource={filmListDefault}
      // onChange={handleChange}
    />
    </div>
  );
}
