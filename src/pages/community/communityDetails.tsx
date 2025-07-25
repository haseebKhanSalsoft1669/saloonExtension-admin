import { Col, Image, Input, Row, Select, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;
const { Option } = Select;



const CommunityDetails: React.FC = () => {
  const navigate = useNavigate();



  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft onClick={() => navigate('/product-management')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Community Details</Title>
          </Space>
        </Col>
        
      </Row>


      <div className='user-info-row' style={{backgroundColor:"rgba(128, 128, 128, 0.20)", padding:"10px", borderRadius:"8px"}}>

     {/* Form Section */}
     <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} lg={24}>
            <div className="form-section">
              <Row gutter={16}>
              <Col xs={24} lg={16}>
                <Row  gutter={16}>
                <Col span={24}>
                    <h4>Post Details</h4>
                </Col>
                <Col span={8}>
                  <label>Posted By</label>
                  <Input disabled value="James Henry" className="custom-input" />
                </Col>
                <Col span={8}>
                  <label>Date</label>
                  <Input disabled value="June 24, 2025" className="custom-input" />
                </Col>
                <Col span={8}>
                  <label>Likes</label>
                  <Input disabled  value="32K" className="custom-input" />
                </Col>
                <Col span={8}>
                  <label>Comments</label>
                  <Input disabled value="8" className="custom-input" />
                </Col>
                <Col span={8}>
                  <label>Status</label>
                  <Input disabled  value="Visible" className="custom-input" />
                </Col>
                
               
                </Row>
              </Col>
              <Col span={24}>
                  <label>Post</label>
                  <TextArea
    disabled
    value="OMG 😱 dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. Excepteur sint occaecat cupidatat non proident. Sunt in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
    rows={6}
    className="custom-input"
  />

                </Col>

                <Col span={20}>
                    <Image preview={false}
              src={"../images/post-image.png"}
              style={{ width: '100%', borderRadius: 8 }} />
                </Col>
  
                
              </Row>
            </div>
          </Col>
  
          {/* Right Column */}
          
        </Row>
  
        

  </div>
    </div>
  );
};

export default CommunityDetails;
