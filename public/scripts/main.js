$(function () {
    
    $("#register-btn").on("click", (event) => {
        event.preventDefault();
        const title = $("#title").val();
        const firstName = $("#fname").val();
        const middleName = $("#mname").val();
        const lastName = $("#lname").val();
        const email = $("#user-email").val();
        const password = $("#user-password").val();
        const gender = $("input[name='gender']:checked").val();
        const mobileno = $("#user-mobileno").val();
        const dob =  new Date($("#user-dob").val()).getTime();
        const city = $("#user-city").val();
        const state = $("#user-state").val();
        const country = $("#user-country").val();
        let posting = $.post( "/auth/signup", 
            { 
                title,
                firstName,
                middleName,
                lastName,
                email,
                password,
                gender,
                mobileno,
                dob,
                city,
                state,
                country
            } 
        );
        posting.done(function( data ) {
            location.href = "/login";
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });

    $("#login-btn").on("click", () => {
        const email = $("#user-email").val();
        const password = $("#user-password").val();
        let posting = $.post( "/auth/login", 
            { 
                email,
                password
            } 
        );
        posting.done(function( data ) {
            alert(JSON.stringify(data.data));
            document.cookie = data.data.token;
            console.log("DATATATATTATATAT", data);
            location.href = "/";
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });
});