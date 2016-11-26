import { OnInit, Component, ViewChild, ElementRef } from "@angular/core";
import { TextField } from "ui/text-field";
import { Page } from "ui/page";

export interface IHabit {
  name: string;
  streak: number;
  isDoneToday: boolean;
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit{
  // public counter: number = 16;
  // public test: string = 'test';
  public isAndroid: boolean;
  public habits: Array<IHabit> = [
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

  @ViewChild("habitTextField") habitTextField: ElementRef;

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
    if (!habit.isDoneToday) {
      habit.streak++;
      habit.isDoneToday = true;
    }
  }

  // public get message(): string {
  //   if (this.counter > 0) {
  //     return this.counter + " taps left";
  //   } else {
  //     return "Hoorraaay! \nYou are ready to start building!";
  //   }
  // }

  public onAdd() {
    let textField = <TextField>this.habitTextField.nativeElement;
    let newHabit = textField.text.trim();

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
  }
  
  // public onTap() {
  //   this.counter--;
  // }
}
