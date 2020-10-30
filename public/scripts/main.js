
//handle cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
  }   
}

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
            setCookie("token", data.data.token, 15);
            location.href = "/";
        }).fail((data)=> {
            alert(data.responseJSON.message);
            console.log(JSON.stringify(data));
        });
    });

    $("#update-profile-btn").on("click", (event) => {
      event.preventDefault();
      const firstName = $("#user-fname").val();
      const middleName = $("#user-mname").val();
      const lastName = $("#user-lname").val();
      const mobileno = $("#user-mobileno").val();
      //const dob =  new Date($("#user-dob").val()).getTime();
      const city = $("#user-city").val();
      const state = $("#user-state").val();
      const country = $("#user-country").val();
      $.ajax({ 
        url: "/user/", 
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify({ 
              firstName,
              middleName,
              lastName,
              mobileno,
              city,
              state,
              country
        }), 
        success: function( data ) {
          alert(data.responseJSON.message);
        },
        fail: ((data)=> {
          alert(data.responseJSON.message);
      })
    });
  });
});