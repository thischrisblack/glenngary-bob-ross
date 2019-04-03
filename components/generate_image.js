const tweet = require('./tweet_image');
var Jimp = require('jimp');

/**
 * This code modified from the example at 
 * https://medium.com/@rossbulat/image-processing-in-nodejs-with-jimp-174f39336153
 */

 
function processImage(startImage, text) {

    let imgActive = './assets/active/image.jpg';
    let imgExported = './assets/export/image1.jpg';

    let textData = {
        text: text,
        maxWidth: 940,
        maxHeight: 20,
        placementX: 30,
        placementY: 690
    };

    // Read template and clone image
    Jimp.read(startImage)

        // Clone the image
        .then(tpl => (tpl.clone().write(imgActive)))

        // We need a delay here to give the file time to finish writing.
        // It fails about 5-10% of the time without it.
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))

        // Read cloned (active) image
        .then(() => (Jimp.read(imgActive)))

        // Load font
        .then(tpl => (
            Jimp.loadFont('./assets/fonts/lucida-console-outline.fnt').then(font => ([tpl, font]))
        ))

        // Add text
        .then(data => {

            tpl = data[0];
            font = data[1];

            return tpl.print(font, textData.placementX, textData.placementY, {
                text: textData.text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
            }, textData.maxWidth, textData.maxHeight);
        })

        // Export image
        .then(tpl => (tpl.quality(100).write(imgExported, function () {
            // Once the file is written, tweet the image.
            tweet.tweetImage('../' + imgExported);
        })))

        // Catch errors
        .catch(err => {
            console.log(err);
        });

};

exports.processImage = processImage;