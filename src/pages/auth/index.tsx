import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../redux/services/authSlice';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAccessToken } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';

interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const SignIn: React.FC = () => {
  const [form] = Form.useForm<SignInFormValues>();
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);

  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, accessToken, navigate]);

  const handleSignIn = async (values: SignInFormValues) => {
    setLoading(true);
    try {
      const response: any = await login(values);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Login successful!",
          text: "Welcome back!",
        });
        // The loginSuccess action is automatically dispatched by the authApi
        // No need to manually save to localStorage or navigate
        // The ProtectedRoute will handle the navigation
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response?.error?.data?.message || "Invalid credentials. Please try again.",
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.data?.message || "Something went wrong. Please try again.",
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
{/* 
          <div className="auth-prompt">
            <span>Don't have an account? </span>
            <Button
              type="link"
              onClick={() => navigate("/signup")}
              className="auth-link"
            >
              SIGN UP
            </Button>
          </div> */}
        </Form>
      </div>
    </div>
  );
};

export default SignIn;