import { Card, Input, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Check, Eye, Search, X } from 'lucide-react'; // ✅ Importing icons
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';
import { useGetAllOrderQuery } from '../../redux/services/orderSlice'
const { Search: AntSearch } = Input;

interface OrderData {
  key: string;
  orderNumber: string;
  customerName: string;
  date: string;
  total: string;
  paymentStatus: string;
  status: 'Pending' | 'Completed' | 'Dispatched' | 'Refund';
  user?: {
    fullName? : string
    }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#e58e63ff';
    case 'delivered':
      return '#00B31D';
    case 'dispatched':
      return '#2D308B';
    case 'refund':
      return '#FF0000';
    case 'confirmed':
      return '#0eef99ff';
    default:
      return '#ccc';
  }
};

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const {data  } = useGetAllOrderQuery({ page: 1, limit: 100, keyword: searchText });

  
  

  // const data: OrderData[] = [
  //   {
  //     key: '1',
  //     orderNumber: 'ORD-00123',
  //     customerName: 'John Doe',
  //     date: '2025-05-01',
  //     total: '$120.00',
  //     paymentStatus: "paid",
  //     status: 'Pending',
  //   },
  //   {
  //     key: '2',
  //     orderNumber: 'ORD-00124',
  //     customerName: 'Jane Smith',
  //     date: '2025-05-02',
  //     total: '$180.00',
  //     paymentStatus: "paid",
  //     status: 'Completed',
  //   },
  //   {
  //     key: '3',
  //     orderNumber: 'ORD-00125',
  //     customerName: 'Alex Johnson',
  //     date: '2025-05-03',
  //     total: '$240.00',
  //     paymentStatus: "paid",
  //     status: 'Dispatched',
  //   },
  //   {
  //     key: '4',
  //     orderNumber: 'ORD-00125',
  //     customerName: 'Alex Johnson',
  //     date: '2025-05-03',
  //     total: '$240.00',
  //     paymentStatus: "refunded",
  //     status: 'Refund',
  //   },
  // ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredData = data?.orders?.filter((item : any) =>
    item?._id?.toLowerCase().includes(searchText.toLowerCase()) ||
    item?.user?.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<OrderData> = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'sno',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Order Number',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (_ ,record) => <span>{record?.user?.fullName}</span>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (k) => new Date(k).toLocaleDateString() + " " + new Date(k).toLocaleTimeString()
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Payment',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const isPaid = status?.toLowerCase() === 'confirmed';
        return (
          <div style={{ color: isPaid ? 'green' : 'red', display: 'flex', alignItems: 'center', gap: 6 }}>
            
            <span style={{ textTransform: 'capitalize' }}>{status}</span>
            {isPaid ? <Check size={16} /> : <X size={16} />}
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          style={{
            backgroundColor: getStatusColor(status),
            color: '#fff',
            borderRadius: 4,
            padding: '2px 8px',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Tooltip title="View Details">
          <Eye style={{ cursor: 'pointer' }} onClick={() => navigate('/order-details')} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        
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

export default OrderManagement;
