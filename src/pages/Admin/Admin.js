import React from "react";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";

export default function Admin() {
  const { userLogin } = useSelector((state) => state.UserReducer);

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
      <h2 className="text-4xl font-bold leading-none sm:text-5xl">
        Welcome <span className="text-indigo-600">{userLogin.hoTen}</span>
      </h2>
      <p className="px-8 mt-4 mb-12 text-lg">
        It's pleasure to see you come here!
        <br />
        Please check out something changed
      </p>
      <div className="flex flex-wrap justify-center">
        <button
          className="px-8 py-4 m-2 text-lg font-semibold rounded bg-indigo-600 text-gray-50"
          onClick={() => {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            history.push("/");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
