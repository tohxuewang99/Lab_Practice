import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [productName, setName] = useState('');
    const [productQuantity, setQuantity] = useState('');
    const [productDetail, setDetail] = useState('');
    const [productPrice, setPrice] = useState('');

    const navigate = useNavigate();

    const addProduct = (product) => {
        // Send a POST request to your Flask backend to add the product to the user's shopping cart.
        // Make sure to include the product information in the request body.
        fetch('http://127.0.0.1:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productQuantity: product.productQuantity,
                productName: product.productName,
                productPrice: product.productPrice,
                productDetail: product.productDetail
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Product added successfully') {
                    alert('Product added to cart!');
                } else {
                    alert('Failed to add product: ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error adding product:', error);
                alert('An error occurred while adding the product.');
            });
    };

    const cardStyle = {
        maxWidth: '600px',
        margin: '100px auto',
    };

    const formGroupStyle = {
        marginBottom: '20px',
    };

    const productAdded = (e) => {
        e.preventDefault();
        const productData = {
            productName: productName,
            productQuantity: productQuantity,
            productDetail: productDetail,
            productPrice: productPrice,
        };

        addProduct(productData); // Call addProduct with the product data

        // After adding the product, you can navigate to another page if needed
        navigate("/productList");
    };

    useEffect(() => {
        console.log('Product Name:', productName);
        console.log('Product Quantity:', productQuantity);
        console.log('Product Detail:', productDetail);
        console.log('Product Price:', productPrice);
    }, [productName, productQuantity, productDetail, productPrice]);

    return (
        <Container>
            <Card style={cardStyle}>
                <Card.Header as="h3" className="text-center bg-dark text-light">Add Product</Card.Header>
                <Card.Body>
                    <Form onSubmit={productAdded}>
                        <Form.Group controlId="productName" style={formGroupStyle}>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="productQuantity" style={formGroupStyle}>
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product quantity"
                                value={productQuantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="productDetail" style={formGroupStyle}>
                            <Form.Label>Product Detail</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter product details"
                                value={productDetail}
                                onChange={(e) => setDetail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="productPrice" style={formGroupStyle}>
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product price"
                                value={productPrice}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Product
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddProduct;
