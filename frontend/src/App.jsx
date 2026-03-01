import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import getCurrentUser from './hooks/getCurrentUser';


const App = () => {
  getCurrentUser();
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: {background: "#0b0b0b",color: "#fff",border: "1px solid rgba(255,255,255,0.1)",},}}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App