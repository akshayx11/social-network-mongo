$(function () {
    $('#home-link').on('click', ()=> {
       location.href = "/";
    });
    $('#people-link').on('click', ()=> {
        location.href = "/user/people/all";
    });  
    $('#profile-link').on('click', ()=>{
        location.href = "/user/profile";
    });
    $('#logout-link').on('click', ()=>{
        setCookie("token");
        location.href = "/";
    });

    $('.people-friendStatus.Open').on('click', (e) => {
        const userid = $(e.currentTarget).attr('userid');
        let posting = $.ajax({ 
            url:  "/friend/send-request", 
            type: 'POST',
            contentType: "application/json",
           data: JSON.stringify({ 
            friendIds: [userid]
           })
        });
        posting.done(function( data ) {
            alert('Friend request send successsfully', data);
            location.href = "/user/people/all";
            console.log(data);
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });

    $('.people-friendStatus.Response').on('click', (e) => {
        const userid = $(e.currentTarget).attr('userid');
        $(e.currentTarget).hide();
        $("#res_"+userid).removeClass('hidden');
    });
    $('.res-btn').on('click', (e) =>{
        const friendId = $(e.currentTarget).attr('userid');
        const userResponse = $(e.currentTarget).attr('res');
        let posting = $.ajax({ 
            url:  `/friend/response-request/${friendId}?response=${userResponse}`, 
            type: 'PUT',
        });
        posting.done(function( data ) {
            alert('Successfully updated', data);
        const userResponse = $(e.currentTarget).attr('res');
            if(userResponse === 'accepted'){
                $("#res_"+friendId).html('Confirmed');
            }else{
                $("#res_"+friendId).html('Rejected');
            }
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });
});