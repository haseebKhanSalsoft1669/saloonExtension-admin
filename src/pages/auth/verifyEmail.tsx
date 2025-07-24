import {
    Button,
    ConfigProvider,
    Form,
    Image,
    Input,
    Modal,
    Space
} from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useVerifyEmailMutation, useVerifyOtpMutation } from '../../redux/services/verifySlice';
import type { InputRef } from 'antd';
import Swal from 'sweetalert2';

interface SignUpFormValues {
    email: string;
}

const VerifyEmail: React.FC = () => {
    const [form] = Form.useForm<SignUpFormValues>();
    const [loading, setLoading] = useState(false);
    const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);
    const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
    const [email, setEmail] = useState<string>();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(InputRef | null)[]>([]); // Fix here: array of InputRefs or null
    const navigate = useNavigate();

    const [verifyEmail] = useVerifyEmailMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const handleSubmit = async (values: SignUpFormValues) => {
        setLoading(true);
        try {
            const response: any = await verifyEmail(values);
            if (response.data.status) {
                setEmail(values.email);
                setIsFirstModalVisible(true); // Show OTP modal after success
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
                text: error?.data?.message || "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFirstModalOk = () => {
        setIsFirstModalVisible(false);
        setIsSecondModalVisible(true);
        // Focus first OTP input when second modal opens
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    };

    const handleSecondModalOk = async () => {
        const fullOtp = otp.join("");
        try {
            const response: any = await verifyOtp({ code: fullOtp, email });
            if (response.data.status) {
                Swal.fire({
                    icon: "success",
                    title: response?.data?.message || "Operation completed successfully!",
                    text: "Thank You!",
                });
                navigate('/signup');
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
                text: error?.data?.message || "Something went wrong!",
            });

        }
    };

    // Handle OTP input changes with auto focus on next input
    const handleOtpChange = (value: string, index: number) => {
        if (/^\d?$/.test(value)) { // Only allow digits, max 1 char
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
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <ConfigProvider>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Verify Email</h2>
                        <p>Enter Your Email</p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
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
                            className="form-col"
                        >
                            <Input placeholder="Enter Email Address" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                className="auth-button mainbtn"
                            >
                                Verify
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

            {/* First Modal */}
            <Modal
                open={isFirstModalVisible}
                onOk={handleFirstModalOk}
                onCancel={() => setIsFirstModalVisible(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={handleFirstModalOk}>
                        OKAY
                    </Button>
                ]}
                centered
                width={400}
                closable
            >
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Image
                        preview={false}
                        alt="logo"
                        src="./images/gmail-icon.png"
                        style={{ width: 60, marginBottom: 20 }}
                    />
                    <h2>Check Your Email</h2>
                    <p>
                        A 4-digit OTP will be sent to your registered phone number/email ID.
                    </p>
                </div>
            </Modal>

            {/* Second Modal - OTP */}
            <Modal
                open={isSecondModalVisible}
                onOk={handleSecondModalOk}
                onCancel={() => setIsSecondModalVisible(false)}
                centered
                width={400}
            >
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Image
                        preview={false}
                        alt="logo"
                        src="./images/checked.png"
                        style={{ width: 60, marginBottom: 20 }}
                    />
                    <h2>OTP Verification</h2>
                    <p>We have sent OTP verification Code to your email</p>
                    <Space style={{ textAlign: 'center', padding: '20px', justifyContent: 'center' }}>
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                maxLength={1}
                                value={digit}
                                ref={(el: any) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                style={{ width: 50, height: 50, textAlign: 'center' }}
                                autoFocus={index === 0}
                            />
                        ))}
                    </Space>

                    <div className="auth-prompt">
                        <span>Don’t get OTP? </span>
                        <Button
                            type="link"
                            className="auth-link"
                        >
                            RESEND OTP
                        </Button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default VerifyEmail;
