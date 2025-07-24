
import { Card, Col, Input, Row,  Space, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




const { Title } = Typography;


const ViewLiability: React.FC = () => {

    const navigate = useNavigate();




    return (
        <div className="page-container">
            {/* Row 1: Header */}
            <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
                <Col>
                    <Space>
                        <ArrowLeft onClick={() => navigate('/liability')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
                        <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>View Liability</Title>
                    </Space>
                </Col>


            </Row>

            {/* Row 2: Content */}
            <Row gutter={24}>


                {/* Right Column - Form Info */}
                <Col xs={24} md={24} lg={24}>
                    <Card>
                        <Row gutter={16} className="user-info-row">
                            <Col xs={24}>
                                <Row>

                                    <Col xs={24} md={24} lg={24}>
                                        <Row gutter={20}>
                                            <Col xs={24} md={12} lg={8}>
                                                <label>Category Type</label>
                                                <Input disabled value="External Freight" className="custom-input" />
                                            </Col>
                                            <Col xs={24} md={12} lg={8}>
                                                <label>Amount Payable</label>
                                                <Input disabled value="$500.00" className="custom-input" />
                                            </Col>
                                            <Col xs={24} md={12} lg={8}>
                                                <label>Due Date</label>
                                                <Input disabled value="Dec 19, 2023" className="custom-input" />
                                            </Col>

                                            <Col xs={24}>
                                                <label>Description</label>
                                                <Input disabled value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
accumsan et viverra justo commodo." className="custom-input" />
                                            </Col>

                                        </Row>


                                    </Col>
                                </Row>
                            </Col>

                         

                        </Row>
                    </Card>

                </Col>
            </Row>






        </div>
    );
};

export default ViewLiability;
