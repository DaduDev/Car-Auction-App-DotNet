import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuctionDetails from './pages/AuctionDetails';
import CreateAuction from './pages/CreateAuction';
import MyAuctions from './pages/MyAuctions';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auction/:id" element={<AuctionDetails />} />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreateAuction />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-auctions" 
            element={
              <ProtectedRoute>
                <MyAuctions />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
