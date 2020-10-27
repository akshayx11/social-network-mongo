$(function () {
    $('#home-link').on('click', ()=> {
       location.href = "/";
    });
    $('#friend-link').on('click', ()=> {
        $('#main-content').html("<h1>Friend<h1>");
    });  
    $('#profile-link').on('click', ()=>{
        location.href = "/user/profile";
    });
    $('#logout-link').on('click', ()=>{
        
    });
});