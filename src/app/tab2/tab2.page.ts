import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';

type SortKey = 'newest' | 'oldest' | 'name' | 'value';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    DatePipe,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab2Page implements OnInit {
  readonly counterService = inject(CounterService);
  private readonly alertController = inject(AlertController);
  private readonly toastController = inject(ToastController);

  readonly searchText = signal('');
  readonly sortKey = signal<SortKey>('newest');

  readonly visibleCounters = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    return this.counterService
      .counters()
      .filter((counter) => counter.name.toLowerCase().includes(search))
      .sort((a, b) => this.compare(a, b));
  });

  async ngOnInit(): Promise<void> {
    await this.counterService.initialize();
  }

  onSearch(event: CustomEvent): void {
    this.searchText.set(event.detail.value ?? '');
  }

  onSortChange(event: CustomEvent): void {
    this.sortKey.set(event.detail.value as SortKey);
  }

  async remove(id: string): Promise<void> {
    await this.counterService.remove(id);
    await this.presentToast('Záznam byl odstraněn.');
  }

  async confirmClear(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Vymazat celou historii?',
      message: 'Všechny uložené záznamy budou trvale smazány.',
      buttons: [
        { text: 'Zrušit', role: 'cancel' },
        { text: 'Vymazat', role: 'destructive', handler: () => this.clear() },
      ],
    });

    await alert.present();
  }

  async clear(): Promise<void> {
    await this.counterService.clear();
  }

  private compare(a: SavedCounter, b: SavedCounter): number {
    switch (this.sortKey()) {
      case 'oldest':
        return a.createdAt.localeCompare(b.createdAt);
      case 'name':
        return a.name.localeCompare(b.name, 'cs');
      case 'value':
        return a.value - b.value;
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
