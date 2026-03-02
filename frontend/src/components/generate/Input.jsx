import { motion } from 'motion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Phases from '../../data/Phases.jsx'


const Input = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState('');
  

  const handleGenerateWebsite = async () => {
    setLoading(true);
    try {

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/website/generate`, { prompt },{withCredentials: true });
      console.log('Website generated:', response.data);
      setProgress(100);
      toast.success('Website generated successfully! Redirecting to editor...');
      setTimeout(() => {
        navigate(`/editor/${response.data.websiteId}`);
      }, 1500);
      setError('');
    } catch (error) {
      console.error('Error generating website:', error);
      setError(error.response?.data?.error || 'Failed to generate website. Please try again.');
      toast.error(error.response?.data?.error || 'Failed to generate website. Please try again.');
    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
    if(!loading){
      setPhaseIndex(0);
      setProgress(0);
      return;
    }
    let value = 0;let phase=0;

    const interval = setInterval(()=>{
      const increment = value<20
        ? Math.random() * 1.5 
        : value < 60 
        ? Math.random() * 1.2 
        : Math.random() * 0.6;

        value += increment;
        if(value >= 93) value = 93;

        phase = Math.min(
          Math.floor((value / 100)* Phases.length),Phases.length-1
        )

        setProgress(Math.floor(value));
        setPhaseIndex(phase);
    },1500)

    return () => clearInterval(interval);

  },[loading])


  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div className='text-center mb-16' initial={{opacity: 0, y:30}} animate={{opacity: 1, y:0}} transition={{duration: 0.5}}>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight bg-gradient-to-l from-white to-zinc-900 bg-clip-text text-transparent">Build Websites with
          <span className="block bg-gradient-to-r from-white to-zinc-900 bg-clip-text text-transparent  ">REAL AI POWER</span></h1>
          <p className='text-zinc-300 max-w-2xl mx-auto'>This process may take several minutes. GetWeb.ai focus on quality, not shortcuts.</p>
        </motion.div>

        <div className="mb-10">
          <h1 className="text-xl font-semibold mb-2 text-zinc-200">
            Describe your website
          </h1>

          <div className="relative">
            <textarea
              name=""
              id=""
              placeholder="Describe your website in detail..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p> }

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-5 py-2 rounded-2xl font-semibold text-lg ${
              prompt.trim() && !loading
                ? "bg-white text-black"
                : "bg-white/20 text-zinc-400 cursor-not-allowed"
            }`}
            onClick={handleGenerateWebsite}
            disabled={loading || prompt.trim() === ""}
          >
            {loading ? "Generating..." : "Generate Website"}
          </motion.button>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto mt-12"
          >
            {/* Phase + Percentage */}
            <div className="flex justify-between mb-2 text-xs text-zinc-400">
              <span>{Phases[phaseIndex]}</span>
              <span>{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-white to-zinc-300"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.8 }}
              />
            </div>

            {/* Estimated Time */}
            <div className="text-center text-xs text-zinc-400 mt-4">
              Estimated time remaining:{" "}
              <span className="text-white font-medium">
                ~8–12 minutes
              </span>
            </div>
          </motion.div>
        )}
    </div>
  )
}

export default Input