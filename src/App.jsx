import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Log-in';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import ManagePlans from './pages/ManagePlans';
import ManageCoaches from './pages/ManageCoaches';
import ManageMembers from './pages/ManageMembers';
import Reports from './pages/Reports';

function App() {
  const [view, setView] = useState('home');

  if (view === 'login')
    return <Login setView={setView} />;

  if (view === 'dashboard')
    return <AdminDashboard setView={setView} />;

  if (view === 'profile')
    return <AdminProfile setView={setView} />;

  if (view === 'plans')
    return <ManagePlans setView={setView} />;

  if (view === 'coaches')
    return <ManageCoaches setView={setView} />;

  if (view === 'members')
    return <ManageMembers setView={setView} />;

  if (view === 'reports')
    return <Reports setView={setView} />;

  return <Home setView={setView} />;
}

export default App;