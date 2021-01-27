class Game{
    constructor(){
        //this.image = loadImage("images/Background 13.jpg");
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        stroke(230, 0, 145);
    fill(230, 0, 145);
    textFont("Fantasy");
    textSize(50);
    text("Collect 10 fruits to win the game!!",175,50);

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(index === player.index){
                stroke(102, 0, 120);
                fill(102, 0, 120);
                textSize(23);
                textFont("Tahoma");
                text(allPlayers[plr].name,x-52,y+25);
                textSize(25);
                stroke(249, 81, 81);
                fill(249, 81, 81);
                text("Player 1 :" +allPlayers.player1.score,40,50);
                text("Player 2 :" + allPlayers.player2.score, 40, 100);
            }
          
        }
        

        // Give movements for the players using arrow keys

        if(keyDown("right") && player.index !== null){
            player.distance-=30
            player.update();
        }
        if(keyDown("left") && player.index !== null){
            player.distance+=30
            player.update();
        }

        // Create and spawn fruits randomly

        if(frameCount % 20 === 0){
            var fruit = createSprite(random(100,900),0);
            fruit.velocityY = 12;
            switch(Math.round(random(1,5))){
                case 1: fruit.addImage(fruit1_img)
                break;
                case 2: fruit.addImage(fruit2_img)
                break;
                case 3: fruit.addImage(fruit3_img)
                break;
                case 4: fruit.addImage(fruit4_img)
                break;
                case 5: fruit.addImage(fruit5_img)
                break;
            }
            fruitGroup.add(fruit);
            fruit.lifetime=47;
        }
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    player.score =player.score+1;
                    player.update();
                    
                }
            }
        }

        if(player.score >= 10){
            gameState = 2
        }
        
    }

    end(){
       image(bgimg,0, 0, 1000, 600);
       textFont("Cursive")
       stroke(212,175,55)
       fill(212,175,55);
       textSize(100);
       text("G A M E   O V E R", 75,300);
       Player.getPlayerInfo();
       console.log(allPlayers)
       textSize(80);
       stroke(73, 181, 221);
       fill(73, 181, 221);
       if(allPlayers.player1.score>allPlayers.player2.score){
           text("Winner is: "+allPlayers.player1.name, 65,450)
       } else {
        text("Winner is: "+allPlayers.player2.name, 65,450)
       }
    }
}