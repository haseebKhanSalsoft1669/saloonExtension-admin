import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const locationData = [
  { name: 'US', value: 40 },
  { name: 'Canada', value: 20 },
  { name: 'Mexico', value: 15 },
  { name: 'China', value: 35 },
  { name: 'Japan', value: 25 },
  { name: 'Australia', value: 10 },
];

const menu = (
  <Menu
    items={[
      { key: '1', label: 'Download' },
      { key: '2', label: 'Export CSV' },
    ]}
  />
);

const LocationTrafficChart: React.FC = () => {
  return (
    <div style={{  marginBottom: 24, borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color:'#333333' }}>Location Traffic</h3>
        <Dropdown overlay={menu} placement="bottomRight">
          <MoreOutlined style={{ fontSize: 20, cursor: 'pointer', color:"#333" }} />
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={locationData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#52c41a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationTrafficChart;
