import { Col, Row, Space, Typography,} from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import DateCarouselTabs from '../../components/dateSlider';



const { Title } = Typography;

function AddExpense() {
    const navigate = useNavigate();
  return (
    <div className="page-container">
         <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
            <Col xs={24}>
                    <Space>
                        <ArrowLeft onClick={() => navigate('/expense')} style={{ cursor: 'pointer', color:'var(--text-primary)' }} />
                        <Title level={3} style={{ margin: 0, color:'var(--text-primary)' }}>Add Expense</Title>
                    </Space>
                </Col>
              
                <Col xs={24}>
                    <Space>
                       <Title level={3} style={{ margin: 0, color:'var(--text-primary)' }}>Calendar March</Title>
                    </Space>
                </Col>
                <Col xs={24}>
                    <DateCarouselTabs/>
                </Col>
            </Row>
    </div>
  )
}

export default AddExpense