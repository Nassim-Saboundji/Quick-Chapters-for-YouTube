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
    document.getElementById('columnContainer').classList.remove('hidden');

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function copyToClipboard(){
    
    let chapters = document.getElementById("results");
    chapters.value += "Made with Quick Chapters for YouTube. The extension is available on (Chrome) and (Firefox)";
    chapters.select();
    chapters.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    chapters.value = "Copy to clipboard successful!";
    await sleep(3000);
    chapters.value = "";
}


function backToYouTube(){
    console.log("it works no");
    let url = document.getElementById("link").value;
    window.location.href = url;
    history.pushState({},"", "");
}




// Get the input field
let input = document.getElementById("link");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard  
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    console.log("HEY IT WORKS!");
    document.getElementById("loadVid").click();
  }
}); 

let titleInput = document.getElementById('title');
titleInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard  
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      let title = titleInput.value.split("\n");
      titleInput.value = title[0];

      document.getElementById("writeTitle").click();
    }

    //we press shift while the player is playing
    if (event.key === "Shift") {
        event.preventDefault();
        //the video is currently playing! so pause it.
        if (player.getPlayerState() == 1){
            player.pauseVideo();
        }
        
        //the video is currently paused! so play it.
        if (player.getPlayerState() == 2){
            player.playVideo();
        }

    }

    if (event.key === "Alt") {
        player.pauseVideo();
        player.seekTo(player.getCurrentTime() + 5, true);
        player.playVideo();
    }

    if (event.key === "Control") {
        player.pauseVideo();
        player.seekTo(player.getCurrentTime() - 5, true);
        player.playVideo();
    }

    if (event.key === "ArrowUp") {
        player.pauseVideo();
        player.seekTo(player.getCurrentTime() + 30, true);
        player.playVideo();
    }

    if (event.key === "ArrowDown") {
        player.pauseVideo();
        player.seekTo(player.getCurrentTime() - 30, true);
        player.playVideo();
    }
});
