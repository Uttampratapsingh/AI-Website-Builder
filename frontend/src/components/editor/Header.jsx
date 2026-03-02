import { GitGraph, X } from "lucide-react"




const Header = ({title, setShowChat}) => {
  return (
    <div className='h-14 px-4 flex items-center gap-4  border-b border-r border-white/20'>
      <GitGraph />
      <span className='font-semibold truncate'>{title}</span>
      <button className='ml-auto text-white/50 hover:text-white lg:hidden' onClick={() => setShowChat(false)}><X/></button>
    </div>
  )
}

export default Header