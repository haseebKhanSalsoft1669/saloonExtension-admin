import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
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

import Reports from './pages/reports';
import ReportsDetails from './pages/reports/reportsDetails';

import Expense from './pages/expense';
import AddExpense from './pages/expense/addExpense';

import Liability from './pages/liability';
import ViewLiability from './pages/liability/viewLiability';

import StateList from './pages/addState';
import AddState from './pages/addState/addState';

import CityList from './pages/city';
import AddCity from './pages/city/AddCity';

import InvoiceExcelTable from './pages/CreateInvoice';

import InvoiceManagement from './pages/invoiceManagement';

import FuelPrice from './pages/fuelPrice';
import AddFuelPrice from './pages/fuelPrice/addFuelPrice';

import UserProfile from './pages/profile';

import Notifications from './pages/notification';
import NotificationForm from './pages/notification/notificationForm';

import Login from './pages/auth';
import ChangePassword from './pages/auth/changePassword';
import ForgetPassword from './pages/auth/forgetPassword';
import SignUp from './pages/auth/signup';
import { store } from './redux/store';
import './styles/global.css';
import VerifyCode from './pages/auth/verificationCode';

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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/list" element={<UserList />} />
          <Route path="/users/userdetails/:id" element={<UserDetails />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/edit-categories" element={<EditCategory />} />
          <Route path="/add-categories" element={<AddCategory />} />

          <Route path="/product-management" element={<ProXshopProducts />} />
          <Route path="/pro-product-details" element={<ProProductDetails />} />
          <Route path="/edit-product" element={<EditProduct />} />

          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/order-details" element={<OrderDetails />} />

          <Route path="/wishlist" element={<WishList />} />


          
          <Route path="/View-reports" element={<Reports />} />
          <Route path="/View-reports-details" element={<ReportsDetails />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/order-invoice" element={<InvoiceExcelTable />} />
          <Route path="/liability" element={<Liability />} />
          <Route path="/view-liability" element={<ViewLiability />} />
          <Route path="/invoice-management" element={<InvoiceManagement />} />
          <Route path="/state" element={<StateList />} />
          <Route path="/add-state" element={<AddState />} />
          <Route path="/city" element={<CityList />} />
          <Route path="/add-city" element={<AddCity />} />
          <Route path="/fuelPrices" element={<FuelPrice />} />
          <Route path="/add-fuel-prices" element={<AddFuelPrice />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/new" element={<NotificationForm />} />
          <Route path="/notifications/:id/view" element={<NotificationForm />} />
          <Route path="*" element={<Dashboard />} />
         
        </Route>
        <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/verifycode" element={<VerifyCode />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              {/* <Route path="/verifyemail" element={<VerifyEmail />} /> */}
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