"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var appSettings = require("application-settings");
var app_module_1 = require("./app.module");
var BrightWork = require('bw-js-sdk');
var API_KEY = 'a0a775720fca466f8bee98a9e991d479'; // @todo: Get this key out of here, use .env file. 
var APP_NAME = 'habitapp';
BrightWork.initialize(API_KEY, APP_NAME)
    .then(function () {
    // BrightWork is now attached to window.bw
    // so you can query your data or do anything else you need now
    console.log('Brightwork API Loaded!');
    // like fetch all albums
    // bw.models.habit.find().then(function(habits) {
    //   console.log(habit);
    // });
});
global.localStorage = {
    getItem: function (key) {
        return appSettings.getString(key);
    },
    setItem: function (key, value) {
        return appSettings.setString(key, value);
    }
};
var platform = platform_1.platformNativeScriptDynamic();
platform.bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map