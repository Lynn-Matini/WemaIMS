import { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';

const Add = ({ claims, setClaims, setIsAdding, getClaims, currentUser }) => {
  const [claimName, setClaimName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('PENDING');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!claimName || !providerName || !amount || !notes || !status) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newClaim = {
      claimName,
      providerName,
      amount,
      notes,
      status,
    };

    claims.push(newClaim);

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const claimDocRef = collection(userDocRef, 'claims');
      await addDoc(claimDocRef, { ...newClaim });
    } catch (error) {
      console.log(error);
    }

    setClaims(claims);
    setIsAdding(false);
    getClaims();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${claimName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add claim</h1>
        <label htmlFor="claimName">Claim Name</label>
        <input
          id="claimName"
          type="text"
          name="claimName"
          value={claimName}
          onChange={(e) => setClaimName(e.target.value)}
        />
        <label htmlFor="providerName">Provider Name</label>
        <input
          id="providerName"
          type="text"
          name="providerName"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
        />
        <label htmlFor="amount">(Ksh) Amount</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="notes">Notes</label>
        <input
          id="notes"
          type="text"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <label htmlFor="status">Status</label>
        <input
          id="status"
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
