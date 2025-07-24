import React from 'react';
import {
  Col,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Button,
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface ProductRow {
  id: number;
  productCode: any;
  quantity: string;
  unitPrice: string;
  extendedPrice: string;
}

const products: ProductRow[] = [
  { id: 1, productCode: 'PRD001', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 2, productCode: 'PRD002', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 3, productCode: 'PRD003', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 4, productCode: 'PRD004', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 5, productCode: 'PRD005', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 6, productCode: <span>SubTotal</span>, quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 7, productCode: 'PRD007', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 8, productCode: 'PRD008', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 9, productCode: 'PRD009', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 10, productCode: 'PRD0010', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 11, productCode: 'PRD0011', quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 12, productCode: <span>SubTotal</span>, quantity: '', unitPrice: '', extendedPrice: '' },
  { id: 13, productCode: <span>EPA FEE Charges</span>, quantity: '', unitPrice: '', extendedPrice: '' },
];

const InvoiceExcelTable: React.FC = () => {
  return (
    <>
    <div className="page-container">
    <Row justify="space-between" align="middle" className="user-details-header" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Create Invoice</Title>
          </Space>
        </Col>
        <Col>
          <label style={{ marginRight: 15 }}>Change Status: </label>
          <Select defaultValue="pending" style={{ width: 150 }}>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="dispatched">Dispatched</Option>
          </Select>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col xs={24} md={22} lg={16}>

          <div className="excel-responsive-wrapper">
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Quantity Ship</th>
                  <th>Unit Price</th>
                  <th>Extended Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td><label>{product.productCode}</label></td>
                    <td><Input type="number" className="custom-invoice-field" placeholder="Quantity" /></td>
                    <td><Input type="number" className="custom-invoice-field" placeholder="Unit Price" /></td>
                    <td><Input type="number" className="custom-invoice-field" placeholder="Extended Price" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Row gutter={24} style={{ marginTop: 16 }}>
            <Col><Button type="primary">Create</Button></Col>
          </Row>

        </Col>
      </Row>
    </div>
      
    </>
  );
};

export default InvoiceExcelTable;
