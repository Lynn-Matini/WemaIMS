import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import Table from '../components/operations/Products/Table.jsx';
import Add from '../components/operations/Products/Add.jsx';
import Edit from '../components/operations/Products/Edit.jsx';
import AddButton from '../components/operations/Products/AddButton.jsx';

import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../components/auth.jsx';

const Products = () => {
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  console.log(`Here ${currentUser?.email}`);

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

  const handleCheckboxChange = () => {
    const { value, checked } = event.target;
    // If the checkbox is already checked, remove it from the array
    if (isChecked) {
      setCheckedProducts((prevProducts) => [...prevProducts, value]);
      console.log(checkedProducts);

      // Otherwise add it to the array
    } else {
      setCheckedProducts((prevProducts) => [
        ...prevProducts.filter((product) => product !== value),
      ]);
    }
    console.log(checkedProducts);
    // console.log(value);
  };
  // console.log(isChecked);

  const handleCheckout = () => {
    // Do something with the selected products (e.g., send them to the server)
    console.log('Selected Products:', checkedProducts);
  };

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
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
