import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../redux/services/authSlice';
import Swal from 'sweetalert2';

interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const SignIn: React.FC = () => {
  const [form] = Form.useForm<SignInFormValues>();
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation()

  const navigate = useNavigate();



  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      navigate("/dashboard");
    }
  }, [])

  const handleSignIn = async (values: SignInFormValues) => {

    setLoading(true);
    try {
      const response: any = await login(values)
      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        });
        localStorage.setItem("userDetails", JSON.stringify(response?.data?.data));
        navigate("/")

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
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign In</h2>
          <p>Enter your credentials to sign in to this platform</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSignIn}
          autoComplete="off"
          requiredMark={false}
          className="auth-form"
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="yourname@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              className='password-filed-login'
              placeholder="••••••••"
              iconRender={visible => (
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              )}
            />
          </Form.Item>

          <div className="d-flex justify-content-space-between align-self-center">
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Button
              type="link"
              onClick={() => navigate("/forgetpassword")}
              className="text-blue-600 hover:text-blue-800 p-0"
            >
              Forgot Password?
            </Button>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="auth-button mainbtn"
              disabled={loading}
            >
              SIGN IN
            </Button>
          </Form.Item>

          <div className="auth-prompt">
            <span>Don't have an account? </span>
            <Button
              type="link"
              onClick={() => navigate("/signup")}
              className="auth-link"
            >
              SIGN UP
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;