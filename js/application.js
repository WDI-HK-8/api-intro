$(document).ready(function(){

  var MovieFinder = function(){
    this.timer = null;
    this.hideDot();
    this.searches = [];
  };

  MovieFinder.prototype.hideDot = function(){
    clearInterval(this.timer);
    $('#loading').text('');
  };

  MovieFinder.prototype.showDot = function(){
    clearInterval(this.timer);
    var times = 0;

    this.timer = setInterval(function(){
      $('#loading').append('.');
      times++;

      if (times >= 7) {
        $('#loading').text('');
        times = 0;
      }
    }, 300);
  };

  MovieFinder.prototype.loadingScreen = function(){
    $('.info').hide();
    this.showDot();
  };

  MovieFinder.prototype.search = function(title){
    this.loadingScreen();
    this.searches.push(title);

    var constructHtml = function(response, keys){
      var html = '';
      
      keys.forEach(function(key){
        html += '<li>';
        html +=   '<div class="col-xs-3">';
        html +=     key;
        html +=   '</div>';
        html +=   '<div class="col-xs-9">';
        html +=     response[key]
        html +=   '</div>';
        html += '</li>';
      });

      return html;
    };

    var successFunction = function(response){
      console.log("Finish searching for", title);
      console.log("This is the response: ", response);

      var keys = ['Title', 'Year', 'Rated', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Language', 'Country', 'Awards'];

      var html = constructHtml(response, keys);

      setTimeout(function(){
        $('#poster').attr("src", response["Poster"]);
        $('#details').html(html);
        $('.info').show();
        movieFinder.hideDot();
      }, 2000);
    };

    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/?t=" + title,
      dataType: "JSON",
      success: successFunction
    });
  };

  var movieFinder = new MovieFinder();

  $('#search-form').submit(function(){
    event.preventDefault();

    $('#search-form').animate({'margin-top': '0px'}, 1000);
    $('.info').removeClass('hidden');

    var title = $('#title').val();
    movieFinder.search(title);
  })

  $('#enter').hover(function(){
    $('#enter').hide();
    $('#enterpic').removeClass('hidden');
  });
});
