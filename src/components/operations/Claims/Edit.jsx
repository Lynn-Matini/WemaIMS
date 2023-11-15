import { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const Edit = ({
  claims,
  selectedClaim,
  setClaims,
  setIsEditing,
  getClaims,
}) => {
  const id = selectedClaim.id;

  const [claimName, setClaimName] = useState(selectedClaim.claimName);
  const [providerName, setProviderName] = useState(selectedClaim.providerName);
  const [amount, setAmount] = useState(selectedClaim.amount);
  const [notes, setNotes] = useState(selectedClaim.notes);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!claimName || !providerName || !notes) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const claim = {
      claimName,
      providerName,
      amount,
      notes,
    };

    await setDoc(doc(db, 'claims', id), {
      ...claim,
    });

    setClaims(claims);
    setIsEditing(false);
    getClaims();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${claim.claimName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit claim</h1>
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
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
