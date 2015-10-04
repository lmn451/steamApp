var rest = require('restler');

key = 'FF183132FD171CE0F9853928CDCE1C69';

this.getPlayerSummaries = function(steamids, callback){
    var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamids.join(',');
    rest.get(url).on('complete', function(data) {

        console.log("GetPlayerSummaries: " + data.response.players.length + " players");
        callback(data.response.players);

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
            callback(data.response.games);
        } else{
            callback();
        }

    });
};


// http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=XXXXXXXXXXXXXXXXX&appid=218620


this.getLogoUrl = function (appid, logohash) {
    return "http://media.steampowered.com/steamcommunity/public/images/apps/" + logohash + "/" + logohash + ".jpg";
};

