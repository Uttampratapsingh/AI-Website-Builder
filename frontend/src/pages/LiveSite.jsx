import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LiveSite = () => {
    const {id} = useParams();
    const [htmlContent, setHtmlContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchLiveSite = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/website/get-by-slug/${id}`,{withCredentials:true});
                setHtmlContent(response.data.latestCode);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching live site:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchLiveSite();
    },[id])

  return (
    <div>
      {loading ? (
        <p className='text-center text-white py-20'>Loading...</p>
      ) : error ? (
        <p className='text-center py-20 text-red-500'>Error: {error}</p>
      ) : (
        <iframe srcDoc={htmlContent} title='Live-Site' className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms allow-popups allow-presentation' />
      )}
    </div>
  )
}

export default LiveSite