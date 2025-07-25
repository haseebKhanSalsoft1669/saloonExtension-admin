import React from 'react';
import { Layout, Dropdown, Badge, Avatar, Button } from 'antd';
import { Bell, User, Menu as MenuIcon, LogOut, Settings, UserCircle, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopNav.css';
import { notifications } from '../data/mockData';
import { useLogoutMutation } from '../redux/services/authSlice';
import Swal from 'sweetalert2';

const { Header } = Layout;

interface TopNavProps {
  toggleSidebar: () => void;
  collapsed: boolean;
  sidebarVisible: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const [logout] = useLogoutMutation();

  const renderNotificationDropdown = () => (
    <div className="notification-dropdown">
      <div className="notification-scroll-wrapper">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className={`notification-dot ${notification.read ? '' : 'unread'}`} />
            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="notification-footer">
        <Button type="link" block onClick={() => navigate('/notifications')}>
          View All Notifications
        </Button>
      </div>
    </div>
  );

  const profileItems = [
    {
      key: 'profile',
      label: (
        <div className="dropdown-item" onClick={() => {
          navigate('/profile');
        }}>
          <UserCircle size={16} />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="dropdown-item">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      ),
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      label: (
        <div
          onClick={handleLogout}
          className="dropdown-item"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </div>
      ),
    },
  ];


  async function handleLogout() {
    try {
      const response = await logout({}).unwrap();
      console.log("🚀 ~ handleLogout ~ response:", response)
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: response?.message || "Operation completed successfully!",
          text: "Thank You!",
        })
        localStorage.removeItem('userDetails');
        navigate('/login');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || response?.data?.message || response?.message  || "Something went wrong!",
        })
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  }

  return (
    <Header className="header">
      <div className="header-left">
        {window.innerWidth <= 768 && (
          <Button
            type="text"
            icon={<MenuIcon size={20} color="var(--primary-color)" />}
            onClick={toggleSidebar}
            className="trigger-button"
          />
        )}
        <div className="logo">
          <LayoutDashboard size={24} color="var(--primary-color)" />
        </div>
      </div>

      <div className="header-right">
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          dropdownRender={renderNotificationDropdown}
        >
          <Badge count={unreadCount} className="notification-badge">
            <Button
              type="text"
              icon={<Bell size={20} color="var(--primary-color)" />}
              className="icon-button"
            />
          </Badge>
        </Dropdown>

        <Dropdown
          menu={{ items: profileItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="profile-container">
            <Avatar icon={<User />} className="profile-avatar" />
            <span className="profile-name">John Doe</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopNav;
