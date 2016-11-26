// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as appSettings from "application-settings";
import { AppModule } from "./app.module";

const BrightWork = require('bw-js-sdk');
const API_KEY = 'a0a775720fca466f8bee98a9e991d479'; // @todo: Get this key out of here, use .env file. 
const APP_NAME = 'habitapp';

// @todo:  Determine how we can get this working, it is breaking with this error:
// file:///app/tns_modules/bw-js-sdk/dist/index.js:124:7: JS ERROR ReferenceError: Can't find variable: window"
BrightWork.initialize(API_KEY, APP_NAME)
  .then(() => {
    // BrightWork is now attached to window.bw
    // so you can query your data or do anything else you need now

    console.log('Brightwork API Loaded!');
    // like fetch all albums
    // bw.models.habit.find().then(function(habits) {
    //   console.log(habit);
    // });
  });

global.localStorage = {
  getItem(key: string) {
    return appSettings.getString(key);
  },
  setItem(key: string, value: string) {
    return appSettings.setString(key, value); 
  }
}

const platform = platformNativeScriptDynamic();
platform.bootstrapModule(AppModule);
