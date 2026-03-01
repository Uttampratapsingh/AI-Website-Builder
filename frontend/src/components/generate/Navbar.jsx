import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>

            <button
              className='p-2 rounded-lg hover:bg-white/10 transition'
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>

            <h1 className='text-lg font-semibold'>GetWeb
              <span className='text-zinc-400'>.ai</span>
            </h1>

          </div>
        </div>
    </div>
  )
}

export default Navbar