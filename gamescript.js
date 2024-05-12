window.addEventListener("load", function(){


    const screen = this.document.querySelector(".gamescreen");
    const ctx = screen.getContext("2d");
    screen.width= 1400;
    screen.height= 800;
    const slowerFrame = 5;
    let fasterFrame =0;
    const collision2d = [];
    for(let i =0;i < collision.length; i += 71){
        collision2d.push(collision.slice(i , i+71));
    }
    const collisionBlocks = []
   
    const gravity = 0.5;


    class Sprite{
        constructor({position , imageSrc}){
            this.position= position;
            this.image= new Image();
            this.image.src = imageSrc;
        }
        draw(){
            if(!this.image) return
            ctx.drawImage(this.image,this.position.x,this.position.y);
        }
        update(){
            this.draw();
        }
    }
    class CollisionBlock {
        constructor({position}){
            this.position= position;
            this.width=32;
            this.height=32;

        }
        draw(){
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        }
        update(){
            this.draw();
        }
    }
    collision2d.forEach((row) => {
        row.forEach((symbol) => {
            if(symbol == 3889){
                collisionBlocks.push(new CollisionBlock({position:{
                    x:0,
                    y:0
                }}))

            }
        })
    })


    class Player {
        constructor(swidth , sheight){
            this.image =document.getElementById("player1");
            this.spritewidth = swidth;
            this.spriteheight = sheight;
            this.width= this.spritewidth;
            this.height= this.spriteheight;
            this.position={
                 x : screen.width/2 - this.width /2 ,
                 y : screen.height/2 }
            this.minframe= 0;
            this.maxframe=5;
            this.framex= 0;
    
            this.velocity= {x:0 , y:1};
            
            
            
        }
        draw(context){
            context.drawImage(this.image,this.framex*this.spritewidth,0,this.spritewidth,this.spriteheight, this.position.x,this.position.y,this.width,this.height);
        }
        update(){
           
            if(fasterFrame%slowerFrame ==0){
                if(this.framex<this.maxframe){this.framex++;}
                else this.framex= 0;
            }
            fasterFrame++;
            this.position.x += this.velocity.x ;
            this.position.y += this.velocity.y;
            if(this.position.y+this.spriteheight + this.velocity.y < screen.height )
                {this.velocity.y += gravity;}
            else {this.velocity.y = 0;}
            player1.draw(ctx);
            
        }

    }
const background = new Sprite({
    position:{
        x: 0,
        y: 0,
    },
    imageSrc:"background.png"

})

const player1 = new Player(128,128);
function animate (){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,screen.width, screen.height);
    ctx.save();
    ctx.translate(0, -background.image.height + screen.height);
    background.update();
    ctx.restore();
    
    player1.update();
    
  
}
animate();
document.addEventListener("keydown",e=>{ 
    if(e.key== "ArrowUp" && player1.velocity.y== 0){ 
        player1.velocity.y = - 15;
        player1.image.src = "sprites/Fighter/Jump.png";
        
        
     };
    if(e.key== "ArrowRight"){ player1.velocity.x =3 ;
        player1.image.src = "sprites/Fighter/Run.png";
        
     };
    if(e.key== "ArrowLeft"){ player1.x = player1.velocity.x= -3 ;
            player1.image.src = "sprites/Fighter/Run_2.png";
        
    };
    if(e.key=="a"){player1.image.src = "sprites/Fighter/Attack_1.png";
        player1.maxframe=3;
    }
});
this.document.addEventListener("keyup", e=>{
    player1.image.src = "sprites/Fighter/Idle.png";
    player1.maxframe=5;
    player1.velocity.x= 0;
})



});
