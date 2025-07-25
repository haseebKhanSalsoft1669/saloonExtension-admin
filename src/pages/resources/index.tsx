import { Button, Card, Input, Table } from 'antd';
import { Edit, Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { Search: AntSearch } = Input;

const Resources: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const resourceData = [
    {
      id: 1,
      title: 'FAQs',
      type: 'Static Page',
      subtype: 'Pdf',
      status: 'Published',
      lastUpdated: 'Jun 12, 2025',
    },
    {
      id: 2,
      title: 'Terms & Conditions',
      type: 'Static Page',
      subtype: 'Html',
      status: 'Draft',
      lastUpdated: 'Jun 10, 2025',
    },
    {
      id: 3,
      title: 'Privacy Policy',
      type: 'Static Page',
      subtype: 'Pdf',
      status: 'Published',
      lastUpdated: 'Jun 08, 2025',
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Subtype',
      dataIndex: 'subtype',
      key: 'subtype',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          icon={<Edit size={16} />}
          onClick={() => navigate(`/resources/edit/${record.id}`)}
        />
      ),
    },
  ];

  const filteredData = resourceData.filter(resource =>
    resource.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Resources</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search resources..."
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

export default Resources;
