import { Button, Col, Image, Input, Modal, Row, Space, Typography } from 'antd';
import { ArrowLeft, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useToggleUserStatusMutation } from '../../redux/services/userManagementSlice';
import Swal from 'sweetalert2';
import { UPLOADS_URL } from '../../constants/api';

const { Title } = Typography;

const UserDetails: React.FC = () => {
    const [banModalVisible, setBanModalVisible] = useState(false);
    const id = useParams().id
    const { data: user, isLoading } = useGetUserByIdQuery({ id }, { skip: !id })
    const [toggleStatus] = useToggleUserStatusMutation()


    const navigate = useNavigate();


    async function handleToggleUserStatus() {
        try {
            const response: any = await toggleStatus({ id }).unwrap()
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: response?.message || "Operation completed successfully!",
                    text: "Thank You!",
                })
                setBanModalVisible(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response?.error?.data?.message || response?.message || "Something went wrong!",
                })
            }
        } catch (error: any) {
            console.error('Error toggling user status:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.data?.message || "Something went wrong!",
            })
        }
    }


    return (
        <div className="page-container">
            {isLoading ? (
                <div style={{ color: 'var(--text-primary)' }}>Loading...</div>
            ) : (
                <>
                    {/* Row 1: Header */}
                    < Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
                        <Col>
                            <Space>
                                <ArrowLeft onClick={() => navigate('/users/list')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
                                <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Customer Details</Title>
                            </Space>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={() => setBanModalVisible(true)}>
                                {user?.isActive ? 'Ban User' : 'Unban User'}
                            </Button>
                        </Col>

                    </Row>

                    {/* Row 2: Content */}
                    <Row gutter={24}>
                        {/* Left Column - Image */}
                        <Col xs={24} md={24} lg={8}>
                            <Image
                                crossOrigin='anonymous'
                                preview={false}
                                src={UPLOADS_URL + user?.licensePhoto}
                            />
                        </Col>

                        {/* Right Column - Form Info */}
                        <Col xs={24} md={24} lg={16}>
                            <Row gutter={16} className="user-info-row">
                                <Col xs={24} md={12}>
                                    <label>Full Name</label>
                                    <Input disabled value={user?.fullName || ''} className="custom-input" />
                                </Col>

                                <Col xs={24} md={12}>
                                    <label>Registered On</label>
                                    <Input disabled value={new Date(user?.createdAt).toLocaleDateString() || ''} className="custom-input" />
                                </Col>

                                <Col xs={24} md={12}>
                                    <label>Email Address</label>
                                    <Input disabled value={user?.email || ''} className="custom-input" />
                                </Col>
                                <Col xs={24} md={12}>
                                    <label>Phone Number</label>
                                    <Input disabled value={user?.phone || ''} className="custom-input" />
                                </Col>
                                <Col xs={24} md={12}>
                                    <label>Newsletter</label>
                                    <Input disabled value="Subscribed ✅" className="custom-input" />
                                </Col>
                                <Col xs={24} md={12}>
                                    <label>Address</label>
                                    <Input disabled value={user?.shippingAddress || ''} className="custom-input" />
                                </Col>
                                <Col xs={24} md={12}>
                                    <label>Instagram Handle</label>
                                    <Input disabled value={user?.instagramHandle || ''} className="custom-input" />
                                </Col>
                                <Col xs={24} md={12}>
                                    <label>Cosmetology License #</label>
                                    <Input disabled value={user?.cosmetologyLicenseNumber || ''} className="custom-input" />
                                </Col>



                            </Row>
                        </Col>
                    </Row></>

            )}

            {/* BAN USER Modal */}
            <Modal
                open={banModalVisible}
                onCancel={() => setBanModalVisible(false)}
                footer={null}
                centered
                closeIcon={<X />}
            >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00" />
                        <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white" />
                    </svg>
                    <Title level={4}>Do you really want to ban this user?</Title>
                    <Space style={{ marginTop: 20 }}>
                        <Button className='mainbtn' onClick={() => setBanModalVisible(false)}>No</Button>
                        <Button className='mainbtn dangerbg' onClick={handleToggleUserStatus}>Yes</Button>
                    </Space>
                </div>
            </Modal>
        </div >
    );
};

export default UserDetails;
