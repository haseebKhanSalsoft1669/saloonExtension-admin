
import {
  Box,
  Boxes,
  CopyPlus,
  Gift,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LayoutList,
  PackagePlus,
  TicketPercent,
  Users,
  UsersRound,
} from 'lucide-react';
export const menuItems = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: '/users/list',
    label: 'Customers',
    icon: <Users size={18} />,
   
  },
  {
    key: '/categories',
    label: 'Categories',
    icon: <PackagePlus size={18} />,
   
  },
  {
    key: '/product-management',
    label: 'ProXshop Products',
    icon: <Boxes size={18} />,
   
  },
  {
    key: '/product-management',
    label: 'Retail Products',
    icon: <Box size={18} />,
   
  },
  {
    key: '/order-management',
    label: 'Orders Management',
    icon: <LayoutList  size={18} />,
  },
  {
    key: '/community',
    label: 'Community',
    icon: <UsersRound  size={18} />,
  },
  {
    key: '/resources',
    label: 'Resources',
    icon: <CopyPlus  size={18} />,
  },

  {
    key: '/education',
    label: 'Education',
    icon: <GraduationCap  size={18} />,
  },

  {
    key: '/wishlist',
    label: 'Wishlist',
    icon: <Heart  size={18} />,
  },

  {
    key: '/coupon-management',
    label: 'Coupon Management',
    icon: <TicketPercent  size={18} />,
  },

  {
    key: '/gift-card-management',
    label: 'gift Card Management',
    icon: <Gift  size={18} />,
  },

  
  
  // {
  //   key: '/reports',
  //   label: 'Reports',
  //   icon: <BoxIcon size={18} />,
  //   children: [
  //     {
  //       key: '/View-reports',
  //       label: 'View Report',
  //       icon: <BiSolidReport size={16} />,
  //     },
  //     {
  //       key: '/expense',
  //       label: 'Expense',
  //       icon: <PackageOpen size={16} />,
  //     },
  //     {
  //       key: '/liability',
  //       label: 'Liability',
  //       icon: <ListOrdered size={16} />,
  //     },
  //   ],
  // },
  
  // {
  //   key: '/invoice-management',
  //   label: 'Invoice Management',
  //   icon: <BarChart2 size={18} />,
    
  // },
  // {
  //   key: '/state',
  //   label: 'State',
  //   icon: <Calendar size={18} />,
  // },
  // {
  //   key: '/city',
  //   label: 'City',
  //   icon: <MessageSquare size={18} />,
  // },
  // {
  //   key: '/enquiry',
  //   label: 'Enquiry',
  //   icon: <FileText size={18} />,
  // },
  // {
  //   key: '/fuelPrices',
  //   label: 'Fuel Prices',
  //   icon: <CreditCard size={18} />,
  // },
  // {
  //   key: '/settings',
  //   label: 'Settings',
  //   icon: <Settings size={18} />,
  // },
];