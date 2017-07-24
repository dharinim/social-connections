function ServerManager(){this._userquery={sort_field:"social_connection_index",page:1,limit:10,sort_order:"desc",searchTerm:""}}function UIManager(e){this.serverManager=e.serverManager,this.templates={userdetails_template:Handlebars.compile($("#render_user_list").html())},this.selectors={user_pagination:"#user_pagination"},self.searchUserTimer=!1}ServerManager.prototype.getQuery=function(){return this._userquery},ServerManager.prototype.updateQuery=function(e){jQuery.extend(this._userquery,e)},ServerManager.prototype.createUser=function(e,r){$.ajax({url:"/users/",method:"post",data:e,success:function(e){return $("#create .close").click(),r(null,e)},error:function(e){return r(new Error("Error fetching createuser"+e),null)}})},ServerManager.prototype.editUser=function(e,r,t){$.ajax({url:"/users/"+e+"/",method:"put",data:r,success:function(e){return $("#edit .close").click(),t(null,e)},error:function(e){return t(new Error("Error fetching createuser"+e),null)}})},ServerManager.prototype.getUsers=function(e){var r=this;$.ajax({url:"/users/",method:"get",data:r.getQuery(),success:function(r){return e(null,r)},error:function(r){return e(new Error("Error fetching createuser"+r),null)}})},UIManager.prototype.showUsersList=function(){var e=this;e.serverManager.getUsers(function(r,t){if(r)alert("Error in"+r.message);else{n=e.templates.userdetails_template({users:t.users});var n=$(n);$("#user_details").html(n),e._applySort(),e._showPagination({items:t.total,itemsOnPage:t.limit,selector:e.selectors.user_pagination,onPageClick:e._onPaginationClick(e)})}})},UIManager.prototype.initialize=function(){var e=this;e._initialize_edit_modal(),e._initialize_create_modal(),e._initialize_search_user()},UIManager.prototype._initialize_create_modal=function(){var e=this;$("#createuser").on("click",function(r){r.preventDefault();var t=$("#create input[name='name']").val(),n=$("#create input[name='linkedin_connections']").val(),a=$("#create input[name='facebook_connections']").val(),s=$("#create input[name='twitter_followers']").val();e.serverManager.createUser({name:t,linkedin_connections:n,facebook_connections:a,twitter_followers:s},function(){e.showUsersList()})})},UIManager.prototype._initialize_edit_modal=function(){var e=this,r=$("#edit");r.on("show.bs.modal",function(e){var t=$(e.relatedTarget),n=t.data("id"),a=t.data("name"),s=t.data("linkedin_connections"),i=t.data("facebook_connections"),o=t.data("twitter_followers");$("input[name='id']",r).val(n),$("input[name='name']",r).val(a),$("input[name='linkedin_connections']",r).val(s),$("input[name='facebook_connections']",r).val(i),$("input[name='twitter_followers']",r).val(o)}),$("#edituser").on("click",function(r){r.preventDefault();var t=$("#edit input[name='id']").val(),n=$("#edit input[name='name']").val(),a=$("#edit input[name='linkedin_connections']").val(),s=$("#edit input[name='facebook_connections']").val(),i=$("#edit input[name='twitter_followers']").val();e.serverManager.editUser(t,{name:n,linkedin_connections:a,facebook_connections:s,twitter_followers:i},function(r){r&&alert("Error in"+r.message),e.showUsersList()})})},UIManager.prototype._initialize_search_user=function(){var e=this;$("#search_user").keyup(function(){!1!==e.searchUserTimer&&clearTimeout(e.searchUserTimer);var r=$("#search_user").val();e.serverManager.updateQuery({searchTerm:r}),e.changeTimer=setTimeout(function(){e.showUsersList(),e.changeTimer=!1},300)})},UIManager.prototype._applySort=function(){var e=this;$(".sort").on("click",function(){var r,t=$(this).data("sort_field");$(this).hasClass("sorting_desc")?("desc",r="asc"):$(this).hasClass("sorting")?("none",r="asc"):$(this).hasClass("sorting_asc")&&("asc",r="desc"),e.serverManager.updateQuery({sort_field:t,sort_order:r}),e.showUsersList()}),$("#mytable thead th").each(function(){var r=$(this).data("sort_field");$(this).removeClass("sorting"),$(this).removeClass("sorting_asc"),$(this).removeClass("sorting_desc");var t=e.serverManager.getQuery();r===t.sort_field&&"asc"===t.sort_order?$(this).addClass("sorting_asc"):r===t.sort_field&&"desc"===t.sort_order?$(this).addClass("sorting_desc"):$(this).addClass("sorting")})},UIManager.prototype._onPaginationClick=function(e){return function(r,t){if(t){t.preventDefault();e.serverManager.updateQuery({page:r}),e.showUsersList()}}},UIManager.prototype._showPagination=function(e){var r=this;$(e.selector).pagination({items:e.items,itemsOnPage:e.itemsOnPage,onPageClick:e.onPageClick,cssStyle:"light-theme"}),$(r.selectors.user_pagination).pagination("selectPage",r.serverManager.getQuery().page)},$(document).ready(function(){var e=new ServerManager,r=new UIManager({serverManager:e});r.initialize(),r.showUsersList()});