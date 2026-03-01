import { useState } from 'react'
import { motion,AnimatePresence } from "motion/react"
import Hero from '../components/home/Hero'
import Cards from '../components/home/Cards'
import Login from '../components/home/Login';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePlus, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';


function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const {userData} = useSelector((state) => state.user); //it only gives you state not function
  console.log("User Data from Redux:", userData);

  const[openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{}, { withCredentials: true }); //{} is important otherwise cookies will not removed. because if we dont pass it then it will consider the second parameter as data and it will not send the request to the backend and hence cookies will not be removed from the browser.
      dispatch(setUserData(null));
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  }

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

            {userData && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                  <Coins size={14} className="text-yellow-400" />
                  <span className="text-zinc-300">Credits</span>
                  <span>{userData.credits}</span>
                  <span className="font-semibold">+</span>      
                </div>
            )}

            {!userData ?
              <button onClick={()=>setIsLogin(true)} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm">
                Get Started
              </button>
            :
              <div className='relative cursor-pointer'>
                <button className='flex items-center gap-2' onClick={()=>setOpenProfile(!openProfile)}>
                  <p className='hidden md:inline text-sm text-zinc-200'>{userData.name}</p>
                  <img src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="User Avatar" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
                </button>
                
                <AnimatePresence>
                  {
                    openProfile && <>
                      <motion.div initial={{ opacity: 0, y:-10,scale:0.95 }} animate={{ opacity: 1, y:0,scale:1 }} exit={{ opacity: 0, y:-10,scale:0.95 }} className='absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden'>

                        <div className='px-4 py-3 border-b border-white/10 flex flex-col gap-1'>
                          <p className='text-sm font-medium truncate'>{userData.name}</p>
                          <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                        </div>

                        <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
                          <Coins size={14} className='text-yellow-400' />
                          <span className='text-zinc-300'>Credits</span>
                          <span>{userData.credits}</span>
                          <CirclePlus className='w-3 h-3 -ml-1'/>
                        </button>

                        <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5'>
                          Dashboard
                        </button>

                        <button onClick={(e)=>handleLogout(e)} className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5'>
                          Logout
                        </button>
                      </motion.div>
                    </>
                  }
                </AnimatePresence>

              </div>
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
        {isLogin && <Login setIsLogin={setIsLogin} setOpenProfile={setOpenProfile}/>}
      </AnimatePresence>

    </div>
  )
}

export default Home