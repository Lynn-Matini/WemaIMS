import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import Table from '../components/operations/Table';
import Add from '../components/operations/Add';
import Edit from '../components/operations/Edit';
import AddButton from '../components/operations/AddButton';

import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Products = () => {
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        const [product] = products.filter((product) => product.id === id);
        deleteDoc(doc(db, 'products', id));

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
          {!isAdding && !isEditing && (
            <>
              <AddButton setIsAdding={setIsAdding} />
              <Table
                products={products}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
              setEmployees={setEmployees}
              setIsEditing={setIsEditing}
              getProducts={getProducts}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
