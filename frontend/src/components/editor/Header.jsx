import { ArrowLeft, X } from "lucide-react"
import { useNavigate } from "react-router-dom";


const Header = ({title, setShowChat}) => {
  const navigate = useNavigate();

  return (
    <div className='h-14 px-4 flex items-center gap-4  border-b border-r border-white/20'>
      <ArrowLeft onClick={()=> navigate('/dashboard')} />
      <span className='font-semibold truncate'>{title}</span>
      <button className='ml-auto text-white/50 hover:text-white lg:hidden' onClick={() => setShowChat(false)}><X/></button>
    </div>
  )
}

export default Header