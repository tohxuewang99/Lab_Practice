import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function EditProduct() {
    const [productName, setName] = useState('');
    const [productQuantity, setQuantity] = useState('');
    const [productDetail, setDetail] = useState('');
    // const [productImage, setImage] = useState('');
    const [productPrice, setPrice] = useState('');

    const navigate = useNavigate();

    const productEdited = (e) => {
        e.preventDefault();
        // Prepare the new product data
        const productData = {
            productName: productName,
            productQuantity: productQuantity,
            productDetail: productDetail,
            // productImage: productImage,
            productPrice: productPrice,
        };

        // const productData = new FormData();
        // productData.append('productName', productName);
        // productData.append('productQuantity', productQuantity);
        // productData.append('productDetail', productDetail);
        // productData.append('productImage', productImage.base64);
        // productData.append('productPrice', productPrice);

        // Send a POST request to the Flask server's /register route
        axios.post('http://127.0.0.1:5000/editProduct', productData)
            .then(function (response) {
                console.log(response);
                navigate("/productList");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response && error.response.status === 409) {
                    alert("Product already exists");
                    return ("Product already exists");
                }

            });
    };

    const cardStyle = {
        maxWidth: '600px', // Adjust the width as needed
        margin: '100px auto', // Center the card horizontally
    };


    const formGroupStyle = {
        marginBottom: '20px', // Add margin at the bottom of each Form.Group
    };

    useEffect(() => {
        console.log('Product Name:', productName);
        console.log('Product Quantity:', productQuantity);
        console.log('Product Detail:', productDetail);
        // console.log('Product Image:', productImage);
        console.log('Product Price:', productPrice);
    }, [productName, productQuantity, productDetail, productPrice]);

    return (
        <Container>
            <Card style={cardStyle}>
                <Card.Header as="h3" className="text-center bg-dark text-light">Add Product</Card.Header>
                <Card.Body>
                    <Form onSubmit={productEdited}>
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
                        <div className="text-center">
                        <Link to ="/productList">
                            <Button variant="primary" type='submit' >
                                Edit Product
                            </Button>
                        </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditProduct;
