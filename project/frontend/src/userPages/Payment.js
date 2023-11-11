import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';


function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate payment processing (replace with actual payment logic)
    setLoading(true);

    // Simulate payment success after a delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Container>
      <h1 className="text-center">Checkout</h1>
      <Row>
        <Col md={6}>
          <h2>Billing Information</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="MM/YY"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
              />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
            {success && <div className="text-success">Payment successful!</div>}
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Order Summary</h2>
          <Card>
            <Card.Body>
              <h3>Product Name</h3>
              <p>Product Description</p>
              <p>Price: $10.99</p>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <h3>Another Product</h3>
              <p>Another Description</p>
              <p>Price: $15.99</p>
            </Card.Body>
          </Card>
          <h3 className="mt-3">Total: $26.98</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
