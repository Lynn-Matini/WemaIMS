import { useState, useEffect } from 'react';
// import ProviderCard from '../components/ProviderCard';

function Providers() {
  const [providers, setProviders] = useState([]);

  //   useEffect(() => {
  //     fetch('https://api.example.com/providers')
  //       .then(response => response.json())
  //       .then(data => setProviders(data));
  //   }, []);

  return (
    <div>
      <h1>Providers</h1>
      {/* {providers.map(provider => (
        <ProviderCard
          key={provider.id}
          name={provider.name}
          address={provider.address}
          phone={provider.phone}
          website={provider.website}
        />
      ))} */}
    </div>
  );
}

export default Providers;
