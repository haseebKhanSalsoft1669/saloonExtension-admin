
import { Form, Input, Button, } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router";
import { useResetPasswordMutation } from '../../redux/services/verifySlice';
import Swal from 'sweetalert2';




function ChangePassword() {
  const location = useLocation();
  const { code, email } = location.state;

  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation()

  async function handleSubmit(values: any) {

    if (values.Confirmpassword !== values.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match",
      });
      return
    }

    try {
      const response: any = await resetPassword({ code, email, password: values.password })
      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (error : any) {
      console.error('reset password error:', error);
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
          onFinish={handleSubmit}
          autoComplete="off"
          requiredMark={false}
          className="auth-form"
        >


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

          <Form.Item
            name="Confirmpassword"
            label="Confirm password"
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



          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="auth-button mainbtn"
            >
              Reset Password
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
  )
}

export default ChangePassword