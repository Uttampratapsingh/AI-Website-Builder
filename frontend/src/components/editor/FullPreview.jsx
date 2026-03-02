import { X } from 'lucide-react';
import {motion} from 'motion/react';

const FullPreview = ({code,setShowFullPreview}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-999 bg-black backdrop-blur-sm"
    >
      <div className="h-full w-full flex items-center justify-center">
          <iframe
            srcDoc={code}
            className="w-full h-full bg-white"
            title="Full Preview"
            sandbox='allow-scripts allow-same-origin allow-forms allow-popups allow-presentation'
          />
          <button onClick={() => setShowFullPreview(false)} className="absolute top-4 right-4 bg-black/90 rounded-lg z-1000 hover:scale-107 transition">
            <X size={24} className='text-white transition'/>
          </button>
      </div>
    </motion.div>
  )
}

export default FullPreview