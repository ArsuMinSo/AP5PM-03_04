import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
} from '@ionic/angular';

import { SavedCounter } from '../../models/saved-counter';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
  ],
})
export class CounterComponent {

  readonly heading = input('Nové počítadlo');

  //readonly saved = output<{ id: string; name: string; value: number }>();
  readonly saved = output<( SavedCounter )>();

  counterName = '';
  count = 0;

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
   if (this.count <= 0) { return; }
   this.count -= 1;
  }

  reset(): void {
    this.count = 0;
  }

  save(): void {
    const name = this.counterName.trim();
    if (!name) { return; }

    const save = {
      id        : crypto.randomUUID(),
      name      : name,
      value     : this.count,
      createdAt : new Date().toISOString()
    };

    this.saved.emit(save);

    this.count = 0;
    this.counterName = '';

  }
}
