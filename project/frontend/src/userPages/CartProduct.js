import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

function CartProducts() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from the server
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cart', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
        setLoading(false);
      });
  }, []);

  // Calculate the total price of items in the cart
  console.log("This is the place")
  console.log(cart)
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.productPrice * item.productQuantity,
      0
    );
  };
 

  return (
    <Container className="mt-4">
      <h1 className="text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <Card key={product.productID} className="mb-3">
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                  Price: ${product.productPrice} | Quantity: {product.productQuantity}
                </Card.Text>
                {/* <Button variant="primary" className="mx-1" href="payment">
                  Place Order
                </Button>
                <Button variant="danger" className="mx-1">
                  Remove
                </Button> */}
                
              </Card.Body>
            </Card>
          ))}
          <p className="text-end">Total: ${calculateTotal()}</p>
        </div>
      )}
    </Container>
  );
}

export default CartProducts;




