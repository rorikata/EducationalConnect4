
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

function make_move (position, new_classname, mark) {
    $("#dialog").dialog({
    
    autoOpen: true,
    buttons: {
    
        Yes: function() { 
    
            alert("Yes!"); 
            $(this).dialog("close"); 
        },
        No: function() { 
            
            alert("No!"); 
            $(this).dialog("close"); 

        },
        Maybe: function() { 
            
            alert("Maybe!"); 
            $(this).dialog("close"); 
        },

        NoIdea: function() { 
            
            alert("Maybe!"); 
            $(this).dialog("close"); 
        }
    
    },
    width: "800px"
    
});
    var modal = document.getElementById('dialog');
 	modal.style.display = "block";


	if (mark === player_1.data_name) {

		player_1_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

	} else if (mark === player_2.data_name) {

		player_2_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

	} else if (mark === player.data_name) {

		player_moves.push(parseInt($(position).attr("data-value")));

		$(position).addClass(new_classname);
		$(position).attr("data-name", mark);

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