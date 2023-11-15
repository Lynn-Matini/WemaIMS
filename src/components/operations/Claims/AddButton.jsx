const AddButton = ({ setIsAdding }) => {
  return (
    <header>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Claim</button>
      </div>
    </header>
  );
};

export default AddButton;
