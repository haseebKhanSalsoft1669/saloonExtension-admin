import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Upload
} from 'antd';
import type { CheckboxOptionType } from 'antd/es/checkbox';
import { ArrowLeft, UploadCloud,  X  } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
  const { Title } = Typography;
  const { TextArea } = Input;
  
  const categoryOptions: CheckboxOptionType[] = [
    { label: 'Clipins', value: 'clipins' },
    { label: 'Wefts', value: 'wefts' },
    { label: 'Toppers', value: 'toppers' },
    { label: 'Bundles', value: 'bundles' },
    { label: 'Closures', value: 'closures' },
  ];
  
  const EditEducation: React.FC = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleSave = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleConfirm = () => navigate('/education');
  
    return (
      <div className="page-container">
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space>
              <ArrowLeft
                onClick={() => navigate('/education')}
                style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
              />
              <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
              Edit Educators
              </Title>
            </Space>
          </Col>
        </Row>
  
  <div style={{backgroundColor:"rgba(128, 128, 128, 0.20)", padding:"10px", borderRadius:"8px"}}>

     {/* Form Section */}
     <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} lg={24}>
            <div className="form-section">
              <Row gutter={16}>
              <Col xs={24} lg={16}>
                <Row  gutter={16}>
                <Col span={12}>
                  <label>Edit Educators</label>
                  <Input placeholder="Carlie Sturtz" className="custom-input" />
                </Col>
                <Col span={12}>
                  <label>Designation</label>
                  <Input placeholder="Director of Media Relations" className="custom-input" />
                </Col>
                <Col span={12}>
                  <label>Insta Handle</label>
                  <Input placeholder="@Carlie Sturtz" className="custom-input" />
                </Col>
                <Col span={12}>
                  <label>Location</label>
                  <Select defaultValue="Wilmington, NC" className="custom-input" />
                </Col>
                 <Col span={12}>
                  <label>Images</label>
                  <Upload.Dragger className="custom-uploader" maxCount={1}>
                    <p className="ant-upload-drag-icon">
                      <UploadCloud size={24} />
                    </p>
                    <p className="ant-upload-text">Drag & Drop or Click to Upload</p>
                  </Upload.Dragger>
                </Col>
                </Row>
              </Col>
                
  
                
              </Row>
            </div>
          </Col>
  
          {/* Right Column */}
          
        </Row>
  
        

  </div>
       
       {/* Save Button */}
       <div className="footer-save-button">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
  
        {/* Save Confirmation Modal */}
        

        <Modal
       open={isModalVisible}
       onCancel={handleCancel}
       onOk={handleConfirm}
        footer={null}
        centered
        closeIcon={<X />}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00" />
            <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white" />
          </svg>
          <Title level={4}>Are you sure you want to save these changes?</Title>
          <Title level={4}>Changes will be applied and you'll be redirected to the Educator page.</Title>
          <Space style={{ marginTop: 20 }}>
            <Button className='mainbtn' onClick={() => handleCancel()}>No</Button>
            <Button className='mainbtn dangerbg' onClick={handleConfirm}>Yes</Button>
          </Space>
        </div>
      </Modal>
      </div>

      
    );
  };
  
  export default EditEducation;
  