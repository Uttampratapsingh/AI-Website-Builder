import {useSelector } from 'react-redux';
import Navbar from '../components/dashboard/Navbar';
import Header from '../components/dashboard/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const {userData} = useSelector((state) => state.user);
  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/website/get-all`, {
          withCredentials: true,
        });
        setWebsites(response?.data || []);
      } catch (error) {
        setError('Failed to fetch websites. Please try again later.');
        console.error('Error fetching websites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchWebsites();
    }
  }, [userData]);

  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      
      <Navbar/>
      <Header userData={userData} loading={loading} error={error} websites={websites} />
      
    </div>
  )
}

export default Dashboard