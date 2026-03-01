import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import useCurrentUser from './hooks/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import { Navigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';


const App = () => {
  useCurrentUser();

  const {userData,loading} = useSelector((state) => state.user);

  if (loading){
    return (
      <div className="flex items-center justify-center min-h-screen gap-5">
        <LoaderCircle className="animate-spin" size={40} />
        Loading...
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ style: {background: "#0b0b0b",color: "#fff",border: "1px solid rgba(255,255,255,0.1)",},}}/>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/generate"
          element={userData ? <Generate /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App