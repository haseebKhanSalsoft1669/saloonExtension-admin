import { Button, Card, Input, Modal, Table, message } from 'antd';
import { Eye, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllusersQuery } from '../../redux/services/userManagementSlice';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

const UserList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const [paginationConfig, setPaginationConfig] = useState({ page: 1, limit: 10 });
  const { data, isLoading } = useGetAllusersQuery({ ...paginationConfig, keyword: searchText });

  const handleDelete = () => {
    message.success(`User "${userToDelete?.name}" deleted`);
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'User Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(), // Format date nicely
    },
    {
      title: 'Order ID',
      dataIndex: '_id', // or use orderId if exists
      key: 'orderId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          icon={<Eye size={16} />}
          onClick={() => navigate(`/users/userdetails/${record._id}`)}
        />
      ),
    }
  ];


  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        {/* <Button type="primary" icon={<Plus size={16} />}>
          Add User
        </Button> */}
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search users..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<Search size={16} />}
          />
        </div>

        <Table
          dataSource={data?.Users || []}
          columns={columns}
          loading={isLoading}
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
        title="Ban User"
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
        <p>Are you sure you want to Ban <strong>{userToDelete?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default UserList;
