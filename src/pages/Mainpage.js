import React, { useState, useEffect } from 'react';
import Mainheader from '../mainPageComponents/Mainheader';
import Sidebar from '../mainPageComponents/Sidebar';
import { Outlet } from 'react-router-dom';

const Mainpage = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '60px',
    display: 'flex',
    flexWrap: 'wrap', // Allow the container to wrap its content
  };

  const [sidebarWidth, setSidebarWidth] = useState('200px'); // Initialize the sidebar width state

  const sidebarStyle = {
    width: sidebarWidth,
    marginBottom: '20px', // Add some bottom margin for spacing
    transition: 'width 0.3s ease', // Add transition effect to smooth the width change
    borderRight: '1px solid #cccccc', // Add only the right border for the sidebar
    borderRadius: '4px'
  };

  const contentContainerStyle = {
    flex: '1',
    marginLeft: '15px', // Add left margin for spacing
    padding: '10px',
    width: `calc(100% - ${sidebarWidth})`, // Adjust the width dynamically based on the sidebar width
  };

  const updateSidebarWidth = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setSidebarWidth('40px'); // Update the sidebar width state
    } else {
      setSidebarWidth('200px'); // Update the sidebar width state
    }
  };

  useEffect(() => {
    updateSidebarWidth(); // Call the function directly

    const handleResize = () => {
      updateSidebarWidth(); // Call the function on resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Mainheader />
      <div style={containerStyle}>
        <div style={sidebarStyle}>
          <Sidebar />
        </div>
        <div style={contentContainerStyle}>
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
