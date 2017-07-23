$(document).ready(function (){
  console.log("i m here");
  // Load schedule on page load
  var userdetails_source   = $("#render_user_list").html();
  var user_template = Handlebars.compile(userdetails_source);

  // function sortValues(){
  //         console.log($(this).data('name'));
  //         sort_order = $(this).data('name');
  //         $.ajax({
  //           url: "users/sort",
  //           method: "post",
  //           data: {
  //             order: sort_order
  //           },
  //           success: function(response) {
  //             user_html = user_template({
  //               users: response.users
  //             });
  //           $("#user_details").html(user_html);
  //           }
  //         });
  // }


  // function getUserDetails() {
  //   $.ajax({
  //     url: "users/user_details",
  //     method: "get",
  //     success: function(response) {
  //       user_html = user_template({
  //         users: response.users
  //       });
  //       // console.log(user_html);
  //       $("#user_details").html(user_html);
  //       $('.sort').on('click', function(e){
  //         console.log($(this).data('name'));
  //         sort_order = $(this).data('name');
  //         $.ajax({
  //           url: "users/sort",
  //           method: "post",
  //           data: {
  //             order: sort_order
  //           },
  //           success: function(response) {
  //             user_html = user_template({
  //               users: response.users
  //             });
  //             $("#user_details").html(user_html);
  //           }
  //         });
  //       });
  //     },
  //     error: function(xhr) {
  //       //Todo: Display error in UI
  //     }
  //   });    
  // }


  function getUserDetails(cb) {
    $.ajax({
      url: "users/user_details",
      method: "get",
      success: function(response) {
        user_html = user_template({
          users: response.users
        });
        // console.log(user_html);
        
        // var user_html = $(user_html);
        // _apply_sort(user_html);
        $("#user_details").html(user_html);
        _apply_sort();
      },
      error: function(xhr) {
        //Todo: Display error in UI
      }
    });    
  }


  function _apply_sort() {
      $('.sort').on('click', function(e){
        sort_order = $(this).data('name');
        console.log($(this).data('name'));
        $.ajax({
          url: "users/sort",
          method: "post",
          data: {
            order: sort_order,
          },
          success: function(response) {
            user_html = user_template({
              users: response.users
            });

            //var user_html = $(user_html);
            //_apply_sort(user_html);
            $("#user_details").html(user_html);
            _apply_sort();
          }
        });
      });
  }


  getUserDetails();

 
   $('#edit').on('show.bs.modal', function (e) {
    edit_invoker = $(e.relatedTarget);
    var data_id = edit_invoker.data('id');
    var data_name = edit_invoker.data('name');
    var data_linkedin_connections = edit_invoker.data('linkedin_connections');
    var data_facebook_connections = edit_invoker.data('facebook_connections');
    var data_twitter_followers = edit_invoker.data('twitter_followers');
    var name = $("#edit input[name='name']").val(data_name);
    var linkedin_connections = $("#edit input[name='linkedin_connections']").val(data_linkedin_connections);
    var facebook_connections = $("#edit input[name='facebook_connections']").val(data_facebook_connections);
    var twitter_followers = $("#edit input[name='twitter_followers']").val(data_twitter_followers);
  });
  



  $('#createuser').on('click', function(e){
    e.preventDefault();
    // console.log(data_id,name,linkedin_connections);
    var name = $("#create input[name='name']").val();
    var linkedin_connections = $("#create input[name='linkedin_connections']").val();
    var facebook_connections = $("#create input[name='facebook_connections']").val();
    var twitter_followers = $("#create input[name='twitter_followers']").val();

    $.ajax({
      url: '/users/create',
      method: 'post',
      data: {
        name: name,
        linkedin_connections: linkedin_connections,
        facebook_connections: facebook_connections,
        twitter_followers: twitter_followers,
        // social_connections_index: social_connections_index
      },
      success: function(response){
        $("#create .close").click();
        getUserDetails();
      },
      error: function(response){
        // alert(response);
      }
    });
   });


  $('#edituser').on('click', function(e){
    e.preventDefault();
    var data_id = edit_invoker.data('id');
    var name = $("#edit input[name='name']").val();
    var linkedin_connections = $("#edit input[name='linkedin_connections']").val();
    var facebook_connections = $("#edit input[name='facebook_connections']").val();
    var twitter_followers = $("#edit input[name='twitter_followers']").val();

    // console.log(data_id,name,linkedin_connections);
    $.ajax({
      url: '/users/edit',
      method: 'post',
      data: {
        id: data_id,
        name: name,
        linkedin_connections: linkedin_connections,
        facebook_connections: facebook_connections,
        twitter_followers: twitter_followers,
        // social_connections_index: social_connections_index
      },
      success: function(response){
        $("#edit .close").click();
        getUserDetails();
      },
      error: function(response){
        // alert(response);
      }
    });

    
   });
  
});