let spoonSound;
let playButton;
let loopButton;

function preload() {
    spoonSound = loadSound('clink.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Button to play the sound once
    playButton = createImg('spoon1.png', 'Play Button');
    playButton.position(1000, 100);
    playButton.size(700, 700);
    playButton.mousePressed(playSound);

    // Checkbox to toggle looping
    loopButton = createCheckbox('Loop On/Off', false);
    loopButton.position(600, 175);
    loopButton.changed(looperToggle);
}

function draw() {
    background(236, 232, 174);
}

function playSound() {
    // If looping is on, stop the loop and uncheck the loop button
    if (loopButton.checked()) {
        spoonSound.stop(); // Stop the looping sound
        loopButton.checked(false); // Uncheck the loop button to reflect the new state
    }

    // Play the sound once
    spoonSound.setLoop(false); // Ensure it plays once, not in loop mode
    spoonSound.play();
}

function looperToggle() {
    // If the checkbox is checked, start looping
    if (loopButton.checked()) {

        if (!spoonSound.isPlaying()) {
            spoonSound.loop(); // Start looping if not already playing
        } else {
            spoonSound.setLoop(true); // Ensure it is in loop mode if it's already playing
        }
        
    } else {
        // If the checkbox is unchecked, stop the sound
        spoonSound.stop();
    }
}
