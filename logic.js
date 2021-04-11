var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '349',
    width: '560',
    videoId: null,
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

function onPlayerReady(event) {
event.target.playVideo();
}

function onPlayerStateChange(event) {
console.log(player.getCurrentTime());
}

function changeVideo(){

let playerContainer = document.getElementById("player");
playerContainer.classList.remove("hidden");
document.getElementById('outerVideoContainer').classList.remove("hidden");

let videoLink = document.getElementById('link').value;
console.log(videoLink)
if (videoLink != ''){

    player.loadVideoById(videoLink.split("v=")[1].substring(0, 11));
}
}

function convertTime(time){
let hours = time/3600;
let minutes = (hours - Math.floor(hours)) * 60;
let seconds = time % 60;

hours = Math.floor(hours);
minutes = Math.floor(minutes);
seconds = Math.floor(seconds);

if ((minutes + "").length == 1){
    minutes = "0" + minutes;
}

if ((seconds + "").length == 1){
    seconds = "0" + seconds;
}

return hours + ":" + minutes + ":" + seconds;
}

function writeTitle(){
    let title = document.getElementById('title').value;
    
    let chapter = convertTime(player.getCurrentTime()) + " " + title + "\n";
    let currentResults = document.getElementById('results').value; 
    document.getElementById('results').value = currentResults + chapter;
    document.getElementById('title').value = "";
}

function copyToClipboard(){
    
    let chapters = document.getElementById("results");

    chapters.select();
    chapters.setSelectionRange(0, 99999); 

    document.execCommand("copy");
}