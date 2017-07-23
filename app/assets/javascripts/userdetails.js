$(document).ready(function (){
  console.log("i m here");
  // Load schedule on page load
  var userdetails_source   = $("#render_user_list").html();
  var user_template = Handlebars.compile(userdetails_source);

  function getUserDetails() {
    $.ajax({
      url: "users/user_details",
      type: "get",
      success: function(response) {
        user_html = user_template({
          users: response.users
        });
        // console.log(user_html);
        $("#user_details").html(user_html);
      },
      error: function(xhr) {
        //Todo: Display error in UI
      }
    });    
  }
  getUserDetails();
  
  
  

});