import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private readonly platformId = inject(PLATFORM_ID);

  private readonly CACHE_KEY = 'github_cache';
  private readonly CACHE_EXPIRY = 15 * 60 * 1000; // 15 mins

  private getCache(): any {
    if (!isPlatformBrowser(this.platformId)) return {};
    const data = localStorage.getItem(this.CACHE_KEY);
    return data ? JSON.parse(data) : {};
  }

  private setCache(key: string, data: any): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const cache = this.getCache();
    cache[key] = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }

  private cache<T>(key: string, request: Observable<T>): Observable<T> {
    if (!isPlatformBrowser(this.platformId)) return request;

    const cache = this.getCache();
    const entry = cache[key];

    if (entry && (Date.now() - entry.timestamp < this.CACHE_EXPIRY)) {
      return of(entry.data);
    }

    return request.pipe(
      tap(data => this.setCache(key, data))
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
