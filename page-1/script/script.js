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

var buttonGo = document.getElementById("goact-1");
var url_buttonGo = "great.html";
buttonGo.addEventListener("click", function () {
  window.location.href = url_buttonGo;
});

var buttonGo2 = document.getElementById("goact-2");
var url_buttonGo2 = "great.html";
buttonGo2.addEventListener("click", function () {
  window.location.href = url_buttonGo2;
});

// Function to get URL parameters
function getUrlParameter(parameterName) {
  var url = new URL(window.location.href);
  return url.searchParams.get(parameterName);
}

// Read and display URL parameters
var v1 = getUrlParameter("v1");
var v2 = getUrlParameter("v2");
console.log("v1=" + v1);
console.log("v2=" + v2);
