import {
    Button,
    Col,
    Input,
    Modal,
    Row,
    Space,
    Typography,
  } from 'antd';
  import { ArrowLeft } from 'lucide-react';
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const { Title } = Typography;
  
  const EditCategory: React.FC = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleSaveClick = () => {
      setIsModalVisible(true);
    };
  
    const handleConfirm = () => {
      setIsModalVisible(false);
      navigate('/categories');
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
      <div className="page-container">
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space>
              <ArrowLeft
                onClick={() => navigate('/categories')}
                style={{
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                }}
              />
              <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
                Edit Category
              </Title>
            </Space>
          </Col>
          <Col>
            <Button type="primary"  onClick={() => navigate('/add-categories')}>Add Category</Button>
          </Col>
        </Row>
  
        {/* Form */}
        <Row gutter={24} className="user-info-row">
          <Col xs={24} md={24} lg={24}>
            <Row gutter={16}>
              <Col xs={24} md={20} lg={12}>
                <Row>
                  <Col xs={24} md={12} lg={12}>
                    <label>Category Name</label>
                    <Input placeholder="Raw Bundles 20" />
                  </Col>
  
                  <Col xs={24} md={12} lg={24}>
                    <Button
                      type="primary"
                      style={{ marginTop: '32px' }}
                      onClick={handleSaveClick}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
  
        {/* ✅ Confirmation Modal */}
        <Modal
          title="Confirm Save Changes"
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to save these changes?</p>
          <p>Changes will be applied and you'll be redirected to the categories page.</p>
        </Modal>
      </div>
    );
  };
  
  export default EditCategory;
  