function iframeView() {
  $("#header").removeClass("d-none");
  $("#page-viewer").removeClass("d-none");
  $("#full-body-container").addClass("d-none").removeClass("d-flex");
  $("#results-container").removeClass("d-none");
  $(".search-result").empty();
};

function searchWiki() {
  if($("#header").hasClass("d-none")) {
    searchStr = $("#body-search-box").val();
  } else if($("#full-body-container").hasClass("d-none")) {
    searchStr = $("#header-search-box").val();
  } else {
    return;
  }

  var wikiUrl = "https://en.wikipedia.org/w/api.php?callback=wikiCallBack";
	wikiUrl += '&' + $.param({
		'action': 'opensearch',
		'format': 'json',
		'search': searchStr
	});

	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(data) {
			var articleList = data[1];
			var articleSnippets = data[2];
			var articleUrls = data[3];

      $("#header").removeClass("d-none");
      $("#results-container").removeClass("d-none");
      $("#full-body-container").addClass("d-none").removeClass("d-flex");
      $("#page-viewer").addClass("d-none");
      $(".search-result").empty();

			for (var i=0; i< articleList.length; i++) {
				var title = articleList[i];
				var snippet = articleSnippets[i];
				var url = articleUrls[i];
        $(".search-result").append(
          "<div class='row'><div class='col'><a href='" + url + "' target='_blank'><div class='card search-results card-body'><h4 class='card-title'>" + title + "</h4><p class='card-text'>" + snippet + "</p></div></a></div></div>"
        )
			};

		}
	});
}

var searchStr;

$(document).ready(function() {
  $(".random-article-button").click(function() {
    iframeView();
  });
  $(".logo").click(function() {
    iframeView();
  });
  $(".search-form").submit(function() {
    searchWiki();
  });
});
