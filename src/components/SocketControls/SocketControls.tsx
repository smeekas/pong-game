import { observer } from 'mobx-react';
import React, { useState } from 'react'
import { pong,PongType } from '../../store/store';
const SocketControls=observer(({pong}:{pong:PongType})=>{
  const startHandler=()=>{
    pong.start()
  }
  console.log(pong.playerScore);
return (  
  <div className='socketControl'>
      {/* <input onChange={(e)=>setRoom(e.target.value)}/> */}
      {/* <button onClick={roomjoinhandler}>join</button> */}
  <h1>
       pong: {pong.playerScore}
    </h1>
    <h1>
       opponent: {pong.opponentScore}
    </h1>
      <button onClick={startHandler}  >start</button>
  </div>)
})  
// function SocketControl() {

//     const startHandler=()=>{
//       pong.start()
//     }
//     console.log(pong.playerScore);
//   return (  
//     <div className='socketControl'>
//         {/* <input onChange={(e)=>setRoom(e.target.value)}/> */}
//         {/* <button onClick={roomjoinhandler}>join</button> */}
//     <h1>
//          pong: {pong.playerScore}
//       </h1>
//       <h1>
//          opponent: {pong.opponentScore}
//       </h1>
//         <button onClick={startHandler}  >start</button>
//     </div>
//   )
// }

export default SocketControls