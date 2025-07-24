import { InboxOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import React, { useState } from 'react';

const { TextArea } = Input;
const { Text } = Typography;

const categoryOptions = [
  { label: 'Credit Cards', value: 'credit-cards' },
  { label: 'Purchase Supply', value: 'purchase-supply' },
  { label: 'Credit Card', value: 'credit-card' },
  { label: 'Loan Payment', value: 'loan-payment' },
  { label: 'Phone & Internet', value: 'phone-internet' },
];

const amountOptions = [
  { label: '$10', value: '10' },
  { label: '$50', value: '50' },
  { label: '$100', value: '100' },
  { label: '$500', value: '500' },
];

const { Title } = Typography;

const DateCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [baseDate, setBaseDate] = useState(dayjs());
  const [fileName, setFileName] = useState('No File Selected');

  const generateDates = (count = 30) => {
    return Array.from({ length: count }, (_, i) => baseDate.add(i, 'day'));
  };

  const handlePrev = () => {
    setBaseDate(prev => prev.subtract(1, 'day'));
  };

  const handleNext = () => {
    setBaseDate(prev => prev.add(1, 'day'));
  };

  const handleFileChange = (info: any) => {
    if (info.file && info.file.name) {
      setFileName(info.file.name);
    }
  };

  const dates = generateDates();

  const [banModalVisible, setBanModalVisible] = useState(false);





  return (
    <div style={{ padding: 20 }}>
      <Row align="middle" justify="space-between" style={{ gap: 12 }}>
        <Button icon={<LeftOutlined />} onClick={handlePrev} />

        <div
          className="date-carousel"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            flexGrow: 1,
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {dates.slice(0, 7).map((date, index) => (
            <Button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={index === activeIndex ? 'active-date' : 'inactive-date'}
             
            >
              {date.format('MMM DD')}
            </Button>
          ))}
        </div>

        <Button icon={<RightOutlined />} onClick={handleNext} />
      </Row>

      <Tabs
          activeKey="form"
          items={[
            {
              key: 'form',
              label: `Form for ${dates[activeIndex].format('MMM DD, YYYY')}`,
              children: (
                <Row gutter={24}>
                  <Col xs={24} md={16} lg={12}>
                    <Form layout="vertical">
                      <Form.Item label="Category Type" name="categoryType">
                        <Select
                          defaultValue="credit-cards"
                          options={categoryOptions}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>

                      <Form.Item label="Amount" name="amount">
                        <Select
                          defaultValue="50"
                          options={amountOptions}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>

                      <Form.Item label="Description" name="description">
                        <TextArea rows={6}  placeholder="Enter your message..." />
                      </Form.Item>

                      <Form.Item label="Upload Image" name="upload">
                        <Upload.Dragger
                          name="file"
                          multiple={false}
                          showUploadList={false}
                          beforeUpload={() => false}
                          onChange={handleFileChange}
                          style={{ padding: 20 }}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <Text type="secondary">{fileName}</Text>
                        </Upload.Dragger>
                      </Form.Item>

                      <Form.Item>
  <div style={{ display: 'flex', gap: '12px' }}>
    <Button className="mainbtn" htmlType="submit" onClick={() => setBanModalVisible(true)}>
      ADD EXPENSE
    </Button>
    <Button className="mainbtn dangerbg" htmlType="button">
      CANCEL
    </Button>
  </div>
</Form.Item>
                    </Form>
                  </Col>
                </Row>
              ),
            },
          ]}
        />

<Modal
                open={banModalVisible}
                onCancel={() => setBanModalVisible(false)}
                footer={null}
                centered
                closeIcon={<X />}
            >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
  <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00"/>
  <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white"/>
</svg>
                    <Title level={4}>System Message</Title>
                    <p>Expense has been added successfully</p>
                    <Space style={{ marginTop: 20 }}>
                        <Button className='mainbtn' onClick={() => setBanModalVisible(false)}>OKAY</Button>
                    </Space>
                </div>
            </Modal>
    </div>
  );
};

export default DateCarousel;
