import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
        setMobileSidebarVisible(false);
      } else {
        setCollapsed(false);
        setMobileSidebarVisible(true);
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileSidebarVisible(!mobileSidebarVisible);
    } else {
      setCollapsed(!collapsed);
      setMobileSidebarVisible(!mobileSidebarVisible);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={collapsed} 
        visible={mobileSidebarVisible}
        onClose={() => setMobileSidebarVisible(false)}
      />
      <Layout style={{ 
        marginLeft: window.innerWidth <= 768 ? 0 : (mobileSidebarVisible ? '250px' : '0'),
        transition: 'margin-left 0.3s ease'
      }}>
        <TopNav 
          toggleSidebar={toggleSidebar} 
          collapsed={collapsed}
          sidebarVisible={mobileSidebarVisible}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: 'var(--bg-dark)',
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;