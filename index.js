// require('dotenv').config(); // Commented out for Heroku deployment.
const generateImage = require("./components/generate_image");
const screenplay = require("./assets/screenplay.js");

// Create array with each line of dialogue.
scriptLines = screenplay.dialogue.split(/\r?\n/);

function alwaysBeClosing() {
  setInterval(function() {
    // Get path of random image. Images are screenshots from Bob Ross videos.
    let randomImage = Math.floor(Math.random() * 20);
    let thisImage = "./assets/raw/br-" + randomImage + ".JPG";

    // Get a line of dialogue.
    let randomLine = Math.floor(Math.random() * (scriptLines.length - 2)) + 1;
    let line = scriptLines[randomLine];

    console.log(line);

    // Send image and line to Jimp for processing, where it will then be tweeted.
    generateImage.processImage(thisImage, line);
  }, 4 * 60 * 60 * 1000); // One post every four hours.
}

// Start the bot.
alwaysBeClosing();
