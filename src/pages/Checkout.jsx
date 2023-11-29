import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState } from 'react';
import { auth } from '../firebase/config';

function Checkout({ checkedProducts }) {
  const [formData, setFormData] = useState({
    // fullName: auth.currentUser.displayName,
    email: auth.currentUser.email,
    products: checkedProducts,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form data, e.g., sending it to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="row">
      <Header />
      <div className="col-2">
        <SideNav />
      </div>
      <div className="col-10">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Picked Products: </label>
            <input
              type="text"
              name="products"
              value={formData.products}
              // onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
