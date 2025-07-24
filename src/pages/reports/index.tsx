
import { Button, Card, Col, DatePicker, Form, Row, Select, Tabs } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;


const Reports: React.FC = () => {
 const navigate = useNavigate();

 const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  const renderCommonFields = () => (
    <>
      <Form.Item name="paymentMethod" rules={[{ required: true, message: 'Select payment method' }]}>
        <Select placeholder="Select Payment Method" defaultValue="Select Payment Method">
          <Option value="cash">Cash</Option>
          <Option value="cc">CC</Option>
          <Option value="check">Check</Option>
          <Option value="eft">EFT</Option>
        </Select>
      </Form.Item>

      <Form.Item name="category"  rules={[{ required: true, message: 'Select category type' }]}>
        <Select placeholder="Category Type" defaultValue="Category Type">
          <Option value="type1">Type 1</Option>
          <Option value="type2">Type 2</Option>
        </Select>
      </Form.Item>
    </>
  );


  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Report</h1>
      
      </div>

<div className='tab-container'>
<Card style={{ borderRadius: 10 }}>
      <Tabs defaultActiveKey="monthly" >
        <TabPane tab="MONTHLY" key="monthly">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {renderCommonFields()}
            <Row gutter={12}>
            <Col>
                <Button className='mainbtn' htmlType="submit" onClick={() => navigate('/View-reports-details')}>GET REPORT</Button>
              </Col>
              <Col>
                <Button className='mainbtn dangerbg'>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="QUARTER" key="quarterly">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {renderCommonFields()}

            <Form.Item
              name="quarterDates"
              label="Select 3-Month Range"
              rules={[{ required: true, message: 'Select quarter dates' }]}
            >
              <RangePicker picker="month" format="MMMM YYYY" />
            </Form.Item>

            <Row gutter={12}>
            <Col>
                <Button className='mainbtn' htmlType="submit" onClick={() => navigate('/View-reports-details')}>GET REPORT</Button>
              </Col>
              <Col>
                <Button className='mainbtn dangerbg'>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="YEARLY" key="yearly">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {renderCommonFields()}

            <Form.Item
              name="year"
              label="Select Year"
              rules={[{ required: true, message: 'Select year' }]}
            >
              <DatePicker picker="year" style={{ width: '100%' }} />
            </Form.Item>

            <Row gutter={12}>
              <Col>
                <Button className='mainbtn' htmlType="submit" onClick={() => navigate('/View-reports-details')}>GET REPORT</Button>
              </Col>
              <Col>
                <Button className='mainbtn dangerbg'>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
</div>
     

    
    </div>
  );
};

export default Reports;
