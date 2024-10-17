function togglePlay() {
  const pip = document.pictureInPictureElement;
  if(pip) {
    if(pip.paused) {
      pip.play();
    } else {
      pip.pause();
    }
  }
}

function forward() {
  const pip = document.pictureInPictureElement;
  if(pip) {
    pip.currentTime += 5;
  }
}

function backward() {
  const pip = document.pictureInPictureElement;
  if(pip) {
    pip.currentTime -= 5;
  }
}

function init() {
  const pip = document.pictureInPictureElement;
  if(pip) {
    pip.currentTime = 0;
  }
}

async function runPIPcommand(funct) {
  await chrome.tabs.query({url : "https://www.youtube.com/*"}).then(youtube_tabs => {
    youtube_tabs.forEach(tab => {
      chrome.scripting.executeScript({target: {tabId : tab.id}, func : funct});
    });
  });
}

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "toggle_play":
      runPIPcommand(togglePlay);
      break;
    
    case "forward":
      runPIPcommand(forward);
      break;

    case "backward":
      runPIPcommand(backward)
      break;

    case "init":
      runPIPcommand(init)
      break

  }
});
