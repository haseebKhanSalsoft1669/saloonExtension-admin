import { Card, Input, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

interface OrderData {
  key: string;
  categoryType: string;
  description: string;
  date: string;
  amountPaid: string;
}



const Liability: React.FC = () => {
    const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const data: OrderData[] = [
    {
      key: '1',
      categoryType: 'ORD-00123',
      description: 'John Doe',
      date: '2025-05-01',
      amountPaid: '$120.00',
    },
    {
        key: '2',
        categoryType: 'ORD-00123',
        description: 'John Doe',
        date: '2025-05-01',
        amountPaid: '$120.00',
      },
      {
        key: '3',
        categoryType: 'ORD-00123',
        description: 'John Doe',
        date: '2025-05-01',
        amountPaid: '$120.00',
      },
      {
        key: '4',
        categoryType: 'ORD-00123',
        description: 'John Doe',
        date: '2025-05-01',
        amountPaid: '$120.00',
      },
      {
        key: '5',
        categoryType: 'ORD-00123',
        description: 'John Doe',
        date: '2025-05-01',
        amountPaid: '$120.00',
      },
  ];

  const filteredData = data.filter((item) =>
    item.categoryType.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<OrderData> = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'sno',
      render: (_, __, index) => index + 1,
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
        title: 'Amount Paid',
        dataIndex: 'amountPaid',
        key: 'amountPaid',
      },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Tooltip title="View Details">
          <Eye style={{ cursor: 'pointer' }} onClick={() => navigate('/view-liability')} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Liability</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search orders..."
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

export default Liability;
