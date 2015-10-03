var express = require('express');
var router = express.Router();
var steamApi = require('../core/steamapi');

/* GET home page. */
router.get('/', function(req, res, next) {


    // check authorisation
    var logined = true;
    var loginedSteamId = "76561198054996171";

    if (logined){
        var player;
        var playerGames;
        var playerFriends;

        var response = function () {
            if (player && playerGames && playerFriends) {
                res.render('resent', {title: 'Recent games', player: player, games: playerGames, friends: playerFriends});
            }
        };

        steamApi.getPlayerSummaries([loginedSteamId], function(players){
            player = players[0];
            response();
        });

        steamApi.getRecentlyPlayedGames(loginedSteamId, function (games) {
            playerGames = games;
            response();
        });

        steamApi.getFriendList(loginedSteamId,function(friends){
            playerFriends = friends;
            response();
        });

    } else{

    }



});

module.exports = router;


