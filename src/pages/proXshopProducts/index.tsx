import {
    Button,
    Card,
    Dropdown,
    Input,
    Menu,
    Modal,
    Table,
    Tag,
    message,
  } from 'antd';
  import {
    Eye,
    Edit,
    Plus,
    Search,
    Trash,
    X,
  } from 'lucide-react';
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import type { ColumnsType } from 'antd/es/table';
  import '../../styles/Common.css';
  
  const { Search: AntSearch } = Input;
  
  // ✅ Interface for product data
  interface ProductData {
    id: number;
    key: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: 'In Stock' | 'Out of Stock';
  }
  
  const ProXshopProducts: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
    const navigate = useNavigate();
  
    const productData: ProductData[] = [
      {
        id: 1,
        key: '1',
        image: './images/product-1.png',
        name: 'Raw Bundles 20"',
        sku: 'BW22-BL',
        category: 'Clip-Ins',
        price: '$189.00',
        stock: 23,
        status: 'In Stock',
      },
      {
        id: 2,
        key: '2',
        image: './images/product-2.png',
        name: 'Silk Bundles 18"',
        sku: 'BW18-SL',
        category: 'Tape-Ins',
        price: '$129.00',
        stock: 0,
        status: 'Out of Stock',
      },
    ];
  
    const showDeleteConfirm = (record: ProductData) => {
      setProductToDelete(record);
      setIsModalVisible(true);
    };
  
    const handleDelete = () => {
      message.success(`Product "${productToDelete?.name}" deleted`);
      setIsModalVisible(false);
      setProductToDelete(null);
    };
  
    const cancelDelete = () => {
      setIsModalVisible(false);
      setProductToDelete(null);
    };
  
    // ✅ Table columns
    const columns: ColumnsType<ProductData> = [
      {
        title: 'S.No',
        dataIndex: 'key',
        key: 'sno',
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: 'Product Name / Type',
        dataIndex: 'name',
        key: 'name',
        render: (_: any, record: ProductData) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src={record.image}
              alt="product"
              width={40}
              height={40}
              style={{ borderRadius: 4 }}
            />
            <span>{record.name}</span>
          </div>
        ),
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) =>
          status === 'In Stock' ? (
            <Tag color="green">In Stock</Tag>
          ) : (
            <Tag color="red">Out of Stock</Tag>
          ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: ProductData) => {
          const menu = (
            <Menu>
              <Menu.Item
                key="edit"
                icon={<Edit size={16} />}
                onClick={() => navigate('/pro-product-details')}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                icon={<Trash size={16} />}
                onClick={() => showDeleteConfirm(record)}
              >
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
  
    const filteredData = productData.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase())
    );
  
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Product Management</h1>
          <Button type="primary" icon={<Plus size={16} />}  onClick={() => navigate('/edit-product')}>
            Add Product
          </Button>
        </div>
  
        <Card className="table-card">
          <div className="table-toolbar">
            <AntSearch
              placeholder="Search products..."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              prefix={<Search size={16} />}
            />
          </div>
  
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            className="data-table"
          />
        </Card>
  
        <Modal
          title="Delete Product"
          open={isModalVisible}
          onCancel={cancelDelete}
          footer={[
            <Button key="cancel" onClick={cancelDelete}>
              No
            </Button>,
            <Button key="delete" type="primary" danger onClick={handleDelete}>
              Yes
            </Button>,
          ]}
          closeIcon={<X />}
        >
          <p>
            Are you sure you want to delete{' '}
            <strong>{productToDelete?.name}</strong>?
          </p>
        </Modal>
      </div>
    );
  };
  
  export default ProXshopProducts;
  