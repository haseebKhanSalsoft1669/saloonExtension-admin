import { Card, Descriptions, Image, Skeleton, Typography } from 'antd';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetContentByIdQuery, type ContentItem } from '../../redux/services/contentSlice';

const { Title, Paragraph, Text } = Typography;

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

      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Title">{content.title}</Descriptions.Item>
          <Descriptions.Item label="Description">
            <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>{content.desc}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            {content.content_image ? (
              <Image src={content.content_image} alt={content.title} width={240} />
            ) : (
              <Text type="secondary">No image</Text>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">{content.createdAt ? new Date(content.createdAt).toLocaleString() : '-'}</Descriptions.Item>
          <Descriptions.Item label="Updated At">{content.updatedAt ? new Date(content.updatedAt).toLocaleString() : '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ContentDetails;


