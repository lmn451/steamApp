var express = require('express');
var router = express.Router();

var Cookies = require( "cookies" );
var steamApi = require('../core/steamapi');

/* GET home page. */
router.get('/', function(req, res, next) {
    var cookies = new Cookies(req, res);
    console.log(cookies);
    //console.log(req);

    var os = require("os");
    console.log(os.hostname());
    console.log(os.networkInterfaces());

    var loginedSteamId = cookies.get("steamid");

    if (loginedSteamId){
        var player;
        var playerGames;
        var playerFriends;

        var response = function () {
            if (player && playerGames && playerFriends) {
                res.render('index', {title: 'Recent games', player: player, games: playerGames, friends: playerFriends});
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
        res.render('landing');
    }



});


router.get('/login', function(req, res) {
    var logined;
    var steamid;
    console.log(req.query);
    var identityFromSteam = req.query["openid.identity"];
    if (identityFromSteam) {
        steamid = identityFromSteam.split("/")[5];
        console.log("Logined as " + steamid);

        var cookies = new Cookies(req, res);
        cookies.set("steamid", steamid);
    }
    // todo another way to auth?
    res.redirect('/');

});



// https://steamcommunity.com/openid/login?
// openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&
// openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select
// openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0
// openid.mode=checkid_setup
// openid.realm=https%3A%2F%2Fsteamdb.info%2F
// openid.return_to=https%3A%2F%2Fsteamdb.info%2Flogin%2F%3Fpage%3Dcalculator

// that redirects to

// https://steamdb.info/login/?page=calculator&
// openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&
// openid.mode=id_res&
// openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&
// openid.claimed_id=http%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198054996171&
// openid.identity=http%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198054996171&
// openid.return_to=https%3A%2F%2Fsteamdb.info%2Flogin%2F%3Fpage%3Dcalculator&
// openid.response_nonce=2015-10-03T13%3A10%3A51Zr8pPUe1qvgOSpHHWd2FsyrPKil0%3D&
// openid.assoc_handle=1234567890&
// openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&
// openid.sig=KmqujPcFokxbKvkaQTOUEXZ8JxE%3D




module.exports = router;


