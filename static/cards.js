window.onload=function()
{
	$('#player').hide();

	var createDeck = function() 
	{
	// based on code from http://www.brainjar.com/js/cards/default2.asp
	  var ranks = ["J", "D", "F"];
	  var suits = ["P", "I", "R", "A","T","E"];
	  var j, k, index=0;
	  var pack_size;

	  // Set array of cards.
	  // total number of cards
	  pack_size = 2*(ranks.length * suits.length);
	  var cards = [];
	  

	  // Fill the array with 'n' packs of cards.
	  while (index < pack_size)
	  {
	    for (j = 0; j < suits.length; j++)
	    {
	       for (k = 0; k < ranks.length; k++)
	       {
		  		//console.log("k:",k,"index:",index);
		  		cards[index] = {rank:ranks[k], suite:suits[j]};
		  		index++;
		}
	     }
	   }
	  //console.log(cards.length);
	  return cards;
	}


//shuffle cards
	var shuffle= function(n) 
	{
	  var i, j, k;
	  var temp;

	  // Shuffle the stack 'n' times.
	  this.cards=createDeck();
	  for (i = 0; i < n; i++)
	  {
	    for (j = 0; j < this.cards.length; j++) 
	     {
	      k = Math.floor(Math.random() * this.cards.length);
	      temp = this.cards[j];
	      this.cards[j] = this.cards[k];
	      this.cards[k] = temp;
	    }
	  }
	  return this.cards	
	}



	var showCards = function(cardJSON) 
	{	
		var sym
		if (cardJSON.suite=="P")
		{
			sym="\u2694";
		
		}
		if (cardJSON.suite=="I")
		{
			sym="\u265E";
		}
		if (cardJSON.suite=="R")
		{
			sym="\u2654";  
		}
		if (cardJSON.suite=="A")
		{
			sym="\uE023";
		}
		if (cardJSON.suite=="T")
		{
			sym="\u2693";
		}
		if (cardJSON.suite=="E")
		{
			sym="\u2388";
		}
		flip = document.createElement("div");
		flip.className='flip';
		document.querySelector(".sideBox").appendChild(flip);

		txt = cardJSON.rank + sym;    
		card = document.createElement("div");
		card.textContent = txt;
		card.className = "card";
		
		document.querySelector(".flip").appendChild(card);

		console.log(card);			
	}


	
	var showDeck = function(deck)
	{
	    var idx;
	    for (idx = 0; idx < deck.length; ++idx)
	   {
		    //console.log("Creating your deck....",deck[idx]);
		    showCards(deck[idx]);		    
	    }
	}



	var prelim = function()
	{
		num=players();
		//username=document.getElementById("player").elements["username"];
		if (num==2)
		{	
			players=duo();
		}
		else
		{
			players=solo();
		}
			
		$('#start').hide();
		
		$('#deck').show();
		document.getElementById('sign').innerHTML =player;
		$('#start').show();
		startGame();
	}

	

	var gameScreen = function()
	{
		var go= document.getElementById('go');
		
		go.parentNode.removeChild(go);

		var head= document.getElementById('heading');
		head.parentNode.removeChild(heading);
		
		var start= document.getElementById('start');
		//start.parentNode.removeChild(start);
		start.style.cssFloat="right";
		start.style.fontSize='5px';

		var JDF= document.getElementById('JDF');
		JDF.parentNode.removeChild(JDF);
		
		//$("#save").find('.start').addClass('save')
	
	}
	
	var arrangeCards = function()
	{
		var deck = document.getElementById('deck');
		size=deck.children.length;

		for (i=0; i<size; i++)
		{
			document.getElementsByClassName("card")[i].id="card"+i;
		}

		for (x=0; x<size; x++)
		{
			var c= document.getElementById("card"+x);	
			document.getElementsByClassName("flip")[x].appendChild(c);
		}
		
		for (j=0; j<size; j++)
		{
			var back= document.createElement("div");
			back.className = "face back";			
			var front= document.createElement("div");
			front.className = "face front";	


			document.getElementById("card"+j).appendChild(back);
			document.getElementById("card"+j).appendChild(front);
			
		}
	}
	
	var players=function()
	{
		
		document.getElementById('multi').onclick=prelim;
		return 2;
		
		
	}
	var duo=function()
	{
		
		p1 = window.prompt('Player1:'); 
		localStorage["player1"]= p1.toString();
		
		p2 = window.prompt('Player2:');
		localStorage["player2"]= p2.toString();

		players=[p1,p2];
		return 	players	
	}
	var solo=function()
	{
		p1 = window.prompt('Player1:'); 
		localStorage["player1"]= p1.toString();
		
		player=[p1];
		return player;		
	}
	
	var startGame = function()
	{	
			
		gameScreen();
		
		arrangeCards();
		$('#save').show();
		
		var play=true;
		var clk=0;
		var stk=[];

		$('#start').hide();
		cardClick(clk, stk);
		
			
		
	}
        
	var cardClick = function(clk, stk)
	{	
		$('.card').click(function()
		{
			
			
			var flip=document.getElementById('flipsound');
			flip.play();
		
			clk++;			
			card=$(this);
			
			turns= Math.floor(clk/2);
			console.log(turns);
			if (turns<=24)
			{
				localStorage["turns"]= turns.toString() ;
			
				document.getElementById('turns').innerHTML =turns;
			
	    			card.addClass('flipped');
				playing(card, stk);	
			}
			else
			{
				turns=0;
				alert("GAMEOVER");
				$('#start').hide();
				startGame();
			}
			
			
			
			  		     
			
		});
		
		
		
	}

	var  playing = function(card, stk)
	{

		type=card[0].textContent;
		//id=card[0].id;
		e=card;
		stk.push({element:e,type:type});
		
		faces=[];
		if (stk.length>1)
		{
			x=stk[0].type;
			y=stk[1].type;
			faces.push(x);
			faces.push(y);
			

			//a=stk[0].id;
			//b=stk[1].id;
			
			if (paired(faces))
			{					
									
				//document.getElementById(a).addClass("matched");
				//document.getElementById(b).addClass("matched");

				stk[1].element.addClass("matched");
				stk[0].element.addClass("matched");

				var same=document.getElementById('match');
				same.play();
				
				faces.pop();
				faces.pop();	

			}
			else
			{	
				//document.getElementById("card1").addClass("flip");
				//document.getElementById("card2").addClass("flip");
				for (i=0;i<2;i++)
				{	
					stk[i].element.removeClass("flipped");
					
				}
				stk.pop();
				stk.pop();
			}

		}		
	}


	var paired = function(stk)
	{
		if (stk[0]==stk[1])
		{
			
			return true;	
		}
		else
		{
			return false;			
		}
	}

	var saveGame = function()
	{
		alert("Saving Game");
		var deck = $("deck").childNodes;
		//localStorage["game"]= deck.toString() ;
	}

	var deck = shuffle(40);
	var num=0;			//number of players
	$('#deck').hide();
	showDeck(deck);
	$('#save').hide();	
	
	document.getElementById('start').onclick=prelim;
	//event.preventDefault();
	document.getElementById('save').onclick=saveGame;
	
	 
}


