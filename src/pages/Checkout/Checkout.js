import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { bookTicket, getFilmTicket } from "../../redux/action/ManageTicket";
import { SEAT_BOOKING } from "../../redux/constant/TicketConst";
import { TOKEN, USER_LOGIN } from "../../utils/constants/settingGlobal";
import { history } from "../../utils/history/history";
import style from "./Checkout.module.css";

export default function Checkout() {
  const { userLogin } = useSelector((state) => state.UserReducer);

  const { ticketData, listSeatBooking } = useSelector(
    (state) => state.TicketReducer
  );

  let dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getFilmTicket(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container flex w-full mx-auto">
      <div className="seats w-[50%]">
        <div className={`${style.screen} w-[350px] h-[150px] font-bold`}>
          Screen
        </div>
        <div className={`${style.cinemaSeats}`}>
          <div className={`flex flex-wrap`}>
            {ticketData.danhSachGhe?.map((ghe, index) => {
              let seatBooked = ghe.daDat === true ? `${style.seatBooked}` : "";
              let seatVip = ghe.loaiGhe === "Vip" ? `${style.seatVip}` : "";

              // Check ghế đang đặt
              let SeatBooking = "";
              let indexSeatBooking = listSeatBooking.findIndex(
                (seatChoose) => seatChoose.maGhe === ghe.maGhe
              );
              if (indexSeatBooking !== -1) {
                SeatBooking = `${style.seatBooking}`;
              }

              return (
                <div
                  key={index}
                  className={`flex justify-center items-center ${style.seat} ${seatVip} ${seatBooked} ${SeatBooking}`}
                  onClick={() => {
                    dispatch({
                      type: SEAT_BOOKING,
                      seatBooking: ghe,
                    });
                  }}
                >
                  {ghe.daDat === true ? "X" : ghe.stt}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pricing w-[50%]">
        <div className="p-4 w-full">
          <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <div className="user-info mb-3">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                User: {userLogin.email}
              </h2>
              <span className="block text-sm tracking-widest title-font mb-1 font-medium">
                Name: {userLogin.hoTen}
              </span>
              <span className="block text-sm tracking-widest title-font mb-3 font-medium">
                Phone: {userLogin.soDT}
              </span>
              <button
                className="text-blue-600"
                onClick={() => {
                  localStorage.removeItem(TOKEN);
                  localStorage.removeItem(USER_LOGIN);
                  window.location.reload();
                  history.push("/login");
                }}
              >
                Logout
              </button>
            </div>
            <hr />
            <div className="film-info mt-5 mb-3">
              <span className="block mb-2">
                Film name: {ticketData.thongTinPhim?.tenPhim}
              </span>
              <span className="block mb-2">
                Theater name: {ticketData.thongTinPhim?.tenCumRap}
              </span>
              <span className="block mb-2">
                Theater number: {ticketData.thongTinPhim?.tenRap}
              </span>
              <span className="block mb-2">
                Address: {ticketData.thongTinPhim?.diaChi}
              </span>
            </div>
            <hr />
            <div className="sum-info mt-5">
              <span className="flex flex-wrap mb-2">
                Seats:
                {_.sortBy(listSeatBooking, (o) => +o.stt, ["desc"]).map(
                  (seatBooking, index) => {
                    return (
                      <span
                        key={index}
                        className="block w-[40px] text-center border text-white bg-teal-700"
                      >
                        {seatBooking.stt}
                      </span>
                    );
                  }
                )}
              </span>
              <span className="block mb-2">
                Price:{" "}
                {listSeatBooking
                  .reduce((tongTien, seat, index) => {
                    return (tongTien += seat.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </span>
            </div>
            <button
              onClick={() => {
                const infoTicket = {
                  maLichChieu: id,
                  danhSachVe: listSeatBooking,
                };
                console.log("infoTicket", infoTicket);
                dispatch(bookTicket(infoTicket));
              }}
              className="flex items-center mb-5 text-white bg-green-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-orange-500 rounded"
            >
              Đặt vé
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-auto"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <NavLink className="block items-center text-center text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-orange-500 rounded" to="/">Back to home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
