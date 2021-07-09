
let score=0;
let prev_score=0;
let speed=5;
let lasttime=0;
let snakearray=[
    {x:15,y:15}
]
let food={x:2,y:6};
let inputdir={x:0,y:0};
function main(ctime)
{
    
    window.requestAnimationFrame(main);
    if(((ctime-lasttime)/1000)<(1/speed)){   
        return;
    }
    lasttime=ctime;
    game_engine();
}
function collide(snakearray){
    for(let i=1;i<snakearray.length;i++){
        if(snakearray[i].x==snakearray[0].x&&snakearray[i].y==snakearray[0].y){
            return true;
        }
    }
}
function game_engine()
{
    // if collided
    if(collide(snakearray)){
        inputdir={x:0,y:0};
        alert("GAME OVER.reload and press arrowup key to restart");
        snakearray={x:15,y:15};
        score=0;
    }
    //if eaten the food
    if(snakearray[0].x===food.x&&snakearray[0].y===food.y){
        score+=1;  
     scorecount.innerHTML="SCORE:"+score;
    snakearray.unshift({x:snakearray[0].x+inputdir.x,y:snakearray[0].y+inputdir.y});
    let a=4;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    if(score-prev_score>6){
        speed+=3;
        prev_score=score;
    }
    for(let i=snakearray.length-1;i>=1;i--){
          snakearray[i].x=snakearray[i-1].x;
          snakearray[i].y=snakearray[i-1].y;
    }
    snakearray[0].x+=inputdir.x;
    snakearray[0].y+=inputdir.y;
    if(snakearray[0].x===21)snakearray[0].x=0;
    if(snakearray[0].y===21)snakearray[0].y=0;
    if(snakearray[0].x===-1)snakearray[0].x=20;
    if(snakearray[0].y===-1)snakearray[0].y=20;

    //dispaly the snake
    board.innerHTML="";
    snakearray.forEach((e,index) => {
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        if(index===0){
            snakeelement.classList.add('head');
        }
        else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });
   // display the food
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}
window.requestAnimationFrame(main);
//main logic start here
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:0};
    switch(e.key){
        case"ArrowUp":
        inputdir.x=0;
        inputdir.y=-1;
         break;
         case "ArrowDown":
         inputdir.x=0;
         inputdir.y=1;
         break;
         case "ArrowLeft":
         inputdir.x=-1;
         inputdir.y=0;
         break;
         case "ArrowRight":
         inputdir.x=1;
         inputdir.y=0;
         break;
         default:
         break;
    }
});