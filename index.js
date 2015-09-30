var SteamApi = require('steam-api');
optionalSteamId = '76561198075439630';

var userStats = new SteamApi.UserStats('FF183132FD171CE0F9853928CDCE1C69', optionalSteamId);

// var user = new SteamApi.User('FF183132FD171CE0F9853928CDCE1C69', optionalSteamId);
// var app = new SteamApi.App('FF183132FD171CE0F9853928CDCE1C69');
// var player = new SteamApi.Player('FF183132FD171CE0F9853928CDCE1C69', optionalSteamId);

appId = 550;

userStats.GetUserStatsForGame(appId, optionalSteamId).done(function(result){
  console.log(result);
});