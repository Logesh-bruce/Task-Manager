import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Auth from './pages/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      {/* Catch-all to dashboard for logged in users */}
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
