
import { Button, Form, Input, } from 'antd';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useForgetPasswordMutation } from '../../redux/services/authSlice';



function forgetPassword() {
  const navigate = useNavigate();
  const [forgetPassword , { isLoading }] = useForgetPasswordMutation()


  async function handleSubmit(values: any) {

    try {
      const response: any = await forgetPassword(values);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        });
        navigate("/verifycode", { state: { email: values.email } });

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
  )
}

export default forgetPassword;