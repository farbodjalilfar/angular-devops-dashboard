import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  getRepositories(org: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/orgs/${org}/repos`
    );
  }
}
