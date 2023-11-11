import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    // Make GET request to Flask backend to fetch catalog data
    fetch('http://127.0.0.1:5000/home', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        // Update catalog state
        setCatalog(data.catalog);
      })
      .catch((error) => {
        console.error('Error fetching catalog:', error);
      });
  }, []);

  const addToCart = (product) => {
    // Send a POST request to your Flask backend to add the product to the user's shopping cart.
    // Make sure to include the product information in the request body.
    fetch('http://127.0.0.1:5000/add-to-cart', {
      method: 'POST', // Use the "POST" method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: product.productID,
        productQuantity : 1,
        productName : product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        
        // You can include other product details here, if needed
        // You can specify the quantity
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the response for success or error messages
        if (data.message === 'Product added to the cart successfully') {
          alert('Product added to cart!');
        } else {
          alert('Failed to add product to cart: ' + data.error);
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        alert('An error occurred while adding the product to the cart.');
      });

      console.log(product.productID)
  };
  

  return (
    <Container className="mt-4">
      <Row className="product-list">
        {catalog.map((product) => (
          <Col key={product.productID} sm={6} md={4} lg={3}>
            <Card>
              
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.productDescription}</Card.Text>
                <Card.Text>Price: ${product.productPrice}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  ADD TO CART
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;


