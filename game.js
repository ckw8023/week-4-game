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
			$(this).attr("tmpUser",true);
			//initial the game status for user
			userChamp = $(this).attr("name");
			userHealth = $(this).attr("health");
			userAttck = $(this).attr("power");
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
		$(".status").empty();
		var isUser = $(this).attr("isUser");
		console.log("isUser: "+isUser);
		//execute when no defender have been picked
		if(!defenderPicked && numofEnemie > 0){
			//append the clicked box to defender div
			$(".defender").append($(this));
			$(this).addClass("defd");
			//initial the game status for defender
			defenderDied = false;
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
	$(".hidebtn").hide();
	$(".ashe").attr({name:"ashe",health:"10",power:"1",counter:"6",isUser:false});
	$(".lucian").attr({name:"lucian",health:"140",power:"8",counter:"7",isUser:false});
	$(".tristana").attr({name:"tristana",health:"160",power:"8.5",counter:"6",isUser:false});
	$(".vayne").attr({name:"vayne",health:"220",power:"10",counter:"7",isUser:false});
}
//Function for refresh the status of each champion's data
function dataRefresh(user,defender,userhealth,defenderhealth){
	$(".damage"+"#"+user).text(userhealth);
	$(".damage"+"#"+defender).text(defenderhealth);
}
//Function for refresh the game status
function gamestatusRefresh(defender,userpower,defenderpower,isdead){
	//refresh the game status div
	$(".status").empty();
	//add the game status
	var text1 = $("<p></p>").text("You attacked "+ defender +" for "+ userpower +" damage.");
	var text2 = $("<p></p>").text(defender+" attacked you back for " + defenderpower +" damage.");
	var text3 = $("<p></p>").text(defenderChamp+" has been slay pick a new Defender");
	if(!isdead){
		$(".status").append(text1,text2);
	}
	else{
		$(".status").append(text3);
	}
}
function gameRefresh(){
	setData()
}
//Function for button event (Actual gameing stage)
function attack(){
	$(".btn").on("click",function(){
		if(userPicked == true && defenderPicked == true && numofEnemie > 0){
			if(userHealth > 0 && defenderHealth > 0){
				//update health status for user and defender
				userHealth -= defenderCounter;
				defenderHealth -= userAttck;
				//update data and game status 
				dataRefresh(userChamp,defenderChamp,userHealth,defenderHealth);
				gamestatusRefresh(defenderChamp,userAttck,defenderCounter,defenderDied);
				//power up user
				userAttck *= 2;
			}
			if(defenderHealth <= 0 && userHealth > 0){
				//remove the defender when health below 0
				$("."+defenderChamp).remove();
				defenderDied = true;
				defenderPicked = false;
				numofEnemie--;
				gamestatusRefresh(defenderChamp,userAttck,defenderCounter,defenderDied);
				selectDef();
			}
			if(userHealth <= 0){
				$(".status").text("You been defeated...GAME OVER!!!");
				restart();
			}
			if(numofEnemie == 0){
				$(".status").text("You Win!!!");
				restart();
			}
		}

	})
}
//Function for restar the game
function restart(){
	$(".hidebtn").show();
	$(".hidebtn").on("click",function(){
		location.reload();	
	});
}
/*** Function running Area ***/
$(document).ready(function(){
	alert("Pick a champ to play!");
	setData();
	pickChar();
	attack();
});