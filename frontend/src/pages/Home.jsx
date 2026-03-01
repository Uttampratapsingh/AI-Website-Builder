import React, { useState } from 'react'
import { motion,AnimatePresence } from "motion/react"
import Hero from '../components/home/Hero'
import Cards from '../components/home/Cards'
import Login from '../components/home/Login';
import { useSelector } from 'react-redux';

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const {userData} = useSelector((state) => state.user);
  
console.log("User Data from Redux:", userData);
  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="text-lg font-semibold">
            GetWeb.ai
          </div>

          <div className="flex items-center gap-5">

            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
              Pricing
            </div>

            {!userData ?
              <button onClick={()=>setIsLogin(true)} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm">
                Get Started
              </button>

            :
              <button className='flex item-center'>
                <img src={userData.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
              </button>
            }

          </div>
        </div>
      </motion.div>

      <Hero/>

      <Cards/>

      <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
        &copy; {new Date().getFullYear()} GetWeb.ai. All rights reserved.
      </footer>

      <AnimatePresence mode="wait"> //exit animation wasnt working without. if you add it to Login component.
        {isLogin && <Login setIsLogin={setIsLogin} />}
      </AnimatePresence>

    </div>
  )
}

export default Home