var SteamApi = require('steam-api');
var STEAM_API_KEY = 'steam-api-key';
var optionalSteamId = 'Umaru chan';
var appId  = 570;
var user = new SteamApi.User('steam-api-key', optionalSteamId);
var userStats = new SteamApi.UserStats('steam-api-key', optionalSteamId);
var news = new SteamApi.News('steam-api-key');
var app = new SteamApi.App('steam-api-key');
var player = new SteamApi.Player('steam-api-key', optionalSteamId);
var inventory = new SteamApi.Inventory('steam-api-key', optionalSteamId);
var items = new SteamApi.Items('steam-api-key', optionalSteamId);
app.GetAppList().done(function(result){
    console.log('no');
    console.log(result);
});
userStats.GetGlobalStatsForGame(appId,optionalSteamId).done(function(result){
    console.log('no');
    console.log(result);
});