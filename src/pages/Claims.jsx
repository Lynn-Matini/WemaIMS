import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import Table from '../components/operations/Claims/Table.jsx';
import Add from '../components/operations/Claims/Add.jsx';
import Edit from '../components/operations/Claims/Edit.jsx';
import AddButton from '../components/operations/Claims/AddButton.jsx';

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const Claims = () => {
  const [claims, setClaims] = useState();
  const [selectedClaim, setSelectedClaim] = useState(null);

  //It weirdly means checkbox is not checked
  // const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = auth.currentUser;
  console.log(`Here ${user?.email}`);

  const getClaims = async () => {
    const querySnapshot = await getDocs(collection(db, 'claims'));
    const claims = onSnapshot(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    setClaims(claims);
  };

  useEffect(() => {
    getClaims();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, 'claims', id), {
      status: newStatus,
    });
    console.log('Changed status to ' + newStatus);
  };

  const handleCheckboxChange = (value) => {
    // If the checkbox is already checked, remove it from the array
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    } else {
      // If the checkbox is not checked, add it to the array
      setCheckedItems([...checkedItems, value]);
    }
  };
  const isChecked = (value) => checkedItems.includes(value);
  //   setChecked(!checked);

  //   if (checked === true) {
  //     const [claim] = claims.filter((claim) => claim.id === id);
  //     setSelectedClaim(claim);
  //     console.log('Picked ' + claim.id);
  //     console.log(checked);
  //   }
  //   console.log(claim.checked);
  // };

  const handleEdit = (id) => {
    const [claim] = claims.filter((claim) => claim.id === id);

    setSelectedClaim(claim);
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
        const [claim] = claims.filter((claim) => claim.id === id);
        deleteDoc(doc(db, 'claims', id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${claim.claimName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const claimsCopy = claims.filter((claim) => claim.id !== id);
        setClaims(claimsCopy);
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
          <h2 className="mt-5">Claims</h2>
          {!isAdding && !isEditing && (
            <>
              <AddButton setIsAdding={setIsAdding} />
              <Table
                claims={claims}
                getClaims={getClaims}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleUpdateStatus={handleUpdateStatus}
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              />
            </>
          )}
          {isAdding && (
            <Add
              claims={claims}
              setClaims={setClaims}
              setIsAdding={setIsAdding}
              getClaims={getClaims}
            />
          )}
          {isEditing && (
            <Edit
              claims={claims}
              selectedClaim={selectedClaim}
              setClaims={setClaims}
              setIsEditing={setIsEditing}
              getClaims={getClaims}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Claims;
