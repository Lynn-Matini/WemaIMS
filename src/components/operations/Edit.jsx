import { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Edit = ({
  products,
  selectedProduct,
  setProducts,
  setIsEditing,
  getProducts,
}) => {
  const id = selectedProduct.id;

  const [productName, setProductName] = useState(selectedProduct.productName);
  const [benefits, setBenefits] = useState(selectedProduct.benefits);
  const [premium, setPremium] = useState(selectedProduct.premium);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!productName || !benefits || !premium) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const product = {
      productName,
      benefits,
      premium,
    };

    await setDoc(doc(db, 'products', id), {
      ...product,
    });

    setProducts(products);
    setIsEditing(false);
    getProducts();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${product.productName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit product</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
