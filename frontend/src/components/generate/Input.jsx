import { motion } from 'motion/react'

const Input = () => {
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
            />
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 rounded-2xl font-semibold text-lg bg-zinc-200 text-black hover:bg-zinc-200 transition"
          >
            Generate Website
          </motion.button>
        </div>

    </div>
  )
}

export default Input