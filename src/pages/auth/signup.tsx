import {
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Form,
  Input
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useRegisterMutation } from '../../redux/services/authSlice';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cityId: string;
  stateId: string;
  taxRegistration: string;
  password: string;
  confirmPassword: string;

}



const SignUp: React.FC = () => {
  const [form] = Form.useForm<SignUpFormValues>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [register] = useRegisterMutation()



  const handleSubmit = async (values: SignUpFormValues) => {
    setLoading(true);
    try {

      if (values.password !== values.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match",
        });
      }


      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password
      }

      const response: any = await register(data)

      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.error?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };





  return (
    <ConfigProvider>
      <div className="auth-container signup-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Sign Up</h2>
            <p>Fill out this form to sign up on this platform</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            requiredMark={false}
            className="auth-form"
          >
            <div className="form-row">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your First name' }]}
                className="form-col"
              >
                <Input placeholder="Enter Frist Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your Last name' }]}
                className="form-col"
              >
                <Input placeholder="Enter Last Name" />
              </Form.Item>


            </div>

            <div className="form-row">

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
                className="form-col"
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>


              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
                className="form-col"
              >
                <Input placeholder="012 345 67890" />
              </Form.Item>


            </div>



            <div className="form-row">
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                className="form-col"
              >
                <Input.Password
                  placeholder="••••••••"
                  className="password-filed-login"
                  iconRender={visible => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
                className="form-col"
              >
                <Input.Password
                  placeholder="••••••••"
                  className="password-filed-login"
                  iconRender={visible => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="auth-button mainbtn"
              >
                SIGN UP
              </Button>
            </Form.Item>

            <div className="auth-prompt">
              <span>Already have an account? </span>
              <Button type="link" className="auth-link" onClick={() => navigate("/login")}>
                SIGN IN
              </Button>
            </div>
          </Form>
        </div>
      </div>

    </ConfigProvider>
  );
};

export default SignUp;
