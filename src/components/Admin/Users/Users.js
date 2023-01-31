import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllUser } from "../../../redux/action/ManageUser";

export default function Users() {
  const { allUsers } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Phone",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Role",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <>
            <button className="mr-5 hover:text-orange-500">
              <EditOutlined />
            </button>
            <button className="hover:text-red-500">
              <DeleteOutlined />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={"taiKhoan"}
      dataSource={allUsers}
      // onChange={handleChange}
    />
  );
}
