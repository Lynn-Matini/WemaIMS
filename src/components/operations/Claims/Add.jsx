import { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const Add = ({ claims, setClaims, setIsAdding, getClaims }) => {
  const [claimName, setClaimName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!claimName || !providerName || !amount) {
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
    };

    claims.push(newClaim);

    try {
      await addDoc(collection(db, 'claims'), {
        ...newClaim,
      });
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
