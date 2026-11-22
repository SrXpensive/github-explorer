import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { GithubService } from './services/github.service';

import { GithubUser } from './models/github-user.model';
import { GithubRepo } from './models/github-repo.model';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchBarComponent,
    ProfileCardComponent,
    RepoListComponent,
    FavoritesListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private githubService = inject(GithubService);

  user = signal<GithubUser | null>(null);

  users = signal<GithubUser[]>([]);

  repos = signal<GithubRepo[]>([]);

  loading = signal(false);

  errorMessage = signal<string | null>(null);

  favorites = signal<string[]>(this.loadFavorites());

  searchUser(username: string): void {

    this.loading.set(true);
    this.errorMessage.set(null);

    this.user.set(null);
    this.repos.set([]);

    forkJoin({
      user: this.githubService.getUser(username),
      repos: this.githubService.getRepos(username)
    }).subscribe({

      next: (result) => {

        this.user.set(result.user);
        this.repos.set(result.repos);

        this.loading.set(false);

      },

      error: (error: HttpErrorResponse) => {

        this.loading.set(false);

        if (error.status === 404) {
          this.errorMessage.set('GitHub user not found.');
        } else if (error.status === 403) {
          this.errorMessage.set(
            'GitHub API rate limit exceeded. Please try again later.'
          );
        } else {
          this.errorMessage.set(
            'Something went wrong while contacting GitHub.'
          );
        }

      }

    });

  }

  isFavorite(): boolean {

    const currentUser = this.user();

    return currentUser
      ? this.favorites().includes(currentUser.login)
      : false;

  }

  toggleFavorite(): void {

    const currentUser = this.user();

    if (!currentUser) return;

    const username = currentUser.login;

    this.favorites.update(current => {

      if (current.includes(username)) {
        return current.filter(item => item !== username);
      }

      return [...current, username];

    });

    this.saveFavorites();

  }

  selectFavorite(username: string): void {
    this.searchUser(username);
  }

  private loadFavorites(): string[] {

    try {

      const stored = localStorage.getItem('github-explorer-favorites');

      return stored ? JSON.parse(stored) : [];

    } catch {

      return [];

    }

  }

  private saveFavorites(): void {

    localStorage.setItem(
      'github-explorer-favorites',
      JSON.stringify(this.favorites())
    );

  }

  searchMultipleUsers(query: string): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.user.set(null);
    this.repos.set([]);
    this.users.set([]);

    this.githubService.searchUsers(query).subscribe({
      next: (result) => {
        this.users.set(result.items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Something went wrong while searching users.');
        this.loading.set(false);
      }
    });
  }

}
