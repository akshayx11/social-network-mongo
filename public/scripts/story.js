$(function () {
    
    
    $("#post-story").on('click', (e) => {
        let data = {
            storyTitle:$('#stitle').val(),
            storyDesc:$('#storyDesc').val(),
        }
        var request = $.ajax({
            url: "/stories/new",
            method: "POST",
            data: data,
          });
           
          request.done(function(resp ) {
             if(resp.statuscode ==  201){
                // $('#stitle').val('');
                // document.getElementById("storyDesc").value ="";
                $('#smsg').empty();
                $('#smsg').append(resp.message);
                $("#successmsg").show();
             }else{
                $('#flmsg').empty();
                $('#flmsg').append(resp.message);
                $("#failuremsg").show();
             }
            

          });
         
    });


});