import '../../Components.css';

const Table = ({ claims, handleEdit, handleDelete }) => {
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
            <th>Id</th>
            <th>Claim Name</th>
            <th>Provider Name</th>
            <th>Amount</th>
            <th>Notes</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {claims ? (
            claims.map((claim, i) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.claimName}</td>
                <td>{claim.providerName}</td>
                <td>{formatter.format(claim.amount)}</td>
                <td>{claim.notes}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(claim.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(claim.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
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
