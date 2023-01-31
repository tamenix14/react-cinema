import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import Axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createFilmSchedule } from "../../../redux/action/TheaterAction";
import { DOMAIN, STATUS_CODE } from "../../../utils/constants/settingGlobal";

export default function AddScheduleFilm() {
  const [state, setState] = useState({
    infoTheater: [],
    theaterCluster: [],
  });

  // console.log("infoTheater", state.infoTheater);

  const { id } = useParams();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      dispatch(createFilmSchedule(values));
    },
  });

  useEffect(() => {
    getInfoTheater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfoTheater = async () => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyRap/LayThongTinHeThongRap`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        setState({
          ...state,
          infoTheater: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleChangeTheater = async (value) => {
    try {
      let { data, status } = await Axios({
        url: `${DOMAIN}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`,
        method: "GET",
      });
      if (status === STATUS_CODE.SUCCESS) {
        setState({
          ...state,
          theaterCluster: data.content,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleChangeCluster = (value) => {
    // console.log("value", value);
    formik.setFieldValue("maRap", value);
  };

  const handleChangeDate = (value) => {
    // console.log("ngayChieuGioChieu",moment(value).format("DD/MM/YYYY hh:mm:ss"))
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const handleChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Theater">
        <Select
          placeholder="Please select theater"
          required
          onChange={handleChangeTheater}
        >
          {state.infoTheater?.map((item, index) => {
            return (
              <Select.Option key={index} value={item.maHeThongRap}>
                {item.maHeThongRap}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Theater Cluster">
        <Select
          placeholder="Please select cluster"
          required
          onChange={handleChangeCluster}
        >
          {state.theaterCluster?.map((item, index) => {
            return (
              <Select.Option key={index} value={item.maCumRap}>
                {item.tenCumRap}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Lịch chiếu">
        <DatePicker
          format="DD/MM/YYYY hh:mm:ss"
          showTime
          onChange={handleChangeDate}
          onOk={handleChangeDate}
        />
      </Form.Item>
      <Form.Item label="Price">
        <InputNumber
          name="giaVe"
          onChange={handleChangeInputNumber}
          min={75000}
          max={150000}
        />
      </Form.Item>
      <Form.Item>
        <Button className="bg-green-500" type="primary" htmlType="submit">
          Create Schedule
        </Button>
      </Form.Item>
    </Form>
  );
}
