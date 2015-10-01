var rest = require('restler');


optionalSteamId = 76561198075439630;
key = 'FF183132FD171CE0F9853928CDCE1C69';

	
function GetRecentlyPlayedGames(key,optionalSteamId){
	url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + key + '&steamid=' + optionalSteamId +'&format=json';
	rest.get(url).on('complete', function(data) {
		for(i=0;i<=data.response.games.length - 1;i++){
			console.log('Id #' + optionalSteamId + ' played ' + data.response.games[i].name + ' ' + data.response.games[i].playtime_forever / 60 + ' hours at all' );
		}

	});
}

GetRecentlyPlayedGames(key,optionalSteamId)

