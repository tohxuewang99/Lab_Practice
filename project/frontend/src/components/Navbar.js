import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar({ UserRole }) {
  const navigate = useNavigate();
  const handleSignout = () => {

    // Clear the authentication state and any other user-related data
    sessionStorage.removeItem('isLoggedIn');
    // sessionStorage.removeItem('userRole');

    // Redirect to the login page 
    navigate('/');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        {UserRole === 'Buyer' ? (
          <Navbar.Brand href="/home">E-Shop (Buyer)</Navbar.Brand>
        ) : UserRole === 'Admin' ? (
          <Navbar.Brand href="/productList">E-Shop (Admin)</Navbar.Brand>
        ) : (
          <Navbar.Brand href="/home">E-Shop</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {UserRole === 'Buyer' ? (
              <>
                <Nav.Link href="/cart">Cart</Nav.Link>
                {/* <Nav.Link href="/payment">Order</Nav.Link> */}
              </>
            ) : UserRole === 'Admin' ? (
              <>
                {/* <Nav.Link href="/productList">Product</Nav.Link> */}
                {/* <Nav.Link href="/account">Account Management</Nav.Link> */}
              </>
            ) : null}
            <Nav.Link href="/">Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;