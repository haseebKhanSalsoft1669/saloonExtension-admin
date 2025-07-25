import {
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  Modal,
  Table,
  Tag
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
import Swal from 'sweetalert2';
import { UPLOADS_URL } from '../../constants/api';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../redux/services/productSlice';
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
  const [productToDelete, setProductToDelete] = useState<ProductData | any>(null);
  const navigate = useNavigate();

  const [paginationConfig, setPaginationConfig] = useState({ page: 1, limit: 10 });

  const { data, isLoading } = useGetAllProductsQuery({ ...paginationConfig, keyword: searchText });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();



  const showDeleteConfirm = (record: ProductData) => {
    setProductToDelete(record);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response: any = await deleteProduct({ id: productToDelete?._id });
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        })
        setIsModalVisible(false);
        setProductToDelete(null);

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || "Something went wrong!",
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

  const columns: ColumnsType<ProductData> = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Product Name ',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            crossOrigin='anonymous'
            src={UPLOADS_URL + record.images?.[0] || '/placeholder.png'}
            alt="product"
            width={40}
            height={40}
            style={{ borderRadius: 4, objectFit: 'cover' }}
          />
          <span>{record.name || 'N/A'}</span>
        </div>
      ),
    },

    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category?.name || '—',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$ ${price ?? 0}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => stock ?? '—',
    },
    {
      title: 'Status',
      dataIndex: 'stock',
      key: 'status',
      render: (stock: number) =>
        stock && stock > 0 ? (
          <Tag color="green">In Stock</Tag>
        ) : (
          <Tag color="red">Out of Stock</Tag>
        ),
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
              onClick={() => navigate(`/edit-product/${record._id}`)}
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Product Management</h1>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => navigate('/add-product')}>
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
          loading={isLoading}
          dataSource={data?.products || []}
          columns={columns}
          rowKey="id"
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
          <Button loading={isDeleting} disabled={isDeleting} key="delete" type="primary" danger onClick={handleDelete}>
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
