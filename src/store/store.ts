import { io, Socket } from 'socket.io-client';
// export const socket = io('http://172.16.5.25:3000');

import { action, makeObservable, observable, override } from 'mobx'
import { CANVAS_H, CANVAS_W, PLAYER_HEIGHT, PLAYER_MARGIN_Y } from '../utils/variables';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { opponent, TypeOfData } from '../utils/canvas';
export interface PongType{
    playerScore:number,
    opponentScore:number
    start:Function

}
export class Pong {
    mouseH: number = CANVAS_H / 2;
    playerY: number = CANVAS_H / 2;
    opponentY: number = CANVAS_H / 2;
    gameOver: boolean = false;
    startGame:boolean=false
    id: number = Math.random() * 100;
    roomName: string = "-1"
    playerScore:number=0;
    opponentScore:number=0;
    // socket: Socket<DefaultEventsMap, DefaultEventsMap> = socket
    control: boolean = true
    connected: boolean = false
    
    circleX:number=CANVAS_W/2
    circleY:number=CANVAS_H/2
    playerMovement:number=5;
    constructor() {
        makeObservable(this, {
            playerY: observable,
            opponentY: observable,
            control:observable,
            connected:observable,
            gameOver:observable,
            setPlayer: action,
            setOpponent: action,
            setPlayerScore:action,
            setOpponentScore:action,
            startGame:observable,
            playerScore:observable,
            opponentScore:observable
        })
        // socket.on('disconnect', function () {
        //     console.log("DIS");

        // });

        // socket.on('number', (data) => {
        //     console.log(data);
        //     // console.log(this.connected);
        //     if (data === 1) {
        //         this.control = false
        //     }
        // })
        // socket.on('pos', (data) => {
        //     // console.log(data.message);
        //     if (data.id === this.id) {
        //         return;
        //     }
        //     this.setOpponent(data.message)
        // })
        // socket.on('pongballData',(data)=>{
        //     if (data.id === this.id) {
        //         return;
        //     }
        //     console.log(data);
        //     this.circleX=data.x;
        //     this.circleY=data.y
        // })
        // socket.emit('disconnect')
    }
    start(){
        this.startGame=true
        // console.log(pong.control);

        // console.log("START");l
    }
    // setRoomName(roomName: string) {
    //     console.log("ROOM!");
    //     this.connected = true
    //     this.roomName = roomName
    // }
    getCircle(key:TypeOfData){
        if(key=="x"){
            return this.circleX
        }else{
            return this.circleY

        }
        
    }
    setCircle(x:number,y:number){
        this.circleX=x;
        this.circleY=y;
        if (!this.connected) {
            return
        }

        // socket.emit('pongBall',{  room: this.roomName,id: this.id,x:x,y:y})
    }
    // setPlayer(y: number) {
    setPlayer(direction:"up"|"down") {
        // socket.emit('pp')
        // if (y !== this.playerY) {

        // this.playerY = y;

        if(direction==='down'){
            this.playerY+=this.playerMovement;
            
        }else{
            this.playerY-=this.playerMovement
        }
        if (this.playerY <= PLAYER_MARGIN_Y) {  //upper stuck
            // this.setYtoStore(PLAYER_MARGIN_Y)
            this.playerY = PLAYER_MARGIN_Y;
        }
        else if (this.playerY >= CANVAS_H - PLAYER_HEIGHT - PLAYER_MARGIN_Y) { //lower stuck
            // this.setYtoStore(CANVAS_H - PLAYER_HEIGHT - 10)

            this.playerY = CANVAS_H - PLAYER_HEIGHT - PLAYER_MARGIN_Y
        }
        // socket.emit('pong', {
        //     room: this.roomName,
        //     message: y,
        //     id: this.id
        // })
        // }
    }
    setPlayerScore(){
        this.playerScore++;
    }
    setOpponentScore(){
        this.opponentScore++;
    }
    // setOpponent(y: number) {
    setOpponent(direction:"up"|"down") {
        if(direction==='down'){
            this.opponentY+=this.playerMovement;
            
        }else{
            this.opponentY-=this.playerMovement
        }
        if (this.opponentY <= PLAYER_MARGIN_Y) {  //upper stuck
            // this.setYtoStore(PLAYER_MARGIN_Y)
            this.opponentY = PLAYER_MARGIN_Y;
        }
        else if (this.opponentY >= CANVAS_H - PLAYER_HEIGHT - PLAYER_MARGIN_Y) { //lower stuck
            // this.setYtoStore(CANVAS_H - PLAYER_HEIGHT - 10)

            this.opponentY = CANVAS_H - PLAYER_HEIGHT - PLAYER_MARGIN_Y
        }
        // socket.on('pos', (data) => {
        // this.opponentY = y;
        // opponent.setY(y)
        // })
    }
}
export const pong = new Pong();