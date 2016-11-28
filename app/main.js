"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var appSettings = require("application-settings");
var app_module_1 = require("./app.module");
require('bw-js-sdk');
var API_KEY = 'a0a775720fca466f8bee98a9e991d479'; // @todo: Get this key out of here, use .env file. 
var APP_NAME = 'habitapp';
// TRY building JS SDK with browser mode option so we can disble to have it not add to gloabl window object.
// @todo:  Determine how we can get this working, it is breaking with this error:
// file:///app/tns_modules/bw-js-sdk/dist/index.js:124:7: JS ERROR ReferenceError: Can't find variable: window"
console.log('*** GLOBAL BRIGHTWORK ***');
console.dump(global.BrightWork);
global.BrightWork.initialize(API_KEY, APP_NAME)
    .then(function () {
    // BrightWork is now attached to window.bw
    // so you can query your data or do anything else you need now
    console.log('Brightwork API Loaded!');
    console.dump(global.bw.models);
    // create habit and return habits list
    return Promise.all([
        global.bw.models.habit.create({ name: 'test habit', streak: 0 }),
        global.bw.models.habit.find().then(function (habits) {
            console.log('HABITS: ');
            console.dump(habits);
        })
    ]);
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