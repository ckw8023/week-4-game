/*** Globel variable declaration ***/
var champ = $(".select div");
var userPicked = false;
var defenderPicked = false;
var defenderDied = false;
var userChamp = "";
var defenderChamp = "";
var userHealth = 0;
var userAttck = 0;
var defenderHealth = 0;
var defenderCounter = 0;
var numofEnemie = 3;
/*** Function declaration ***/
//Function for character picking stage
function pickChar(){
	$(".ashe, .lucian, .tristana, .vayne").on("click",function(){
		//execute when user haven't pick any champion
		if(!userPicked){
			//replace the content under userchamp div with who ever been clicked
			$(".userchmp").replaceWith($(this));
			$(this).addClass("tmpUser");
			//initial the game status for user
			userChamp = $(this).attr("name");
			userHealth = $(this).attr("health");
			userAttck = $(this).attr("power");
			console.log("userHeal is: " + userHealth);
			console.log("userAttck is: " + userAttck);
			//append the rest of champion to the enemie div
			for(var i = 0; i < champ.length;i++){
				if(i % 3 == 0 && champ[i] != this){
					$(".enemie").append($(champ[i]));
					$(champ[i]).addClass("tmpEnemie");
				}
			}
		}
		userPicked = true;
		//pick defender after select a champion
		selectDef();
	});
}
//Function for pick defender
function selectDef(){
	$(".ashe, .lucian, .tristana, .vayne").on("click",function(){
		//execute when no defender have been picked
		if(!defenderPicked){
			//append the clicked box to defender div
			$(".defender").append($(this));
			$(this).addClass("defd");
			//initial the game status for defender
			defenderChamp = $(this).attr("name");
			defenderHealth = $(this).attr("health");
			defenderCounter = $(this).attr("counter");
			console.log("defenderHealth is: " + defenderHealth);
			console.log("defenderCounter is: " + defenderCounter);
		}
		defenderPicked = true;
	});
}
//Function for setting data for each champion
function setData(){
	$(".ashe").attr({name:"ashe",health:"120",power:"6",counter:"6"});
	$(".lucian").attr({name:"lucian",health:"140",power:"8",counter:"7"});
	$(".tristana").attr({name:"tristana",health:"160",power:"8.5",counter:"6"});
	$(".vayne").attr({name:"vayne",health:"220",power:"10",counter:"7"});
}
//Function for refresh the status of each champion's data
function dataRefresh(user,defender,userhealth,defenderhealth){
	$(".damage"+"#"+user).text(userhealth);
	$(".damage"+"#"+defender).text(defenderhealth);
}
//Function for refresh the game status
function gamestatusRefresh(defender,userpower,defenderpower){
	//refresh the game status div
	$(".status").empty();
	//add the game status
	var text1 = $("<p></p>").text("You attacked "+ defender +" for "+ userpower +" damage.");
	var text2 = $("<p></p>").text(defender+" attacked you back for " + defenderpower +" damage.");
	$(".status").append(text1,text2);
}
function gameRefresh(){
	setData()
}
//Function for button event (Actual gameing stage)
function attack(){
	$(".btn").on("click",function(){
		if(userPicked == true && defenderPicked == true){
			if(userHealth > 0 && defenderHealth > 0){
				//update health status for user and defender
				userHealth -= defenderCounter;
				defenderHealth -= userAttck;
				//update data and game status 
				dataRefresh(userChamp,defenderChamp,userHealth,defenderHealth);
				gamestatusRefresh(defenderChamp,userAttck,defenderCounter);
				//power up user
				userAttck *= 2;
			}
			if(defenderHealth <= 0){
				//remove the defender when health below 0
				$("."+defenderChamp).remove();
				defederDied = true;
				defenderPicked = false;
				numofEnemie--;
				//$(".status").replaceWith(defenderChamp+" has been slay pick a new Defender");
				selectDef();
			}
			if(numofEnemie == 0){
				alert("You win!");
			}
		}

	})
}
/*** Game Area ***/
$(document).ready(function(){
	setData();
	alert("Pick a champ to play!");
	pickChar();
	attack();
});