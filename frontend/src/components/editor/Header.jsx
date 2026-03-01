import { GitGraph } from "lucide-react"




const Header = ({title}) => {
  return (
    <div className='h-14 px-4 flex items-center gap-4  border-b border-r border-white/20'>
      <GitGraph />
      <span className='font-semibold truncate'>{title}</span>
    </div>
  )
}

export default Header