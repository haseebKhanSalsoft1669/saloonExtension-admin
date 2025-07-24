export const notifications = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'You have received a new order #12345',
    time: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Payment Successful',
    message: 'Payment for order #12342 was successful',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    title: 'New User Registration',
    message: 'A new user registered with email john@example.com',
    time: '3 hours ago',
    read: true
  },
  {
    id: 4,
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low on stock',
    time: 'Yesterday',
    read: true
  },
  {
    id: 5,
    title: 'System Update',
    message: 'System will undergo maintenance on June 15th',
    time: '2 days ago',
    read: true
  }
];

// export const recentOrders = [
//   {
//     id: 'ORD-001',
//     customer: 'John Smith',
//     product: 'iPhone 15 Pro',
//     date: '2023-06-10',
//     amount: 1299.00,
//     status: 'Completed'
//   },
//   {
//     id: 'ORD-002',
//     customer: 'Emily Johnson',
//     product: 'MacBook Air M2',
//     date: '2023-06-09',
//     amount: 1199.00,
//     status: 'Processing'
//   },
//   {
//     id: 'ORD-003',
//     customer: 'Michael Brown',
//     product: 'AirPods Pro',
//     date: '2023-06-08',
//     amount: 249.00,
//     status: 'Completed'
//   },
//   {
//     id: 'ORD-004',
//     customer: 'Sarah Davis',
//     product: 'iPad Mini',
//     date: '2023-06-07',
//     amount: 499.00,
//     status: 'Shipped'
//   },
//   {
//     id: 'ORD-005',
//     customer: 'James Wilson',
//     product: 'Apple Watch Series 8',
//     date: '2023-06-06',
//     amount: 399.00,
//     status: 'Cancelled'
//   }
// ];


export const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    date: '2023-06-10',
  },
  {
    id: 'ORD-002',
    customer: 'Emily Johnson',
    date: '2023-06-09',
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    date: '2023-06-08',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Davis',
    date: '2023-06-07',
  },
  {
    id: 'ORD-005',
    customer: 'James Wilson',
    date: '2023-06-06',
  }
];
export const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export const performanceData = [
  { name: 'Mon', visits: 3500, orders: 2300 },
  { name: 'Tue', visits: 4500, orders: 3100 },
  { name: 'Wed', visits: 5200, orders: 3500 },
  { name: 'Thu', visits: 4800, orders: 3200 },
  { name: 'Fri', visits: 6000, orders: 4100 },
  { name: 'Sat', visits: 7500, orders: 5200 },
  { name: 'Sun', visits: 5500, orders: 3800 },
];

export const productCategories = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Kitchen', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Others', value: 5 },
];