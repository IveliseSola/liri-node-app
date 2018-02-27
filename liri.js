
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var type = process.argv[2];
// var input = process.argv[3];
var value = getValue(process.argv);

function main(parameter1, parameter2) {

    switch (parameter1) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            spotifySong(parameter2);
            break;
        case "movie-this":
            getMovie(parameter2);
            break;
        case "do-what-it-says":
            extFile();
            break;
    }
}

main(type, value);


function getTweets() {
    var arrayToWrite = [];
    var parameters = {
        screen_name: "SolaIvelise",
        count: 20
    }
    client.get("statuses/user_timeline", parameters, function (error, tweets, response) {
        if (error) throw error;
        for (i = 0; i < tweets.length; i++) {
            console.log(" " + "\n" + [i + 1] + ". "
                + tweets[i].text + "\n" + "Created on: "
                + tweets[i].created_at + "\n");

            arrayToWrite.push(" " + "\n" + [i + 1] + ". "
                + tweets[i].text + "\n" + "Created on: "
                + tweets[i].created_at + "\n");
        }
        writeThis(arrayToWrite);
    });
}

function spotifySong(parameter) {
    var arrayToWrite = [];
    if (!parameter) {
        parameter = "The Sign";
    }
    spotify.search({ type: "track", query: parameter }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0]);

        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            console.log(" " + "\n" + data.tracks.items[0].artists[i].name + "\n");
            arrayToWrite.push(" " + "\n" + data.tracks.items[0].artists[i].name + "\n");
        }
        console.log(" " + "\n" + data.tracks.items[0].preview_url + ". "
            + data.tracks.items[0].name + "\n");

        arrayToWrite.push(" " + "\n" + data.tracks.items[0].preview_url + ". "
            + data.tracks.items[0].name + "\n");

        writeThis(arrayToWrite);
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
    var arrayToWrite = [];
    if (!parameter) {
        parameter = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            console.log(" " + "\n" + "The movie's Title is: " + JSON.parse(body).Title + ". "
                + "The movie's Year is: " + JSON.parse(body).Year + ". "
                + "The movie's Imdb Rating is: " + JSON.parse(body).imdbRating + ". "
                + "The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value + ". "
                + "The movie's Country is: " + JSON.parse(body).Country + ". "
                + "The movie's Language is: " + JSON.parse(body).Language + ". "
                + "The movie's Plot is: " + JSON.parse(body).Plot + ". "
                + "The movie's Actors are: " + JSON.parse(body).Actors + "\n");

            arrayToWrite.push(" " + "\n" + "The movie's Title is: " + JSON.parse(body).Title + ". "
                + "The movie's Year is: " + JSON.parse(body).Year + ". "
                + "The movie's Imdb Rating is: " + JSON.parse(body).imdbRating + ". "
                + "The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value + ". "
                + "The movie's Country is: " + JSON.parse(body).Country + ". "
                + "The movie's Language is: " + JSON.parse(body).Language + ". "
                + "The movie's Plot is: " + JSON.parse(body).Plot + ". "
                + "The movie's Actors are: " + JSON.parse(body).Actors + "\n")

            writeThis(arrayToWrite);
        }
    });
}

function extFile() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var pos = data.indexOf(",");
        //console.log(pos);
        type = data.substr(0, pos);
        //console.log(type);
        var str = data.substr(pos + 1);
        str.replace(" ", "+");
        //console.log(str);

        main(type, str);
    });
}

function writeThis(parameter) {

    for (var i = 0; i < parameter.length; i++) {
        fs.appendFile("log.txt", parameter[i], function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}





