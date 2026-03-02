import {motion} from 'motion/react'
import { X } from 'lucide-react';
import Editor from '@monaco-editor/react'

const ShowCode = ({code,setShowCode,setCode}) => {
  return (
    <motion.div
      initial={{x: "100%"}}
      animate={{x: 0}}
      exit={{x: "100%"}}
      transition={{duration: 0.2}}
      className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[999] bg-[#1e1e1e] '
    >
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
            <span className="text-sm font-medium text-zinc-300">
                index.html
            </span>
            <button
                onClick={() => setShowCode(false)}
                className="p-1 hover:bg-white/10 rounded-md transition"
            >
                <X size={18} className='text-zinc-200'/>
            </button>
        </div>
        <Editor theme='vs-dark' value={code} language='html' onChange={(e)=>setCode(e)}/>
        
    </motion.div>
  )
}

export default ShowCode