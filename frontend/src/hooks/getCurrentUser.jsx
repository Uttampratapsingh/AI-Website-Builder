import { useEffect } from 'react'
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function getCurrentUser(){
  const dispatch = useDispatch();
  useEffect(()=>{
    const currentUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
          withCredentials: true // Include credentials (cookies) in the request
        });
        dispatch(setUserData(response.data.user));
        console.log("Current user response:", response.data.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    currentUser();
  },[])
}

export default getCurrentUser;