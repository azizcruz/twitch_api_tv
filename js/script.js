$(document).ready(function () {
        
    // DECLARE THE NEEDED VARIABLES
    var box_wrapper = $('#box-wrapper');
    
    // ARRAY OF FOLLOWING USERS TO CHECK THEIR STATUS
    var following = [];
    // ADD ANIMATION TO EACH BAMBI PANEL WHEN THE PAGE LOADED
    $("body").addClass("animated bounceInLeft");
    
    // SORTING THE CHANNELS ACCORDING TO "ONLINE, OFFLINE, NOT FOUND"
    $("#content-wrapper .sort span").on("click", function(){
        $(this).addClass("active-sort").siblings().removeClass("active-sort");
        
        if($(this).data("sort") == "all"){
            $("#box-wrapper .bambi").show();
        } else if ($(this).data("sort") == "not-found") {
          $("#box-wrapper .bambi").hide();
          $("#box-wrapper .b-not-found").show();
        } else if ($(this).data("sort") == "offline") {
          $("#box-wrapper .bambi").hide();
          $("#box-wrapper .b-offline").show();
        } else if ($(this).data("sort") == "online") {
          $("#box-wrapper .bambi").hide();
          $("#box-wrapper .b-online").show();
        }
    });
    
    
   
//------------
    // CHECK IF FREE CODE CAMP CHANNEL IS STREAMING
    $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=at3omcg32z76v9w7t923jzndikyner', function(data1){
        
        if(data1.stream === null) {
            
            
            box_wrapper.append("<div class='bambi b-offline'>" +
                               
                                  "<div class='col-xs-4'><img src='http://matthew-andrews.github.io/talk-syncherts-july-2014/content/no.png' alt='logo'></div>" +
                                  "<div class='col-xs-4 offline-status'>" + data1._links.channel.split("/").pop() + "</div>" +
                                  "<a href='https://www.twitch.tv/freecodecamp' target='_blank'><div class='col-xs-4 offline-status'>OFFLINE</div></a>" +
                                  "<div class='clearfix'></div>" +
                               
                               "</div>");
            
        } else {
            
            box_wrapper.append("<div class='bambi b-offline'>" +
                               
                                  "<div class='col-xs-4'><img src='https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png' alt='logo'></div>" +
                                  "<div class='col-xs-4 offline-status'>" + data1._links.channel.split("/").pop() + "</div>" +
                                  "<a href='https://www.twitch.tv/freecodecamp' target='_blank'><div class='col-xs-4 offline-status'>" + data1.stream.channel.status + "</div></a>" +
                                  "<div class='clearfix'></div>" +
                               
                               "</div>");
            
        }
        
    });
 

//------------
    // GET THE CHANNELS THAT FREE CODE CAMP CHANNEL IS FOLLOWING
    $.getJSON('https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=at3omcg32z76v9w7t923jzndikyner', function(data2){
        
       for(var i = 0; i < data2.follows.length; i++) {
           
          following.push(data2.follows[i].channel.display_name);
           
       } 
        
        following.push('comster404');
        following.push('brunofin');
        following.push('ESL_SC2');
        
        
//-------------
        // ITERATE THROUGH FOLLOWING ARRAY TO GET THE DATA FOR EACH CHANNEL
        for(var j = 0; j < following.length; j++) {
            
            
            
            $.getJSON('https://api.twitch.tv/kraken/channels/' + following[j] + '?client_id=at3omcg32z76v9w7t923jzndikyner&callback=').done(function(data3){  
                // DECLARE THE VARIABLES FOR NON FOUND CHANNELS
                var l, // LOGO
                    m, // MESSAGE
                    s; // STATUS
                
                l = "<img src='http://www.babysocial.com.au/wp-content/themes/babysocialv3/library/images/cb-404.png' alt='logo'>"
                m = data3.message.split("'")[1] + " NOT FOUND";
                s = data3.status;
                
                
                if(data3.error === "Not Found") {
                    
                    box_wrapper.append("<div class='bambi b-not-found'>" +
                               
                                  "<div class='col-xs-4'>" + l + "</div>" +
                                  "<div class='col-xs-4 offline-status'>" + m + "</div>" +
                                  "<div class='col-xs-4 offline-status'>" + s + "</div>" +
                                  "<div class='clearfix'></div>" +
                               
                               "</div>");
                    
                } 
                
            });
            
        }
        
        var link;
//-------------
        // ITERATE THROUGH THE ARRAY TO GET ONLINE STREAMING AND OFFLINE STREAMING CHANNELS
        
       for(var i = 0; i < following.length; i++) {
           
           link = 'https://www.twitch.tv/' + following[i];
           
           
            $.getJSON('https://api.twitch.tv/kraken/streams/' + following[i] + '?client_id=at3omcg32z76v9w7t923jzndikyner&callback=', function(data4){
            // DECLARE THE VARIABLES FOR STREAMING CHANNELS
            var l, // LOGO
                m, // MESSAGE
                s; // STATUS
                console.log(data4);
            if(data4.stream !== null){
                l = "<img src='" + data4.stream.channel.logo + "' alt='channel_logo' class='img-responsive img-circle img-logo'>";
                m =  data4.stream.channel.display_name;
                s =  data4.stream.channel.status;
                
                box_wrapper.append("<div class='bambi b-online'>" +
                               
                                  "<div class='col-xs-4'>" + l + "</div>" +
                                  "<div class='col-xs-4 offline-status'>" + m + "</div>" +
                                  "<a href='" + link + "' target='_blank'><div class='col-xs-4 stream-status'>" + s + "</div></a>" +
                                  "<div class='clearfix'></div>" +
                               
                               "</div>");
                
            } else {
                
                l = "<img src='http://matthew-andrews.github.io/talk-syncherts-july-2014/content/no.png' alt='logo'>";
                m = data4._links.channel.split("/").pop();
                s = "OFFLINE";
                box_wrapper.append("<div class='bambi b-offline'>" +
                               
                                  "<div class='col-xs-4'>" + l + "</div>" +
                                  "<div class='col-xs-4 offline-status'>" + m + "</div>" +
                                  "<div class='col-xs-4 offline-status'>" + s + "</div>" +
                                  "<div class='clearfix'></div>" +
                               
                               "</div>");
               
            }
            
        });
           
       }
        
        
        
    });
 
});