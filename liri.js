
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var type = process.argv[2];
var input = process.argv[3];
var value = getValue(process.argv);


switch (type) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        getMovie(input);
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

    if (!parameter) {
        parameter = "The Sign";
    }
    // spotify.request("https://api.spotify.com/v1/search?q=" + parameter + "&type=track", function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body);
    // var result = JSON.parse(body);
    // console.log(" ");
    // console.log('Artist: ' + result.tracks.items[0].artists[0].name);
    // console.log('Song: ' + result.tracks.items[0].name);
    // console.log('Preview Link: ' + result.tracks.items[0].preview_url);
    // console.log('Album: ' + result.tracks.items[0].album.name);
    // console.log(" ");
    // }
    spotify.search({ type: "track", query: parameter }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0]);
        console.log("");
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            console.log(data.tracks.items[0].artists[i].name);
        }
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].name);
        console.log("");
    });
}

function getValue(parameter) {
    var text = "";
    for (var i = 3; i < parameter.length; i++) {

        if (i > 3 && i < parameter.length) {
            text = text + "+" + parameter[i];
        }
        else {
            text += parameter[i];
        }
    }
    return text;
}

function getMovie(parameter) {
    if (!parameter) {
        parameter = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("");
            console.log("The movie's Title is: " + JSON.parse(body).Title);
            console.log("The movie's Year is: " + JSON.parse(body).Year);
            console.log("The movie's Imdb Rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie's Country is: " + JSON.parse(body).Country);
            console.log("The movie's Language is: " + JSON.parse(body).Language);
            console.log("The movie's Plot is: " + JSON.parse(body).Plot);
            console.log("The movie's Actors are: " + JSON.parse(body).Actors);
            console.log("");
        }
    });
}

function extFile() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var pos = data.indexOf(",");
        console.log(pos);
        type = data.substr(0,pos);
        console.log(str);
        
    });
}





