// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widgets/dialog

$(function (){
	// Al pulsar en el enlace de show lo capturamos y ejecutamos
	// la función para que muestre en un modal la información
	$("a.UserShow").click(function(e){
		
		show_user($(this).data('userid'));
		
		return false;
	});

	// Capturamos el click de el enlace edit
	$("a.UserEdit").click(function(e){
		
		edit_user($(this).data('userid'));

		return false;
	})

	// Capturamos el click en el boton de guadar los datos
	// del usuario modificiado
	$("#updateUser").click(function(){

		save_edit_user($(this).parent());
	
	});

	// Capturamos el click para crear un nuevo post
	$(".addPost").click(function(){

		post_new($(this).data('userid'));

		return false;
	});

	// Guardar el Post
	$("#savePost").click(function(){
		save_new_post($(this).parent());
	});

	// Mostrar los Post del usuario
	$(".showPost").click(function(){
		userId = $(this).data('userid');

		$("#showPost").text('');

		postTable = $('<table>');
		postTable.append('<thead><tr><th>Post ID</th><th>Content</th></tr></thead>');

		$.getJSON("microposts/",function(data){
			$(data).each(function(id, post){
				if (userId == post.user_id){
					tr = $('<tr>');
					tr.append('<td>' + id + '</td><td>' + post.content + '</td>');
					postTable.append(tr);
				}
			});
		});

		$('#showPost').append(postTable);

		$("#showPost").dialog("open");

		return false;
	})

	$("#edit").dialog({  // Definimos el modal para editar
	   autoOpen: false,
	   height: 300,
	   width: 350,
	   modal: true,
	   closeText: ""
	});

	$("#newPost").dialog({  // Definimos el modal para nuevos post
	   autoOpen: false,
	   height: 300,
	   width: 350,
	   modal: true,
	   closeText: ""
	});

	$("#showPost").dialog({  // Definimos el modal para nuevos post
	   autoOpen: false,
	   modal: true,
	   closeText: ""
	});

});

// Funcion para mostrar los datos del usuario
function show_user(id) {
	$.getJSON( "users/" + id, function( data ) {
		$("#name").text(data.name);
		$("#email").text(data.email);
		$("#show").dialog({closeText: ""});
	});
}

// Función parar mostrar los datos del usuario dentro del formulario
function edit_user(id){

	$.getJSON( "users/" + id, function( data ) {
		$("#editId").text(id);
		$("#editName").val(data.name);
		$("#editEmail").val(data.email);
		$("#edit").dialog("open");
	});

}

// Función para guardar los datos del usuario
function save_edit_user(dataForm){

	id = $(dataForm).find("#editId").text();
	name = $(dataForm).find('#editName').val();
	email = $(dataForm).find('#editEmail').val();

	$.ajax({
  			type: 'POST',
  			url: "/users/" + id,
  			data: "user[name]=" + name + "&user[email]=" + email + "&_method=patch",
  			cache: false
		});
}

// Funcion para mostrar el modal de un nuevo post
function post_new (id){
	$("#micropost_user_id").val(id);

	$("#newPost").dialog("open");

}

// Función para guardar el nuevo post
function save_new_post(dataForm){
	id = $(dataForm).find("#micropost_user_id").val();
	content = $(dataForm).find("#micropost_content").val();

	$.ajax({
  			type: 'POST',
  			url: "/microposts",
  			data: "micropost[content]=" + content + "&micropost[user_id]=" + id + "&_method=create",
  			cache: false
		});
}