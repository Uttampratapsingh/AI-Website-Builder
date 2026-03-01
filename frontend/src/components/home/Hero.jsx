import { motion } from "motion/react"
const Hero = ({ navigate,userData,setIsLogin }) => {
  return (
    <section className="pt-44 pb-32 px-6 text-center">

        <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
        >
            Build Stunning Websites <br />
            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            with AI
            </span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto"
        >
            Describe your idea and let AI generate a modern,
            responsive, production-ready website.
        </motion.p>

        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={() => userData ? navigate("/dashboard") : setIsLogin(true)}
            className="mt-10 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
            Get Started
        </motion.button>
    </section>
  )
}

export default Hero