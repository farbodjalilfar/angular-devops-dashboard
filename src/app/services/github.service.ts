import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   MODELS
========================= */

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  updated_at: string;
}

export interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

/* =========================
   SERVICE
========================= */

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly http = inject(HttpClient);

  /**
   * 🔹 Get repositories for an organization
   */
  getRepositories(org: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/orgs/${org}/repos`
    );
  }

  /**
   * 🔹 Get recent commits for a repository
   */
  getCommits(owner: string, repo: string): Observable<GithubCommit[]> {
    return this.http.get<GithubCommit[]>(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
  }
}
