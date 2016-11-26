import { OnInit, Component, ViewChild, ElementRef } from "@angular/core";
import { TextField } from "ui/text-field";
import { Page } from "ui/page";

export interface IHabit {
  id?: number;
  name: string;
  streak: number;
  lastTimestamp: number;
}

export interface IHabitHist {
  id: number;
  timestamp: number;
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  @ViewChild("habitTextField") habitTextField: ElementRef;

  private habitsHistory: Array<IHabitHist> = [];
  public isAndroid: boolean;
  public habits: Array<IHabit> = [
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

  constructor(private page: Page) {

  }

  ngOnInit() {
    this.isAndroid = !!this.page.android;
  }

  // Prevent the first textfield from receiving focus on Android
  // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
  public handleAndroidFocus(textField, container) {
    if (container && container.android) {
      container.android.setFocusableInTouchMode(true);
      container.android.setFocusable(true);
      textField.android.clearFocus();
    }
  }

  public onStreakClick(habit: IHabit) {
    if (!this.isDoneToday(habit.lastTimestamp)) {
      const timestamp = Date.now();

      habit.streak++;
      habit.lastTimestamp = timestamp;

      this.habitsHistory.push({
        id: habit.id,
        timestamp: timestamp
      });
    }
  }

  public onAdd() {
    let textField = <TextField>this.habitTextField.nativeElement;
    let newHabit = textField.text.trim();

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
  }

  public isDoneToday(timestamp: number): boolean {
    if (!timestamp) {
      return false;
    }

    const dateObj = new Date(timestamp);
    const compareDateObj = new Date();

    const datObjVal = dateObj.getDate() + dateObj.getMonth() + dateObj.getFullYear();
    const compareDateObjVal = dateObj.getDate() + dateObj.getMonth() + dateObj.getFullYear();

    return datObjVal === compareDateObjVal;
  }
  
  getTimestamp(): number {
    return Date.now();
  }
}
