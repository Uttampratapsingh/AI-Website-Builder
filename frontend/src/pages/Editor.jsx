import {useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/editor/Header.jsx';
import Chat from '../components/editor/Chat.jsx';
import { useRef } from 'react';
import Preview from '../components/editor/Preview.jsx';
import Input from '../components/editor/Input.jsx';
import toast from 'react-hot-toast';
import ThinkingSteps from '../data/ThinkingSteps';
import ShowCode from '../components/editor/ShowCode.jsx';
import { AnimatePresence } from 'motion/react';


const Editor = () => {

  const {id} = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const iframeRef = useRef(null);
  const[message, setMessage] = useState([]);
  const[code, setCode] = useState("");
  const[prompt, setPrompt] = useState("");
  const[updateLoading, setUpdateLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(()=>{
    const getWebsite = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/website/get-by-id/${id}`,{withCredentials: true});
        console.log('Website fetched:', response.data); 
        setWebsite(response.data);
        setCode(response.data.latestCode);
        setMessage(response.data.conversation);
      } catch (error) {
        console.error('Error fetching website:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching the website.');
      }
    }
    getWebsite();
  },[id])


  useEffect(()=>{
    if(!iframeRef.current || !code) return; // Ensure the iframe and latestCode are available

    // Create a blob URL for the latest code
    const blob = new Blob([code], { type: 'text/html' }); // blob means binary large object, it can hold any type of data, in this case we are holding the html code of the website
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => {
      URL.revokeObjectURL(url); // Clean up the blob URL when the component unmounts or when latestCode changes
    };
  },[code])


  const handleUpdate = async () => {
    setUpdateLoading(true);
    const trimmedPrompt = prompt.trim();
    setPrompt("");
    if(!trimmedPrompt) {
      toast.error("Prompt cannot be empty");
      setUpdateLoading(false);
      return;
    }
    console.log('Updating website with prompt:', trimmedPrompt);
    setMessage((m)=>[...m,{role: "user", content: trimmedPrompt}]);
    try {
      console.log('website id:', id);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/website/update/${id}`,{prompt: trimmedPrompt},{withCredentials: true});
      console.log('Website updated:', response.data);
      setCode(response.data.code);
      setMessage((m)=>[...m,{role: "ai", content: response.data.message}]);
    } catch (error) {
      toast.error("Failed to update website");
      console.error('Error updating website:', error);
    }finally{
      setUpdateLoading(false);
    }
  }

  const [thinkingIndex, setThinkingIndex] = useState(0);

  useEffect(()=>{
    if(!updateLoading) return;
    const interval = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % ThinkingSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  },[updateLoading])


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
          <Chat conversation={message} thinkingStep={ThinkingSteps[thinkingIndex]} updateLoading={updateLoading}/>
          <Input prompt={prompt} setPrompt={setPrompt} handleUpdate={handleUpdate} updateLoading={updateLoading}/>
        </aside>
        <Preview iframeRef={iframeRef} setShowCode={setShowCode} showCode={showCode}/>
      </div>

      <AnimatePresence>
        {showCode && <ShowCode code={code} setShowCode={setShowCode} setCode={setCode}/>}
      </AnimatePresence>
    </>
  )
}

export default Editor