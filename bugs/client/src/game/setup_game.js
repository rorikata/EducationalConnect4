$(document).ready(function() {

  var wrong = [''];
  var userId = '';

  var player_1 = {

  	"mark_color" : "blue",

  	"data_name" : "Player 1",

  	"wins" : 0

  };

  var player_1_moves = [];


  var player_2 = {

  	"mark_color" : "blue",

  	"data_name" : "Player 2",

  	"wins" : 0

  };


  var player_2_moves = [];

  var num_of_players = 0;


  var player = {

  	"data_name" : "Player",

  	"wins" : 0

  };

  var player_moves = [];


  var computer = {

  		"data_name" : "Computer",

  		"wins" : 0

  };

  var computer_moves = [];


  var winner = false;


  var moves = 0;


  var diagonal_win = [

  	[14, 22, 30, 38],
  	[7, 15, 23, 31],
  	[15, 23, 31, 39],
  	[0, 8, 16, 24],
  	[8, 16, 24, 32],
  	[16, 24, 32, 40],
  	[1, 9, 17, 25],
  	[9, 17, 25, 33],
  	[17, 25, 33, 41],
  	[2, 10, 18, 26],
  	[10, 18, 26, 34],
  	[3, 11, 19, 27],
  	[3, 9, 15, 21],
  	[4, 10, 16, 22],
  	[10, 16, 22, 28],
  	[5, 11, 17, 23],
  	[11, 17, 23, 29],
  	[17, 23, 29, 35],
  	[6, 12, 18, 24],
  	[12, 18, 24, 30],
  	[18, 24, 30, 36],
  	[13, 19, 25, 31],
  	[19, 25, 31, 37],
  	[20, 26, 32, 38]

  ];


  var $two_players_btn = $("#two-players-btn");

  var $one_player_btn = $("#one-player-btn");

  var $question = $("#question");

  var $buttons_row_1_child = $(".buttons-row :first-child");

  var $pick_color = $("#pick-color");

  var $red_btn = $("#red-btn");

  var $blue_btn = $("#blue-btn");

  var $row = $(".row");

  var $circles = $(".circle");

  var $buttons_row = $(".buttons-row");



 	function start_game () {

  		$two_players_btn.click(function () {

 			$two_players_btn.remove();
 			$one_player_btn.remove();

 			$question.html("What are your names?");
 			//two_players ();
        one_player ();

 		});


   		$one_player_btn.click(function () {

 			$two_players_btn.remove();
 			$one_player_btn.remove();
 			$question.html("What is your name?");
 			one_player ();
      two_players ();

 		});

 	}


 	function two_players () {

 		$question.css("margin", "30px 0");
 		$buttons_row_1_child.after("<button id = 'submit' style = 'width: 290px; margin: 10px 0 30px 0;'>Here're Our Names</button>").after("<input id = 'player-1' style = 'display: block;' placeholder='Player 1 First Name'</input>" + "<input id = 'player-2' style = 'display: block;' placeholder='Player 2 First Name'</input>");

 		$("#submit").click(function() {

 			$question.remove();
 			$("input").css("display", "none");
 			$("#submit").remove();

 			$pick_color.html(

 				"Hello, " + $("#player-1").val() + " and " + $("#player-2").val() + "! " + "</br></br>" +
 				$("#player-1").val() + " is <span style='color: #4189C7;'>Blue</span>, and " + $("#player-2").val() + " is <span style='color: #C73D47;'>Red</span>.</br>" +
 				$("#player-1").val() + ", go first!"

 				);
	 		$pick_color.css("display", "block");
	 		$pick_color.css("margin", "25px 0");
	 		num_of_players = 2;
	 		make_board ();
 		});
 	}


 	function one_player () {

 		$buttons_row_1_child.after("<button id = 'submit'>Here's My Name</button>").after("<input placeholder='First Name'</input>");

 		$("#submit").click(function() {

 			$question.remove();
 			$("input").css("display", "none");
 			$("#submit").remove();

 			$pick_color.html("Hello, " + $("input").val() + "! " + "Are you feeling Hot or Cool?")

	 		$pick_color.css("display", "block");
	 		$pick_color.css("margin", "25px 0");

	 		$red_btn.css("display", "initial");
	 		$blue_btn.css("display", "initial");

 		});

 		$red_btn.click(function () {

 			$blue_btn.remove();
 			$red_btn.remove();

 			player.mark_color = "red";
 			computer.mark_color = "blue";

 			$("h2").html("You are <span style='color: #C73D47;'>Red</span>.");

 			make_board ();

 		});

 		$blue_btn.click(function () {

 			$blue_btn.remove();
 			$red_btn.remove();

 			player.mark_color = "blue";
 			computer.mark_color = "red";

 			$("h2").html("You are <span style='color: #4189C7;'>Blue</span>.");


 			make_board ();

 		});

 	}

	function make_board () {


		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 7; j++) {
				var $circle = $("<div class = 'circle' data-name = 'nothing'></div>");
				$circle.addClass("col-" + j);
				$circle.addClass("row-" + i);
				$row.append($circle);
				$row.css("background-color", "#FFDF00");
			}
		}
		var $circles = $(".circle");

		for (var i = 0; i < $circles.length; i++) {

			$circles.eq(i).attr("data-value", i);

		}

		if (num_of_players === 2) {

			two_players_move ();

		} else {

			computer_move ();
			player_move ();

		}

	}
  var allElements = document.getElementsByTagName("*");
  var allIds = [];
  for(var i = 0, n = allElements.length; i < n; ++i) {
    var el = allElements[i];
    if(el.id) {
      allIds.push(el.id);
    }
  }

 	//var modal = document.getElementById('dialog');
 	//modal.style.display = "none";
  //console.log(document.getElementById('two-players-btn'));
 	start_game ();


  function check_spot (column_name, new_classname, mark) {
  	for (var i = 0; i < 7; i++) {

  		if (column_name === "col-" + i) {

  			var column = document.getElementsByClassName("col-" + i);
  			var column_arr = jQuery.makeArray (column);



  			for (var j = column_arr.length - 1; j > -1; j--) {
  				if (column_arr[j].getAttribute("data-name") === "nothing"){
  					make_move (column_arr[j], new_classname, mark);
  					break;
  				}
  			}
  		}
  	}
  }

  function handler() {
          alert('clicked');
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
  }


  function make_move (position, new_classname, mark) {

    //var modal = document.getElementById('dialog');
    //var button = modal.innerHTML;
    //console.log(button);
    var usermodal = document.getElementById('user');
    var uobj = usermodal.innerHTML;
    var userInfo = jQuery.parseJSON(uobj);
    //console.log(userInfo._id);
    userId = userInfo._id;
    var qmodal = document.getElementById('questions');
    var obj = qmodal.innerHTML;
    var questions = jQuery.parseJSON(obj);
    //console.log(questions);
    var len = questions.length;
    //console.log("LEN: " + len);
    var random = parseInt(getRandomInt(0, len));
    //console.log(random);
    var abutton, f1button, f2button, f3button;
    var qbutton = String(questions[random].text);
    var question = questions[random];
    //console.log(questions[random]);
    if(questions[random].checkMul == true) {
      abutton = String(questions[random].multiple_choice.ans);
      f1button = String(questions[random].multiple_choice.fake1);
      f2button = String(questions[random].multiple_choice.fake2);
      f3button = String(questions[random].multiple_choice.fake3);
    } else {
      abutton = String(questions[random].true_false);
      f1button = String(!questions[random].true_false);
      f2button = 'N/A';
 	    f3button = 'N/A';
    }

//var button1 = modal.innerHTML;
//var button2 = 'Not Ok';
	if (mark === player_1.data_name) {
    $("#question").text(qbutton);
		$("#question").dialog({

    autoOpen: true,
    buttons: [
    {
        text: abutton,
        click: function() { $(this).dialog("close");
        player_1_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

            $(this).dialog("close");
    	}
    },


    {
        text: f1button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    },


    {
        text: f2button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    },

    {
        text: f3button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    }

] });

	var modal = document.getElementById('question');
 	modal.style.display = "block";


	} else if (mark === player_2.data_name) {
    $("#question").text(qbutton);
		$("#question").dialog({


    autoOpen: true,
    buttons: [
    {
        text: abutton,

        click: function() { $(this).dialog("close");
        player_2_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

            $(this).dialog("close");
    	}
    },


    {
        text: f1button,

        click: function() { $(this).dialog('close');
        	wrong.push(question);
    	}
    },


    {
        text: f2button,

        click: function() { $(this).dialog('close');
        	//wrong.push(question);

    	}
    },

    {
        text: f3button,

        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    }

] });

	var modal = document.getElementById('question');
 	modal.style.display = "block";



	} else if (mark === player.data_name) {

    $("#question").text(qbutton);
		$("#question").dialog({

    autoOpen: true,
    buttons: [
    {
        text: abutton,
        click: function() { $(this).dialog("close");
        player_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

            $(this).dialog("close");
    	}
    },


    {
        text: f1button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    },


    {
        text: f2button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    },

    {
        text: f3button,
        click: function() { $(this).dialog('close');
        	//wrong.push(question);
    	}
    }

] });
	var modal = document.getElementById('question');
 	modal.style.display = "block";

	} else if (mark === computer.data_name) {

		computer_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);


	}
}


  function two_players_move () {
  	var $all_circles = $(".circle");
  	var this_player_clicked = 1;

  	$.each($all_circles, function (index, value) {
  		$all_circles.eq(index).click(function () {
  			if ( $(this).attr("data-name") === "nothing") {
  				if (this_player_clicked === 1) {
  					check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player_1.mark_color, player_1.data_name);
  					this_player_clicked = 2;
  					moves ++;
  					check_for_win ($(this).attr("class").split(" ")[1], player_1.data_name);
  				} else {
  					check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player_2.mark_color, player_2.data_name);
  					this_player_clicked = 1;
  					moves ++;
  					check_for_win ($(this).attr("class").split(" ")[1], player_2.data_name);
  				}
  		 	}
  		});
  	});
  }



  function player_move () {

  	var $all_circles = $(".circle");

  	$.each($all_circles, function (index, value) {
  		$all_circles.eq(index).click(function () {
  			if ($(this).attr("data-name") === "nothing") {
  				check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player.mark_color, player.data_name);
  					moves ++;
  					check_for_win ($(this).attr("class").split(" ")[1], player.data_name);
  			 	if (!winner) {
  			 		setTimeout(function() {
  			 			computer_move ();
  			 		}, 1500);
  			 	}
  			}
  		});
  	});
  }

  function computer_move () {

  	var $all_circles = $(".circle");

  	var computer_choice = Math.floor(Math.random() * 42);

  	if ($all_circles.eq(computer_choice).attr("data-name") === "nothing") {
  		check_spot ($all_circles.eq(computer_choice).attr("class").split(" ")[1], "circle-background-color-" + computer.mark_color, computer.data_name);
  		moves ++;
  		check_for_win ($all_circles.eq(computer_choice).attr("class").split(" ")[1], computer.data_name);
  	} else {
  		computer_move ();
  	}
  }


  function check_for_win (column_name, winning_mark) {

  	check_column (column_name, winning_mark);
  	check_row (winning_mark);
  	check_diagonal (winning_mark);

  	if (moves === 42) {

  		$pick_color.fadeOut();
  		$row.fadeOut();

  		setTimeout(function () {

  			$buttons_row.append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>It's a Draw!</h1>");
      //  console.log(wrong);
        //$buttons_row.append("<button v-on:click=\"review(" + wrong +  ")\></button>");

  			play_again ();

  		}, 1000);

  	}

  }


  function check_column (column_name, winning_mark) {

  	for (var i = 0; i < 7; i++) {

  		if (column_name === "col-" + i) {

  			var column = document.getElementsByClassName("col-" + i);
  			var column_arr = jQuery.makeArray (column);

  			for (var j = column_arr.length - 1; j > 1; j--) {

  				//console.log(j);

  				if (column_arr[j].getAttribute("data-name") === winning_mark &&
  					column_arr[j-1].getAttribute("data-name") === winning_mark &&
  					column_arr[j-2].getAttribute("data-name") === winning_mark &&
  					column_arr[j-3].getAttribute("data-name") === winning_mark) {

  					setTimeout(function () {
  						announce_winner (winning_mark);
  					}, 500);
  					break;

  				}

  			}

  		}

  	}

  }



  function check_row (winning_mark) {

  	if (winning_mark === player_1.data_name) {


  		player_1_moves.sort();

  		for (var i = 0; i < player_1_moves.length - 2; i++) {


  			var first_match = player_1_moves[i];
  			var second_match = player_1_moves[i+1];
  			var third_match = player_1_moves[i+2];
  			var fourth_match = player_1_moves[i+3];

  			if (

  				second_match === (first_match + 1) &&
  				third_match === (second_match + 1) &&
  				fourth_match === (third_match + 1) ) {

  				setTimeout(function () {

  					announce_winner (winning_mark);

  				}, 500);

  			}

  		}

  	} else if (winning_mark === player_2.data_name) {


  		player_2_moves.sort();

  		for (var i = 0; i < player_2_moves.length - 2; i++) {


  			var first_match = player_2_moves[i];
  			var second_match = player_2_moves[i+1];
  			var third_match = player_2_moves[i+2];
  			var fourth_match = player_2_moves[i+3];

  			if (

  				second_match === (first_match + 1) &&
  				third_match === (second_match + 1) &&
  				fourth_match === (third_match + 1) ) {

  				setTimeout(function () {

  					announce_winner (winning_mark);

  				}, 500);

  			}

  		}

  	} else if (winning_mark === player.data_name) {


  		player_moves.sort();

  		for (var i = 0; i < player_moves.length - 2; i++) {


  			var first_match = player_moves[i];
  			var second_match = player_moves[i+1];
  			var third_match = player_moves[i+2];
  			var fourth_match = player_moves[i+3];

  			if (

  				second_match === (first_match + 1) &&
  				third_match === (second_match + 1) &&
  				fourth_match === (third_match + 1) ) {

  				setTimeout(function () {

  					announce_winner (winning_mark);

  				}, 500);

  			}

  		}

  	} else if (winning_mark === computer.data_name) {


  		computer_moves.sort();

  		for (var i = 0; i < player_moves.length - 2; i++) {


  			var first_match = computer_moves[i];
  			var second_match = computer_moves[i+1];
  			var third_match = computer_moves[i+2];
  			var fourth_match = computer_moves[i+3];

  			if (

  				second_match === (first_match + 1) &&
  				third_match === (second_match + 1) &&
  				fourth_match === (third_match + 1) ) {

  				setTimeout(function () {

  					announce_winner (winning_mark);

  				}, 500);

  			}

  		}

  	}

  }



  function check_diagonal (winning_mark) {

  	for (var i = 0; i < diagonal_win.length; i++) {


  		var $check_1 = $("div[data-value='" + diagonal_win[i][0] + "']");
  		var $check_2 = $("div[data-value='" + diagonal_win[i][1] + "']");
  		var $check_3 = $("div[data-value='" + diagonal_win[i][2] + "']");
  		var $check_4 = $("div[data-value='" + diagonal_win[i][3] + "']");

  		if (
  			$check_1.attr("data-name") === winning_mark &&
  			$check_2.attr("data-name") === winning_mark &&
  			$check_3.attr("data-name") === winning_mark &&
  			$check_4.attr("data-name") === winning_mark
  			) {

  			setTimeout(function () {

  				announce_winner (winning_mark);

  			}, 500);

  		}

  	}

  }



  function announce_winner (winning_mark) {

  	if (winning_mark === player_1.data_name) {

  		winning_mark = $("#player-1").val();

  		$pick_color.fadeOut();
  		$row.fadeOut();

  		setTimeout(function () {

  			$buttons_row.append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>").fadeIn();
        console.log(wrong);
        //$buttons_row.append("<button v-on:click=\"review(" + wrong +  ")\"></button>").fadeIn();
        var review = {
          ids: []
        };
        for(var i = 1; i < wrong.length; i++) {
            console.log(wrong[i]._id);
            review.ids.push(wrong[i]._id);
        }
        console.log(review);
        //$.ajax({ url:url, type:"POST", data:data, contentType:"application/json", dataType:"json", success: function(){ ... } })
        $.ajax({
          url: 'http://localhost:3000/question/addReview',
          data: {'ids': review.ids, 'userId': userId},
          type: 'POST',
          dataType:"json",
          success: function() {
            console.log('success');
          },
          error: function() {
            console.log('error');
          }
        });
        //$.post("http://localhost:3000/question/addReview", review);
        play_again ();

  		}, 500);

  		winner = true;

  		player_1.wins++;

  	} else if (winning_mark === player_2.data_name) {

  		winning_mark = $("#player-2").val();

  		$pick_color.fadeOut();
  		$row.fadeOut();

  		setTimeout(function () {

   			$buttons_row.append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>");
      //  console.log(wrong);
        //$buttons_row.append("<button style='font-size: 6em; margin: 13vh 0 25px 0' v-on:click=\"review(" + wrong +  ")\">Put to Review?</button>").fadeIn();
        var review = {
          ids: []
        };
        for(var i = 1; i < wrong.length; i++) {
            console.log(wrong[i]._id);
            review.ids.push(wrong[i]._id);
        }
        console.log(review);
        //$.ajax({ url:url, type:"POST", data:data, contentType:"application/json", dataType:"json", success: function(){ ... } })
        $.ajax({
          url: 'http://localhost:3000/question/addReview',
          data: {'ids': review.ids, 'userId': userId},
          type: 'POST',
          dataType:"json",
          success: function() {
            console.log('success');
          },
          error: function() {
            console.log('error');
          }
        });
        play_again ();

   		}, 500);

  		winner = true;

  		player_2.wins++;

  	} else if (winning_mark === player.data_name) {

  		winning_mark = $("input").val();

  		$pick_color.fadeOut();
  		$row.fadeOut();

  		setTimeout(function () {

  	 		$buttons_row.append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>");
        var review = {
          ids: []
        };
        for(var i = 1; i < wrong.length; i++) {
            console.log(wrong[i]._id);
            review.ids.push(wrong[i]._id);
        }
        console.log(review);
        //$.ajax({ url:url, type:"POST", data:data, contentType:"application/json", dataType:"json", success: function(){ ... } })
        $.ajax({
          url: 'http://localhost:3000/question/addReview',
          data: {'ids': review.ids, 'userId': userId},
          type: 'POST',
          dataType:"json",
          success: function() {
            console.log('success');
          },
          error: function() {
            console.log('error');
          }
        });
        play_again ();

  	 	}, 500);

  		winner = true;

  		player.wins++;

  	} else {

  		$pick_color.fadeOut();
  		$row.fadeOut();

  		setTimeout(function () {

  	 		$buttons_row.append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>Computer wins!</h1>").fadeIn();
        var review = {
          ids: []
        };
        for(var i = 1; i < wrong.length; i++) {
            console.log(wrong[i]._id);
            review.ids.push(wrong[i]._id);
        }
        console.log(review);
        //$.ajax({ url:url, type:"POST", data:data, contentType:"application/json", dataType:"json", success: function(){ ... } })
        $.ajax({
          url: 'http://localhost:3000/question/addReview',
          data: {'ids': review.ids, 'userId': userId},
          type: 'POST',
          dataType:"json",
          success: function() {
            console.log('success');
          },
          error: function() {
            console.log('error');
          }
        });
        play_again ();

  	 	}, 500);

  		winner = true;

  		computer.wins++;

  	}

  }


  function play_again () {

  	setTimeout(function () {

  		$buttons_row.append("<button id = 'play-again'>Play Again?</button>");

  	 	// onclick, reload the window.
  		$("#play-again").click(function () {
  		//console.log("clicked");
  		//location.reload();

  	});

  	}, 950);

  	var player_1_score = player_1.wins;
  	localStorage.setItem("player_1_score", player_1_score);

  	 var player_2_score = player_2.wins;
  	localStorage.setItem("player_2_score", player_2_score);

  	var player_score = player.wins;
  	localStorage.setItem("player_score", player_score);

  	var computer_score = computer.wins;
  	localStorage.setItem("computer_score", computer_score);

  }


});
