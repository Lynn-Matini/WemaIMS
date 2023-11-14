import './App.css';
import Error from './pages/Error';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Authentication from './pages/Authentication';
import PrivateRoutesLayout from './layouts/PrivateRoutesLayout';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Authentication />} />
      <Route path="*" element={<Error />} />

      {/* private routes */}
      {/* <Route element={<PrivateRoutesLayout />}> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
