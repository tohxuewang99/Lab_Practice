import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const AccountManagement = () => {
//   const [users, setUsers] = useState([]);
const staticUserData = [
    {
      id: 1,
      username: 'User1',
      email: 'user1@example.com',
      userRole: 'buyer',
    },
    {
      id: 2,
      username: 'User2',
      email: 'user2@example.com',
      userRole: 'admin',
    },
    {
      id: 3,
      username: 'User3',
      email: 'user3@example.com',
      userRole: 'buyer',
    },
  ];

  useEffect(() => {
    // Fetch user data from your backend API or server here
    // Update the 'users' state with the user data
  }, []);

  const handleUpgradeUserRole = (userId) => {
    // Implement the logic to upgrade the user's role
    // You may make an Axios request to your backend API to perform this action
  };

  const handleDowngradeUserRole = (userId) => {
    // Implement the logic to downgrade the user's role
    // You may make an Axios request to your backend API to perform this action
  };

  return (
    <Container>
      <h3 className='text-center mt-5'>Account Management</h3>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staticUserData.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.userRole}</td>
              <td>
                {user.userRole === 'buyer' ? (
                  <Button
                    variant="primary"
                    onClick={() => handleUpgradeUserRole(user.id)}
                  >
                    Upgrade
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => handleDowngradeUserRole(user.id)}
                  >
                    Downgrade
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AccountManagement;
