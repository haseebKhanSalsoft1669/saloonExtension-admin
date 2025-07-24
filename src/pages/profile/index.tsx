import {
    CameraOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone
} from '@ant-design/icons';
import {
    Button,
    Col,
    Image,
    Input,
    Modal,
    Row,
    Space,
    Typography,
    Upload,
} from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('../images/user.png');

  const handleImageChange = (info: any) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) setImageUrl(e.target.result as string);
    };
    if (info.file) reader.readAsDataURL(info.file);
  };

  const inputClass = isEditing ? '' : 'custom-input';

  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Title level={3} style={{ margin: 0 }}>Profile</Title>
          </Space>
        </Col>
      </Row>

      {/* Content */}
      <Row gutter={24}>
        {/* Profile Image */}
        <Col xs={24} md={24} lg={8}>
          <div style={{ position: 'relative', width: 200 }}>
            <Image
              preview={false}
              src={imageUrl}
              style={{ width: '100%', borderRadius: 8 }}
            />
            {isEditing && (
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
              >
                <Button
                  icon={<CameraOutlined />}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    borderRadius: '50%',
                    padding: 6,
                  }}
                />
              </Upload>
            )}
          </div>
        </Col>

        {/* Profile Details */}
        <Col xs={24} md={24} lg={16}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <label>First Name</label>
              <Input disabled={!isEditing} defaultValue="John" className={inputClass} />
            </Col>
            <Col xs={24} md={12}>
              <label>Last Name</label>
              <Input disabled={!isEditing} defaultValue="Doe" className={inputClass} />
            </Col>
            <Col xs={24} md={12}>
              <label>Email Address</label>
              <Input disabled value="john.doe@example.com" className="custom-input" />
            </Col>
            <Col xs={24} md={12}>
              <label>Phone Number</label>
              <Input disabled={!isEditing} defaultValue="+1234567890" className={inputClass} />
            </Col>

            <Col xs={24}>
              <div style={{ display: 'flex', gap: '12px', marginTop: 16 }}>
                <Button
                  className="mainbtn"
                  onClick={() => setIsEditing(prev => !prev)}
                >
                  {isEditing ? 'SAVE' : 'EDIT PROFILE'}
                </Button>
                <Button
                  className="mainbtn"
                  onClick={() => setShowPasswordModal(true)}
                >
                  CHANGE PASSWORD
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
      >

<Title level={4}>Change Password</Title>
        <Input.Password
          placeholder="Old Password"
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          placeholder="New Password"
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          placeholder="Confirm New Password"
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: 24 }}
        />
        <Button type="primary" block>
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default UserProfile;
