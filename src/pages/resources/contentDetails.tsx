import { Card,Row,Col, Form, Input, Image, Skeleton, Typography } from 'antd';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetContentByIdQuery, type ContentItem } from '../../redux/services/contentSlice';
import { UPLOADS_URL } from '../../constants/api'

const { Title, Text } = Typography;

const ContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetContentByIdQuery(id as string, { skip: !id });

  if (isFetching) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  if (isError || !data) {
    return (
      <Card>
        <Text type="danger">Failed to load content.</Text>
      </Card>
    );
  }

  const content: ContentItem = data;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} className="page-title" style={{ margin: 0 }}>Content Details</Title>
        <a onClick={() => navigate(-1)}>Back</a>
      </div>

<Card
  title="Content Details"
  bordered={false}
  style={{ maxWidth: 900, margin: "20px auto", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
>
  <Row gutter={24} align="top">
    {/* Left Side: Image */}
    <Col span={8}>
      {content?.content_image ? (
        <Image
          src={`${UPLOADS_URL}${content.content_image}`}
          alt={content?.title}
          width="100%"
          style={{ borderRadius: 8 }}
        />
      ) : (
        <Text type="secondary">No image</Text>
      )}
    </Col>

    {/* Right Side: Form */}
    <Col span={16}>
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={content?.title ?? "-"} disabled />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea value={content?.desc ?? "-"} rows={100} disabled />
        </Form.Item>

        <Form.Item label="Created At">
          <Input
            value={
              content?.createdAt
                ? new Date(content.createdAt).toLocaleString()
                : "-"
            }
            disabled
          />
        </Form.Item>

        <Form.Item label="Updated At">
          <Input
            value={
              content?.updatedAt
                ? new Date(content.updatedAt).toLocaleString()
                : "-"
            }
            disabled
          />
        </Form.Item>
      </Form>
    </Col>
  </Row>
</Card>
    </div>
  );
};

export default ContentDetails;


