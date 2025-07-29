import { Button, Card, Dropdown, Input, Menu, Modal, Table, message, Space, Typography } from 'antd';
import { Edit, Eye, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;
const { Title } = Typography;

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
        open={isModalVisible}
        onCancel={cancelDelete}
        footer={null}
        centered
        closeIcon={<X />}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00" />
            <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white" />
          </svg>
          <Title level={4}>Are you sure you want to Ban <strong>{userToDelete?.name}</strong>?</Title>
          <Space style={{ marginTop: 20 }}>
            <Button className='mainbtn' onClick={() => cancelDelete()}>No</Button>
            <Button className='mainbtn dangerbg' onClick={cancelDelete}>Yes</Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Community;
