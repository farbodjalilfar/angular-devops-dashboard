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

  // 🔹 Get organization metadata (TOTAL repo count)
  getOrganization(org: string): Observable<GithubOrg> {
    return this.http.get<GithubOrg>(
      `https://api.github.com/orgs/${org}`
    );
  }

  // 🔹 Get repos (used for tech + latest update)
  getRepositories(org: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/orgs/${org}/repos?per_page=100`
    );
  }
}
