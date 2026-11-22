import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GithubUser } from '../../models/github-user.model';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  @Input() user!: GithubUser;

  @Input() isFavorite = false;

  @Output() toggleFavorite = new EventEmitter<void>();

}
