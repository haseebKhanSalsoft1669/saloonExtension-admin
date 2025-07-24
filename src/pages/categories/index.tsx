import {
    Button,
    Card,
    Dropdown,
    Input,
    Menu,
    Modal,
    Table,
    message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    Edit,
    Eye,
    Plus,
    Search,
    Trash,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';
  
  const { Search: AntSearch } = Input;
  
  // ✅ Category interface
  interface CategoryData {
    id: number;
    key: string;
    name: string;
  }
  
  const Categories: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<CategoryData | null>(null);
    const navigate = useNavigate();
  
    // ✅ Table data
    const productData: CategoryData[] = [
      {
        id: 1,
        key: '1',
        name: 'Raw Bundles 20"',
      },
      {
        id: 2,
        key: '2',
        name: 'Silk Bundles 18"',
      },
    ];
  
    // ✅ Columns with S.No
    const columns: ColumnsType<CategoryData> = [
      {
        title: 'S.No',
        dataIndex: 'key',
        key: 'sno',
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: 'Category Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: CategoryData) => {
          const menu = (
            <Menu>
              <Menu.Item
                key="edit"
                icon={<Edit size={16} />}
                onClick={() => navigate('/edit-categories')}
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
  
    const showDeleteConfirm = (record: CategoryData) => {
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
  
    const filteredData = productData.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Categories</h1>
          <Button type="primary" icon={<Plus size={16} />}  onClick={() => navigate('/add-categories')}>
            Add Category
          </Button>
        </div>
  
        <Card className="table-card">
          <div className="table-toolbar">
            <AntSearch
              placeholder="Search categories..."
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
  
  export default Categories;
  