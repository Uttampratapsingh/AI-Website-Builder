import { Rocket, Code2, Monitor } from 'lucide-react';



const Preview = ({iframeRef}) => {
  return (
    <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>

          <div className="flex gap-2">

            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition">
              <Rocket size={14} />
              Deploy
            </button>

            <button className="p-2 hover:bg-white/10 rounded-md transition">
              <Code2 size={18} />
            </button>

            <button className="p-2 hover:bg-white/10 rounded-md transition">
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