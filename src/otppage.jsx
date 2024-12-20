import { useEffect, useState } from "react";

import { Button, Form, message } from "antd";
import { InputOTP } from "antd-input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "./api";

const OtpPage = () => {
  // #region The Controlled Logic
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location.state.email);

  const [otpValues, setOtpValues] = useState([]);

  // useEffect(() => {
  //   const navigationType = window.performance.getEntriesByType('navigation')[0]?.type;

  //   if (navigationType === 'reload') {
  //     // Page was refreshed
  //     navigate('/redirect'); // Redirect to another page
  //   }
  // }, [navigate]);


  // #endregion

  // #region The Uncontrolled Logic
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    const { otp } = values;
    if (!otp || otp.includes(undefined) || otp.includes(""))
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."],
        },
      ]);
    else {
      const body = {
        email: location.state.email,
        otp,
      };
      try {
        const data = await apiRequest("/forgotPassword/verify", "POST", body);

        message.success("otp sent successfully please check mail", 1);
        console.log("data", data);
        // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
      } catch (err) {
        console.error("Login failed:", err);
        message.error("Login failed. Please try again.", 1);
        // alert('Login failed. Please try again.');
      }
    }
    console.log(`OTP: ${otp}`);
  };




  return (
    <main className="app">
      <section className="card">
        <h2>Uncontrolled</h2>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="otp"
            className="center-error-message"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <InputOTP autoFocus inputType="numeric" length={4} />
          </Form.Item>

          <Form.Item noStyle>
            <Button block htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </section>
    </main>
  );
};

export default OtpPage;
