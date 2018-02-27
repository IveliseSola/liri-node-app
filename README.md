# liri-node-app

Liri is a command line node application that takes in parameters and retrieves data,
LIRI stand for Language Interpretation and Recognition Interface. It takes in 4 commands,
(one at the time).

my-tweets:
This will show the last 20 tweets and when they were created in the terminal/bash
window. It uses the Twitter API to retrieve data, and it appends the data in a txt file.

spotify-this-song:
This will show information about the song provided by the user or a default song 
if the user doesn't provide one. It uses the Spotify API to retrive data, and it appends 
the data in a txt file.

movie-this:
This will show information about the movie provided by the user or a default movie 
if the user doesn't provide one. It uses the OMDB API to retrive data, and it appends 
the data in a txt file.

do-what-it-says:
Using the fs Node package, LIRI will take the text inside of random.txt and then 
use it to call one of LIRI's commands.

The app contains a package.json, which shows general info and dependencies/versions
that are required to run the app.


