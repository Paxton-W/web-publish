//
//
//

var buttonGoMusic = document.getElementById("gomusic");
var url_buttonGoMusic = "https://www.youtube.com/watch?v=VVC0146RHUM";
buttonGoMusic.addEventListener("click", function () {
  window.location.href = url_buttonGoMusic;
});


var buttonGoPodcast = document.getElementById("gopodcast");
var url_buttonGoPodcast = "https://podcasts.google.com/";
buttonGoPodcast.addEventListener("click", function () {
  window.location.href = url_buttonGoPodcast;
});

// Function to get URL parameters
function getUrlParameter(parameterName) {
    var url = new URL(window.location.href);
    return url.searchParams.get(parameterName);
}

// Read and display URL parameters
var name1 = getUrlParameter("name");
var age1 = getUrlParameter("age");
console.log(name1)
console.log(age1)