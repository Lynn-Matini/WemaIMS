import { useContext, useState } from 'react';
import '../../Components.css';
import { AuthContext } from '../../auth';

const Table = ({
  products,
  handleEdit,
  handleDelete,
  handleCheckboxChange,
  isChecked,
  checkedProducts,
  setCheckedProducts,
}) => {
  const { currentUser } = useContext(AuthContext);
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
            <th>Name</th>
            <th>Monthly Premium</th>
            <th>Benefits</th>
            {currentUser && currentUser.email === 'lynnmatini@gmail.com' && (
              <th colSpan={2} className="text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product, i) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" value={product.id} />
                </td>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{formatter.format(product.premium)}</td>
                <td>{product.benefits}</td>
                {currentUser &&
                  currentUser.email === 'lynnmatini@gmail.com' && (
                    <div>
                      <td className="text-right">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="button muted-button"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-left">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="button muted-button"
                        >
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
