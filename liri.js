
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var type = process.argv[2];
var input = process.argv[3];


switch (type) {
    case "my-tweets":
        getTweets();
        break;

    case "spotify-this-song":
        spotifySong(input);
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        extFile();
        break;
}

function getTweets() {

    var parameters = {
        screen_name: "SolaIvelise",
        count: 20
    }
    client.get("statuses/user_timeline", parameters, function (error, tweets, response) {

        if (error) throw error;
        for (i = 0; i < tweets.length; i++) {
            console.log(" ");
            console.log([i + 1] + ". " + tweets[i].text);
            console.log("Created on: " + tweets[i].created_at);
            console.log(" ");
        }
    });
}

function spotifySong(parameter) {
    // if (!parameter) {
    //     parameter = "The Sign";
    // }
    spotify.request("https://api.spotify.com/v1/search?q=" + parameter + "&type=track", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log(" ");
            console.log('Artist: ' + result.tracks.items[0].artists[0].name);
            console.log('Song: ' + result.tracks.items[0].name);
            console.log('Preview Link: ' + result.tracks.items[0].preview_url);
            console.log('Album: ' + result.tracks.items[0].album.name);
            console.log(" ");
        }
    });
}