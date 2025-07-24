import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, message,Typography, Space } from 'antd';
import { ArrowLeft, Edit, Eye, Search, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Common.css';

const { Search: AntSearch } = Input;
const { Title } = Typography;

const ReportsDetails: React.FC = () => {
  const [searchText, setSearchText] = useState('');


  const userData = [
    {
      id: 1,
      date: 'Jan 24, 2025',
      name: 'Loan payment',
      amount: '$500.00',
      paymentInfo: 'Cash',
    },
    {
        id: 2,
        date: 'Jan 24, 2025',
        name: 'Loan payment',
        amount: '$500.00',
        paymentInfo: 'Cash',
      },
      {
        id: 3,
        date: 'Jan 24, 2025',
        name: 'Loan payment',
        amount: '$500.00',
        paymentInfo: 'Cash',
      },
      {
        id: 4,
        date: 'Jan 24, 2025',
        name: 'Loan payment',
        amount: '$500.00',
        paymentInfo: 'Cash',
      },
      {
        id:5,
        date: 'Jan 24, 2025',
        name: 'Loan payment',
        amount: '$500.00',
        paymentInfo: 'Cash',
      },
  ];


  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Info',
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
    },
    
  ];

  const filteredData = userData.filter(user =>
    user.date.toLowerCase().includes(searchText.toLowerCase()) ||
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="page-header">
        
        <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
            <Col>
                    <Space>
                        <ArrowLeft onClick={() => navigate('/View-reports')} style={{ cursor: 'pointer', color:'var(--text-primary)' }} />
                        <Title level={3} style={{ margin: 0, color:'var(--text-primary)' }}>Report Details</Title>
                    </Space>
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


    </div>
  );
};

export default ReportsDetails;
