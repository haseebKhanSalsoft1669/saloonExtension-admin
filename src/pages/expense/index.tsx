import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, message,Typography } from 'antd';
import { Edit, Eye, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;
const { Title } = Typography;

const Expense: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const userData = [
    {
      id: 1,
      categoryType: 'Credit Cards',
      description: 'Lorem Ipsum is simply dummy text...',
      amount: '$500.00',
      expenseDate: '2023-05-01',
    },
    {
        id: 2,
        categoryType: 'Credit Cards',
        description: 'Lorem Ipsum is simply dummy text...',
        amount: '$500.00',
        expenseDate: '2023-05-01',
      },
      {
        id: 3,
        categoryType: 'Credit Cards',
        description: 'Lorem Ipsum is simply dummy text...',
        amount: '$500.00',
        expenseDate: '2023-05-01',
      },
      {
        id: 4,
        categoryType: 'Credit Cards',
        description: 'Lorem Ipsum is simply dummy text...',
        amount: '$500.00',
        expenseDate: '2023-05-01',
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
      title: 'Category Type',
      dataIndex: 'categoryType',
      key: 'categoryType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Expense Date',
      dataIndex: 'expenseDate',
      key: 'expenseDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<Edit size={16} />} onClick={() => navigate('/add-expense')}>
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
    user.categoryType.toLowerCase().includes(searchText.toLowerCase()) ||
    user.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Expense</h1>
       
        <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
            
                <Col>
                    <Button type="primary" onClick={() => navigate('/add-expense')}>
                    ADD EXPENSE
                    </Button>
                </Col>
                
            </Row>
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
        <Title level={4}>Confirm Deletion</Title>
        <p>Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Expense;
