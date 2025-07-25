import { Button, Card, Dropdown, Input, Menu, Modal, Table, message } from 'antd';
import { Edit, Eye, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

const Community: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const userData = [
    {
      id: 1,
      name: 'Alice Johnson',
      postPreview: 'Exploring the mountains this weekend...',
      likes: '450',
      comments: '24',
      dateposted: "2025-07-01",
    },
    {
      id: 2,
      name: 'Michael Smith',
      postPreview: 'Just finished reading an amazing book!',
      likes: '320',
      comments: '18',
      dateposted: "2025-07-02",
    },
    {
      id: 3,
      name: 'Sophia Williams',
      postPreview: 'New recipe alert: Homemade pasta 🍝',
      likes: '1,200',
      comments: '34',
      dateposted: "2025-07-03",
    },
    {
      id: 4,
      name: 'David Brown',
      postPreview: 'Caught this sunset while jogging...',
      likes: '890',
      comments: '27',
      dateposted: "2025-07-04",
    },
    {
      id: 5,
      name: 'Emma Davis',
      postPreview: 'Weekend vibes 🌴',
      likes: '2,100',
      comments: '45',
      dateposted: "2025-07-05",
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Post Preview',
      dataIndex: 'postPreview',
      key: 'postPreview',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
        title: 'Date posted',
        dataIndex: 'dateposted',
        key: 'dateposted',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<Edit size={16} />} onClick={() => navigate('/community-details')}>
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
    user.postPreview.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Community</h1>
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

export default Community;
