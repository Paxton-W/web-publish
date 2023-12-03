//
//
//
// Read and display URL parameters
var v1 = getUrlParameter("v1");
var v2 = getUrlParameter("v2");

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

var paragraphElement1 = document.getElementById("option1");
paragraphElement1.textContent = v1;

var paragraphElement2 = document.getElementById("option2");
paragraphElement2.textContent = v2;

console.log("v1=" + v1);
console.log("v2=" + v2);
// Get the URL of the current iframe
var iframeUrl = window.location.href;
console.log("Current Iframe URL:", iframeUrl);
