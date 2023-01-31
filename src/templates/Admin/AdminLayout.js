import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";
import { DashboardOutlined, TableOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

export default function AdminLayout() {
  const { userLogin } = useSelector((state) => state.UserReducer);

  if (!localStorage.getItem(USER_LOGIN) || userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("You're not allow to access this site");
    history.back();
  }

  const { Content, Sider } = Layout;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(
      <NavLink style={{ textDecoration: "none" }} to="/admin/dashboard">
        Dashboard
      </NavLink>,
      "link 1",
      <DashboardOutlined />,
    ),
    getItem(
      <NavLink style={{ textDecoration: "none" }} to="/admin/films">
        Manage Films
      </NavLink>,
      "link 2",
      <TableOutlined />
    ),
    getItem(
      <NavLink style={{ textDecoration: "none" }} to="/admin/films/addfilm">
        Add Films
      </NavLink>,
      "link 3",
      <PlusOutlined />
    ),
    getItem(
      <NavLink style={{ textDecoration: "none" }} to="/admin/users">
        Manage Users
      </NavLink>,
      "link 5",
      <TableOutlined />
    ),
    getItem(
      <NavLink style={{ textDecoration: "none" }} to="/admin/users/adduser">
        Add User
      </NavLink>,
      "link 6",
      <PlusOutlined />
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 22,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
