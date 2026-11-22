import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  templateUrl: './favorites-list.component.html'
})
export class FavoritesListComponent {

  @Input() favorites: string[] = [];

  @Output() selectUser = new EventEmitter<string>();

}
