import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   TYPES
========================= */

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  updated_at: string;
  language: string | null;
}

export interface GithubOrg {
  login: string;
  avatar_url: string;
  public_repos: number;
}

export interface GithubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
}

/* =========================
   SERVICE
========================= */

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly http = inject(HttpClient);

  /* =========================
     ORGANIZATION
  ========================= */

  getOrganization(org: string): Observable<GithubOrg> {
    return this.http.get<GithubOrg>(
      `https://api.github.com/orgs/${org}`
    );
  }

  getOrganizationRepos(org: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/orgs/${org}/repos?per_page=100`
    );
  }

  /* =========================
     USER
  ========================= */

  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(
      `https://api.github.com/users/${username}`
    );
  }

  getUserRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
  }
}
