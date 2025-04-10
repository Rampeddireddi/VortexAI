import React, { useState, useRef,useEffect} from 'react'
import { GiBlackHoleBolas } from "react-icons/gi";
import Header from './Components/Header';
import ChatMessage from './Components/ChatMessage';
import Footer from './Components/Footer';
import { Myinfo } from './Components/Myinfo';
const App = () => {
const chatBodyref= useRef();

  const [chatHistory,SetchatHistory]=useState([{
    hideInChat:true,
   role:"model",
   text:Myinfo
  }]);
  const updateHistory=(text)=>{
    // here the filter function actually removes thinking... and add response
    SetchatHistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text}])
  }
  const generateBotresponse=async (history)=>{ 
  // console.log(history);
history=history.map(({role,text})=>({role,parts:[{text}]}));
//parts is used to send the different type of request such as image , text etc
// stringyfy will convert the request into json string format
const requestOptions={
  method:"POST",
  headers:{"content-type":"application/json"},
  body:JSON.stringify({contents:history})
  }
  try{
    //process.env for nodejs environment and  import.meta.env
    const response= await fetch(import.meta.env.VITE_API_KEY,requestOptions);
    // console.log(response)
    const data=await response.json();
    if(!response.ok)throw new Error(data.error.message || "Something went Wrong!");
    console.log(data);
    const apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
    // console.log(apiResponse)
    updateHistory(apiResponse);
//     /.../g — the slashes define the regex, and g is the global flag, meaning it will replace all matches, not just the first one.
// \*\* — matches the literal **. The asterisk * is a special character in regex, so it needs to be escaped with a backslash (\*) to be treated as a literal.
// (.*?) — a capturing group that:
// . — matches any character except newlines.
// * — means “zero or more times.”
// ? — makes the * lazy, so it matches the smallest amount of text possible between the ** pairs (instead of the biggest).
// \*\* — matches the closing **.
  }
  catch(error){
    console.log(error);
  }
  };

  useEffect(()=>{
chatBodyref.current.scrollTo({top:chatBodyref.current.scrollHeight, behavior:"smooth"});
  },[chatHistory])
  return (
   <div className="flex h-[100vh] w-full justify-center items-center relative">
    <div className="box">
      <Header/>
      <div ref={chatBodyref} className=' msg-body '>
         <div className='self-start flex gap-1 items-end'><GiBlackHoleBolas className='min-h-[2rem] min-w-[2rem] text-orange-600  rounded-lg text-3xl' />
<div className='bot-msg'>Hey there! How can i help you</div></div>

    {chatHistory.map((chat,index)=>(
      <ChatMessage key={index} chat={chat}/>
    ))}
       
      </div>
      <div className="footer">
        
       <Footer chatHistory={chatHistory} SetchatHistory={SetchatHistory} generateBotresponse={generateBotresponse}/>
      </div>
    </div>
   </div>
  )
}

export default App