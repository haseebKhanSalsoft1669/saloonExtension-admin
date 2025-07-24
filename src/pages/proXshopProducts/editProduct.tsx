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
  
  const EditProduct: React.FC = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleSave = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleConfirm = () => navigate('/product-management');
  
    return (
      <div className="page-container">
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space>
              <ArrowLeft
                onClick={() => navigate('/product-management')}
                style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
              />
              <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
                Edit Product
              </Title>
            </Space>
          </Col>
        </Row>
  
  <div style={{backgroundColor:"rgba(128, 128, 128, 0.20)", padding:"10px", borderRadius:"8px"}}>

     {/* Form Section */}
     <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            <div className="form-section">
              <Row gutter={16}>
                <Col span={12}>
                  <label>Product Name</label>
                  <Input defaultValue="Raw Bundles 20" className="custom-input" />
                </Col>
                <Col span={12}>
                  <label>Length</label>
                  <Select defaultValue="20" className="custom-input" />
                </Col>
  
                <Col span={12}>
                  <label>Product Description</label>
                  <TextArea rows={3} placeholder="Enter Product Description" className="custom-textarea" />
                </Col>
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <label>Color</label>
                      <Select placeholder="Select Color" className="custom-input" />
                    </Col>
                    <Col span={24}>
                      <label>Price</label>
                      <Input defaultValue="$189.00" className="custom-input" />
                    </Col>
                  </Row>
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
  
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <label>Discount Price</label>
                      <Input placeholder="$0.00" className="custom-input" />
                    </Col>
                    <Col span={24}>
                      <label>
                        <Switch className="custom-switch" /> Add tax for this product
                      </label>
                    </Col>
                  </Row>
                </Col>
  
                <Col span={12}>
                  <label>SKU</label>
                  <Input placeholder="Enter SKU" className="custom-input" />
                </Col>
                <Col span={12}>
                  <label>Weight</label>
                  <Input placeholder="Enter Weight" className="custom-input" />
                </Col>
  
                <Col span={24}>
                  <Checkbox className="custom-checkbox">Add this product in ProXshop</Checkbox>
                </Col>
              </Row>
            </div>
          </Col>
  
          {/* Right Column */}
          <Col xs={24} lg={8}>
            <div className="sidebar-section">
              <label>Categories</label>
              <div className="checkbox-group-wrapper">
                <Checkbox.Group
                  className="custom-checkbox-group"
                  options={categoryOptions}
                  defaultValue={['clipins']}
                />
              </div>
              <div style={{ marginTop: 8 }}>
                <a onClick={() => navigate('/add-categories')}>Create New</a>
              </div>
  
              
            </div>
            <div className="tag-section">
                <label>Tags</label>
                <Select
                  mode="tags"
                  style={{ width: '100%', height:"auto" }}
                  placeholder="Enter tag name"
                  defaultValue={['Hair Tie', 'Extensions', 'Hair Extensions clip']}
                />
              </div>
          </Col>
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
          <p>Changes will be applied and you'll be redirected to the products page.</p>
        </Modal>
      </div>
    );
  };
  
  export default EditProduct;
  