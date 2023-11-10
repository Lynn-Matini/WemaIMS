import { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Add = ({ products, setProducts, setIsAdding, getProducts }) => {
  const [productName, setProductName] = useState('');
  const [benefits, setBenefits] = useState('');
  const [premium, setPremium] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!productName || !benefits || !premium) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newProduct = {
      productName,
      benefits,
      premium,
    };

    products.push(newProduct);

    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
      });
    } catch (error) {
      console.log(error);
    }

    setProducts(products);
    setIsAdding(false);
    getProducts();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${productName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add product</h1>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="benefits">Benefits</label>
        <input
          id="benefits"
          type="text"
          name="benefits"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
        />
        <label htmlFor="premium">(Ksh) Premium</label>
        <input
          id="premium"
          type="number"
          name="premium"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
