// Store the computers generated sequence in a String
var generator ="";
//Initialise all variables
var play = false;//whether we can play a game
var current = 0;//Keeps track of current Round;
var multiplier = 1;//Speeds up intervals within rounds
var click = 0;//records users latest click
var userInput = "";//Stores Users input Sequence
var userClick = false;//Allows user to click
var display = "00"//alters dispay of current and high Score
var high = 0;//stores highScore
var onTime = false;//checks if more than 5 seconds has occured between signals
var length = 0;//records length of userInput String

// Declaring the start function. This Function initiates the game.
async function Start(){
	document.getElementById("Current").innerHTML= "00";//reset display
	play = true;//let program know that game has begun
	document.getElementsByClassName("light")[0].style.background = 'green';// Set Game Light Green
	await sleep(1750);//Initially wait 1.75 Seconds

	do{//Initiates the game, and will loop while game is active

		// Before each round, wait 1.25 seconds, this allows a total of 3 seconds since light turns green to play the game.
		// Plus an 1.25 seconds at the beginning of each other round
		await sleep(1250);

		// generate a number between 0 and 3 to generate next Light to blink
	 var randomColor = Math.floor((Math.random()*400))%4;
	 generator +=randomColor;//add generated light blink to string to keep track

		 //Increases the speed for Rounds: 5, 9, 13
		 if(current+1==5){
			 multiplier= 1-(1*0.1);//if round 5
		 }
		 else if(current+1==9){
			 multiplier= 1-(2*0.1);//if round 9
		 }
		 else if(current+1==13){
			 multiplier= 1-(3*0.1);//if round 13
		 }

		// Computer "Blinks" its lights, informing user od series of moves to do.
		for(let i = 0; i < generator.length;i++){
			//Blink through lights, by casting the lights position to an int
			var flash = parseInt(generator.substring(i,i+1));

			//blink and sleep
			await Blink(flash,600*multiplier);//calls to blink certain light a specific time
			await sleep(450*multiplier);//sleeps for an interval inbetween blinks
		}
		console.log(multiplier);//Prints current multiplier to the screen


		userClick = true;//User can now input
		while(userInput.length != generator.length){//loops continuously until string is same length as generated sequence
			onTime = false//sets false to check if user inputs within 5 seconds between signals
			length = userInput.length;//records length of current user input
			for(let i = 0; i < 100;i++){//loop will check for new user input every 50 milliseconds, if it takes longer than
																	// 5 seconds then will break and end game
				if(userInput.length > length){
					onTime = true;//if another input, breaks out of mini checker loop
					break;
				}
				await sleep(50);//sleeps 50 milliseconds
				console.log(i);//displays every 50 milliseconds
			}
			if(userInput.charAt(userInput.length-1)!=generator.charAt(userInput.length-1)){//compares latest click to the generated string
				play = false;//if not the same, user inputted incorrectl, breaks and ends game
				console.log("wrong Input");//prints to console wrong input
				break;//breaks
			}
			if(onTime == false){//if onTime is false, then user took longer than 5 seconds to respond so the game ends.
				play = false;//ends game
				console.log("Waited longer than 5 seconds");//prints to console
				break;
			}
		}

		if(play==false){
			break;//if play is false, game is over so break.
		}
		userClick=false;//stops recording user's input
		userInput = "";//reset User Sequence
		current++;//increment round

		display = (current<=9)?"0"+current:current;	// Update display
		document.getElementById("Current").innerHTML= display;//Writes current score to the right

	}while(play==true);//loops while the game is in progress

for(let i = 0;i<5;i++){//flash lights 5 times when you lose
	document.getElementsByClassName("Green")[0].style.background = 'green';
	document.getElementsByClassName("Red")[0].style.background = 'red';
	document.getElementsByClassName("Yellow")[0].style.background = 'orange';
	document.getElementsByClassName("Blue")[0].style.background = 'blue';
	await sleep(200);
	document.getElementsByClassName("Green")[0].style.background = '#86FF60';
	document.getElementsByClassName("Red")[0].style.background = '#FF6460';
	document.getElementsByClassName("Yellow")[0].style.background = '#FFF16E';
	document.getElementsByClassName("Blue")[0].style.background = '#0095FF';
	await sleep(200);

}
// reset the game, keep the high score, if current > high, set new highScore
	document.getElementsByClassName("light")[0].style.background = 'red';//tyrns light red
	multiplier = 1;//resets multiplier
	generator = "";//Resets Generated Sequence
	userInput = "";//Resets User Sequence
	userClick = false;//doesnt allow user input to be recorded.

	high = parseInt(document.getElementById("High").innerHTML);//get current highscore
	if(current > high){//if current scor is greater than high score, set highscore
		high = current;

		display = (high<=9)?"0"+high:high;//decides how the number is presented
		document.getElementById("High").innerHTML= display;//displays high score.
	}

	current = 0;//current round reset


}

async function Blink(flash,time){//This function flashes a certain light on a specific interval
	if(userClick==true){//if user input is on, this records the user's clicks
			userInput +=flash;//increment by one
		}
	if(flash==0){//flash green
			document.getElementsByClassName("Green")[0].style.background = 'green';
			await sleep(time);
			document.getElementsByClassName("Green")[0].style.background = '#86FF60';
	}
	else if(flash==1){//flash red
		document.getElementsByClassName("Red")[0].style.background = '#CE2300';
		await sleep(time);
		document.getElementsByClassName("Red")[0].style.background = '#FF6460';
	}
	else if(flash==2){//flash yellow
		document.getElementsByClassName("Yellow")[0].style.background = 'orange';
		await sleep(time);
		document.getElementsByClassName("Yellow")[0].style.background = '#FFF16E';
	}
	else if(flash==3){//flash blue
		document.getElementsByClassName("Blue")[0].style.background = 'blue';
		await sleep(time);
		document.getElementsByClassName("Blue")[0].style.background = '#0095FF';
	}
}

function sleep(ms) {//funtion is called to "sleep" the program
  return new Promise(resolve => setTimeout(resolve, ms));
}
