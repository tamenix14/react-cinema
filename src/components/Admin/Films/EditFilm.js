import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoEditFilm, updateFilm } from "../../../redux/action/FilmAction";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
// import moment from "moment";
import dayjs from "dayjs";
// import { uploadImageFilm } from "../../../redux/action/FilmAction";

export default function EditFilm() {
  const { filmInfo } = useSelector((state) => state.FilmReducer);
  // console.log("filmInfo",filmInfo)

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getInfoEditFilm(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: filmInfo.maPhim,
      tenPhim: filmInfo.tenPhim,
      biDanh: filmInfo.biDanh,
      trailer: filmInfo.trailer,
      moTa: filmInfo.moTa,
      ngayKhoiChieu: filmInfo.ngayKhoiChieu,
      dangChieu: filmInfo.dangChieu,
      sapChieu: filmInfo.sapChieu,
      hot: filmInfo.hot,
      danhGia: filmInfo.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log("values", values);
      // values.maNhom = "GP01"
      // Tạo đối tượng formData => Đưa giá trị values từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      // Gọi api gửi các giá trị formData về backend
      dispatch(updateFilm(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    // console.log('value',moment(value).format("DD/MM/YYYY"));
    let ngayKhoiChieu = dayjs(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // Closure function
  const handleChangeSwicth = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    // Lấy file từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      // Đem dữ liệu file lưu vào formik
      await formik.setFieldValue("hinhAnh", file);
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        // console.log(e.target.result)
        await setImgSrc(e.target.result);
      };
    }
    // console.log(file);
  };

  // console.log("values", formik.values);

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{}}
    >
      <Form.Item
        // name="tenPhim"
        label="Name"
        rules={[
          { required: true, message: "Please fill film name" },
          { whitespace: true },
          { min: 3, max: 100 },
        ]}
        hasFeedback
      >
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
          required
        />
      </Form.Item>
      <Form.Item
        // name="biDanh"
        label="Nickname"
        rules={[
          { required: true, message: "Please fill film nickname" },
          { whitespace: true },
          { min: 3, max: 100 },
        ]}
        hasFeedback
      >
        <Input
          name="biDanh"
          onChange={formik.handleChange}
          value={formik.values.biDanh}
          required
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item
        // name="moTa"
        label="Description"
        rules={[
          { required: true, message: "Please fill description" },
          { whitespace: true },
          { min: 3, max: 150 },
        ]}
        hasFeedback
      >
        <TextArea
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
          required
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          name="ngayKhoiChieu"
          format="DD/MM/YYYY"
          onChange={handleChangeDatePicker}
          value={dayjs(formik.values.ngayKhoiChieu)}
          clearIcon={null}
        />
      </Form.Item>
      <Form.Item label="Rating">
        <InputNumber
          name="danhGia"
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch
          onChange={handleChangeSwicth("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch
          onChange={handleChangeSwicth("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Phim hot">
        <Switch
          onChange={handleChangeSwicth("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Upload">
        <input
          className="mb-3"
          type="file"
          onChange={handleChangeFile}
          accept="image/jpg, image/gif, image/png, image/jpeg"
        />
        <img
          src={imgSrc === "" ? filmInfo.hinhAnh : imgSrc}
          className="w-[150px] h-[150px]"
          alt="..."
        />
      </Form.Item>
      <Form.Item>
        <Button className="bg-green-500" type="primary" htmlType="submit">
          Update film
        </Button>
      </Form.Item>
    </Form>
  );
}
