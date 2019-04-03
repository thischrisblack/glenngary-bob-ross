// require('dotenv').config(); // Commented out for Heroku deployment.
const image = require('./components/generate_image');
const screenplay = require('./assets/screenplay.js');

// Create array with each line of dialogue.
scriptLines = screenplay.dialogue.split(/\r?\n/);

function alwaysBeClosing () {
    // Iterator starts at 1 because 0 is just a line break.
    let i = 1;

    let tweetTimer = setInterval(function () {

        // Get path of random image. Images are screenshots from Bob Ross videos.
        let randomImage = Math.floor(Math.random() * 20);
        let thisImage = './assets/raw/br-' + randomImage + '.JPG';

        console.log(scriptLines[i]);

        // Send image and line to Jimp for processing, where it will then be tweeted.
        image.processImage(thisImage, scriptLines[i]);

        // If we're at the end (-2 because line breaks), start over.
        if (i >= scriptLines.length - 2) { 
            clearInterval(tweetTimer);
            console.log('A Always B Be C Closing');
            alwaysBeClosing();
        } else {
            i++;
        };

    }, 60 * 60 * 1000); // One post per hour.
}

// Start the bot.
alwaysBeClosing();


/**
 * Initial testing code. Posts one random image/caption.
 */

// // Get random image, out here for testing.
// let randomImage = Math.floor(Math.random() * 20);
// let thisImage = './assets/raw/br-' + randomImage + '.JPG';

// // Get random dialogue, for testing
// let randomLine = Math.floor(Math.random() * scriptLines.length);
// let line = scriptLines[randomLine];

// // Process image. One-off with random dialogue, for testing.
// image.processImage(thisImage, line);