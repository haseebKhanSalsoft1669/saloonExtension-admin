import { Card, Image, Input, Modal, Select, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Search } from 'lucide-react';
import React, { useState } from 'react';
import '../../styles/Common.css';

import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';

const { Search: AntSearch } = Input;

interface OrderData {
  key: string;
  orderNumber: string;
  customerName: string;
  date: string;
  amountPaid: string;
  status: 'Pending' | 'Completed' | 'Dispatched';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return '#DD9F00';
    case 'Completed':
      return '#00B31D';
    case 'Dispatched':
      return '#2D308B';
    default:
      return '#ccc';
  }
};


const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color:'#000'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        display: "flex"
    },
    companyInfo: {
        width: '40%',
    },
    logo: {
        width: 120,
        alignSelf: 'center',
    },
    invoiceDetails: {
        width: '40%',
        textAlign: 'right',
        fontSize: "13px",
        color:'#000'
    },
    label: {
        fontWeight: 'bold',
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        fontSize: "13px",
        color:'#000'
    },
    labelLeft: {
        fontWeight: 'bold',
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "13px",
        color:'#000'
    },
    poSection: {
        marginTop: 10,
        padding: 10,
    },
    textBlock: {
        width: "100%",
        display: "flex",
        fontSize: "13px",
        fontWeight: 'bold',
    },
    tableContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        width: '100%',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    tableCol: {
        width: '33.33%',
        padding: 5,
        borderRightWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    lastCol: {
        borderRightWidth: 0,
    },
    tableCell: {
        fontSize: 13,
        fontWeight: 'bold',
        color:'#000'
    },
    table2Container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#000',
    },
    table2Row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: '#000',
        width: "100%",
        display: "flex",
    },
    table2ColLarge: {
        width: '50%',
        padding: 5,
    },
    table2Col: {
        width: '16.66%',
        padding: 5,
    },
    table2Header: {
        fontSize: 13,
        fontWeight: 'bold',
        color:'#000'
    },
    table2Cell: {
        fontSize: 13,
        color:'#000'
    },
    table2Footer: {
        fontSize: 13,
        fontWeight: 'bold',
        color:'#000'
    },
});


const InvoiceManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
  const [searchText, setSearchText] = useState('');

  const data: OrderData[] = [
    {
      key: '1',
      orderNumber: 'ORD-00123',
      customerName: 'John Doe',
      date: '2025-05-01',
      amountPaid: '$120.00',
      status: 'Pending',
    },
    {
      key: '2',
      orderNumber: 'ORD-00124',
      customerName: 'Jane Smith',
      date: '2025-05-02',
      amountPaid: '$180.00',
      status: 'Completed',
    },
    {
      key: '3',
      orderNumber: 'ORD-00125',
      customerName: 'Alex Johnson',
      date: '2025-05-03',
      amountPaid: '$240.00',
      status: 'Dispatched',
    },
  ];

  const filteredData = data.filter((item) =>
    item.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<OrderData> = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'sno',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          style={{
            backgroundColor: getStatusColor(status),
            color: '#fff',
            borderRadius: 4,
            padding: '2px 8px',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Tooltip title="View Details">
          <Eye style={{ cursor: 'pointer' }}  onClick={showModal} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Invoice Management</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search orders..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<Search size={16} />}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          scroll={{ x: 'max-content' }}
          className="data-table"
        />
      </Card>


      <Modal
                 open={isModalOpen}
                 onCancel={() => setIsModalOpen(false)}
                 footer={null}
                 width={{
                   xs: '90%',
                   sm: '80%',
                   md: '70%',
                   lg: '60%',
                   xl: '50%',
                   xxl: '40%',
                 }}

            >
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <View style={styles.companyInfo}>
                                <Text style={styles.textBlock}>D&D Energy Group</Text>
                                <Text style={styles.textBlock}>120 Depot Court</Text>
                                <Text style={styles.textBlock}>Peachtree City, GA 30269</Text>
                                <Text style={styles.textBlock}>Phone: (770) 302-0004</Text>
                            </View>
                            <View>
                    
                    <Image style={styles.logo} src="../images/modal-logo.png"  />
                    </View>

                            <View style={styles.invoiceDetails}>
                                <Text>
                                    <Text style={styles.label}>Invoice No:   {"invoice?.invoiceNum" || '-'}</Text>

                                </Text>
                                <Text>
                                    <Text style={styles.label}>Invoice Date: {"invoice?.invoiceDate "}</Text>

                                </Text>
                                <Text>
                                    <Text style={styles.label}>Order Date: {"invoice?.createdAt '"}</Text>

                                </Text>
                                <Text>
                                    <Text style={styles.label}>Ship Date: {"invoice?.order'"} </Text>

                                </Text>
                            </View>
                        </View>

                        <View style={styles.header}>
                            <View style={styles.companyInfo}>
                                <Text style={styles.labelLeft}>Sold:   {"invoice?.invoiceNum" || '-'}</Text>
                                <Text style={styles.labelLeft}>To:   {"invoice?.invoiceNum" || '-'}</Text>
                            </View>


                            <View style={styles.invoiceDetails}>
                                <Text>
                                    <Text style={styles.labelLeft}>Ship:   {"invoice?.invoiceNum" || '-'}</Text>

                                </Text>
                                <Text>
                                    <Text style={styles.labelLeft}>To: {"invoice?.invoiceDate "}</Text>

                                </Text>
                            </View>
                        </View>


                        <View style={styles.tableContainer}>
                            {/* Row 1 */}
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 1 Row 1</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 2 Row 1</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 3 Row 1</Text></View>
                            </View>

                            {/* Row 2 */}
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 1 Row 2</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 2 Row 2</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>Column 3 Row 2</Text></View>
                            </View>
                        </View>

                        <View style={styles.table2Container}>
                            {/* Header Row */}
                            <View style={styles.table2Row}>
                                <View style={styles.table2ColLarge}>
                                    <Text style={styles.table2Header}>Description</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Header}>Qty</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Header}>Price</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Header}>Total</Text>
                                </View>
                            </View>

                            {/* 4 Data Rows */}
                            {[1, 2, 3, 4].map((i) => (
                                <View style={styles.table2Row} key={i}>
                                    <View style={styles.table2ColLarge}>
                                        <Text style={styles.table2Cell}>Item description {i}</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>1</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                </View>
                            ))}

                            {/* Last Row (2 bold columns at end) */}
                            <View style={styles.table2Row}>
                                <View style={styles.table2ColLarge}>
                                    <Text></Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text></Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>Subtotal</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>$40.00</Text>
                                </View>
                            </View>


                            {/* 4 Data Rows */}
                            {[1, 2, 3, 4].map((i) => (
                                <View style={styles.table2Row} key={i}>
                                    <View style={styles.table2ColLarge}>
                                        <Text style={styles.table2Cell}>Item description {i}</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>1</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                </View>
                            ))}

                            {/* Last Row (2 bold columns at end) */}
                            <View style={styles.table2Row}>
                                <View style={styles.table2ColLarge}>
                                    <Text></Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text>abc</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>Subtotal</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>$40.00</Text>
                                </View>
                            </View>

                            {/* 4 Data Rows */}
                            {[1, 2, 3, 4].map((i) => (
                                <View style={styles.table2Row} key={i}>
                                    <View style={styles.table2ColLarge}>
                                        <Text style={styles.table2Cell}>Item description {i}</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>1</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                    <View style={styles.table2Col}>
                                        <Text style={styles.table2Cell}>$10.00</Text>
                                    </View>
                                </View>
                            ))}

                            {/* Last Row (2 bold columns at end) */}
                            <View style={styles.table2Row}>
                                <View style={styles.table2ColLarge}>
                                    <Text></Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text></Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>Subtotal</Text>
                                </View>
                                <View style={styles.table2Col}>
                                    <Text style={styles.table2Footer}>$40.00</Text>
                                </View>
                            </View>

                        </View>


                    </Page>
                </Document>
            </Modal>
    </div>
  );
};

export default InvoiceManagement;
