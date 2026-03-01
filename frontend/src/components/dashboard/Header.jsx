import {motion} from 'motion/react'

const Header = ({userData}) => {
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
    </div>
  )
}

export default Header