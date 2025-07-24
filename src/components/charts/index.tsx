import React, { useState } from 'react';
import { Tabs, Select, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { TabPane } = Tabs;
const { Option } = Select;

const lineChartData = {
  weekly: [
    { name: 'Mon', value: 100 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 40 },
    { name: 'Fri', value: 20 },
    { name: 'Sat', value: 10 },
    { name: 'Sun', value: 5 },
  ],
  monthly: [
    { name: 'Week 1', value: 100 },
    { name: 'Week 2', value: 70 },
    { name: 'Week 3', value: 30 },
    { name: 'Week 4', value: 10 },
  ],
  yearly: [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 90 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 10 },
  ],
};

const LineCharts: React.FC = () => {
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const moreMenu = (
    <Menu
      items={[
        { key: '1', label: 'Export Data' },
        { key: '2', label: 'Print Chart' },
      ]}
    />
  );

  const renderChart = (dataKey: keyof typeof lineChartData) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineChartData[dataKey]} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Tabs defaultActiveKey="1">
      {['Users', 'Projects', 'Operating Status'].map((tab, index) => (
        <TabPane tab={tab} key={index + 1}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap:20 }}>
            {/* Dropdown 1 - Filter (functional) */}
            <Select
              defaultValue="weekly"
              onChange={value => setFilter(value as 'weekly' | 'monthly' | 'yearly')}
              style={{ width: 150 }}
            >
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>

            {/* Dropdown 2 - Non-functional */}
            <Select defaultValue="All Users" style={{ width: 150 }}>
              <Option value="All Users">All Users</Option>
              <Option value="Active Users">Active Users</Option>
            </Select>

            {/* Dropdown 3 - More Options */}
            <Dropdown overlay={moreMenu} placement="bottomRight">
              <MoreOutlined style={{ fontSize: 24, cursor: 'pointer', color:"#333" }} />
            </Dropdown>
          </div>

          {/* Chart */}
          {renderChart(filter)}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default LineCharts;
