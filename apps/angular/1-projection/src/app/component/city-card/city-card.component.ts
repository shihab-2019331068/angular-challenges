import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [itemTemplate]="itemTemplate"
      (uponAddNewItem)="addItem()">
      <img ngSrc="assets/img/city.png" height="200" width="200" />
    </app-card>

    <ng-template #itemTemplate let-item>
      <app-list-item
        [id]="item.id"
        [name]="item.name"
        (uponDeleteItem)="deleteItem(item.id)"></app-list-item>
    </ng-template>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
