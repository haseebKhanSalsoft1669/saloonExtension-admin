import { Button, Card, Col, Dropdown, Input, Menu, Row, Space, Table, Typography } from 'antd';

import { Edit, Eye, Search, Trash, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;


interface ProductData {
    key: string;
    productName: string;
    inStock: string;
    price: string;
    image: string;
}

const WishListDetails: React.FC = () => {
    const navigate = useNavigate();

    const productData: ProductData[] = [
        {
            key: '1',
            productName: 'Raw Bundles 24"',
            inStock: 'GFTHAIR3',
            price: '$210.00',
            image: './images/product-1.png',// Replace with actual image URL
        },
        {
            key: '2',
            productName: 'Raw Bundles 24"',
            inStock: 'GFTHAIR3',
            price: '$210.00',
            image: './images/product-2.png',
        },
        {
            key: '3',
            productName: 'Raw Bundles 24"',
            inStock: 'GFTHAIR3',
            price: '$210.00',
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
            title: 'In Stock',
            dataIndex: 'inStock',
            key: 'inStock',
        },
        
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => {
              const menu = (
                <Menu>
                  <Menu.Item key="edit" icon={<Edit size={16} />} >
                    Edit
                  </Menu.Item>
                  <Menu.Item key="delete" icon={<Trash size={16} />}>
                    Delete
                  </Menu.Item>
                </Menu>
              );
              return (
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button icon={<Eye size={16} />} />
                </Dropdown>
              );
            },
          },
    ];

    return (
        <div className="page-container">
            {/* Header */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Space>
                        <ArrowLeft onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
                        <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Wishlist Details</Title>
                    </Space>
                </Col>
                {/* <Col>
                    <Button type="primary">
                    Edit PRODUCT
                    </Button>
                </Col> */}
            </Row>

            {/* Order Info */}
            <Row gutter={24} className='user-info-row'>
                <Col xs={24} md={24} lg={24}>
                    <Row gutter={16}>
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
                                    <label>Last Updated</label>
                                    <Input disabled value="+12335588971" className="custom-input" />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Col>

                {/* Product Table */}
                <Col xs={24} md={22} lg={20}>
                    <h4>Wishlist Items</h4>
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

export default WishListDetails;
