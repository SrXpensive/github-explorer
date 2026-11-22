import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GithubRepo } from '../../models/github-repo.model';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss'
})
export class RepoListComponent {

  @Input() repos: GithubRepo[] = [];

  searchTerm = '';

  selectedLanguage = 'all';

  sortBy: 'updated' | 'stars' = 'updated';

  get languages(): string[] {
    return [
      ...new Set(
        this.repos
          .map(repo => repo.language)
          .filter((language): language is string => language !== null)
      )
    ].sort();
  }

  get filteredRepos(): GithubRepo[] {

    return this.repos
      .filter(repo => {
        const matchesName = repo.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

        const matchesLanguage =
          this.selectedLanguage === 'all' ||
          repo.language === this.selectedLanguage;

        return matchesName && matchesLanguage;
      })
      .sort((a, b) => {

        if (this.sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }

        return new Date(b.updated_at).getTime() -
               new Date(a.updated_at).getTime();
      });
  }
}
