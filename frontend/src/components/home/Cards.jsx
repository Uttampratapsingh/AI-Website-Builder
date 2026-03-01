import {motion} from 'motion/react'
import Highlight from '../../data/Highlights'

const Cards = () => {
  return (
    <section className='max-w-7xl mx-auto px-6 pb-32'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {Highlight.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8"
                >
                    <h1 className="text-xl font-semibold mb-3">{item}</h1>
                    <p className='text-sm text-zinc-400'>GetWeb.ai builds real website - clean code, animation, responsiveness and scalable structure.</p>
                </motion.div>
            ))}
        </div>
    </section>
  )
}

export default Cards