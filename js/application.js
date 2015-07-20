$(document).ready(function(){
  var SearchEngine = function(){
    this.timer = null;
    this.hideDot();
  };

  SearchEngine.prototype.hideDot = function(){
    clearInterval(this.timer);
    $('#loading').text('');
  };

  SearchEngine.prototype.showDot = function(){
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

  SearchEngine.prototype.loadingScreen = function(){
    $('.info').hide();
    this.showDot();
  };

  SearchEngine.prototype.search = function(title){
    this.loadingScreen();

    var successFunction = function(response){
      console.log("Finish searching for", title);
      console.log("This is the response: ", response);

      $('#poster').attr("src", response["Poster"]);

      var keys = ['Title', 'Year', 'Rated', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Language', 'Country', 'Awards'];
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

      setTimeout(function(){
        $('#details').html(html);
        $('.info').show();
        searchEngine.hideDot();
      }, 2000);
    };

    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/?t=" + title,
      dataType: "JSON",
      success: successFunction
    });
  };

  var searchEngine = new SearchEngine();

  $('#search-form').submit(function(){
    event.preventDefault();

    $('#search-form').animate({'margin-top': '0px'}, 1000);
    $('.info').removeClass('hidden');

    var title = $('#title').val();
    searchEngine.search(title);
  })

  // $('#enter').hover(function(){
  //   $('#enter').hide();
  //   $('#enterpic').removeClass('hidden');
  // });
});
