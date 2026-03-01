import {motion } from 'motion/react'
import { X } from 'lucide-react';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice.js';
import { googleAuth } from '../../service/googleAuth.js';

const Login = ({ setIsLogin }) => {
    const dispatch = useDispatch();

    const handleGoogleAuth = async () => {
    try {
      const { data, user_name } = await googleAuth();

      dispatch(setUserData(data.user));
      console.log("Google Auth Success:", data.user);
      toast.success(`Welcome, ${user_name}!`);
      setIsLogin(false);

    } catch (error) {
      toast.error("Google authentication failed. Please try again.");
      console.error("Google Auth Error:", error);
    }
  };

  return (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLogin(false)}
        >
          
        <motion.div
        initial={{ scale: 0.88, opacity: 0, y:60 }}
        animate={{ scale: 1, opacity: 1, y:0 }}
        exit={{ scale: 0.88, opacity: 0, y:60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
        >
            <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden">

                <motion.div
                    animate={{ opacity: [0.25, 0.4, 0.25] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
                />

                <motion.div
                    animate={{ opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
                />

                <X onClick={()=>setIsLogin(false)} className="absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg"/>

                <div className="relative px-8 pt-14 pb-10 text-center">

                    <h1 className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                        AI-powered website builder
                    </h1>

                    <h2 className="text-3xl font-semibold leading-tight mb-3 space-x-2">
                        <span>Welcome to</span>
                        <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            GenWeb.ai
                        </span>
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden mt-2"
                        onClick={handleGoogleAuth}
                        >
                        <div className="relative flex items-center justify-center gap-3">
                            <img
                            src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                            alt="Google"
                            className="h-5 w-5"
                            />
                            Continue with Google
                        </div>
                    </motion.button>

                    <div className="flex items-center gap-4 my-10">
                        <div className="h-px flex-1 bg-white/10" />
                        
                        <span className="text-xs text-zinc-500 tracking-wide">
                            Secure Login
                        </span>
                        
                        <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                        By continuing, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-zinc-300">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="underline cursor-pointer hover:text-zinc-300">
                            Privacy Policy
                        </span>.
                        </p>
                    </div>
            </div>
        </motion.div>
        </motion.div>
  )
}

export default Login