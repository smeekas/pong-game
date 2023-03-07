import { keys } from 'mobx';
import React, { KeyboardEventHandler, MouseEventHandler, TouchEventHandler, useEffect, useRef } from 'react'
import { pong } from '../../store/store';
import { player, opponent, circle, setContext } from '../../utils/canvas';
import { CANVAS_H, CANVAS_W } from '../../utils/variables';
let keysPressed:{[key:string]:boolean} = {};
function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const keydownHandler=(e:KeyboardEvent)=>{
    // console.log("down "+e.key)
    keysPressed[e.key] = true;
    // if(e.key===)
    if(Object.hasOwn(keysPressed,'a')){
      pong.setPlayer("up")
    }
     if(Object.hasOwn(keysPressed,'z')){
      pong.setPlayer('down')
    }
     if(Object.hasOwn(keysPressed,'p')){
      pong.setOpponent('up')
    }
     if(Object.hasOwn(keysPressed,'l')){
        pong.setOpponent('down')
    }

    // console.log(e.target!.tagName)

  }
  document.addEventListener('keydown',keydownHandler)
  document.addEventListener('keyup',(e:KeyboardEvent)=>{
    // console.log("up "+e.key);
    delete keysPressed[e.key];
  })
  useEffect(() => {
    if (ref.current) {

      const ctx = ref.current.getContext('2d');
      ref.current.width = CANVAS_W
      ref.current.height = CANVAS_H

      setTimeout(() => {

        setContext(ctx!);
      
        function animate() {
            // ctx!.beginPath();
            // ctx!.strokeStyle = 'yellow';
            // ctx!.fill()
            // ctx!.rect(CANVAS_W/2,0,10,CANVAS_H)
            // ctx!.stroke()
          requestAnimationFrame(animate);
          ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
          player.update()
          opponent.update()
          circle.update()
        }
        animate()
      }, 0)
    }

  }, [])
  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    // pong.setPlayer(e.clientY)
  }
  const touchMoveHandler:TouchEventHandler<HTMLDivElement>=(e)=>{
    // pong.setPlayer(e.changedTouches[0].clientY);
  }
  
  return (
    <div style={{width:'99%',border:"1px solid red",flex:1}}>
    <div onTouchMove={touchMoveHandler} onMouseMove={mouseMoveHandler} className='canvasContainer'>
      <canvas ref={ref} />
    </div>
    </div>
  )
}

export default Canvas