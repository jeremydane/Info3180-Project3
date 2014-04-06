window.onload=function()
{

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
		  		console.log("k:",k,"index:",index);
		  		cards[index] = {rank:ranks[k], suite:suits[j]};
		  		index++;
		}
	     }
	   }
	  console.log(cards.length);
	  return cards;
	}


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
		//var typ= document.createElement("p");
		//typ.innerHTML = txt;
		//document.getElementsByClassName("card").appendChild(typ);

		document.querySelector(".flip").appendChild(card);

		console.log(card);

			
	}
	
	


	var showDeck = function(deck)
	{
	    var idx;
	    for (idx = 0; idx < deck.length; ++idx)
	   {
		    console.log("Creating your deck....",deck[idx]);
		    showCards(deck[idx]);
		    //showCards(deck[idx]);
	    }
	}

	var login = function()
	{
		//localStorage["username"]= user.toString();
		startGame();
	}

	var startGame = function()
	{	
		var click=0;	
		gameScreen();					

		arrangeCards();

		
		game= cardClick(click);
		if (game==false)
		{
			showDeck(deck);
		}
			
	}

	var gameScreen = function()
	{
		var go= document.getElementById('go');
		//go.className = "abc";
		go.parentNode.removeChild(go);

		var head= document.getElementById('heading');
		head.parentNode.removeChild(heading);
		
		var login= document.getElementById('login');
		login.parentNode.removeChild(login);

		var start= document.getElementById('start');
		//start.parentNode.removeChild(start);
		start.style.cssFloat="right";
		start.style.fontSize='5px';

		var JDF= document.getElementById('JDF');
		JDF.parentNode.removeChild(JDF);
		
		////var login= document.getElementById('login');
		//$( "#login" ).append( "User:" );

		$("#save").find('.start').addClass('save')
	
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

	
        
	var cardClick = function(clk)
	{
		$('.flip').click(function()
		{
			var game=true;
			//var clicks = [];
			clicks=0;
			var flip=document.getElementById('flipsound');
	 		flip.play();

			//card= $(this).find('.card');
			card=$(this).find('.card');
			localStorage["turns"]= clk.toString() ;
			
			clk=clk+1;			
			document.getElementById('turns').innerHTML =clk;

			
    			card.addClass('flipped');
			

			//this.id= type(card);
    			//clicks.push({id:card});
			click++;
			console.log("help",clicks);
			if (clicks.length >1)
			{
    				if (clicks[0].id=clicks[1].id)
				{
					clicks[0].addClass('matched');
					clicks[1].addClass('matched');
					clicks = [];
				}
				else
				{
					clicks[0].removeClass('flipped');
					clicks[1].removeClass('flipped');
					clicks = [];
				}

			}
			if (clk>=48)
			{
				alert("Game Over");
				game=false;
				
			}	
        		return game;
    		     
			
		});
	}

	var type = function(card)
	{
		return card.textContent;		
	}
	var saveGame = function()
	{
		alert("Saving Game");
		var deck = $("deck").childNodes;
	}

	var deck = shuffle(40);

	showDeck(deck);
	document.getElementById('start').onclick=login;
	document.getElementById('save').onclick=saveGame;
	
	 
}


