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
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '../../redux/services/categorySlice';
import Swal from 'sweetalert2';

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
  const [productToDelete, setProductToDelete] = useState<CategoryData | any>(null);
  const navigate = useNavigate();


  const [paginationConfig, setPaginationConfig] = useState({ page: 1, limit: 10 });

  const { data, isLoading } = useGetAllCategoriesQuery({ ...paginationConfig, keyword: searchText })


  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

  const columns: ColumnsType<CategoryData> = [
    {
      title: 'S.No',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text?.trim() ? text : 'N/A',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<Edit size={16} />}
              onClick={() => navigate(`/edit-categories/${record._id}`)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<Trash size={16} />}
              onClick={() => showDeleteConfirm(record?._id)}
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

  const showDeleteConfirm = (record: any) => {
    setProductToDelete(record);
    setIsModalVisible(true);
  };


  const handleDelete = async () => {

    try {
      const response: any = await deleteCategory({ id: productToDelete })
      if (response?.data?.success) {
        message.success(response?.data?.message);
        setIsModalVisible(false);
        setProductToDelete(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || response?.message || "Something went wrong!",
        })
      }
    } catch (error: any) {
      console.log("🚀 ~ handleDelete ~ error:", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      })
    }

  };

  const cancelDelete = () => {
    setIsModalVisible(false);
    setProductToDelete(null);
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => navigate('/add-categories')}>
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
          dataSource={data?.categories || []}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{
            current: paginationConfig.page,
            pageSize: paginationConfig.limit,
            total: data?.totalCount || 0,
            onChange: (page, pageSize) => {
              setPaginationConfig({ page, limit: pageSize });
            },
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
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
          <Button disabled={isDeleting} loading={isDeleting} key="delete" type="primary" danger onClick={handleDelete}>
            {isDeleting ? 'Deleting...' : 'Yes'}
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
