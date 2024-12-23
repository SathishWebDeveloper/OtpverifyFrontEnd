// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
// const Home = () => (
//   <div style={{ display : 'flex' , flexDirection : 'column' , justifyContent : 'center', alignItems : 'center' , width : '100%'}}>
//     <h1>Register Form </h1>
  
//   <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//       border: "1px solid red",
//       padding:"20px",
//       borderRadius:"25px"
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item name="remember" valuePropName="checked" label={null}>
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item label={null}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//   </div>
// );
// export default Home;


import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import  { apiRequest } from './api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const onFinish = async(values) => {
    console.log('Success:', values);
    try {
      const { data } = await apiRequest('/register','POST', { ...values });
      message.success('register successful!', 1);
      console.log("data" , data);
      // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
      // alert('register successful!');
      window.location.href = '/login'; // Redirect to dashboard
    } catch (err) {
      console.error('Login failed:', err);
      message.success('Login failed. Please try again.', 1);
      // alert('Login failed. Please try again.');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <div style={{ display : 'flex' , flexDirection : 'column' , justifyContent : 'center', alignItems : 'center' , width : '100%'}}>
    <h1>Register Form </h1>
  
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
      padding:"20px",
      borderRadius:"25px"
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
          message: 'Please input your email!',
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
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  <div> Already a user <span onClick={()=> navigate('/login')}> Sign in </span> </div>
  </Form>
  </div>
)}
export default Home;