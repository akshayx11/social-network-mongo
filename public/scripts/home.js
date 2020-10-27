$(function () {
    $('#home-link').on('click', ()=> {
        $('#main-content').html("<h1>Home<h1>");
    });
    $('#friend-link').on('click', ()=> {
        $('#main-content').html("<h1>Friend<h1>");
    });  
    $('#profile-link').on('click', ()=>{
        $.get('/user').done( data  => {  
            $("#main-content").html(JSON.stringify(data));
        });
    });
});