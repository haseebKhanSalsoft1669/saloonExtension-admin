import type { InputRef } from "antd";
import { Button, Form, Input, Space, } from "antd";
import React, { useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useVerifyOtpMutation } from "../../redux/services/authSlice";

const VerifyCode: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(InputRef | null)[]>([]); // array of InputRefs or null
  const location = useLocation();
  const email = location.state?.email;
  const [verifyCode , { isLoading }] = useVerifyOtpMutation()

  const navigate = useNavigate();


  // Handle OTP input changes with auto focus on next input
  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to focus previous input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  async function handleSubmit() {
    // console.log(otp.join(""), email)
    const code = otp.join("")
    try {
      const response: any = await verifyCode({ otp: Number(code), email })
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        });
        navigate("/changepassword", { state: { email, code } });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      });

    }
  }









  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>FORGOT PASSWORD</h2>
          <p>Did you forgot your password?</p>
        </div>

        <Form
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          className="auth-form"
          onFinish={handleSubmit}
        >
          <Space style={{ textAlign: "center", padding: "20px", justifyContent: "center", width: '100%' }}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                maxLength={1}
                value={digit}
                ref={(el: any) => (inputRefs.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{ width: 50, height: 50, textAlign: "center" }}
                autoFocus={index === 0}
              />
            ))}
          </Space>



          <Form.Item>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="primary"
              htmlType="submit"
              block
              className="auth-button mainbtn"
            >
              Continue
            </Button>
          </Form.Item>

          <div className="auth-prompt">
            <span>Back to </span>
            <Button type="link" className="auth-link" onClick={() => navigate("/login")}>
              SIGN IN
            </Button>
          </div>
        </Form>
      </div>
    </div>

  );
};

export default VerifyCode;
