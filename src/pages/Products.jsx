import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState, useEffect, useContext } from 'react';

import Swal from 'sweetalert2';
import Table from '../components/operations/Products/Table.jsx';
import Add from '../components/operations/Products/Add.jsx';
import Edit from '../components/operations/Products/Edit.jsx';
import AddButton from '../components/operations/Products/AddButton.jsx';

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  collectionGroup,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../components/auth.jsx';

const Products = () => {
  const { currentUser } = useContext(AuthContext);
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  console.log(`Here ${currentUser?.email}`);

  const getProducts = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const querySnapshot = await getDocs(collection(userDocRef, 'products'));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, [currentUser]);

  const handleCheckboxChange = (e, value) => {
    setCheckedProducts((prevProducts) => {
      if (e.target.checked) {
        // Add the value to the array if it's not already present
        if (!prevProducts.includes(value)) {
          return [...prevProducts, value];
        }
      } else {
        // Remove the value from the array
        return prevProducts.filter((id) => id !== value);
      }
      return prevProducts; // If no change is needed, return the previous state
    });
  };

  useEffect(() => {
    console.log('Updated checkedProducts:', checkedProducts);
  }, [checkedProducts]);

  const handleEdit = (id) => {
    const [product] = products.filter((product) => product.id === id);

    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const [product] = products.filter((product) => product.id === id);
        const productDocRef = doc(collection(userDocRef, 'products'), id);
        deleteDoc(productDocRef);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${product.productName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const productsCopy = products.filter((product) => product.id !== id);
        setProducts(productsCopy);
      }
    });
  };

  return (
    <>
      <div className="row">
        <Header />
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          <h2 className="mt-5">Insurance Products</h2>
          <p>Please select an insurance product</p>
          {!isAdding && !isEditing && (
            <>
              {currentUser && currentUser.email === 'lynnmatini@gmail.com' && (
                <AddButton setIsAdding={setIsAdding} />
              )}

              <Table
                products={products}
                checkedProducts={checkedProducts}
                setCheckedProducts={setCheckedProducts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
              />
            </>
          )}
          {isAdding && (
            <Add
              products={products}
              setProducts={setProducts}
              setIsAdding={setIsAdding}
              getProducts={getProducts}
            />
          )}
          {isEditing && (
            <Edit
              products={products}
              selectedProduct={selectedProduct}
              setProducts={setProducts}
              setIsEditing={setIsEditing}
              getProducts={getProducts}
            />
          )}

          <button>Checkout</button>
          <p>
            Selected Products:{' '}
            {checkedProducts.map((product) => (
              <li>{product}</li>
            ))}
          </p>
          <p>
            Total Amount:{' '}
            {checkedProducts.reduce((total, product) => total + product, 0)}
          </p>
          <p>Mpesa Paybill number: 589898</p>
        </div>
      </div>
    </>
  );
};

export default Products;
