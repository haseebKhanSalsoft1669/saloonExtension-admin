import {
    Button,
    Checkbox,
    Col,
    Input,
    Row,
    Select,
    Space,
    Switch,
    Typography,
    Upload,
    Modal,
  } from 'antd';
  import { ArrowLeft, UploadCloud } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import type { CheckboxOptionType } from 'antd/es/checkbox';
  
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
          title="Confirm Save Changes"
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to save these changes?</p>
          <p>Changes will be applied and you'll be redirected to the Educator page.</p>
        </Modal>
      </div>
    );
  };
  
  export default EditEducation;
  