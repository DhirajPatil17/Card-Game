let start=document.querySelector('.Start');
let player=true;
let count=0;
let cardArray=[];
let parentArray=[];
let heading=document.querySelector('.heading');
let head=document.querySelector('h1');
let new_game=document.querySelector('.new_game');
// let sound=document.querySelector('.sound');
let outer_cards=document.body.querySelectorAll('.cards');
let inner_cards=document.querySelectorAll('.flip-card-inner')
let left_button=document.querySelector('.first button');
let right_button=document.querySelector('.third button');
let winner=document.querySelector('.winner');
let  middle=document.querySelector('.middle');
let score=document.querySelector('.top p')
let player1_score=0;
let player2_score=0;
let anchor=document.querySelectorAll('a');
let cards_removed=0;
let call_count=0;
right_button.classList.add('hide');
// winner.classList.add('hide');
// start.addEventListener("click",()=>
// {
//     window.location.href="file:///D:/Full%20Stack/Javascript/Card%20Matching%20Game/homepage.html";
// });


var audio=document.createElement('audio');
document.body.appendChild(audio);
function closeCards(card)
{
    setTimeout(() => {
        card.forEach((individual_cards)=>
        {
            individual_cards.classList.remove('flipped');
        })
        }, 1000);  
}
async function hidebutton(Player1,Player2)
{
    Player1.classList.add('hide');
    Player2.classList.remove('hide');

}
function matchCards(cardArray)
{
    if(cardArray[0]===cardArray[1])
    {
        return true;
    }
    else{
        return false;   
    }
}
function winning_operations()
{
    head.style.color='white';
    head.style.fontWeight="bold";
    var game_button=document.createElement('button');
    game_button.classList.add('new_game');
    game_button.innerText='New Game';
    heading.classList.add('winner');
    heading.appendChild(game_button);
    
    
}
function showWinner(player,player_score)
{
    // var winner_elmt=document.createElement('div');
    // winner_elmt.classList.add('winner');
    // var winner_button=document.createElement('button');
    // winner_button.classList.add('game_winner');
    // winner_elmt.appendChild(winner_button);
    // middle.appendChild(winner_elmt);
    if(player)
    {
    head.innerText=`Player 1 Wins with ${player_score} Score`;
        winning_operations();
        audio.src="sounds/applause.mp3";
        audio.play();
    }
    else
    {
    head.innerText=`Player 2 Wins with ${player_score} Score`;
        winning_operations();
        audio.src="sounds/applause.mp3";
        audio.play();

    }
    
}
function generate_winner(){
    if(player1_score>player2_score)
    {
        player=true;
        showWinner(player,player1_score);  

    }
    else if(player2_score>player1_score)
    {
        player=false
        showWinner(player,player2_score); 
    }
    else{
        console.log("Well Played Guys Match is Tied ")
    }
}
function updateScore(player)
{
    if(player){
        player1_score+=1;
        setTimeout(()=>
        {
            score.innerText=`${player1_score} : ${player2_score}`;
        },1000)
    }
    else{
        player2_score+=1;
        setTimeout(()=>
        {
            score.innerText=`${player1_score} : ${player2_score}`;
        },1000);
    }
}

function removeCards(parentArray)
{
    setTimeout(()=>
    {
        audio.src="sounds/vanishing.mp3"
        audio.play();
        for(let card of parentArray)
        {
            let getParent = card.parentNode;
            getParent.classList.add('fall');

        }
        cards_removed+=2;
        if(cards_removed==18) 
        {   
            left_button.classList.add('hide');
            generate_winner();
        

        }  
    },1000);
}

function enable_buttons(parentArray)
{

    for(let element of parentArray)
    {
        element.style.pointerEvents="all";
    }
}
function player_Chance(card)
{       
    if(removeCards==18)
    {
        return
    }
    else
    {
        if(card.style.pointerEvents=='none' || call_count>2)
        {
            return 
        }
        card.classList.add('flipped');
        audio.src="sounds/cardsound.mp3";
        audio.play();
        cardArray.push(card.lastElementChild.children[0].id);
        parentArray.push(card); 
        card.style.pointerEvents="none";

        count+=1;
        if(count==2)
        {
            if(matchCards(cardArray))
            {
                updateScore(player)
                enable_buttons(parentArray);
                removeCards(parentArray);
                
            
            }
            else{
                closeCards(parentArray);
                enable_buttons(parentArray);
                
            }

            if(player)
            {
                changeTurn(player)
                player=false;
            }
            else{
                changeTurn(player)
                player=true;
            }
            
            count=0;
            cardArray=[];
            parentArray=[];
            return cardArray
        }
    }

}
 function changeTurn(person)
{
    if(person){
        setTimeout(() => {
            hidebutton(left_button,right_button)
            call_count=0;
            }, 2000);
            
    }
    else{
        setTimeout(() => {
        hidebutton(right_button,left_button)
        call_count=0;
            }, 2500);
            
    }
}

inner_cards.forEach((card) => {
    card.addEventListener("click",function(){
        call_count+=1
      
        player_Chance(card,);
    });
});



