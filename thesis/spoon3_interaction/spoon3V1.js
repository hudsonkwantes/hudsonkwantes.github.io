let spoonSound, spoonSound2;
let spoonImg, spoonImg2;

let playButton, playbutton2;

let ampSlider, rateSlider, phSlider;
let ampSlider2, phSlider2;

let delay, delayFeedSlider, delayDecaySlider;

let loopButton;
let loopStartSlider, loopDurationSlider, loopRateSlider;

function preload() {
  spoonSound = loadSound('clink.mp3');
  spoonImg = loadImage('spoon1.png');

  spoonSound2 = loadSound('clink2.mp3');
  spoonImg2 = loadImage('spoon2.png')
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);

  playButton = createImg('spoon1.png', 'Play Button');
    playButton.position(100, 455);
    playButton.size(400, 400);
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
    phSlider.position(100, 900);
    phSlider.size(400);

  delay = new p5.Delay();
    delayFeedSlider = createSlider(0, 1, 0, 0.01); // Feedback control
      delayFeedSlider.position(100, 325);
      delayFeedSlider.size(400);
      delayFeedSlider.input(updateDelay);
    delayDecaySlider = createSlider(0, 1, 0, 0.01); // Delay time control
      delayDecaySlider.position(100, 400);
      delayDecaySlider.size(400);
      delayDecaySlider.input(updateDelay);
  delay.process(spoonSound, delayDecaySlider.value(), delayFeedSlider.value()); // Initial delay settings

//Spoon2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  playButton2 = createImg('spoon2.png', 'Play Button');
    playButton2.position(600, 455);
    playButton2.size(400, 400);
    playButton2.mousePressed(playSound2);

  ampSlider2 = createSlider(0, 1, 0.5, 0.01); // Amplitude control
    ampSlider2.position(600, 100);
    ampSlider2.size(400);
    ampSlider2.input(updateAmp2);

  phSlider2 = createSlider(0, 1, 0, 0.001); // Playhead control
    phSlider2.position(600, 900);
    phSlider2.size(400);

 // Create loop button for looping spoon sound

 loopButton = createCheckbox('Loop On/Off', false);
 loopButton.position(600, 175);

 // Create sliders for controlling the loop bounds
 loopStartSlider = createSlider(0, spoonSound2.duration(), 0, 0.01); // Start point of the loop
 loopStartSlider.position(600, 250);
 loopStartSlider.size(400);
 loopStartSlider.input(updateLoop);

 loopDurationSlider = createSlider(0, spoonSound2.duration(), 1, 0.01); // Duration of the loop
 loopDurationSlider.position(600, 325);
 loopDurationSlider.size(400);
 loopDurationSlider.input(updateLoop);

 loopRateSlider = createSlider(0.5, 2, 1, 0.01); // Rate control for the looping sound
 loopRateSlider.position(600, 400);
 loopRateSlider.size(400);
 loopRateSlider.input(updateLoop);

 

}

function draw() {
  background(236, 232, 174);

  // Update playhead
  if (spoonSound.isPlaying()) {
    phSlider.value(spoonSound.currentTime() / spoonSound.duration());
  } 

  // Display text
  fill(0);
  textSize(15);
  text(`Volume: ${ampSlider.value()}`, 100, 90);
  text(`Rate: ${rateSlider.value()}`, 100, 140);
  text(`Delay Feedback: ${delayFeedSlider.value()}`, 100, 310);
  text(`Delay Time: ${delayDecaySlider.value()}`, 100, 390);

//Spoon2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (spoonSound2.isPlaying()) {
  phSlider2.value(spoonSound2.currentTime() / spoonSound2.duration());
} 

// Display text
text(`Volume: ${ampSlider2.value()}`, 600, 90);
text(`Loop Start: ${loopStartSlider.value()}`, 600, 240);
text(`Loop Duration: ${loopDurationSlider.value()}`, 600, 310);
text(`Loop Rate: ${loopRateSlider.value()}`, 600, 390);

}



//Spoon1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function playSound() {
  // Play the sound when called
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

//Spoon2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function playSound2() {
  // Play the sound when called
  spoonSound2.play();
}
function updateAmp2() {
  spoonSound2.setVolume(ampSlider2.value());
}

function toggleLoop() {

    let startTime = loopStartSlider.value();
    let duration = loopDurationSlider.value();
    let rate = loopRateSlider.value();

    spoonSound2.loop(startTime, rate, 1, duration);
}

function updateLoop() {

    let startTime = loopStartSlider.value();
    let duration = loopDurationSlider.value();
    let rate = loopRateSlider.value();

    spoonSound2.loop(startTime, rate, 1, duration); // Restart loop with new parameters
  
}