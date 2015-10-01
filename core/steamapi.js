var rest = require('restler');


optionalSteamId = 76561198075439630;
key = 'FF183132FD171CE0F9853928CDCE1C69';


this.GetRecentlyPlayedGames = function(callback){
    var url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + key + '&steamid=' + optionalSteamId +'&format=json';
    rest.get(url).on('complete', function(data) {
        var parsedData = "";
        for(i=0;i<=data.response.games.length - 1;i++){
            parsedData += 'Id #' + optionalSteamId + ' played ' + data.response.games[i].name + ' ' + data.response.games[i].playtime_forever / 60 + ' hours at all' + "\n";
        }
        console.log(parsedData);
        callback(parsedData);

    });
}

