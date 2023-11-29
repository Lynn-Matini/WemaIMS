import './App.css';
import Error from './pages/Error';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Claims from './pages/Claims';
import Checkout from './pages/Checkout';
import Authentication from './pages/Authentication';
import AuthProvider from './components/auth';

// import PrivateRoutesLayout from './layouts/PrivateRoutesLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Authentication />} />
        <Route path="*" element={<Error />} />
        {/* private routes */}
        {/* <Route element={<PrivateRoutesLayout />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        s <Route path="/claims" element={<Claims />} />
        <Route
          path="/checkout"
          element={<Checkout />}
          // element={<Checkout selectedProducts={selectedProducts} />}
        />
        {/* </Route> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
