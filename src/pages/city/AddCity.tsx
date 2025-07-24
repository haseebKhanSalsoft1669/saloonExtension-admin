import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';



const { Title } = Typography;

const AddCity: React.FC = () => {

    



    return (
        <div className="page-container">
            {/* Row 1: Header */}
            <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
                <Col>
                    <Space>

                        <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Add City</Title>
                    </Space>
                </Col>


            </Row>

            {/* Row 2: Content */}
            <Row gutter={24} className="user-info-row">

            <Col xs={24}>
            <Form layout="vertical">
  <Form.Item
    label="State"
    name="state"
    style={{ width: '100%' }} // Ensures the form item doesn't restrict width
  >
    <Input
      placeholder="Enter State Here"
      style={{ width: '100%' }} // Ensures full width of input
    />
  </Form.Item>

  <Form.Item
    label="City"
    name="city"
    style={{ width: '100%' }} // Ensures the form item doesn't restrict width
  >
    <Input
      placeholder="Enter City Here"
      style={{ width: '100%' }} // Ensures full width of input
    />
  </Form.Item>

  <Form.Item>
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button className="mainbtn" htmlType="button">
        ADD CITY
      </Button>
    </div>
  </Form.Item>
</Form>

            </Col>

                

            </Row>

            {/* BAN USER Modal */}

        </div>
    );
};

export default AddCity;
