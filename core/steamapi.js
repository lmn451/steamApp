var rest = require('restler');
key = 'FF183132FD171CE0F9853928CDCE1C69';
var dotagameobject = {};

this.getPlayerSummaries = function(steamids, callback){
    var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamids.join(',');
    rest.get(url).on('complete', function(data) {
        if (data.response && data.response.players){
            console.log("GetPlayerSummaries: " + data.response.players.length + " players");
            callback(data.response.players);
        }else{
            callback();
        }
    });
};

this.getFriendList = function(steamid, callback) {
    var url = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" + key + "&steamid=" + steamid + "&relationship=friend";
    rest.get(url).on('complete', function(data) {
        if(data.friendslist && data.friendslist.friends) {
            console.log("GetFriendList: " + data.friendslist.friends.length + " friends");
            callback(data.friendslist.friends);
        } else{
            callback();
        }

    });
};

this.getRecentlyPlayedGames = function(steamid, callback){
    var url = 'http://api.steampowered.com/IPlayerService/getRecentlyPlayedGames/v0001/?key=' + key + '&steamid=' + steamid +'&format=json';
    rest.get(url).on('complete', function(data) {
        if(data.response && data.response.games) {
            console.log("GetRecentlyPlayedGames: " + data.response.total_count + " games");
            for (x in data.response.games) {
                if(data.response.games[x].appid === 570){
                    dotagameobject.appid = 570;
                    dotagameobject.name = "Dota 2";
                    dotagameobject.playtime_forever = (data.response.games[x].playtime_forever/60).toFixed(2);
                }
            }
            callback(data.response.games);
        } else{
            callback();
        }

    });
};

this.getOwnedGames = function(steamid, callback){
    var games = [];
    var totaltime = 0;
    var urlSchema = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key + '&steamid=' + steamid;
    rest.get(urlSchema).on('complete', function(data) {
        if(data.response && data.response.games) {
            console.log("GetOwnedGames: " + data.response.game_count + " games");
            var gamesFetched = 0;
            var gamesFound = 0;
            for (var i in data.response.games){
                if (data.response.games[i].playtime_forever) {
                    gamesFound++;
                    var gameFound = data.response.games[i];
                    totaltime += gameFound.playtime_forever;

                    var game = {};
                    game.appid = gameFound.appid;
                    game.playtime_forever = toHours(gameFound.playtime_forever);
                    games.push(game);
                }
            }
            rest.get('http://api.steampowered.com/ISteamApps/GetAppList/v0001').on('complete', function(data) {
                games.forEach(function (game, index, array) {
                    game.name = data.applist.apps.app.filter(function(v){ return v["appid"] == game.appid; })[0].name;
                    gamesFetched++;
                    if(gamesFetched==gamesFound){
                        if(dotagameobject.playtime_forever){
                            games.totaltime += dotagameobject.playtime_forever;
                        }
                        console.log(totaltime);
                        games.totaltime = toHours(totaltime);
                        console.log('GetTotalTime: ' + games.totaltime);

                        if(dotagameobject == true){
                            games.push(dotagameobject);
                        }
                        games.sort(compareObjectsByTime);

                        callback(games);
                        console.log("GetApps: " + gamesFetched);
                        dotagameobject = {};
                    }
                });
            });
        }
    });
    function compareObjectsByTime (x, y){
        return (parseInt (y ["playtime_forever"]) - parseInt (x ["playtime_forever"]))
    }
    function toHours (s){
        return ((s / 60).toFixed(1));
    }


};

this.getLogoUrl = function (appid, logohash) {
    return "http://media.steampowered.com/steamcommunity/public/images/apps/" + logohash + "/" + logohash + ".jpg";
};

