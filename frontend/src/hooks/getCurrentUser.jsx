import { useEffect } from 'react'
import axios from 'axios';

function getCurrentUser(){
  useEffect(()=>{
    const currentUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
          withCredentials: true // Include credentials (cookies) in the request
        });
        console.log("Current user response:", response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    currentUser();
  },[])
}

export default getCurrentUser;