import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { apiRequest } from "./api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email } =  values ;
    console.log("Success:", email);
    try {
      const data  = await apiRequest("/forgotPassword", "POST", { email });
      if(data?.status){
        navigate('/otppage',{state : { email }});
      }
      message.success("otp sent successfully please check mail", 1);
      console.log("data", data)
      // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
    } catch (err) {
      console.error("Login failed:", err);
      message.error("Login failed. Please try again.", 1);
      // alert('Login failed. Please try again.');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>Forget email page Form </h1>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          border: "1px solid red",
          padding: "20px",
          borderRadius: "25px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        
      </Form>
    </div>
  );
};
export default ForgetPassword;
