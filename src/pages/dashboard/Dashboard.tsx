import { Card, Col, Row, Table } from 'antd';
import { BarChart2, DollarSign, ShoppingCart, Users } from 'lucide-react';
import React from 'react';
import LineCharts from '../../components/charts';
import DeviceTrafficChart from '../../components/charts/deviceTrafficChart';
import LocationTrafficChart from '../../components/charts/locationTrafficChart';
import { recentOrders } from '../../data/mockData';
import '../../styles/Dashboard.css';

const Dashboard: React.FC = () => {
 

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Name',
      dataIndex: 'customer',
      key: 'customer',
    },
    
    {
      title: 'Oder Date',
      dataIndex: 'date',
      key: 'date',
    },
   
  
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(242, 226, 211, 0.2)' }}>
              <DollarSign size={24} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total Revenue</h3>
              <p className="stat-value">$35,723.96</p>
              <p className="stat-change positive">+12.5% from last month</p>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card golden-bg">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(125, 211, 252, 0.2)' }}>
              <ShoppingCart size={24} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total Orders</h3>
              <p className="stat-value">1,256</p>
              <p className="stat-change positive">+8.2% from last month</p>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(167, 139, 250, 0.2)' }}>
              <Users size={24} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">New Customers</h3>
              <p className="stat-value">358</p>
              <p className="stat-change positive">+15.3% from last month</p>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card golden-bg">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(248, 113, 113, 0.2)' }}>
              <BarChart2 size={24} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Conversion Rate</h3>
              <p className="stat-value">3.6%</p>
              <p className="stat-change negative">-0.8% from last month</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card >
           <LineCharts/>
          </Card>
        </Col>
      </Row>


      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card >
           <DeviceTrafficChart/>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card >
           <LocationTrafficChart/>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card title="Recent Orders" className="table-card">
            <Table 
              dataSource={recentOrders} 
              columns={columns} 
              rowKey="id"
              pagination={false}
              scroll={{ x: 'max-content' }}
              className="orders-table"
            />
          </Card>
        </Col>
      </Row>
      
      
    </div>
  );
};

export default Dashboard;