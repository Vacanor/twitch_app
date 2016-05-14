/* 

This app will get information on thw provided twitchtv streamers and thenn it'll oputput a list on the view shoing if they are online and, if so, what are tey streaming.

*/

// Declare streamers
var users = ["freecodecamp", "storbeck", "eirebornfenix", "medrybw", "terakilobyte", "habathcx", "byzehg", "RobotCaleb", "thomasballinger", "comster404" , "awildwatermelonappears", "beohoff"];
var html = '';
var deleted = '';
// Now we need to iterate over the users array and modify the view using the variables obtained from every user objects that we are going to get via request

users.forEach(function(user) {
	// Define user urls and vars
	let streamUrl = "https://api.twitch.tv/kraken/streams/" + user;
	let channelUrl = "https://api.twitch.tv/kraken/channels/" + user;
	let name;
	let game;
	let url;
	let logo;
	let status;
	let accStatus;


	// Make first the stream ajax call and if there is no stream go get the data in the channel
	$.ajax({url: streamUrl, error: function(){// First d the error and pass it as a separate html data so it shows up at the end of the list
		html += "";
    	deleted += `<li class="user mis not">
						<span class="image"><img class="logo" src="avatar.jpg" alt="Logo"></span><span class="name"><i class="mdi mdi-account-off"></i>&nbsp;`+ user +`</span><span class="stream"><i class="mdi mdi-record-rec live-icon" style="display:none;"></i><span class="game">Deleted Account</span></span><span class="twitch"><i class="mdi mdi-block-helper no-user"></i></span>
						</li>`;
		setHtml(html, deleted);
    	},success: function(result){ // If succes, we pass the html to the function and, as it's is the first check, the online users will be added first
    		deleted += "";
	        if (result.stream !== null){
	        	name = result.stream.channel.display_name;
	    		game = result.stream.game;
	    		status = result.stream.channel.status;
	    		logo = result.stream.channel.logo;
	    		if (logo === null || logo === undefined){ // Default image in case there is none
	    			logo = "avatar.jpg";
	    		}
	    		url = result.stream.channel.url;
	    		html += `<a href="`+ url +`"><li class="user str">
							<span class="image"><img class="logo" src="`+ logo +`" alt="Logo"></span><span class="name"><i class="mdi mdi-account"></i>&nbsp;`+ name +`</span><span class="stream"><i class="mdi mdi-record-rec live-icon"></i><span class="game">`+ game +`: `+ status +`</span></span><span class="twitch"><i class="mdi mdi-twitch live-tw-online"></i></span>
							</li></a>`;
		    	setHtml(html, deleted);
		   	}else {
				$.ajax({url: channelUrl, success: function(result){
	        		name = result.display_name;
		    		logo = result.logo;
		    		if (logo === null || logo === undefined){ // Default image in case there is none
	    				logo = "avatar.jpg";
	    			}
		    		url = result.url;
		    		html += `<a href="`+ url +`"><li class="user not">
							<span class="image"><img class="logo" src="`+ logo +`" alt="Logo"></span><span class="name"><i class="mdi mdi-account"></i>&nbsp;`+ name +`</span><span class="stream"><i class="mdi mdi-record-rec live-icon" style="display:none;"></i><span class="game">Offline</span></span><span class="twitch"><i class="mdi mdi-twitch live-tw-offline"></i></span>
							</li></a>`;
					setHtml(html, deleted);
		    	}});
		   	}
    }}); 	
});

// Function to change our dom
function setHtml(data, deleted){
	$(".list").html(data + deleted);
};

// Button functions
$("#all").on("click", function(){
	$( ".user" ).css( "display", "block" );
});
$("#online").on("click", function(){
	$( ".not" ).css( "display", "none" );
	$( ".str" ).css( "display", "block" );
});
$("#offline").on("click", function(){
	$( ".str" ).css( "display", "none" );
	$( ".not" ).css( "display", "block" );
});

// Remove overlay once everything is loaded
function removeOver(){
	$(".overlay").css("display", "none");
}


$(document).ready(function(){
    $(".overlay" ).animate({
    opacity: 0,
 	}, 1 );
	setTimeout(removeOver, 800);
	$(".overlay" ).animate({
	    opacity: 1,
	 }, 1200 );
});