import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { uploadImageFilm } from "../../../redux/action/FilmAction";

export default function AddFilm() {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
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
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // Gọi api gửi các giá trị formData về backend
      dispatch(uploadImageFilm(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    // console.log('value',moment(value).format("DD/MM/YYYY"));
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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

  const handleChangeFile = (e) => {
    // Lấy file từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result)
        setImgSrc(e.target.result);
      };
    }
    // console.log(file);
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("hinhAnh", file);
  };

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
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item
        name="tenPhim"
        label="Name"
        rules={[
          { required: true, message: "Please fill film name" },
          { whitespace: true },
          { min: 3, max: 100 },
        ]}
        hasFeedback
      >
        <Input name="tenPhim" onChange={formik.handleChange} required/>
      </Form.Item>
      <Form.Item
        name="biDanh"
        label="Nickname"
        rules={[
          { required: true, message: "Please fill film nickname" },
          { whitespace: true },
          { min: 3, max: 100 },
        ]}
        hasFeedback
      >
        <Input name="biDanh" onChange={formik.handleChange} required/>
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item
        name="moTa"
        label="Description"
        rules={[
          { required: true, message: "Please fill description" },
          { whitespace: true },
          { min: 3, max: 150 },
        ]}
        hasFeedback
      >
        <TextArea name="moTa" onChange={formik.handleChange} required/>
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          name="ngayKhoiChieu"
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
        />
      </Form.Item>
      <Form.Item label="Rating">
        <InputNumber name="danhGia" onChange={handleChangeInputNumber("danhGia")} min={1} max={10} />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch onChange={handleChangeSwicth("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch onChange={handleChangeSwicth("sapChieu")} />
      </Form.Item>
      <Form.Item label="Phim hot">
        <Switch onChange={handleChangeSwicth("hot")} />
      </Form.Item>
      <Form.Item label="Upload">
        <input
          className="mb-3"
          type="file"
          onChange={handleChangeFile}
          accept="image/jpg, image/gif, image/png, image/jpeg"
        />
        <img src={imgSrc} className="w-[150px] h-[150px]" alt="..." />
      </Form.Item>
      <Form.Item>
        <Button className="bg-green-500" type="primary" htmlType="submit">
          Create film
        </Button>
      </Form.Item>
    </Form>
  );
}
