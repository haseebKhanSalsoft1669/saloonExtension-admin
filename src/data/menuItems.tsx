
import {
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
  UsersRound
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
    label: 'Product Management',
    icon: <Boxes size={18} />,
   
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

  

];