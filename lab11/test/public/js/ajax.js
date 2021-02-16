//pageload
$(document).ready(function () {
  counter = 0;
  $.ajax({
    method: "GET",
    url: "http://api.tvmaze.com/shows",
  })
    .then(function (shows) {
      $.each(shows, function (num, data) {
        counter++;
        $("#showList").append(
          "<li class='link'><a data-page=" +
            counter +
            " href=" +
            data._links.self.href +
            ">" +
            data.name +
            "</a></li>"
        );
      });
    })
    .then(function () {
      $("#showList").css({ display: "block" });
    });
});

(function ($) {
  var search_term = $("#search_term");
  $("#searchForm").submit(function (event) {
    search_term = search_term.val();
    event.preventDefault();
    try {
      if (
        search_term === undefined ||
        search_term === "" ||
        search_term === null ||
        $.trim(search_term) === ""
      ) {
        throw "No search_term provided";
      }
      $("#showList").empty();
      $.ajax({
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + search_term,
      }).then(function (results) {
        $.each(results, function (num, data) {
          $("#showList").append(
            "<li class='link'><a href=" +
              data.show._links.self.href +
              ">" +
              data.show.name +
              "</a></li>"
          );
        });
      });
    } catch (e) {
      alert("Please enter a valid search Term");
    }
  });

  $("#showList").on("click", "li.link a", function (event) {
    event.preventDefault();
    $("#showList").css({ display: "none" });
    $("#show").empty();
    let currentLink = event.target.href;
    $.ajax({
      method: "GET",
      url: currentLink,
    })
      .then(function (data) {
        if (!data.language) {
          data.language = "N/A";
        }
        if (!data.genres) {
          data.language = "N/A";
        }
        if (!data.rating.average) {
          data.language = "N/A";
        }
        if (!data.network.name) {
          data.language = "N/A";
        }
        if (!data.summary) {
          data.summary = "N/A";
        }
        if (!data.name) {
          data.name = "N/A";
        }
        $("#show").append("<h1>" + data.name + "</h1>");

        if (!data.image) {
          $("#show").append(
            "<img src=" + "../public/no_image.jpeg" + "></img>"
          );
        } else {
          $("#show").append("<img src=" + data.image.medium + "></img>");
        }

        $("#show").append(
          "<dl class='defList' ><dt>Language </dt><dd>" +
            data.language +
            "</dd>" +
            "<dt>Genres</dt><dd>" +
            makeUnorderedList(data.genres).innerHTML +
            "</dd><dt>Average Rating</dt><dd>" +
            data.rating.average +
            "</dd>" +
            "</dd><dt>Network Name</dt><dd>" +
            data.network.name +
            "</dd>" +
            "</dd><dt>Summary</dt><dd>" +
            data.summary +
            "</dd></dl>"
        );
      })
      .then(function () {
        $("#show").css({ display: "block" });
        $("#homeLink").css({ display: "block" });
      });
  });
  function makeUnorderedList(array) {
    var list = document.createElement("ul");
    for (var i = 0; i < array.length; i++) {
      var item = document.createElement("li");
      item.appendChild(document.createTextNode(array[i]));
      list.appendChild(item);
    }
    return list;
  }
})(window.jQuery);
