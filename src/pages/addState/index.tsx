import { Button, Card, Dropdown, Input, Menu, Modal, Table, message } from 'antd';
import { Edit, Eye, Plus, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

const StateList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const userData = [

    {
      id: 1,
      orderId: '01',
      state: 'ABC State',
      creationDate: '2025-02-20 19:11:32',
    },
    {
      id: 2,
      orderId: '02',
      state: 'ABC State',
      creationDate: '2025-02-20 19:11:32',
    },
    {
      id: 3,
      orderId: '03',
      state: 'ABC State',
      creationDate: '2025-02-20 19:11:32',
    },
    {
      id: 4,
      orderId: '04',
      state: 'ABC State',
      creationDate: '2025-02-20 19:11:32',
    },
    {
      id: 5,
      orderId: '05',
      state: 'ABC State',
      creationDate: '2025-02-20 19:11:32',
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
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<Edit size={16} />} onClick={() => navigate('/add-state')}>
              Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<Trash size={16} />} onClick={() => showDeleteConfirm(record)}>
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

  const filteredData = userData.filter(user =>
    user.state.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage State</h1>


        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => navigate('/add-state')}
        >
          Add State
        </Button>
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
        title="Confirm Deletion"
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
        <p>Are you sure you want to delete <strong>{userToDelete?.state}</strong>?</p>
      </Modal>
    </div>
  );
};

export default StateList;
