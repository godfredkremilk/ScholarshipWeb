import React from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
`;

const NotificationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const NotificationIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 12px;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  color: #333333;
`;

const NotificationMessage = styled.p`
  font-size: 14px;
  color: #666666;
`;

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      icon: 'https://example.com/notification1.jpg',
      title: 'New Message',
      message: 'You have a new message from John Doe.',
    },
    {
      id: 2,
      icon: 'https://example.com/notification2.jpg',
      title: 'Connection Request',
      message: 'Jane Smith wants to connect with you.',
    },
  ];

  return (
    <NotificationsContainer>
      <h2>Notifications</h2>
      <NotificationList>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationIcon src={notification.icon} alt={notification.title} />
            <NotificationContent>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
            </NotificationContent>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationsContainer>
  );
};

export default Notifications;
