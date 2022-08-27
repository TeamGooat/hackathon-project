import { useState } from "react";

const TextBar = () => {

    //const [state, stateSet] = createSignal<{users: string[], msgs: {self: boolean, msg: string, msgTime: Date}[], calls: string[], currentCall: string}>({users: [], msgs: [], calls: [], currentCall: ""});

    // const sendMsg = (e) => {
    //     e.preventDefault()
    //     const msg = e.target.msg.value;
    //     if (msg.trim() !== '') {
    //       e.target.msg.value = "";
    //       ws.emit("msg", {msg, to: state().currentCall});
    //       let msgTime = new Date()
    //       stateSet(p => ({...p, msgs: [...p.msgs, {self:true, msg, msgTime}]}))
    //       setTimeout(() => {
    //         let m = document.getElementById(`msg:${msgTime.getUTCSeconds()}`)
    //         m.classList.add("animate-fade")
    //         setTimeout(() => {
    //           stateSet(p => ({...p, msgs: p.msgs.filter(m => m.msgTime !== msgTime)}))
    //         } , 1000)
    //       }, 5000)
    //     }
    //   }
    

  return (
    <div>
        <div className='absolute w-full max-w-screen-lg left-1/2 -translate-x-1/2 h-80 bottom-24 flex flex-col gap-2 justify-end overflow-hidden px-4'>
            {/* {
              state().msgs.map((msg, i) => {
                if (msg.self) {
                  return (
                    <div id={`msg:${msg.msgTime.getUTCSeconds()}`} className='bg-blue-400 text-white max-w-2xl w-fit px-4 py-2 rounded-3xl text-left self-start'>
                      {msg.msg}
                    </div>
                  )
                } else {
                  return (
                    <div id={`msg:${msg.msgTime.getUTCSeconds()}`} className='bg-slate-300 text-black max-w-2xl w-fit px-4 py-2 rounded-3xl text-right self-end'>
                      {msg.msg}
                    </div>
                  )
                }
              })
            } */}
          </div>
          <div className="bg-neutral rounded-b-2xl flex justify-center ">
        <div className="w-full">
            <div className='flex gap-4 justify-center items-center w-full h-full max-w-screen-lg mx-auto'>
              <form className='w-full'>
                <input className='p-2 rounded-full w-full bg-[#3A3A3A] px-5 my-3 border-none outline-none' type="text" id='msg' placeholder='Message' />
              </form>
              <button className="block px-3 py-1.5 text-3xl">🙌</button>
              <button className="block px-3 py-1.5 text-3xl">🐐</button>
              <button className="block px-3 py-1.5 text-3xl">💖</button>  
            </div>
            {/* <input type="text" placeholder="Type here" className="input bg-[#3A3A3A] rounded-full grow max-w-xl my-3" /> */}
        </div>
    </div>
    </div>
    
  );
};

export default TextBar;
