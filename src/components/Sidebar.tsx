import React, { useEffect, useState } from 'react';
import { Layout, Menu, Drawer, Image } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import '../styles/Sidebar.css';
import { menuItems } from '../data/menuItems';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
  collapsed: boolean;
  visible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, visible, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    // Auto close submenus and drawer on location change
    setOpenKeys([]);
    if (isMobile && visible) {
      onClose();
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const renderSidebarContent = () => (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={handleMenuClick}
      className="sidebar-menu"
      expandIcon={({ isOpen }) =>
        isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
      }
    >
      {menuItems.map((item:any) => {
        if (item.children) {
          return (
            <SubMenu
              key={item.key}
              title={
                <span className="menu-item-content">
                  {item.icon}
                  <span className="menu-item-title">{item.label}</span>
                </span>
              }
            >
              {item.children.map((child:any) => (
                <Menu.Item key={child.key}>
                  <span className="menu-item-c)ontent">
                    {child.icon}
                    <span className="menu-item-title">{child.label}</span>
                  </span>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.key}>
            <span className="menu-item-content">
              {item.icon}
              <span className="menu-item-title">{item.label}</span>
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return isMobile ? (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      width={250}
      bodyStyle={{ padding: 0, backgroundColor: 'var(--bg-sidebar)' }}
      className="sidebar-drawer"
    >
      <div className="drawer-header">
        <div className="logo-container">
        <Image preview={false} src="./images/modal-logo.png"  />

        </div>
        <button className="drawer-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      {renderSidebarContent()}
    </Drawer>
  ) : (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="sidebar"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className="logo-container">
      <Image preview={false} src="./images/logo.png"  />
      </div>
      {renderSidebarContent()}
    </Sider>
  );
};

export default Sidebar;
