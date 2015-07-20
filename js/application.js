$(document).ready(function(){
  var timer;

  var hideDot = function(){
    $('#loading').hide();
    $('#loading').html('');
    clearInterval(timer);
  }

  var showDot = function(){
    var times = 0;

    $('#loading').show();
    clearInterval(timer);

    timer = setInterval(function(){
      $('#loading').append('.');
      times++;

      if (times >= 7) {
        $('#loading').html('');
        times = 0;
      }
    }, 300);
  }

  hideDot();

  var search = function(title) {
    $('.info').hide();
    showDot();

    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/?t=" + title,
      dataType: "JSON",
      success: function(response) {
        console.log("Finish searching for", title);
        console.log("This is the response: ", response);
        
        $('#poster').attr("src", response["Poster"]);

        var keys = ['Title', 'Year', 'Rated', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Language', 'Country', 'Awards'];
        var html = '';

        keys.forEach(function (key) {
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
          hideDot();
        }, 2000)
      }
    });
  }

  $('#search-form').submit(function(){
    event.preventDefault();

    $('#search-form').animate({'margin-top': '0px'}, 1000);
    $('.info').removeClass('hidden');

    var title = $('#title').val();
    search(title);
  })

  $('#enter').hover(function(){
    $('#enter').hide();
    $('#enterpic').removeClass('hidden');
  });
});
