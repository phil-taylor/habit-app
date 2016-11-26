"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
        this.habitsHistory = [];
        this.habits = [
            {
                name: 'Meditate',
                streak: 0,
                lastTimestamp: null
            },
            {
                name: 'Run 3 Miles',
                streak: 0,
                lastTimestamp: null
            },
            {
                name: 'Think happy thoughts',
                streak: 0,
                lastTimestamp: null
            }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.isAndroid = !!this.page.android;
    };
    // Prevent the first textfield from receiving focus on Android
    // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
    AppComponent.prototype.handleAndroidFocus = function (textField, container) {
        if (container && container.android) {
            container.android.setFocusableInTouchMode(true);
            container.android.setFocusable(true);
            textField.android.clearFocus();
        }
    };
    AppComponent.prototype.onStreakClick = function (habit) {
        if (!this.isDoneToday(habit.lastTimestamp)) {
            var timestamp = Date.now();
            habit.streak++;
            habit.lastTimestamp = timestamp;
            this.habitsHistory.push({
                id: habit.id,
                timestamp: timestamp
            });
        }
    };
    AppComponent.prototype.onAdd = function () {
        var textField = this.habitTextField.nativeElement;
        var newHabit = textField.text.trim();
        if (newHabit === '') {
            return;
        }
        this.habits.push({
            name: newHabit,
            streak: 0,
            lastTimestamp: null
        });
        textField.text = '';
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more groceries?
        textField.dismissSoftInput();
    };
    AppComponent.prototype.isDoneToday = function (timestamp) {
        if (!timestamp) {
            return false;
        }
        var dateObj = new Date(timestamp);
        var compareDateObj = new Date();
        var datObjVal = dateObj.getDate() + dateObj.getMonth() + dateObj.getFullYear();
        var compareDateObjVal = dateObj.getDate() + dateObj.getMonth() + dateObj.getFullYear();
        return datObjVal === compareDateObjVal;
    };
    AppComponent.prototype.getTimestamp = function () {
        return Date.now();
    };
    __decorate([
        core_1.ViewChild("habitTextField"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "habitTextField", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map