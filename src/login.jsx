// import React, { useState } from 'react';
// import  { apiRequest } from './api';

// const Login = () => {
//   const [username, setUsername] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await apiRequest('/login','POST', { username });
//       // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
//       localStorage.setItem('accessToken', data.accessToken); // Store access token
//       alert('Login successful!');
//       window.location.href = '/protected'; // Redirect to dashboard
//     } catch (err) {
//       console.error('Login failed:', err);
//       alert('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { Button, Checkbox, Form, Input, message, Row } from "antd";
import { apiRequest } from "./api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    console.log("Success:", email);
    try {
      const { data } = await apiRequest("/login", "POST", { email });
      // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
      localStorage.setItem("accessToken", data.accessToken); // Store access token
      message.success("Login successful!", 1);
      // alert('Login successful!');
      window.location.href = "/protected"; // Redirect to dashboard
    } catch (err) {
      console.error("Login failed:", err);
      message.error("Login failed. Please try again.", 1);
      // alert('Login failed. Please try again.');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleMoveForget = () => {
    navigate("/forgetpassword");
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
      <h1>Login Page Form </h1>

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

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Row justify="center" align="middle" onClick={handleMoveForget}>
          Forget password ?
          <br/>
          <br/>
          <br/>
        </Row>

        {/* <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
