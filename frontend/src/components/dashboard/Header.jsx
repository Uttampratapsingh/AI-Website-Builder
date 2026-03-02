import { useNavigate } from 'react-router-dom';
import DeployButton from '../utils/DeployButton';
import {motion} from 'motion/react';

const Header = ({userData,loading,error,websites}) => {
  const navigate = useNavigate();


  return (
    <div className='max-w-7xl mx-auto px-6 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
          <h1 className='text-3xl font-bold'>{userData.name}</h1>
        </motion.div>

        {error && <p className="text-red-500 mt-20 text-center">{error}</p>}
        {loading && <p className="text-zinc-400 mt-20 text-center">Loading your websites...</p>}
        {websites?.length == 0 && <p className="text-zinc-400 mt-20 text-center">You have no websites.</p>}

        {!loading && !error && websites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {websites.map((w, i) => (
              <motion.div
                key={w._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={()=> navigate(`/editor/${w._id}`)}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
              >

                {/* Preview */}
                <div className="relative h-40 bg-black cursor-pointer hover:brightness-100 transition">
                  <iframe
                    srcDoc={w.latestCode}
                    className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                    title="Website Preview"
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/0 transition" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  
                  <h3 className="text-base font-semibold line-clamp-2">
                    {w.title}
                  </h3>

                  <p className="text-xs text-zinc-400">
                    Last Updated{" "}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>

                  <DeployButton w = {w}/>

                </div>
              </motion.div>
            ))}

          </div>
        )}


    </div>
  )
}

export default Header