import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Modal,
  Row,
  Col,
  Space,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NotificationForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isViewMode = location.pathname.includes("view");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const sampleData = {
    title: "System Maintenance Alert",
    type: "Alert",
    description: "The system will undergo maintenance on Saturday at 12:00 AM.",
  };

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    setIsModalVisible(true);
  };

  return (
    <div className="page-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft
              onClick={() => navigate("/notifications")}
              style={{ cursor: "pointer", color: "var(--text-primary)" }}
            />
            <Title level={3} style={{ margin: 0, color: "var(--text-primary)" }}>
              {isViewMode ? "View Notification" : "Push New Notification"}
            </Title>
          </Space>
        </Col>
      </Row>

      {isViewMode ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <Text strong style={{ margin: 0, color:'var(--text-primary)' }}>Title</Text>
            <Paragraph style={{ margin: 0, color:'var(--text-primary)' }}>{sampleData.title}</Paragraph>
          </div>
          <div>
            <Text strong style={{ margin: 0, color:'var(--text-primary)' }}>Notification Type</Text>
            <Paragraph style={{ margin: 0, color:'var(--text-primary)' }}>{sampleData.type}</Paragraph>
          </div>
          <div>
            <Text strong style={{ margin: 0, color:'var(--text-primary)' }}>Description</Text>
            <Paragraph style={{ margin: 0, color:'var(--text-primary)' }}>{sampleData.description}</Paragraph>
          </div>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: "",
            type: undefined,
            description: "",
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Notification Type"
            name="type"
            rules={[{ required: true, message: "Please select notification type" }]}
          >
            <Select placeholder="Select type">
              <Option value="Alert">Alert</Option>
              <Option value="Reminder">Reminder</Option>
              <Option value="Info">Info</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              PUSH NOTIFICATION
            </Button>
          </Form.Item>
        </Form>
      )}

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>,
        ]}
        title={null}
        centered
      >
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            width={80}
            style={{ marginBottom: 16 }}
          />
          <Title level={4}>System Message</Title>
          <Paragraph>Notification has been pushed successfully!</Paragraph>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationForm;
