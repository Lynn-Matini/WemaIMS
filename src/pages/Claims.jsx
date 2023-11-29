import SideNav from '../components/SideNav';
import Header from '../components/Header';
import React, { useState, useEffect, useContext } from 'react';

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
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../components/auth.jsx';

const Claims = () => {
  const { currentUser } = useContext(AuthContext);

  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  //It weirdly means checkbox is not checked
  // const [checked, setChecked] = useState(false);
  // const [checkedItems, setCheckedItems] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getClaims = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const querySnapshot = await getDocs(collection(userDocRef, 'claims'));
    const claims = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setClaims(claims);
    // console.log(claims);
    // console.log('Inside ' + currentUser.uid);
  };

  useEffect(() => {
    getClaims();
  }, [currentUser]);

  const handleUpdateStatus = async (id, newStatus) => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const claimDocRef = doc(collection(userDocRef, 'claims'), id);
    await updateDoc(claimDocRef, {
      status: newStatus,
    });
    console.log('Changed status to ' + newStatus);
  };

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
        //DELETE FROM FIRESTORE
        const userDocRef = doc(db, 'users', currentUser.uid);
        const [claim] = claims.filter((claim) => claim.id === id);
        const claimDocRef = doc(collection(userDocRef, 'claims'), id);
        deleteDoc(claimDocRef);

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
