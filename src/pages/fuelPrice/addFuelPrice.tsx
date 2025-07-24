import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const AddFuelPrice: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values: any) => {
    console.log('Fuel Prices:', values);
    setIsModalVisible(true); // Show success popup
  };

  // Formatter/parser to strictly allow valid number input
  const formatter = (value: any) =>
    `${value}`.replace(/[^0-9.]/g, ''); // only numbers and dot
  const parser = (value: string | undefined) =>
    value ? value.replace(/[^0-9.]/g, '') : '';

  return (
    <div className="page-container">
      {/* Header */}
      <Row
        justify="space-between"
        align="middle"
        className="user-details-header"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <Space>
            <ArrowLeft
              onClick={() => navigate('/fuelPrices')}
              style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
            />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
              Add Fuel Price
            </Title>
          </Space>
        </Col>
      </Row>

      {/* Content */}
      <Row gutter={24}>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Regular"
                name="regular"
                rules={[{ required: true, message: 'Please enter a regular price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  controls={false}
                  placeholder="8.99"
                  formatter={formatter}
                  parser={parser}
                />
              </Form.Item>

              <Form.Item
                label="Premium"
                name="premium"
                rules={[{ required: true, message: 'Please enter a premium price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  controls={false}
                  placeholder="8.99"
                  formatter={formatter}
                  parser={parser}
                />
              </Form.Item>

              <Form.Item
                label="Diesel"
                name="diesel"
                rules={[{ required: true, message: 'Please enter a diesel price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  controls={false}
                  placeholder="8.99"
                  formatter={formatter}
                  parser={parser}
                />
              </Form.Item>

              <Form.Item>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button type="primary" htmlType="submit">
                    UPDATE
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>,
        ]}
        centered
        title={null}
      >
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            width={80}
            style={{ marginBottom: 16 }}
          />
          <Title level={4}>System Message</Title>
          <Paragraph>Prices have been updated successfully!</Paragraph>
        </div>
      </Modal>
    </div>
  );
};

export default AddFuelPrice;
