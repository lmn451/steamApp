var rest = require('restler');

/*
optionalSteamId = 76561198075439630;
key = 'FF183132FD171CE0F9853928CDCE1C69';
*/

/*appId = 570;*/

function GetRecentlyPlayedGames(optionalSteamId, key){
	url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + key + '&steamid=' + optionalSteamId +'&format=json';
	rest.get(url).on('complete', function(data) {
		console.log(data.response.games);
	});
}
GetRecentlyPlayedGames(76561198075439630, FF183132FD171CE0F9853928CDCE1C69);