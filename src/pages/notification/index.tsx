import React from "react";
import { Card, Row, Col, Typography, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { Paragraph, Text, Title } = Typography;


const notifications = [
  {
    id: 1,
    message: "Your order has been shipped successfully.",
    date: "May 29, 2025",
    time: "10:30 AM",
  },
  {
    id: 2,
    message: "You have a new message from customer support.",
    date: "May 28, 2025",
    time: "4:15 PM",
  },
  {
    id: 3,
    message: "Your subscription will expire in 3 days.",
    date: "May 27, 2025",
    time: "9:00 AM",
  },
];

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div  className="page-container">
      <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
            <Col>
                    <Space>
                        
                        <Title level={3} style={{ margin: 0, color:'var(--text-primary)' }}>Notifications</Title>
                    </Space>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => navigate('/notifications/new')}>
                    Push New Notifications
                    </Button>
                </Col>
                
            </Row>
      
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          style={{ marginBottom: 16 }}
          bodyStyle={{ padding: 16 }}
        >
          <Row align="middle" justify="space-between">
            <Col>
              <Row align="middle" gutter={16}>
                <Col>
                  <BellOutlined style={{ fontSize: 24 }} />
                </Col>
                <Col>
                  <Paragraph style={{ margin: 0, color:'var(--text-primary)' }}>
                    {notification.message}
                  </Paragraph>
                  <Text type="secondary">
                    {notification.date} at {notification.time}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="primary" onClick={() => navigate(`/notifications/${notification.id}/view`)}>View</Button>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
