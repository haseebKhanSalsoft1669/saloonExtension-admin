import { Card, Col, Input, Row, Select, Space, Table, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;
const { Option } = Select;

interface ProductData {
  key: string;
  productName: string;
  code: string;
  qty: number;
  price: string;
  subtotal: string;
  image: string;
}

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();

  const productData: ProductData[] = [
    {
      key: '1',
      productName: 'Raw Bundles 20"',
      code: 'GFTHAIR1',
      qty: 23,
      price: '$189.00',
      subtotal: '$150',
      image: './images/product-1.png', // Replace with actual image URL
    },
    {
      key: '2',
      productName: 'Raw Bundles 22"',
      code: 'GFTHAIR2',
      qty: 15,
      price: '$200.00',
      subtotal: '$180',
      image: './images/product-2.png',
    },
    {
      key: '3',
      productName: 'Raw Bundles 24"',
      code: 'GFTHAIR3',
      qty: 12,
      price: '$210.00',
      subtotal: '$190',
      image: './images/product-3.png',
    },
  ];

  const columns = [
    {
      title: 'Product Name / Type',
      dataIndex: 'productName',
      key: 'productName',
      render: (_: string, record: ProductData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={record.image} alt="product" width={40} height={40} />
          <span>{record.productName}</span>
        </div>
      ),
    },
    {
      title: 'Gift Card Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft onClick={() => navigate('/order-management')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Order Details</Title>
          </Space>
        </Col>
        <Col>
          <label style={{ marginRight: 15 }}>Change Status: </label>
          <Select defaultValue="Pending" style={{ width: 150 }}>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="dispatched">Dispatched</Option>
            <Option value="refund">Refund</Option>
          </Select>
        </Col>
      </Row>

      {/* Order Info */}
      <Row gutter={24} className='user-info-row'>
        <Col xs={24} md={24} lg={24}>
          <Row gutter={16}>
            <Col xs={24}>
              <h4>Order Details</h4>
            </Col>
            <Col xs={24} md={20} lg={12}>
              <Row>
                <Col xs={24} md={12} lg={8}>
                  <label>Order ID</label>
                  <Input disabled value="Raw Bundles 20" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Date</label>
                  <Input disabled value="BW22-BL" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Payment</label>
                  <Input disabled value="Clip-Ins" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Shipping Method</label>
                  <Input disabled value="$189.00" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Tracking Number</label>
                  <Input disabled value="23" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Status</label>
                  <Input disabled value="In Stock" className="custom-input" />
                </Col>
              </Row>
            </Col>

            <Col xs={24}>
              <h4>Customer Details</h4>
            </Col>
            <Col xs={24} md={20} lg={12}>
              <Row>
                <Col xs={24} md={12} lg={8}>
                  <label>Name</label>
                  <Input disabled value="Abc" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Email</label>
                  <Input disabled value="abc@gmail.com" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Phone Number</label>
                  <Input disabled value="+12335588971" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Billing Address</label>
                  <Input disabled value="Lorem ipsum dhshda jadji fdyqgdq" className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Shipping Address</label>
                  <Input disabled value="Lorem ipsum dhshda jadji fdyqgdq" className="custom-input" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {/* Product Table */}
        <Col xs={24} md={22} lg={20}>
          <h4>Ordered Items</h4>
          <Card className="table-card">
            <Table
              columns={columns}
              dataSource={productData}
              pagination={false}
              rowKey="key"
              scroll={{ x: 'max-content' }}
              className="data-table"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;
