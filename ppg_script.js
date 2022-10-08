{
    let ball = document.getElementById("ball");
    let button = document.getElementById("button");
    let bar1 = document.getElementById("bar1");
    let bar2 = document.getElementById("bar2");
    let score = document.getElementById("current-score");
    let highScorerEntryBox = document.getElementById("high-score-input");
    let highScoreName = document.getElementById("name-for-input");
    let highScoreSubmitButton = document.getElementById("name-button");
    let xInitial = ball.getBoundingClientRect().x;  //initial x coordinate of ball
    let yInitial = ball.getBoundingClientRect().y; // initial y coordinate of ball
    let x = 0; //coordinate for x translation
    let y = 0; // coordinate for y translation
    let xPositive ; // to know x direction
    let yPositive ; // to know y direction
    let randomForXDirection = parseFloat(Math.random());
    let randomForYDirection = parseFloat(Math.random());
    if(randomForXDirection <= 0.5)xPositive = true;      //random function to decide initial x direction of ball
    else xPositive = false;
    if(randomForYDirection <= 0.5)yPositive = true;      //random function to decide initial y direction of ball
    else yPositive = false;
    let interval;
    let barChange = 10;
    let currentScore = 0;
    
    
    let level = .5;     //to increase level
    //to start the game or level up the game
    button.addEventListener("click", clickEvent);
    
    function clickEvent(){
        clearInterval(interval);
         interval = setInterval(move, 5);
         level += .5;
        // console.log("set interval working");
    }
    
    
    //for movements of ball 
    function move(){
        // console.log("move function working");
    
        //condition for game over
        let bar1Coordinates = bar1.getBoundingClientRect();
        let bar2Coordinates = bar2.getBoundingClientRect();
        let ballCoordinates = ball.getBoundingClientRect();
        if((ballCoordinates.left > bar1Coordinates.right || ballCoordinates.right < bar1Coordinates.left) && ballCoordinates.top <= 0){
            // alert("game over");
            clearInterval(interval);
            checkScore();   //function to check and change highscore and name
            restart();  //function to restart the game after game over
            // return;
        }
        if((ballCoordinates.left > bar2Coordinates.right || ballCoordinates.right < bar2Coordinates.left) && ballCoordinates.y + 60 >= window.innerHeight){       
            // alert("game over");
            clearInterval(interval);
            checkScore();   //function to check and change highscore and name
            restart();  //function to restart the game after the game is over
            // return;
        }
    
    
    
    
    
    
    
        if(xPositive){
            x += level;
            if(window.innerWidth <= xInitial + x + 60) xPositive = false;
        }else{
            x -= level;
            if(0 >= xInitial + x) xPositive = true;
        }
    
        //when the ball will hit the puck, it will not touch the ground, rather it will touch the puck and rebound
        let hitOnBar1 = 0
        if((ballCoordinates.left > bar1Coordinates.left && ballCoordinates.right < bar1Coordinates.right) && ballCoordinates.top <= 0 + 20){
            hitOnBar1 = 20;
        }
        let hitOnBar2 = 0;
        if((ballCoordinates.left > bar2Coordinates.left && ballCoordinates.right < bar2Coordinates.right) && ballCoordinates.y + 60 >= window.innerHeight-20){
            hitOnBar2 = 10;
        }
    
        if(yPositive){
            y += level;
            if(window.innerHeight - hitOnBar2 <= yInitial + y + 60) {
                yPositive = false;
                currentScore++;
                if(currentScore % 5 == 0 && currentScore != 0){
                    clickEvent();               //increasing level after every 5 points
                }
            }
        }else{
            y -= level;
            if(0 + hitOnBar1 >= yInitial + y) {
                yPositive = true;
                currentScore++;
                if(currentScore % 5 == 0 && currentScore != 0){
                    clickEvent();               //increasing level after every 5 points
                }
            }
        }
        score.innerText = currentScore; //setting current score after every change in y direction
        ball.style.transform = "translate(" + x + "px," + y + "px)";
        
    }
    
    
    
    
    
    //movement of bars
    let barX = 0;
    window.addEventListener("keydown", function(event){ 
        let key = event.keyCode;
        if(key == 39){
            barX += (barChange + level*2);
            if(bar1.getBoundingClientRect().right >= window.innerWidth - 10 - level*2){
                barX -= (barChange + level*2);
            }
        }else if(key == 37){
            barX -= (barChange + level*2);
            if(bar1.getBoundingClientRect().left < 0){
                barX += (barChange + level*2);
            }
        }
        bar1.style.transform = "translate("+ barX + "px, 0px)";
        bar2.style.transform = "translate("+ barX + "px, 0px)";
    });


    //left right button icons
    let leftButtonIcon = document.getElementById("left-button-icon");
    // leftButtonIcon.addEventListener("touchstart", function(){
    //     barX -= (barChange + level*2);
    //     if(bar1.getBoundingClientRect().left < 0){
    //         barX += (barChange + level*2);
    //     }
    //     bar1.style.transform = "translate("+ barX + "px, 0px)";
    //     bar2.style.transform = "translate("+ barX + "px, 0px)";
    // })
    let leftActivate = false;
    let idLeft;
    leftButtonIcon.addEventListener("touchstart", function(){
        leftActivate = true;
        leftButtonIcon.style.color = "gray";
        idLeft = setInterval(moveLeftByLeftButton, 30);
    });
    leftButtonIcon.addEventListener("touchend", function(){
        leftButtonIcon.style.color = "black";
        leftActivate = false;
    });
    // leftButtonIcon.addEventListener("mouseout", function(){
    //     leftActivate = false;
    // });

    function moveLeftByLeftButton(){
        barX -= (barChange + level*2);
        if(bar1.getBoundingClientRect().left < 0){
            barX += (barChange + level*2);
        }
        bar1.style.transform = "translate("+ barX + "px, 0px)";
        bar2.style.transform = "translate("+ barX + "px, 0px)";
        if(!leftActivate){
            clearInterval(idLeft);
            return;
        }
    }
    
    let idRight;
    let rightButtonIcon = document.getElementById("right-button-icon");
    // rightButtonIcon.addEventListener("touchstart", function(){
    //     barX += (barChange + level*2);
    //     if(bar1.getBoundingClientRect().right >= window.innerWidth - 10 - level*2){
    //         barX -= (barChange + level*2);
    //     }
    //     bar1.style.transform = "translate("+ barX + "px, 0px)";
    //     bar2.style.transform = "translate("+ barX + "px, 0px)";
    // })
    let rightActivate = false;
    rightButtonIcon.addEventListener("touchstart", function(){
        rightActivate = true;
        rightButtonIcon.style.color = "gray";
        idRight = setInterval(moveRightByRightButton, 30);
    });
    // rightButtonIcon.addEventListener("mouseup", function(){
    //     rightActivate = false;
    // });
    rightButtonIcon.addEventListener("touchend", function(){
        rightButtonIcon.style.color = "black";
        rightActivate = false;
    });

    function moveRightByRightButton(){
        barX += (barChange + level*2);
        if(bar1.getBoundingClientRect().right >= window.innerWidth - 10 - level*2){
            barX -= (barChange + level*2);
        }
        bar1.style.transform = "translate("+ barX + "px, 0px)";
        bar2.style.transform = "translate("+ barX + "px, 0px)";
        if(!rightActivate){
            clearInterval(idRight);
            return;
        }
    }
    
    
    
    //function to check and change highscore
    function checkScore(){
        let highScore = parseInt(document.getElementById("high-score").innerText);    
        //condition for high score
        if(highScore < currentScore){
    
            //setting name
            highScorerEntryBox.style.height = "50%";
            highScorerEntryBox.style.width = "50%";
    
            highScoreSubmitButton.addEventListener("click", function(){
                let name = highScoreName.value ;
                console.log(name);
                document.getElementById("name").innerText = name;
                highScorerEntryBox.style.height = "0%";
                highScorerEntryBox.style.width = "0%";
                // highScorerEntryBox.style.border = "0px solid transparent";
    
            });
    
            //setting high score
            document.getElementById("high-score").innerText = currentScore;
        }else{
            alert("game over");
        }
    }
    
    
    
    
    
    //function to restart the game after game over
    function restart(){
        currentScore = 0;   //reset current score to 0
        barX = 0;   //reset positon of pucks
        x= 0;   //reset position of ball
        y = 0;  //reset position of ball
        level = 0.5;    //reset speed of ball
    }  
    
    
    
    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
