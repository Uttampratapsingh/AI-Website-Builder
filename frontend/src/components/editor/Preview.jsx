import { Rocket, Code2, Monitor, MessageSquare } from 'lucide-react';
import DeployButton from '../utils/DeployButton';



const Preview = ({iframeRef,setShowCode,showCode,setShowFullPreview,showFullPreview,showChat,setShowChat,w}) => {
  return (
    <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>

          <div className="flex gap-2">

            <DeployButton w={w} />

            <button className='lg:hidden p-2 hover:bg-white/10 rounded-md transition' onClick={()=>setShowChat(!showChat)}>
              <MessageSquare size={18} />
            </button>

            <button onClick={()=>setShowCode(!showCode)} className="p-2 hover:bg-white/10 rounded-md transition">
              <Code2 size={18} />
            </button>

            <button onClick={()=>setShowFullPreview(!showFullPreview)} className="p-2 hover:bg-white/10 rounded-md transition">
              <Monitor size={18} />
            </button>

          </div>
        </div>

        {/* Preview Frame */}
        <iframe
          ref={iframeRef}
          className="flex-1 w-full bg-white"
          title="Website Preview"
        />

    </div>
  )
}

export default Preview