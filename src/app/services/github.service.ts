import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

/* =========================
   TYPES
========================= */

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  updated_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface GithubOrg {
  login: string;
  public_repos: number;
  avatar_url: string;
}

export interface GithubUser {
  login: string;
  public_repos: number;
  avatar_url: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload?: any;
}

export interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  pull_request?: {
    html_url: string;
  };
  repository_url: string;
}

export interface GithubSearch<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

/* =========================
   SERVICE
========================= */

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  private cache<T>(key: string, request: Observable<T>): Observable<T> {
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        // Cache validity: 15 minutes
        if (Date.now() - timestamp < 15 * 60 * 1000) {
          return of(data);
        }
      } catch (e) {
        localStorage.removeItem(key);
      }
    }

    return request.pipe(
      tap(data => {
        localStorage.setItem(key, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      })
    );
  }

  getOrganization(org: string): Observable<GithubOrg> {
    return this.cache(
      `gh_org_${org}`,
      this.http.get<GithubOrg>(`https://api.github.com/orgs/${org}`)
    );
  }

  getUser(username: string): Observable<GithubUser> {
    return this.cache(
      `gh_user_${username}`,
      this.http.get<GithubUser>(`https://api.github.com/users/${username}`)
    );
  }

  getOrgRepositories(org: string): Observable<GithubRepo[]> {
    return this.cache(
      `gh_repos_org_${org}`,
      this.http.get<GithubRepo[]>(
        `https://api.github.com/orgs/${org}/repos?per_page=100`
      )
    );
  }

  getUserRepositories(username: string): Observable<GithubRepo[]> {
    return this.cache(
      `gh_repos_user_${username}`,
      this.http.get<GithubRepo[]>(
        `https://api.github.com/users/${username}/repos?per_page=100`
      )
    );
  }

  getEvents(username: string): Observable<GithubEvent[]> {
    return this.cache(
      `gh_events_${username}`,
      this.http.get<GithubEvent[]>(
        `https://api.github.com/users/${username}/events?per_page=30`
      )
    );
  }

  getLanguages(username: string): Observable<Record<string, number>> {
    return this.getUserRepositories(username).pipe(
      map(repos => {
        const stats: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language) {
            stats[repo.language] = (stats[repo.language] || 0) + 1;
          }
        }
        return stats;
      })
    );
  }

  getOpenPullRequests(username: string): Observable<GithubIssue[]> {
    return this.cache(
      `gh_prs_${username}`,
      this.http.get<GithubSearch<GithubIssue>>(
        `https://api.github.com/search/issues?q=type:pr+author:${username}+state:open&per_page=5`
      ).pipe(map(res => res.items))
    );
  }
}
