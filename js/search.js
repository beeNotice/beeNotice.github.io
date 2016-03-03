var postTemplate = _.template(
	[
		'<div class="col-sm-12">',
		'  <div class="article-description">',
		'		<div>',
		'        <b><a href="<%= post.url %>"><%= post.title %></a></b>',
		'      	<small class="color-grey"><em>&nbsp;&nbsp;<%= post.date %></em></small>',
		'  	</div>',
		'		<div><%= post.excerpt %></div>',
		'		<div>',
		'			<% for (i in post.categories) { %>',
		'			<span class="label label-info"><%=  post.categories[i] %></span>&nbsp;',
		'			<% } %>',
		'			<% for (i in post.tags) { %>',
		'			<span class="label label-primary"><%= post.tags[i] %></span>&nbsp;',
		'			<% } %>',
		'		</div>',
		'	</div>',
		'	<hr/>',
		'</div>'
	].join(''));

var search = function(posts) {

	var queryParams = (function(queries) {
		
		if (queries == ""){
			return {};
		}

		var params = {};
		for (var i = 0; i < queries.length; ++i) {
			var param = queries[i].split('=', 2);
			if (param.length == 1){
				params[param[0]] = "";
			} else {
				params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
			}
		}
		return params;
	})(window.location.search.substr(1).split('&'));

	var searched = queryParams['q'];
	$('#page-title').text('Results for "' + searched + '"');
	$('#search-form').val(searched);

	var searchRegex = new RegExp(searched, 'i');
	_(posts)
	.filter(function (post) {
		var categoryMatch = _.any(post.categories, function (test) {
			return searchRegex.test(test)
		});
		var tagMatch = _.any(post.tags, function (test) {
			return searchRegex.test(test)
		});
		return categoryMatch
		|| tagMatch
		|| post.excerpt.match(searchRegex)
		|| post.title.match(searchRegex);
	})
	.forEach(function(matchingPost, index) {
		$('#search-results').append(postTemplate({post: matchingPost, loopindex: index}));
	});
}