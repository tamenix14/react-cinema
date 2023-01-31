import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/action/ManageUser";

export default function Login() {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.UserReducer);

  console.log(userLogin);

  const formik = useFormik({
    initialValues: {
      taikhoan: "",
      matkhau: "",
    },
    onSubmit: (values) => {
      const action = userLoginAction(values);
      dispatch(action);
      console.log(values);
    },
  });

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center mx-auto text-left align-bottom transition-all transhtmlForm bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
            <form onSubmit={formik.handleSubmit} className="w-full px-6 py-3">
              <div>
                <div className="mt-3 text-left sm:mt-5">
                  <div className="inline-flex items-center w-full">
                    <h3 className="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">
                      Login
                    </h3>
                  </div>
                  <div className="mt-4 text-base text-gray-500">
                    <p>Sign up and get our newest news.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-3">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    name="taikhoan"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transhtmlForm border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="password"
                    name="matkhau"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transhtmlForm border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transhtmlForm bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="order-first hidden w-full lg:block">
              <img
                className="object-cover h-full bg-cover rounded-l-lg"
                src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=htmlFormat&amp;fit=crop&amp;w=1000&amp;q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
