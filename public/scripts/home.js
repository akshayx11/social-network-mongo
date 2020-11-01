$(function () {
    $('#home-link').on('click', ()=> {
       location.href = "/";
    });
    $('#people-link').on('click', ()=> {
        location.href = "/user/all"
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
            location.href = "/user/all";
            console.log(data);
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });
});