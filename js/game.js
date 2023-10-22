let canvas;
let world;
let keyboard = new Keyboard();
let audioActivated = true;
let mobileMode = false;

function init() {
    canvas = document.getElementById('canvas'); 
    ctx = canvas.getContext("2d");
    checkWindowSize();
    bindKeyPressEvents();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    } 
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode = 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {    
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode = 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function bindKeyPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById("btnLeft").addEventListener("touchend", (ev) => {
        ev.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("btnRight").addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById("btnRight").addEventListener("touchend", (ev) => {
        ev.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById("btnJump").addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById("btnJump").addEventListener("touchend", (ev) => {
        ev.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById("btnThrow").addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        keyboard.D = true;
    });

    document.getElementById("btnThrow").addEventListener("touchend", (ev) => {
        ev.preventDefault();
        keyboard.D = false;
    });
}


function startGame() {
    closeStartOverlay();
    closeEndOverlay();
    initLevel(); 
    world = new World(canvas, keyboard); 
}

function closeStartOverlay() {
    document.getElementById("startScreen").style.display = 'none';
    document.getElementById("btnStart").classList.add("d-none");
}

function showEndScreenGameOver() {
    document.getElementById("endScreenWin").style.display = 'block';
    document.getElementById("btnRestart").classList.remove("d-none");
}

function showEndScreenLoose() {
    document.getElementById("endScreenLoose").style.display = 'block';
    document.getElementById("btnRestart").classList.remove("d-none");;
}

function closeEndOverlay() {
    document.getElementById("endScreenWin").style.display = 'none';
    document.getElementById("endScreenLoose").style.display = 'none';
    document.getElementById("btnRestart").classList.add("d-none");
}

function toggleFullScreen() {
    let mainContainer = document.getElementById('mainContainer');
    let canvas = document.getElementById('canvas');
    let startScreen = document.getElementById("startScreen");
    let endScreenWin = document.getElementById("endScreenWin");
    let endScreenLoose = document.getElementById("endScreenLoose");
    let instructionContainer = document.getElementById('instructionContainer');

    if (!document.fullscreenElement) {
        openFullscreen(mainContainer, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer);
    } else {
        closeFullscreen(mainContainer, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer);
    }
} 

function openFullscreen(mainContainer, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer) {
    if (mainContainer.requestFullscreen) {
        mainContainer.requestFullscreen();
        document.getElementById("full-screen").src = "img/fullscreen_close.png";
    } else if (mainContainer.webkitRequestFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer)
        mainContainer.webkitRequestFullscreen();
    else if (mainContainer.msRequestFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer)
        mainContainer.msRequestFullscreen();

    canvas.classList.add("fullScreen");
    startScreen.classList.add("fullScreen");
    endScreenWin.classList.add("fullScreen");
    endScreenLoose.classList.add("fullScreen");
    instructionContainer.classList.add("fullScreen");
}

function closeFullscreen(canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("full-screen").src = "img/fullscreen_open.png";
    } else if (document.webkitExitFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer)    
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, instructionContainer)
        document.msExitFullscreen();

    canvas.classList.remove("fullScreen");
    startScreen.classList.remove("fullScreen");
    endScreenWin.classList.remove("fullScreen");
    endScreenLoose.classList.remove("fullScreen");
    instructionContainer.classList.remove("fullScreen");
}

function checkWindowSize() {
    if (window.matchMedia("(orientation: portrait").matches)
        document.getElementById("rotateContainer").classList.remove("d-none"); 
    else
        document.getElementById("rotateContainer").classList.add("d-none");  
}

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    if (e.matches) {
        document.getElementById("rotateContainer").classList.remove("d-none"); 
        hideElementsByOrientationAlertScreen();
    } else {
        document.getElementById("rotateContainer").classList.add("d-none"); 
        showElementsAfterOrientationAlertScreen();
    }
});

function hideElementsByOrientationAlertScreen(){
    document.getElementById("btnStart").classList.add("d-none");
    document.getElementById("options").classList.add("d-none");
    document.getElementById("btnRestart").classList.add("d-none");
}

function showElementsAfterOrientationAlertScreen(){
    document.getElementById("btnStart").classList.remove("d-none");
    document.getElementById("options").classList.remove("d-none");
    document.getElementById("btnRestart").classList.remove("d-none");
}

function toggleInstruction() {
    let instructionContainer = document.getElementById('instructionContainer');
    if (instructionContainer.classList.contains('d-none')) {
        instructionContainer.classList.remove("d-none");
    }
    else {
        instructionContainer.classList.add("d-none");
    }
}

function toggleAudio() {
    let icon = document.getElementById("audio");
    if (audioActivated) {
        audioActivated = false;
        icon.src = "img/mute.png";
        world.audio_bgmusic.pause();
    } else {
        audioActivated = true;
        icon.src = "img/speaker.png";
        world.audio_bgmusic.play();
    }
}
