let spoonSound, spoonImg;
let playButton, loopButton;
let ampSlider, rateSlider, phSlider;
let delay, delayFeedSlider, delayDecaySlider;
let loopStartSlider, loopDurationSlider;

function preload() {
  spoonSound = loadSound('spoonDrop.mp3');
  spoonImg = loadImage('spoon1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playButton = createImg('spoon1.png', 'Play Button');
  playButton.position(600, 100);
  playButton.size(190, 700);
  playButton.mousePressed(playSound);

  ampSlider = createSlider(0, 1, 0.5, 0.01); // Amplitude control
  ampSlider.position(100, 100);
  ampSlider.size(400);
  ampSlider.input(updateAmp);

  rateSlider = createSlider(0, 2, 1, 0.01); // Pitch rate control
  rateSlider.position(100, 150);
  rateSlider.size(400);
  rateSlider.input(updateRate);

  phSlider = createSlider(0, 1, 0, 0.001); // Playhead control
  phSlider.position(100, 800);
  phSlider.size(400);

  delay = new p5.Delay();

  delayFeedSlider = createSlider(0, 1, 0, 0.01); // Feedback control
  delayFeedSlider.position(100, 300);
  delayFeedSlider.size(400);
  delayFeedSlider.input(updateDelay);

  delayDecaySlider = createSlider(0, 1, 0, 0.01); // Delay time control
  delayDecaySlider.position(100, 350);
  delayDecaySlider.size(400);
  delayDecaySlider.input(updateDelay);

  delay.process(spoonSound, delayDecaySlider.value(), delayFeedSlider.value()); // Initial delay settings

  loopButton = createCheckbox('', false);
  loopButton.position(100, 500);
  loopButton.style('scale', '1.3');
  loopButton.changed(toggleLoop);

  loopStartSlider = createSlider(0, spoonSound.duration(), 0, 0.01); // Start point of the loop (initial range will be updated)
  loopStartSlider.position(100, 550);
  loopStartSlider.size(400);
  loopStartSlider.input(toggleLoop);

  loopDurationSlider = createSlider(0, spoonSound.duration(), spoonSound.duration(), 0.01); // Duration of the loop (initial range will be updated)
  loopDurationSlider.position(100, 600);
  loopDurationSlider.size(400);
  loopDurationSlider.input(toggleLoop);
}

function draw() {
  background(236, 232, 174);

  // Update playhead
  if (spoonSound.isPlaying()) {
    phSlider.value(spoonSound.currentTime() / spoonSound.duration());
  }

  fill(0);
  textSize(15);
  text(`Volume: ${ampSlider.value()}`, 100, 90);
  text(`Rate: ${rateSlider.value()}`, 100, 140);
  text(`Delay Feedback: ${delayFeedSlider.value()}`, 100, 290);
  text(`Delay Time: ${delayDecaySlider.value()}`, 100, 340);
  text(`Loop`, 100, 490);
  text(`Loop Start: ${loopStartSlider.value()}`, 100, 540);
  text(`Loop Duration: ${loopDurationSlider.value()}`, 100, 590);
  
  textSize(50);
  text('Spoon 3', 890, 140);
  textSize(15);
  text('Digital Instrument Prototype ', 890, 200);
  text('OCAD U Industrial Design Thesis INDS-4001-301;', 890, 220);
  text('Research Phase 1, 2024', 890, 240);
  text('Programming + Interface Design by Hudson Kwantes.', 890, 720);
  text('Designed using p5.js + p5.js Sound Library.', 890, 740);
  text('Troubleshooting + Debugging using ChatGPT.', 890, 760);
  text('Image via https://www.pinterest.com/pin/spoon-png-image--692921092647083837/.', 890, 780);
  text('Audio Sample via Hudson Kwantes.', 890, 800);
  
}

function playSound() {
  // If looping is on, stop the loop and uncheck the loop button
  if (loopButton.checked()) {
    spoonSound.stop();
    loopButton.checked(false); // Uncheck the loop button to reflect the new state
  }

  // Play the sound once
  spoonSound.setLoop(false); // Ensure it plays once, not in loop mode
  spoonSound.play();
}

function updateAmp() {
  spoonSound.setVolume(ampSlider.value());
}

function updateRate() {
  spoonSound.rate(rateSlider.value());
}

function updateDelay() {
  let delayTime = delayDecaySlider.value();
  let feedback = delayFeedSlider.value();
  delay.delayTime(delayTime);
  delay.feedback(feedback);
}

function toggleLoop() {
  if (loopButton.checked()) {
    let loopStart = loopStartSlider.value();
    let loopDuration = loopDurationSlider.value();
    let loopRate = rateSlider.value();

    // Stop any current playback before starting a new loop
    spoonSound.stop();

    // Set loop parameters and start looping from the specified start and duration
    spoonSound.loop(0, loopRate, 1, loopStart, loopDuration);
  } else {
    // If the checkbox is unchecked, stop looping
    spoonSound.stop();
  }
}