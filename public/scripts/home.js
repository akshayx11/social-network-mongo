$(function () {
    $('#home-link').on('click', ()=> {
       location.href = "/";
    });
    $('#people-link').on('click', ()=> {
        $('.main-content').html("<h1>People<h1>");
    });  
    $('#profile-link').on('click', ()=>{
        location.href = "/user/profile";
    });
    $('#logout-link').on('click', ()=>{
        setCookie("token");
        location.href = "/";
    });
});