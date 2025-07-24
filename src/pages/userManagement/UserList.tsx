import { Button, Card, Dropdown, Input, Menu, Modal, Table, message } from 'antd';
import { Edit, Eye, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

const UserList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const userData = [
    {
      id: 1,
      orderId: 'ORD001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      registrationDate: '2023-05-01',
    },
    {
      id: 2,
      orderId: 'ORD002',
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      registrationDate: '2023-05-10',
    },
    {
      id: 3,
      orderId: 'ORD003',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      registrationDate: '2023-05-15',
    },
    {
      id: 4,
      orderId: 'ORD004',
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      registrationDate: '2023-05-20',
    },
    {
      id: 5,
      orderId: 'ORD005',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      registrationDate: '2023-05-25',
    },
  ];

  const showDeleteConfirm = (record: any) => {
    setUserToDelete(record);
    setIsModalVisible(true);
  };

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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<Edit size={16} />} onClick={() => navigate('/users/userdetails')}>
              Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<Trash size={16} />} onClick={() => showDeleteConfirm(record)}>
              Ban
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

  const filteredData = userData.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

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
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
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
