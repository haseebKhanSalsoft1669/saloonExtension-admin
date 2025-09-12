import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/dashboard/Dashboard';

import UserList from './pages/userManagement/UserList';
import UserDetails from './pages/userManagement/userDetails';

import Categories from './pages/categories';
import EditCategory from './pages/categories/editCategory';
import AddCategory from './pages/categories/addCategory';


import ProXshopProducts from './pages/proXshopProducts';
import ProProductDetails from './pages/proXshopProducts/productDetails';
import EditProduct from './pages/proXshopProducts/editProduct';

import OrderManagement from './pages/orderManagement';
import OrderDetails from './pages/orderManagement/orderDetails';


import WishList from './pages/wishList';
import WishListDetails from './pages/wishList/wishListDetails';

import Resources from './pages/resources';

import EducationList from './pages/education';
import EditEducation from './pages/education/editEducation';

import CouponManagement from './pages/couponManagement';

import GiftCardManagement from './pages/giftCardManagement';

import Community from './pages/community';
import CommunityDetails from './pages/community/communityDetails';


import UserProfile from './pages/profile';

import Notifications from './pages/notification';
import NotificationForm from './pages/notification/notificationForm';



import Login from './pages/auth';
import ChangePassword from './pages/auth/changePassword';
import ForgetPassword from './pages/auth/forgetPassword';
import SignUp from './pages/auth/signup';
import { store } from './redux/store';

import VerifyCode from './pages/auth/verificationCode';
import './styles/global.css';

const { darkAlgorithm } = theme;

const App = () => (
  <ConfigProvider
    theme={{
      algorithm: darkAlgorithm,
      token: {
        colorPrimary: '#1e44d3',
        borderRadius: 8,
        wireframe: false,
      },
    }}
  >
     <Provider store={store}>
      
     
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Only accessible when not authenticated */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="/forgetpassword" element={
          <PublicRoute>
            <ForgetPassword />
          </PublicRoute>
        } />
        <Route path="/verifycode" element={
          <PublicRoute>
            <VerifyCode />
          </PublicRoute>
        } />
        <Route path="/changepassword" element={
          <PublicRoute>
            <ChangePassword />
          </PublicRoute>
        } />

        {/* Protected Routes - Only accessible when authenticated */}
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users/list" element={<UserList />} />
          <Route path="users/userdetails/:id" element={<UserDetails />} />

          <Route path="categories" element={<Categories />} />
          <Route path="edit-categories" element={<EditCategory />} />
          <Route path="add-categories" element={<AddCategory />} />
          <Route path="edit-categories/:id" element={<AddCategory />} />

          <Route path="product-management" element={<ProXshopProducts />} />
          <Route path="pro-product-details" element={<ProProductDetails />} />
          <Route path="add-product" element={<EditProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />

          <Route path="order-management" element={<OrderManagement />} />
          <Route path="order-details" element={<OrderDetails />} />

          <Route path="wishlist" element={<WishList />} />
          <Route path="wishlist-details" element={<WishListDetails />} />

          <Route path="resources" element={<Resources />} />

          <Route path="education" element={<EducationList />} />
          <Route path="edit-education" element={<EditEducation />} />

          <Route path="coupon-management" element={<CouponManagement />} />

          <Route path="gift-card-management" element={<GiftCardManagement />} />

          <Route path="community" element={<Community />} />
          <Route path="community-details" element={<CommunityDetails />} />

          <Route path="notifications" element={<Notifications />} />
          <Route path="notifications/new" element={<NotificationForm />} />
          <Route path="notifications/:id/view" element={<NotificationForm />} />

          <Route path="profile" element={<UserProfile />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </ConfigProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);