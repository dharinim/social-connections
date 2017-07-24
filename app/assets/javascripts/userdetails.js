function ServerManager(opts) {
  // Handlers all the server interactions

  this._userquery = {
    sort_field: "social_connection_index",
    page: 1,
    limit: 10,
    sort_order: "desc",
    searchTerm: ""
  };
}

ServerManager.prototype.getQuery = function getQuery(opts) {
  return this._userquery;
};

ServerManager.prototype.updateQuery = function updateQuery(opts) {
  jQuery.extend(this._userquery, opts);
};

ServerManager.prototype.createUser = function createUser(params, cb) {
    $.ajax({
      url: '/users/',
      method: 'post',
      data: params,
      success: function(response){
        $("#create .close").click();
        //getUserDetails();
        cb(null, response);
      },
      error: function(response){
        // alert(response);
      }
    });
};

ServerManager.prototype.editUser = function editUser(id, data, cb) {
    $.ajax({
      url: '/users/' + id + '/',
      method: 'put',
      data: data,
      success: function(response){
        $("#edit .close").click();
        //getUserDetails();
        cb(null, response);
      },
      error: function(response){
        // alert(response);
      }
    });
};

ServerManager.prototype.getUsers = function getUsers(cb) {
    var self = this;

    $.ajax({
      url: "/users/",
      method: "get",
      data: self.getQuery(),
      success: function(response) {
        return cb(null, response);
      },
      error: function(xhr) {
        return cb(xhr, {});
      }
    }); 
};

function UIManager(opts) {
  this.serverManager = opts.serverManager;


  // List of templates used on the page
  this.templates = {
    userdetails_template: Handlebars.compile($("#render_user_list").html())
  };

  // List of selectors
  this.selectors = {
    user_pagination: "#user_pagination"
  };

  // for search ajax requests
  self.searchUserTimer = false;
}

UIManager.prototype.showUsersList = function showUsersList() {
  var self = this;

  self.serverManager.getUsers(function (error, response) {
    if (!error) {
        userdetails_html = self.templates.userdetails_template({
          users: response.users
        });

        var userdetails_html = $(userdetails_html);
        $("#user_details").html(userdetails_html);

        self._applySort();

        self._showPagination({
          items: response.total,
          itemsOnPage: response.limit,
          selector: self.selectors.user_pagination,
          onPageClick: self._onPaginationClick(self)
        });

    } else {
      // Display error in UI
    }
  });
};

UIManager.prototype.initialize = function initialize() {
  var self = this;

  self._initialize_edit_modal();
  self._initialize_create_modal();
  self._initialize_search_user();
};

UIManager.prototype._initialize_create_modal = function _initialize_create_modal() {
    var self = this;
    $('#createuser').on('click', function(e){
        e.preventDefault();
        // console.log(data_id,name,linkedin_connections);
        var name = $("#create input[name='name']").val();
        var linkedin_connections = $("#create input[name='linkedin_connections']").val();
        var facebook_connections = $("#create input[name='facebook_connections']").val();
        var twitter_followers = $("#create input[name='twitter_followers']").val();

        self.serverManager.createUser({
          name: name,
          linkedin_connections: linkedin_connections,
          facebook_connections: facebook_connections,
          twitter_followers: twitter_followers
        }, function onUserCreate(error, response) {
          self.showUsersList();  
        });
    });
};
 
UIManager.prototype._initialize_edit_modal = function _initialize_edit_modal() {
    var self = this;
    var editModal = $('#edit');

    editModal.on('show.bs.modal', function (e) {
      var edit_invoker = $(e.relatedTarget);
    
      var data_id = edit_invoker.data('id');
      var data_name = edit_invoker.data('name');
      var data_linkedin_connections = edit_invoker.data('linkedin_connections');
      var data_facebook_connections = edit_invoker.data('facebook_connections');
      var data_twitter_followers = edit_invoker.data('twitter_followers');

      $("input[name='id']", editModal).val(data_id);
      $("input[name='name']", editModal).val(data_name);
      $("input[name='linkedin_connections']", editModal).val(data_linkedin_connections);
      $("input[name='facebook_connections']", editModal).val(data_facebook_connections);
      $("input[name='twitter_followers']", editModal).val(data_twitter_followers);
    });

    $('#edituser').on('click', function(e){
       e.preventDefault();

       var data_id = $("#edit input[name='id']").val();
       var name = $("#edit input[name='name']").val();
       var linkedin_connections = $("#edit input[name='linkedin_connections']").val();
       var facebook_connections = $("#edit input[name='facebook_connections']").val();
       var twitter_followers = $("#edit input[name='twitter_followers']").val();

       self.serverManager.editUser(data_id, {
          name: name,
          linkedin_connections: linkedin_connections,
          facebook_connections: facebook_connections,
          twitter_followers: twitter_followers
       }, function onEditUser(error, response){
          self.showUsersList();
      });

    });
 };

UIManager.prototype._initialize_search_user = function _initialize_search_user() {
  var self = this;

  $("#search_user").keyup(function() {
      if(self.searchUserTimer !== false) {
        clearTimeout(self.searchUserTimer);
      }

      var searchTerm = $("#search_user").val();
      self.serverManager.updateQuery({
        searchTerm: searchTerm
      });

      self.changeTimer = setTimeout(function(){
          self.showUsersList();
          self.changeTimer = false;
      }, 300);

  });
};

UIManager.prototype._applySort = function _applySort() {
    var self = this;
    $('.sort').on('click', function(e) {
        var sort_field = $(this).data('sort_field');
        
        var current_sort_order;
        var new_sort_order;

        if ($(this).hasClass("sorting_desc")) {
          current_sort_order = "desc";
          new_sort_order = "asc";
        } else if ($(this).hasClass("sorting")) {
          current_sort_order = "none";
          new_sort_order = "asc";
        } else if ($(this).hasClass("sorting_asc")) {
          current_sort_order = "asc";
          new_sort_order = "desc";
        }

        self.serverManager.updateQuery({
          sort_field: sort_field,
          sort_order: new_sort_order
        });
        
        self.showUsersList();
    });

    $("#mytable thead th").each(function (){
        var sort_field = $(this).data('sort_field');

        $(this).removeClass("sorting");
        $(this).removeClass("sorting_asc");
        $(this).removeClass("sorting_desc");

        var currentQueryState = self.serverManager.getQuery();

        if (sort_field === currentQueryState.sort_field && currentQueryState.sort_order === "asc") {
          $(this).addClass("sorting_asc");  
        } else if (sort_field === currentQueryState.sort_field && currentQueryState.sort_order === "desc") {
          $(this).addClass("sorting_desc");  
        } else {
          $(this).addClass("sorting");
        }
    });
};

UIManager.prototype._onPaginationClick = function _onPaginationClick(uiManager) {
  return function (pageNumber, event) {
    if (event) {
      event.preventDefault();    
      var self = this;
      uiManager.serverManager.updateQuery({
        page: pageNumber
      });
      uiManager.showUsersList();
    }
  };

};

UIManager.prototype._showPagination = function _showPagination(opts) {
    var self = this;
    $(opts.selector).pagination({
        items: opts.items,
        itemsOnPage: opts.itemsOnPage,
        onPageClick: opts.onPageClick,
        cssStyle: 'light-theme'
    });

    $(self.selectors.user_pagination).pagination('selectPage', self.serverManager.getQuery().page);  
};


$(document).ready(function () {
  var serverManager = new ServerManager();
  var uiManager = new UIManager({
    serverManager: serverManager
  });

  uiManager.initialize();
  uiManager.showUsersList();
});