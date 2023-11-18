import '../../Components.css';

const Table = ({
  claims,
  handleEdit,
  handleDelete,
  handleUpdateStatus,
  getClaims,
  handleCheckboxChange,
  isChecked,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KEN',
    minimumFractionDigits: null,
  });

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

            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {claims ? (
            claims.map((claim, i) => (
              <tr key={claim.id}>
                <th>
                  <input
                    type="checkbox"
                    value={claim.id}
                    onChange={() => handleCheckboxChange(claim.id)}
                    checked={isChecked(claim.id)}
                  />
                </th>
                <td>{claim.id}</td>
                <td>{claim.claimName}</td>
                <td>{claim.providerName}</td>
                <td>{formatter.format(claim.amount)}</td>
                <td>{claim.notes}</td>
                <td>{claim.status}</td>
                <div className="text-left">
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
                </div>
                <div className="text-right">
                  <td>
                    <button onClick={() => handleEdit(claim.id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(claim.id)}>
                      Delete
                    </button>
                  </td>
                </div>
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
