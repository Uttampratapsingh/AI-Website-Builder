import { ArrowLeft, Plus } from 'lucide-react'
import {motion} from 'motion/react'
import {useSelector } from 'react-redux';
import Navbar from '../components/dashboard/Navbar';
import Header from '../components/dashboard/Header';


const Dashboard = () => {
  const {userData} = useSelector((state) => state.user);


  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      
      <Navbar/>
      <Header userData={userData} />
      
    </div>
  )
}

export default Dashboard