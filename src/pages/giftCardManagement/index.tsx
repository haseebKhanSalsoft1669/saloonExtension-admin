import { Card, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

interface GiftCardData {
  key: string;
  code: string;
  amount: string;
  to: string;
  issuedDate: string;
  expiryDate: string;
  status: 'Active' | 'Cancelled';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return '#00B31D'; // Green
    case 'Cancelled':
      return '#FF0000'; // Red
    default:
      return '#000';
  }
};

const GiftCardManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const data: GiftCardData[] = [
    {
      key: '1',
      code: 'GIFT100',
      amount: '100',
      to: 'john@example.com',
      issuedDate: 'Jan 02, 2025',
      expiryDate: 'June 24, 2025',
      status: 'Active',
    },
    {
      key: '2',
      code: 'GIFT200',
      amount: '200',
      to: 'emma@example.com',
      issuedDate: 'Feb 10, 2025',
      expiryDate: 'July 05, 2025',
      status: 'Cancelled',
    },
    {
      key: '3',
      code: 'GIFT300',
      amount: '300',
      to: 'mike@example.com',
      issuedDate: 'Mar 12, 2025',
      expiryDate: 'Aug 15, 2025',
      status: 'Active',
    },
  ];

  const filteredData = data.filter((item) =>
    item.code.toLowerCase().includes(searchText.toLowerCase()) ||
    item.to.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<GiftCardData> = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'sno',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Issued Date',
      dataIndex: 'issuedDate',
      key: 'issuedDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: getStatusColor(status), fontWeight: 500 }}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Gift Card Management</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search gift cards..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<Search size={16} />}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          scroll={{ x: 'max-content' }}
          className="data-table"
        />
      </Card>
    </div>
  );
};

export default GiftCardManagement;
