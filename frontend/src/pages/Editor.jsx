import { use, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/editor/Header.jsx';
import Chat from '../components/editor/Chat.jsx';
import { Rocket, Code2, Monitor } from 'lucide-react';
import { useRef } from 'react';


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
    <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
      <aside>
        <Header title={website.title}/>
        <Chat conversation={website.conversation}/>
      </aside>

      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>

          <div className="flex gap-2">

            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition">
              <Rocket size={14} />
              Deploy
            </button>

            <button className="p-2 hover:bg-white/10 rounded-md transition">
              <Code2 size={18} />
            </button>

            <button className="p-2 hover:bg-white/10 rounded-md transition">
              <Monitor size={18} />
            </button>

          </div>
        </div>

        {/* Preview Frame */}
        <iframe
          ref={iframeRef}
          className="flex-1 w-full bg-white"
          title="Website Preview"
        />

      </div>
    </div>
  )
}

export default Editor