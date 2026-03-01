import {useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/editor/Header.jsx';
import Chat from '../components/editor/Chat.jsx';
import { useRef } from 'react';
import Preview from '../components/editor/Preview.jsx';
import Input from '../components/editor/Input.jsx';


const Editor = () => {

  const {id} = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const iframeRef = useRef(null);

  useEffect(()=>{
    const getWebsite = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/website/get-by-id/${id}`,{withCredentials: true});
        console.log('Website fetched:', response.data); 
        setWebsite(response.data);
      } catch (error) {
        console.error('Error fetching website:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching the website.');
      }
    }
    getWebsite();
  },[id])


  useEffect(()=>{
    if(!iframeRef.current || !website?.latestCode) return; // Ensure the iframe and latestCode are available

    // Create a blob URL for the latest code
    const blob = new Blob([website.latestCode], { type: 'text/html' }); // blob means binary large object, it can hold any type of data, in this case we are holding the html code of the website
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => {
      URL.revokeObjectURL(url); // Clean up the blob URL when the component unmounts or when latestCode changes
    };
  },[website?.latestCode])


  if(error){
    return(
      <div className='h-screen flex items-center justify-center bg-black text-red-400'>
        <p>Error: {error}</p>
      </div>
    )
  }

  if(!website){
    return(
      <div className='h-screen flex items-center justify-center bg-black text-white'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
        <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80'>
          <Header title={website.title}/>
          <Chat conversation={website.conversation}/>
          <Input/>
        </aside>
        <Preview iframeRef={iframeRef}/>
      </div>
    </>
  )
}

export default Editor