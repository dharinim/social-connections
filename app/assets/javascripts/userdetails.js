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
  
  $('#edit').on('show.bs.modal', function (e) {
    edit_invoker = $(e.relatedTarget);
  });

  $('#delete').on('click', function(e){
    e.preventDefault();
    console.log(edit_invoker.data('user_id'));
    id = edit_invoker.data('id');
    name = edit_invoker.data('name');
    linkedin_connections = edit_invoker.data('linkedin_connections');
    facebook_connections = edit_invoker.data('facebook_connections');
    twitter_followers = edit_invoker.data('twitter_followers');
    social_connections_index = edit_invoker.data('social_connections_index');

    $.ajax({
      url: '/users/edit',
      method: 'post',
      data: {
        id: id,
        name: name,
        linkedin_connections: linkedin_connections,
        facebook_connections: facebook_connections,
        twitter_followers: twitter_followers,
        social_connections_index: social_connections_index
      },
      success: function(response){
        alert(response);
      },
      error: function(response){
        alert(response);
      }
    });
   });
  

});