import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";

export default function CheckoutLayout() {
  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      history.push("/login");
    }
  });

  return (
    <div className="container mx-auto">
      <section>
        <Outlet />
      </section>
    </div>
  );
}
