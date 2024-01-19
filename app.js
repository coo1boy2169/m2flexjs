
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.x2 = x + w
        this.y2 = y + h
        this.w = w
        this.h = h

    }

}




const gamestate_start = 0
const gamestate_ingame = 1
const gamestate_gameover = 2


const ingamestate_start = 0
const ingamestate_roll = 1
const ingamestate_end = 0

let lastRoll = -1
let images = {}
let gameState = gamestate_start;
let ingameState = ingamestate_start;
let boardPositionSize = 50
let pawPosition = []
let boardPositions = []
let playerAmountButtons = []
let uiWindow = new Rect(600, 200, 300, 300)
let canvas = document.getElementById("canvas")
let g = canvas.getContext("2d")





// let rect1=new Rect(0,0,10,10);


function clearCanvas() {
    g.fillStyle = "lightslategray"
    g.fillRect(0, 0, canvas.width, canvas.height)
}




function draw() {
    clearCanvas();
    drawGameOver()


    if (gameState === gamestate_start) {
        drawGameStart()
    }
    if (gameState === gamestate_ingame) {
        drawIngame();
        drawUI();
    }

}



function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < path.length; i++) {

        if (path[i] == 1)//gaan naar rechts
        {
            //bedenk hier wat je met de x moet doen
            x += boardPositionSize + 5
        }
        else if (path[i] == 3)//gaan naar links
        {
            // bedenk hier wat je met de x moet doen
            x -= boardPositionSize + 5
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            //bedenk hier wat je met de y moet doen
            y -= boardPositionSize + 5
        }
        boardPositions.push(new Rect(x, y, boardPositionSize, boardPositionSize));
    }
}



function initGame() {
    createBoardPositions()
    for (let ButtonNum = 0; ButtonNum < 4; ButtonNum++) {
        let button = new Rect(uiWindow.x + 5 + (50 * ButtonNum), uiWindow.y + 50, 50, 50)
        playerAmountButtons.push(button)
        button.playerAmount = ButtonNum + 1
    }



}



function drawGameStart() {
    for (let i = 0; i < playerAmountButtons.length; i++) {
        let pos = playerAmountButtons[i]

        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "#FFFFFF"
        g.fillText((i + 1) + "", pos.x, pos.y + 20)
        g.drawImage(images["pawn" + i + ".png"], pos.x, pos.y, pos.w, pos.h)
    }






}
function drawIngame() {






    for (let i = 0; i < boardPositions.length; i++) {


        let pos = boardPositions[i]


        g.fillStyle = "green";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "white"
        g.fillText((i + 1) + "", pos.x, pos.y + 20)

    }

    for (let i = 0; i < pawPosition.length; i++) {


        let pos = pawPosition[i]
        let boardI = pos.boardI

        let boardpos = boardPositions[boardI] 
        let PawnSize = boardPositionSize / 2;



            // vraag waroom dit niet smaen werkt !>!>!>!>!>!>
        g.drawImage(images["snakes.png"], 0,70, 600, 600)
        g.drawImage(images["pawn"+i+".png"])
        g.fillStyle = "green";
        g.fillRect(boardpos.x, boardpos.y, boardpos.w, boardpos.h);
        g.fillStyle = "blue"
        g.fillText((i + 1) + "", boardpos.x, boardpos.y + 20)
       
    }
 

}
function drawGameOver() {



}

function loadImages() {
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
        "img/snakes.png",
        "img/trophy.png",
        "img/window.png",
    ];

    let scope = this;

    let loaded = 0;
    for (let i = 0; i < sources.length; i++) {
        let img = new Image();


        img.onload = function () {
            loaded++;
            if (loaded == sources.length) {
                imageLoaded();
            }
        };
        img.src = sources[i];

        images[sources[i].replace("img/", "")] = img;
    }
}



function startRoll() {
    ingameState = ingamestate_roll
    lastRoll = -1
    draw()
    setTimeout(endRoll, 500);
}


function endRoll() {
    ingameState = ingamestate_end
    let random = Math.floor(Math.random() * 6)
    lastRoll = random
    draw();

}

function drawUI() {
    if (ingameState == ingamestate_roll) {
        if (lastRoll == -1) {
        }
        //if (                                                                                                                                                                                                                                                                                                                ) {
        //    g.fillText("rollen....", 20, 20);
        //
        //}
    }
    else {
        "dice" + lastRoll + ".png"
    }
}




function canvasClicked(mouseEvent) {



    for (let i = 0; i < playerAmountButtons.length; i++) {

        let button = playerAmountButtons[i];

        let mX = mouseEvent.clientX
        let mY = mouseEvent.clientY

        let hitButton = inRect(mX, mY, button);


        if (hitButton === true) {

            if (gameState == gamestate_start) {
                startGame(button.playerAmount);

            }
            else if (gameState == gamestate_ingame) {
                startRoll();
            }
            break;
        }

    }



}

function imageLoaded() {



    initGame()

    canvas.addEventListener("click", (e) => { canvasClicked(e) });

    draw()
}


function inRect(px, py, rect) {
    let result = (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
    return result;

}


function startGame(playerAmount) {


    gameState = gamestate_ingame
    ingameState = ingamestate_start
    pawPosition = [];
    playerTurn = 0
    winner = -1
    console.log("palyerAmount" + playerAmount);
    for (let i = 0; i < playerAmount; i++) {

        let Pawn = createPawn(i)
        pawPosition.push(Pawn)

    }
    draw();

}
function createPawn(playerI) {
    return { boardI: 0, playerI: playerI };
}

loadImages()