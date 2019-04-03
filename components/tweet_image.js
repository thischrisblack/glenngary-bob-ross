var fs = require('fs');
var path = require('path');
var Twit = require('twit')

/**
 * This code modified from examples at 
 * https://botwiki.org/resource/tutorial/random-image-tweet/#posting-images
 * and also https://github.com/ttezel/twit
 */

function tweetImage (imageFile) {
    var T = new Twit({
      consumer_key:         process.env.CONSUMER_KEY,
      consumer_secret:      process.env.CONSUMER_SECRET,
      access_token:         process.env.ACCESS_TOKEN,
      access_token_secret:  process.env.ACCESS_TOKEN_SECRET
    });

    var image_path = path.join(__dirname, imageFile);
    var b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    // first we must post the media to Twitter
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {

      var mediaIdStr = data.media_id_string;
      var meta_params = { media_id: mediaIdStr };

      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { media_ids: [mediaIdStr] };

          T.post('statuses/update', params);
        } else {
            console.log(err);
        }
      });
      
    });
}

exports.tweetImage = tweetImage;