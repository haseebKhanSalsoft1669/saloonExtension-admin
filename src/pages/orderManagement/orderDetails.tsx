import { Card, Col, Input, Row, Select, Space, Table, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate  , useLocation } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { UPLOADS_URL } from '../../constants/api'
import { useGetOrderByIdQuery } from '../../redux/services/orderSlice'

const { Title } = Typography;
const { Option } = Select;

interface ProductData {
  key: string;
  productName: string;
  code: string;
  quantity: number;
  price: string;
  subtotal: string;
  image: string;
  productId: {
    name? : string;
    variants?: {
      varationImage?: string[];
      price?: number;
    }[];
  };
}

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orders = location.state?.order;
  const { data: Details_order } = useGetOrderByIdQuery(
    { id: orders?._id } , 
    { skip: !orders?._id , 
      refetchOnMountOrArgChange: true  , 
      refetchOnReconnect: true
    });

interface Order {
  _id?: string;
  createdAt?: string;
  user?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
  billingAddress?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  shippingAddress?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  products?: ProductData[];
  // Add other fields as needed
}

const order: Order | undefined = Details_order?.order;
  
  

  // const productData: ProductData[] = [
  //   {
  //     key: '1',
  //     productName: 'Raw Bundles 20"',
  //     code: 'GFTHAIR1',
  //     qty: 23,
  //     price: '$189.00',
  //     subtotal: '$150',
  //     image: './images/product-1.png', // Replace with actual image URL
  //   },
  //   {
  //     key: '2',
  //     productName: 'Raw Bundles 22"',
  //     code: 'GFTHAIR2',
  //     qty: 15,
  //     price: '$200.00',
  //     subtotal: '$180',
  //     image: './images/product-2.png',
  //   },
  //   {
  //     key: '3',
  //     productName: 'Raw Bundles 24"',
  //     code: 'GFTHAIR3',
  //     qty: 12,
  //     price: '$210.00',
  //     subtotal: '$190',
  //     image: './images/product-3.png',
  //   },
  // ];

  const columns : ColumnsType<ProductData>  = [
    {
      title: 'Product Name / Type',
      dataIndex: 'productName',
      key: 'productName',
      render: (_: string, record: ProductData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={
              UPLOADS_URL +
              (record?.productId?.variants?.[0]?.varationImage?.[0] ?? '')
            }
            alt="product"
            width={40}
            height={40}
          />
          <span>{record.productId.name}</span>
        </div>
      ),
    },
    // {
    //   title: 'Gift Card Code',
    //   dataIndex: 'code',
    //   key: 'code',
    // },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string, record: ProductData) => (
        <span>{record.quantity}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string, record: ProductData) => (
        <span>${record?.productId?.variants?.[0]?.price}</span>
      ),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (text: string, record: ProductData) => (
        <span>${(record?.productId?.variants?.[0]?.price ?? 0) * (record.quantity ?? 0)}</span>
      ),
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
                  <Input disabled value={order?._id} className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Date</label>
                  <Input disabled value={order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''} className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Payment</label>
                  <Input disabled value="Card" className="custom-input" />
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
                  <Input disabled value={order?.user?.fullName} className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Email</label>
                  <Input disabled value={order?.user?.email} className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <label>Phone Number</label>
                  <Input disabled value={order?.user?.phone} className="custom-input" />
                </Col>
                <Col xs={24} md={12} lg={24}>
                  <label>Billing Address</label>
                  <Input 
                  disabled 
                  value={order?.billingAddress?.address + " " + order?.billingAddress?.city + " , " + order?.billingAddress?.state + " , " + order?.billingAddress?.country + " - " + order?.billingAddress?.zipCode} 
                  className="custom-input" 
                  />
                </Col>
                <Col xs={24} md={12} lg={24}>
                  <label>Shipping Address</label>
                  <Input 
                  disabled 
                  value={order?.shippingAddress?.address + " " + order?.shippingAddress?.city + " , " + order?.shippingAddress?.state + " , " + order?.shippingAddress?.country + " - " + order?.shippingAddress?.zipCode} 
                  className="custom-input" 
                  />
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
              dataSource={order?.products}
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
