import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import MaybeShowNavbar from './components/MaybeShowNavbar';
import Login from './components/Login'; 
import Register from './components/Register'; 
import ForgetPassword from './components/ForgetPassword'; 
import ProfileUpdate from './components/ProfileUpdate'; 

import Home from './components/Home';
import Cart from './userPages/CartProduct';
import Payment from './userPages/Payment';

import ProductList from './adminPages/ProductList';
// import AddProduct from './adminPages/AddProduct';
import AccountManagement from './adminPages/AccountManagement';
import EditProduct from './adminPages/EditProduct';

function App() {
  const [UserRole, setUserRole] = useState(sessionStorage.getItem('UserRole'));
  console.log('UserRole:', UserRole);

  return (
    <div className="vh-100 gradient-custom">
      {/* <div className="container"> */}
        <BrowserRouter>
          <MaybeShowNavbar>
            <Navbar UserRole={UserRole}/>
          </MaybeShowNavbar>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/profileUpdate" element={<ProfileUpdate />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/payment" element={<Payment />} /> */}
            <Route path="/productList" element={<ProductList />} />
            {/* <Route path="/addProduct" element={<AddProduct />} /> */}
            {/* <Route path="/account" element={<AccountManagement />} /> */}
            <Route path="/editProduct" element = {<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </div>
    // </div>
  );
}

export default App;
