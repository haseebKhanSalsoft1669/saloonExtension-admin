import { Card, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

interface CouponData {
  key: string;
  code: string;
  type: string;
  value: string;
  minOrder: string;
  validUntil: string;
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

const CouponManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const data: CouponData[] = [
    {
      key: '1',
      code: 'SAVE20',
      type: 'Percent',
      value: '20',
      minOrder: '12',
      validUntil: 'June 24, 2025',
      status: 'Active',
    },
    {
      key: '2',
      code: 'NEW10',
      type: 'Fixed',
      value: '10',
      minOrder: '5',
      validUntil: 'July 10, 2025',
      status: 'Cancelled',
    },
    {
      key: '3',
      code: 'FREESHIP',
      type: 'Free Shipping',
      value: '-',
      minOrder: '0',
      validUntil: 'August 01, 2025',
      status: 'Active',
    },
  ];

  const filteredData = data.filter((item) =>
    item.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<CouponData> = [
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Min Order',
      dataIndex: 'minOrder',
      key: 'minOrder',
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
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
        <h1 className="page-title">Coupon Management</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search coupons..."
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

export default CouponManagement;
