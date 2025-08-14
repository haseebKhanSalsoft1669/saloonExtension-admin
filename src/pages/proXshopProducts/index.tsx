import {
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  Modal,
  Table,
  Typography
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
const { Title } = Typography;

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
          {record?.variants?.[0].varationImage?.length > 0 && record?.variants?.[0]?.varationImage?.map((img: any) => {
            return (
              <img
                crossOrigin='anonymous'
                src={UPLOADS_URL + img || '/placeholder.png'}
                alt="product"
                width={40}
                height={40}
                style={{ borderRadius: 4, objectFit: 'cover' }}
              />
            )
          })}
         
          <span>{record.name || 'N/A'}</span>
        </div>
      ),
    },

    {
      title: 'Categories',
      dataIndex: 'category',
      key: 'category',
      render: (categories: any[]) =>
        categories?.length > 0
          ? categories.map(cat => cat.name).join(', ')
          : 'N/A',
    },
    // {
    //   title: 'Price',
    //   dataIndex: 'price',
    //   key: 'price',
    //   render: (price: number) => `$ ${price ?? 0}`,
    // },
    {
      title: 'Xpro',
      dataIndex: 'xpro',
      key: 'xpro',
      render: (value: boolean) => (value ? 'Xpro Product' : 'Non-Xpro Product'),
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'stock',
    //   key: 'status',
    //   render: (stock: number) =>
    //     stock && stock > 0 ? (
    //       <Tag color="green">In Stock</Tag>
    //     ) : (
    //       <Tag color="red">Out of Stock</Tag>
    //     ),
    // },
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
          <Button  className='mainbtn' key="cancel" onClick={cancelDelete}>
            No
          </Button>,
          <Button className='mainbtn dangerbg' loading={isDeleting} disabled={isDeleting} key="delete" type="primary" danger onClick={handleDelete}>
            Yes
          </Button>,
        ]}
        closeIcon={<X />}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00" />
            <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white" />
          </svg>
          <Title level={4}> Are you sure you want to delete{' '}
          <strong>{productToDelete?.name}</strong>?</Title>
          
        </div>
      
      </Modal>
    </div>
  );
};

export default ProXshopProducts;
