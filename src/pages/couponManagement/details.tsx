import { Card, Descriptions, Skeleton, Typography } from 'antd';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCouponByIdQuery, type Coupon } from '../../redux/services/couponSlice';

const { Title, Text } = Typography;

const CouponDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetCouponByIdQuery(id as string, { skip: !id });

  if (isFetching) return <Skeleton active paragraph={{ rows: 6 }} />;
  if (isError || !data) return <Text type="danger">Failed to load coupon.</Text>;

  const c: Coupon = data;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} className="page-title" style={{ margin: 0 }}>Coupon Details</Title>
        <a onClick={() => navigate(-1)}>Back</a>
      </div>
      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Title">{c.title}</Descriptions.Item>
          <Descriptions.Item label="Description">{c.desc}</Descriptions.Item>
          <Descriptions.Item label="Discount">{c.discount}</Descriptions.Item>
          <Descriptions.Item label="Limit">{c.limit}</Descriptions.Item>
          <Descriptions.Item label="Price/Points">{c.price_or_points}</Descriptions.Item>
          <Descriptions.Item label="Start Date">{c.start_date}</Descriptions.Item>
          <Descriptions.Item label="Expire Date">{c.expire_date}</Descriptions.Item>
          <Descriptions.Item label="Created At">{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</Descriptions.Item>
          <Descriptions.Item label="Updated At">{c.updatedAt ? new Date(c.updatedAt).toLocaleString() : '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default CouponDetails;


