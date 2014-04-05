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
	  pack_size = ranks.length * suits.length;
	  var cards = [];
	  

	  // Fill the array with 'n' packs of cards.
	  while (index < pack_size){
	    for (j = 0; j < suits.length; j++){
	       for (k = 0; k < ranks.length; k++){
		  console.log("k:",k,"index:",index);
		  cards[index] = {rank:ranks[k], suite:suits[j]};
		  index++;
		  }
	       }
	    }
	  console.log(cards.length);
	  return cards;
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
		
		txt = cardJSON.rank + sym;    
		card = document.createElement("div");
		card.textContent = txt;

		card.className = "card";

		
		//var typ= document.createElement("p");
		//typ.innerHTML = txt;
		//document.getElementsByClassName("card").appendChild(typ);

		console.log(card);
		document.querySelector(".sideBox").appendChild(card);
		
		
	}

	var showDeck = function(deck)
	{
	    var idx;
	    for (idx = 0; idx < deck.length; ++idx)
	   {
		    console.log("Creating your deck",deck[idx]);
		    showCards(deck[idx]);
		    showCards(deck[idx]);
	    }
	}
	var startGame = function()
	{		
		gameScreen();
					

		var deck = document.getElementById('deck');
		size=deck.children.length;

		for (i=0; i<size; i++)
		{
			document.getElementsByClassName("card")[i].id=i;
		}
		
		for (j=0; j<size; j++)
		{
			var back= document.createElement("div");
			back.className = "back";			
			var front= document.createElement("div");
			front.className = "front";	
			
			document.getElementById(j).appendChild(back);
			document.getElementById(j).appendChild(front);
			
		}
		
		alert("24 Moves");

	}
	var gameScreen = function()
	{
		var go= document.getElementById('go');
		go.className = "";
		go.parentNode.removeChild(go);

		
	}

	var cardHover = function(deck)
	{
		var pairs= 2*deck;
		for (k = 0; k < pairs.length; k++)
		{
			img=document.getElementById(k);
		  	
			img.onmouseover=function()
			{
				var meow=document.getElementById('cattalk');
				meow.play();
			};

			img.onmouseout=function()
			{
				var meow=document.getElementById('cattalk');
				meow.pause();
			};
		}	
	}

	var deck = createDeck();

	//var pos=localStorage.getItem('catpos');
	cardHover(deck);
	showDeck(deck);
	document.getElementById('start').onclick=startGame;
	
	 
}

