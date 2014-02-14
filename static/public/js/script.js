$(document).ready(function(){
	var pagebody = $("#pagebody");
	var themenu  = $("#navmenu");
	var topbar   = $("#toolbarnav");
	var content  = $("#content");
	var viewport = {
    	width  : $(window).width(),
    	height : $(window).height()
	};
	// retrieve variables as 
	// viewport.width / viewport.height
	
	initializePage();

	function initializePage() {
		$('#sort').change(sort);
		$('#tfnewsearch').submit(search);
		$('.addrecipebtn').click(addRecipe);
	}

	function addRecipe(e) {
		e.preventDefault();
		$.post('/add', { name: $('.title').html() });
	}

	function search(e) {
		e.preventDefault();
		var category = $('#sort').val();
		$.get('/tiles/' + category, searchData);
	}

	function searchData(result) {
		var idx = lunr(function () {
    		this.field('name', { boost: 10 });
    		this.field('overview');
		});
		for( var i = 0; i < result.length; i++ ) {
			idx.add(result[i]);
		}

		var searchRes = idx.search($('#query').val());
		var tile = '<a href="/recipe/{{name}}"><div class="pin"><img src="/images/{{img}}" alt=""><h2>{{name}}</h2></div></a>';
		var template = Handlebars.compile( tile );
		var html = "";
		for( var i = 0; i < searchRes.length; i++ ) {
			//go through searchRes array and then access the recipes array at that index and template it
			//then put the data in html. You may need to figuire out about scores.
			html = html + template(result[searchRes[i].ref]);
		}
		$('#columns').html(html);
	}

	function sort(e) {
		e.preventDefault();
		var category = $('#sort').val();
		$.get('/tiles/' + category, displayTiles);
	}

	function displayTiles(result) {
	    var tile = '<a href="/recipe/{{name}}"><div class="pin"><img src="/images/{{img}}" alt=""><h2>{{name}}</h2></div></a>';
		var template = Handlebars.compile( tile );
		var html = "";
		for( var i = 0; i < result.length; i++ ) {
			html = html + template(result[i]);
		}
		$('#columns').html(html);
	}

	function openme() { 
		$(function () {
		    topbar.animate({
		       left: "290px"
		    }, { duration: 300, queue: false });
		    pagebody.animate({
		       left: "290px"
		    }, { duration: 300, queue: false });
		});
	}
	
	function closeme() {
		var closeme = $(function() {
	    	topbar.animate({
	            left: "0px"
	    	}, { duration: 180, queue: false });
	    	pagebody.animate({
	            left: "0px"
	    	}, { duration: 180, queue: false });
		});
	}

	// checking whether to open or close nav menu
	$("#menu-btn").live("click", function(e){
		e.preventDefault();
		var leftval = pagebody.css('left');
		
		if(leftval == "0px") {
			openme();
		}
		else { 
			closeme(); 
		}
	});
	
	// loading page content for navigation
	$("a.navlink").live("click", function(e){
		e.preventDefault();
		var linkurl     = $(this).attr("href");
		var linkhtmlurl = linkurl.substring(1, linkurl.length);
		
		var imgloader   = '<center style="margin-top: 30px;"><img src="../static/public/images/preloader.gif" alt="loading..." /></center>';
		
		closeme();
		
		$(function() {
			topbar.css("top", "0px");
			window.scrollTo(0, 1);
		});
		
		content.html(imgloader);
		
		setTimeout(function() { content.load(linkhtmlurl, function() { /* no callback */ }) }, 1200);
	});
});