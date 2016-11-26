"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
        this.habits = [
            {
                name: 'Meditate',
                streak: 0,
                isDoneToday: false
            },
            {
                name: 'Run 3 Miles',
                streak: 0,
                isDoneToday: false
            },
            {
                name: 'Think happy thoughts',
                streak: 0,
                isDoneToday: false
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
        if (!habit.isDoneToday) {
            habit.streak++;
            habit.isDoneToday = true;
        }
    };
    // public get message(): string {
    //   if (this.counter > 0) {
    //     return this.counter + " taps left";
    //   } else {
    //     return "Hoorraaay! \nYou are ready to start building!";
    //   }
    // }
    AppComponent.prototype.onAdd = function () {
        var textField = this.habitTextField.nativeElement;
        var newHabit = textField.text.trim();
        if (newHabit === '') {
            alert('Please enter a habit.');
            return;
        }
        this.habits.push({
            name: newHabit,
            streak: 0,
            isDoneToday: false
        });
        textField.text = '';
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more groceries?
        textField.dismissSoftInput();
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