import {
  SEAT_BOOKING,
  GET_FILM_TICKET,
  BOOKING_SUCCESS,
} from "../constant/TicketConst";

const initialState = {
  ticketData: {},
  listSeatBooking: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILM_TICKET:
      state.ticketData = action.ticketData;
      return { ...state };

    case SEAT_BOOKING:
      // Cập nhật danh sách ghế đang đặt
      let listSeatBookingUpdate = [...state.listSeatBooking];
      let index = listSeatBookingUpdate.findIndex(
        (seatBookingUpdate) =>
          seatBookingUpdate.maGhe === action.seatBooking.maGhe
      );
      if (index !== -1) {
        // Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xóa đi
        listSeatBookingUpdate.splice(index, 1);
      } else {
        listSeatBookingUpdate.push(action.seatBooking);
      }
      return { ...state, listSeatBooking: listSeatBookingUpdate };

    case BOOKING_SUCCESS:
      state.listSeatBooking = [];
      return { ...state };

    default:
      return state;
  }
};
