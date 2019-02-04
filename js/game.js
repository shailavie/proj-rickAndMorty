// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
localStorage.setItem('bestTime', null);
localStorage.setItem('bestPlayer', null);
var gameTime = null;
var clicks = 0;
var moves = 0;
var isProcessing = false;
var allFlipped = false;
var userName = null;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 7;

// Load an audio file
var audioWin = new Audio('sound/iLike.mp3');
var audioWrong = new Audio('sound/burp.mp3');
var audioRight = new Audio('sound/yes.mp3');
var audioShowMe = new Audio('sound/showMe.mp3')
var audioLoser = new Audio('sound/disqualified.mp3')
var audioBurp = new Audio('sound/burp.mp3')
var cv = new File('')
    
    //Getting the player's name
    function getUserName() {     
            var userName = prompt("(erhp) alright, so whats your stupid name?", "");
            if (userName === "") {
                userName = "Stupid Morty"
                localStorage.setItem('userName', userName);
            } else {
                localStorage.setItem('userName', userName);
            }
            document.querySelector('.player').style.display = 'inline-block';
            document.getElementById("player").innerHTML = "Player : "+userName;

    }
        

    //Just a fun alert
    function rick(){
        audioBurp.play();
        var u = localStorage.userName;
        if (u === 'RICK'||u === 'rick'||u === 'Rick') {
            localStorage.setItem('userName', 'Rick C'+Math.round(Math.random()*1000));
            u = localStorage.userName;
            document.getElementById("player").innerHTML = "Player : "+u;
            alert('Oh look whose here? '+u);
        } else {
            if (u === 'MORTY'||u === 'morty'||u === 'Morty'||u ==='') {
            localStorage.setItem('userName', 'stupid morty');
            u = localStorage.userName;
            document.getElementById("player").innerHTML = "Player : "+u;
            alert('oh great, a morty..');
        } else {
            var U = u.toUpperCase()
            alert('ok.. *sigh*\nhere we go..\n\nAhem.\nhello '+u+'.\n\nno no\nHELLO '+U+'!\n\n\n\noh f%$k this!!\n\nlisten, ammm..?\n\n(erhp) '+u+'..\ndumb name..\n\nthis game is really simple, basically even a morty is theoretically able to play it.\nYou simply need to find all the pairs..as fast as you can.\n\n\nkapish?');
    }}}
    

    // This function is called whenever the user click a card
    function cardClicked(elCard) {
    clicks = clicks + 1;
    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    //Chcecks if it's the first click and if so, starts a clock
    if (clicks === 1) {
        var startTime =  Date.now();
        localStorage.setItem('startTime', startTime);
    }

    // Flip it
    if (isProcessing === false){
        elCard.classList.add('flipped');
    } else {return;}

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        isProcessing = true;
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 0.5 second
        if (card1 !== card2){
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                audioWrong.play();
                moves = moves + 1;
                isProcessing = false;
            }, 500)

        } else {
            // Yes! a match!
            setTimeout(function () {
                flippedCouplesCount++;
                elPreviousCard = null;
                audioRight.play();
                moves = moves + 1;
                isProcessing = false;
            },500)

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) 
            {
                setTimeout(() => {
                    
                    var a = localStorage.getItem('startTime');
                    var endTime =  Date.now();
                    var gameTime = Math.round((endTime-a)/1000);
                    localStorage.setItem('gameTime', gameTime);
                    setTimeout(() => {
                        winGif();
                    }, 350);
                    alert("Total time: " +gameTime+" seconds, and "+moves+" steps. Good job!");
                    
                    //Check if record time is broken
                    var b = localStorage.getItem('bestTime');
                    var g = localStorage.getItem('gameTime');
                    if (b === null)
                       b=g;
                    else  {
                        if (g < b)
                        {
                            b = g;
                            u = localStorage.getItem('userName');
                            localStorage.setItem('bestTime', b);
                            localStorage.setItem('bestPlayer', u);
                            alert('Woah...'+u+", "+b+' seconds. This is a new World Record!\nYou are like a god!');
                            alert('no seriously, youre the man!');
                            document.getElementById("time").innerHTML = "New Record : " +b+" seconds";
                            document.querySelector('.bestTime').style.display = 'block';
                            alert('Here, see?\n\nover on right side, your time. You rock!');
                            document.getElementById("bestPlayer").innerHTML = "Best player : " +u;
                            document.querySelector('.bestPlayer').style.display = 'block';
                            alert('oh!, and here is your name - '+u+'..\nkinda have a ring to it, dont you think?');
                        } 
                    }
                    document.querySelector('.resetButton').style.display = 'inline-block';
                }, 200);
            }
        }
    }
}

//Hides the Start button and shows the main board
function showBoard(){
    document.getElementById('mainBoard').style.display = "block";
    document.getElementById('mainBoard').style.margin = "20px auto";
    document.getElementById('start').style.display = "none";
}

//Displays the "Show me what you got!" gif & sound. Disappears after 5s.
function showMe2(){
    setTimeout(function (){
        audioShowMe.play();
    },500)
}

//Displays the "Show me what you got!" gif & sound. Disappears after 5s.
function showMe() {
    document.getElementById('show').style.display = "block";
    audioShowMe.play();
    setTimeout(() => {
        document.getElementById('show').style.display = "none";
    }, 2000);
    showBoard();
    shuffle();
}

//Displays the "Good Job!" gif & sound. Disappears after 5s.
function winGif() {
        document.getElementById('iLike').style.display = "block";
        audioWin.play();
        setTimeout(() => {
            document.getElementById('iLike').style.display = "none";
        }, 5000);
}

//Displays the disqualify gif & sound. Disappears after 5s.
function loserGif() {
    document.getElementById('disqualified').style.display = "block";
    audioLoser.play();
    setTimeout(() => {
        document.getElementById('disqualified').style.display = "none";
    }, 5000);
}

//Change current player name
function changeUser(){
    var userName = prompt("(erhp) ok, so whats your stupid name?", "");
    localStorage.setItem('userName', userName);
    document.querySelector('.player').style.display = 'inline-block';
    document.getElementById("player").innerHTML = "Player : "+userName;
}


//Flip back and shuffle all cards
function resetGame(){
    var divs = document.getElementsByClassName('card'); 
    var i;
        for (i = 0; i < divs.length; ++i) 
        {
            divs[i].classList.remove('flipped');
        }
        //Reseting game parameters
        elPreviousCard = null;
        flippedCouplesCount = 0;
        gameTime = null;
        clicks = 0;
        moves = 0;
        isProcessing = false;
        document.querySelector('.resetButton').style.display = 'none';
        localStorage.setItem('startTime', null);
        shuffle();
    
}

//Shuffle all cards. Keeps flipped cards visible
 function shuffle(){
    //var board = document.getElementsByClassName('card');
    var board = document.querySelector('.board');
    var i;
    for (i = board.children.length; i >= 0; i--) {
     board.appendChild(board.children[Math.random() * i | 0]);
    }
 }

 //Flip all cards. Cheater..
 function flipAll(){
    if (allFlipped === false) 
    {
        var divs = document.getElementsByClassName('card'); 
        var i;
        for (i = 0; i < divs.length; ++i) 
        {
            divs[i].classList.add('flipped');
        }
        allFlipped = true;
    } else {
        var divs = document.getElementsByClassName('card'); 
        var i;
        for (i = 0; i < divs.length; ++i) 
        {
            divs[i].classList.remove('flipped');
        }
        allFlipped = false;
    }
 }

