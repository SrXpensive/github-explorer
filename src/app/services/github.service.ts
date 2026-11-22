import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GithubUser } from '../models/github-user.model';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private http = inject(HttpClient);

  private apiUrl = 'https://api.github.com';

  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(
      `${this.apiUrl}/users/${username}`
    );
  }

  getRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${this.apiUrl}/users/${username}/repos`,
      {
        params: {
          per_page: 100,
          sort: 'updated'
        }
      }
    );
  }
}
