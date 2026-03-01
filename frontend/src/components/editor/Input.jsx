import { LoaderCircle, Send } from 'lucide-react'


const Input = ({prompt, setPrompt,handleUpdate,updateLoading}) => {
  return (
    <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
            <input
            onChange={(e)=>setPrompt(e.target.value)}
            value={prompt}
            placeholder="Describe Changes..."
            className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-white/20"
            />

            <button onClick={handleUpdate} disabled={updateLoading} className="px-4 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition disabled:opacity-50">
            {updateLoading ? <LoaderCircle className="animate-spin" size={14} /> : <Send size={14} />}
            </button>
        </div>
    </div>
  )
}

export default Input