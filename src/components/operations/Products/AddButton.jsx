const THeader = ({ setIsAdding }) => {
  return (
    <header>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Product</button>
      </div>
    </header>
  );
};

export default THeader;
