import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [catalog, setCatalog] = useState([]);

    // function decodeBase64Image(base64) {
    //     return `data:image/jpeg;base64,${base64}`;
    //   }
      
    const buttonStyle = {    // Add padding for spacing
        margin: '0 10px 0 0',
    };   

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

    return (
        <Container>
            <h3 className='text-center mt-5'>Product List</h3>
            {/* <Link to="/addProduct">
                <Button variant="success" className="mb-4">Add Product</Button>
            </Link> */}
            <Row>
                {catalog.map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                        <Card.Img variant="top" src={product.productImage} alt={product.productName} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>Quantity: {product.productQuantity}</Card.Text>
                                <Card.Text>{product.productDetail}</Card.Text>
                                <Card.Text>Price: ${parseFloat(product.productPrice).toFixed(2)}</Card.Text>
                                    {/* <Link to = "/editProduct">
                                        <Button variant="primary" style={buttonStyle} >
                                            Edit
                                        </Button>
                                    </Link>
                                <Link to="/deleteProduct">
                                    <Button variant="danger">
                                        Delete
                                    </Button>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;