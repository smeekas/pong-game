import { PlayerType } from "../types/types";
import { RIGHT_PLAYER_X, LEFT_PLAYER_X, PLAYER_Y, PLAYER_MARGIN_Y, PLAYER_HEIGHT, PLAYER_WIDTH, CANVAS_H, CANVAS_W, RECT } from '../utils/variables';
import { pong } from "../store/store";
let c: CanvasRenderingContext2D;
export class Player {
    current: string;
    x: number
    y: number
    mouseY: number

    constructor(current: PlayerType) {
        this.current = current
        this.x = current === "LEFT" ? LEFT_PLAYER_X : RIGHT_PLAYER_X;
        this.y = PLAYER_Y;
        this.mouseY = PLAYER_Y

    }

    // setYtoStore(cords: number) {
    //     if (this.current === "LEFT") {
    //         pong.setPlayer(cords)
    //     } else {

    //     }
    // }
    getYfromStore() {
        return this.current === "LEFT" ? pong.playerY : pong.opponentY;
    }
    
    update() {
        // if (this.getYfromStore() <= PLAYER_MARGIN_Y) {  //upper stuck
        //     // this.setYtoStore(PLAYER_MARGIN_Y)
        //     this.y = PLAYER_MARGIN_Y;
        // }
        // else if (this.getYfromStore() >= CANVAS_H - PLAYER_HEIGHT - 10) { //lower stuck
        //     // this.setYtoStore(CANVAS_H - PLAYER_HEIGHT - 10)

        //     this.y = CANVAS_H - PLAYER_HEIGHT - 10
        // }

        // else {
        //     this.y = this.getYfromStore()
        // }
        this.y=this.getYfromStore()
        this.draw()
    }
    draw() {
        c.beginPath();
        c.strokeStyle = 'yellow';
        c.fill()
        c.rect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT)
        c.stroke();
    }
    getX() {
        return this.current === "LEFT" ? this.x + PLAYER_WIDTH : RIGHT_PLAYER_X;
    }
    getY() {
        return this.y;
    }
    setY(mouseY: number) {
        this.y = pong.playerY
    }
}

export function setContext(ctx: CanvasRenderingContext2D) {
    c = ctx;
}
export type TypeOfData="x"|"y";

export class Circle {
    x: number;
    y: number
    // tdx: number
    // tdy: number
    rect: number
    color: string
    dx:number
    dy:number
    constructor() {
        this.x = CANVAS_W/2
        this.y = CANVAS_H / 2;
        this.dx = (Math.random() - 0.5) * 20;
        this.dy = (Math.random() - 0.5) * 20;
        this.rect = RECT;
        this.color = `white`;
        // this.dx=0;
        // this.dy=0;
    }
    start(){
        // this.dx=this.tdx
        // this.dy=this.tdy
    }
    getCircleFromStore(key:TypeOfData){
        
        // if(pong.control){
        //     return this[`${key}`]
        // }
            return pong.getCircle(key)
        
    }
    setCircleToStore(x:number,y:number){
        if(pong.control){
            pong.setCircle(x,y)
        }
    }
    restart() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color
        c.strokeStyle = this.color
        
        c.rect(this.getCircleFromStore("x"), this.getCircleFromStore('y'), this.rect, this.rect)
        c.stroke();
        c.fill()
    }
    update() {
        if(!pong.startGame){
            return
        }
        if (this.x + this.rect >= CANVAS_W) { //right gameover
            // this.dx = -this.dx;
            pong.startGame=false

            // pong.opponentScore++;
            pong.setPlayerScore()
            // this.x = BALL_START
            // this.y = BALL_START
            //! over = true

        }
        else if (checkCollisionWithPlayer(this.x, this.y)) {
            this.dx = -this.dx;
            if (Math.random() >= 0.5) {
                this.dy = -this.dy
            }
        }
        else if (checkColliisonWithOpponent(this.x + this.rect, this.y)) {
            this.dx = -this.dx;

        }
        else if (this.x < 0) { //left gameover
            // this.dx = -this.dx;
            pong.startGame=false
            console.log("OVER");
            // this.x = BALL_START
            //game over
            pong.setOpponentScore()
            //! over = true
            // return
            // this.y = BALL_START
        }
        if (this.y + this.rect >= CANVAS_H  || this.y <= 0) {
            this.dy = -this.dy;  //upper and lower edge collision
        
        }
        this.x += this.dx;
        this.y += this.dy;
        this.setCircleToStore(this.x,this.y)
        this.draw();
    }
}

export const circle = new Circle()
export const player = new Player("LEFT");
export const opponent = new Player("RIGHT");
function checkCollisionWithPlayer(ballX: number, ballY: number) {
    return (ballX <= player.getX() && ballY <= player.getY() + 125 && ballY + RECT >= player.getY())
    //directly touched && ball inside player from lower side && ball inside player from upper side
}
function checkColliisonWithOpponent(ballX: number, ballY: number) {

    return (ballX >= opponent.getX() && ballY <= opponent.getY() + 125 && ballY >= opponent.getY())
}
