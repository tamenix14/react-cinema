import React from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../utils/constants/settingGlobal";

export default function HeaderNav() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log(userLogin);

  const { t, i18n } = useTranslation();

  const { Option } = Select;

  const handleLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const Logout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_LOGIN);
    window.location.reload();
  };

  const userAuthor = () => {
    if (!localStorage.getItem(TOKEN)) {
      return (
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/login" className="mr-5 hover:text-gray-900">
            {t("Signin")}
          </Link>
          <Link to="/register" className="mr-5 hover:text-gray-900">
            Register
          </Link>
        </nav>
      );
    }
    return (
      <div>
        Hello, {userLogin.hoTen}
        <button className="ml-5 text-blue-600" onClick={Logout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <RotatingTriangles
            visible={true}
            height="50"
            width="50"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
          />
          <span className="ml-3 text-xl">Movie Center</span>
        </Link>
        <div className="flex ml-auto items-center">
          {userAuthor()}
          <Select
            className="block ml-5"
            defaultValue="Eng"
            onChange={handleLanguage}
          >
            <Option value="en">Eng</Option>
            <Option value="chi">China</Option>
            <Option value="vn">Vietnam</Option>
          </Select>
        </div>
      </div>
    </header>
  );
}
