import React, { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Log-in';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import ManagePlans from './pages/ManagePlans';
import ManageCoaches from './pages/ManageCoaches';
import ManageMembers from './pages/ManageMembers';
import Reports from './pages/Reports';
import ManageInventory from './pages/ManageInventory';
import StaffManagement from './pages/StaffManagement';
import MemberProfilePage from './pages/MemberProfilePage';
import { clearSession } from './services/api';

function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

function AppRoutes() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || 'null'); } catch { return null; }
  });
  const handleLogout = () => { clearSession(); setUser(null); navigate('/login'); };
  const setView = (view) => view === 'login' ? handleLogout() : navigate(view === 'home' ? '/' : `/${view}`);
  const protectedProps = { setView, onLogout: handleLogout, user };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={(session) => { setUser(session.user); navigate('/dashboard'); }} setView={setView} />} />
      <Route path="/" element={<Home setView={setView} />} />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/dashboard" element={<AdminDashboard {...protectedProps} />} />
        <Route path="/members" element={<ManageMembers {...protectedProps} />} />
        <Route path="/members/:memberId" element={<MemberProfilePage {...protectedProps} />} />
        <Route path="/coaches" element={<ManageCoaches {...protectedProps} />} />
        <Route path="/plans" element={<ManagePlans {...protectedProps} />} />
        <Route path="/reports" element={<Reports {...protectedProps} />} />
        <Route path="/inventory" element={<ManageInventory {...protectedProps} />} />
        <Route path="/profile" element={<AdminProfile {...protectedProps} />} />
        <Route path="/staff" element={<AdminOnlyRoute user={user}><StaffManagement {...protectedProps} /></AdminOnlyRoute>} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

function ProtectedRoute({ user }) {
  return user ? <NavigateOutlet /> : <Navigate to="/login" replace />;
}

function NavigateOutlet() {
  return <Outlet />;
}

function AdminOnlyRoute({ user, children }) {
  return user?.role === 'admin' ? children : <Navigate to="/dashboard" replace />;
}

export default App;