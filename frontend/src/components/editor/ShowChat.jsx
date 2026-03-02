import {motion} from 'motion/react'
import Header from './Header'
import Input from './Input'
import Chat from './Chat'

const ShowChat = ({setShowChat,title,conversation,thinkingStep,updateLoading,prompt,setPrompt,handleUpdate}) => {
  return (
    <motion.div
        initial={{y:'100%'}}
        animate={{y:0}}
        exit={{y:'100%'}}
        transition={{duration:0.2}}
        className='fixed inset-0 z-[999] bg-black flex flex-col lg:hidden'
    >
        <Header setShowChat={setShowChat} title={title}/>
        <Chat conversation={conversation} thinkingStep={thinkingStep} updateLoading={updateLoading}/>
        <Input prompt={prompt} setPrompt={setPrompt} handleUpdate={handleUpdate} updateLoading={updateLoading}/>

    </motion.div>
  )
}

export default ShowChat