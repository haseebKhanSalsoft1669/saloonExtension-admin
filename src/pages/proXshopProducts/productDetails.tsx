import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;



const ProProductDetails: React.FC = () => {
  const navigate = useNavigate();



  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft onClick={() => navigate('/product-management')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Proshop’s Product Details</Title>
          </Space>
        </Col>
        <Col>
        <Button type="primary" onClick={() => navigate('/edit-product')}>
        Edit PRODUCT
        </Button>
        </Col>
      </Row>

      {/* Order Info */}
      <Row gutter={24} className='user-info-row'>
        <Col xs={24} md={24} lg={24}>
          <Row gutter={16}>
           
            <Col xs={24} md={20} lg={12}>
              <Row>
                <Col xs={24} md={12} lg={8}>
                  <label>Product Name</label>
                  <Input disabled value="Raw Bundles 20" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>SKU</label>
                  <Input disabled value="BW22-BL" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Category</label>
                  <Input disabled value="Clip-Ins" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Price</label>
                  <Input disabled value="$189.00" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Stock</label>
                  <Input disabled value="23" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Status</label>
                  <Input disabled value="In Stock" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Image</label>
                  <Input disabled value="Abc" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Ratings</label>
                  <Input disabled value="5 out of 4" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Description</label>
                  <Input disabled value="Lorem ipsum dhshda jadji fdyqgdq." className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Length</label>
                  <Input disabled value="20”" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Color</label>
                  <Input disabled value="hazel brown" className="custom-input" />
                </Col>
              </Row>
            </Col>

            
          </Row>
        </Col>

     
      </Row>
    </div>
  );
};

export default ProProductDetails;
