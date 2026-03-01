import { Send } from 'lucide-react'


const Input = () => {
  return (
    <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
            <textarea
            rows={1}
            placeholder="Describe Changes..."
            className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-white/20"
            />

            <button className="px-4 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition">
            <Send size={14} />
            </button>
        </div>
    </div>
  )
}

export default Input