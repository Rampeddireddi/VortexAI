import React from 'react'
import { GiBlackHoleBolas } from "react-icons/gi";

const ChatMessage = ({chat}) => {
  return (
    !chat.hideInChat && (
  <>
 
  
  {/* <div className={`${chat.role === "bot" ? "bot" : "user"}-msg`}> */}
  {chat.role === "model" ? (
    <div className='self-start flex gap-1 items-end'>
      <GiBlackHoleBolas className='min-h-[2rem] min-w-[2rem] text-orange-600 rounded-lg text-3xl' />
      <div className="bot-msg"> {chat.text}</div>
    </div>
  ) : (
    <div className="user-msg">{chat.text}</div>
  )}
  

  </>
    )
  )
}

export default ChatMessage