
import { Form, Input, Button, } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSendVerificationCodeMutation } from '../../redux/services/verifySlice';
import Swal from 'sweetalert2';



function forgetPassword() {
  const navigate = useNavigate();
  const [sendCode] = useSendVerificationCodeMutation()


  async function handleSubmit(values: any) {

    try {
      const response: any = await sendCode(values);
      if (response?.data?.status) {
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