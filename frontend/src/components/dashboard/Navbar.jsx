import { ArrowLeft, Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate("/")} className='p-2 rounded-lg hover:bg-white/10 transition'>
            <ArrowLeft size={16} />
          </button>
          <h1 className='text-lg font-semibold'>Dashboard</h1>
        </div>

        <button 
          onClick={() => navigate("/generate")} 
          className='px-3 py-1 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition flex items-center justify-center gap-1'
        >
          <Plus size={16} /> New Website
        </button>
      </div>
    </div>
  )
}

export default Navbar;