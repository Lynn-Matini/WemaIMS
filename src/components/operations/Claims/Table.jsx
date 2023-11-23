import '../../Components.css';
import { AuthContext } from '../../auth';
import { useContext } from 'react';

const Table = ({
  claims,
  handleEdit,
  handleDelete,
  handleUpdateStatus,
  getClaims,
  // handleCheckboxChange,
  // isChecked,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KEN',
    minimumFractionDigits: null,
  });
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Claim Name</th>
            <th>Provider Name</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Status</th>
            {currentUser && currentUser.email === 'lynnmatini@gmail.com' && (
              <th colSpan={2} className="text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {claims ? (
            claims.map((claim, i) => (
              <tr key={claim.id}>
                <th></th>
                <td>{claim.id}</td>
                <td>{claim.claimName}</td>
                <td>{claim.providerName}</td>
                <td>{formatter.format(claim.amount)}</td>
                <td>{claim.notes}</td>
                <td>{claim.status}</td>
                {currentUser &&
                  currentUser.email === 'lynnmatini@gmail.com' && (
                    <div>
                      <td>
                        <button
                          onClick={async () => {
                            await handleUpdateStatus(claim.id, 'APPROVED');
                            await getClaims();
                          }}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={async () => {
                            await handleUpdateStatus(claim.id, 'DENIED');
                            await getClaims();
                          }}
                        >
                          Reject
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleEdit(claim.id)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(claim.id)}>
                          Delete
                        </button>
                      </td>
                    </div>
                  )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
