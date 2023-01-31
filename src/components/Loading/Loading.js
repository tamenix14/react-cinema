import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import LoadingStyle from "../Loading/Loading.module.css";

export default function Loading() {
  let { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={LoadingStyle.loading}>
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  } else {
    return "";
  }
}
