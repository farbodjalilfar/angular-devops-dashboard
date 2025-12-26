import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GithubIssue } from '../../services/github.service';
import { SettingsService } from '../../services/settings.service';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
    selector: 'app-pull-requests',
    standalone: true,
    imports: [CommonModule, SkeletonComponent],
    templateUrl: './pull-requests.html',
    styleUrl: './pull-requests.css'
})
export class PullRequestsComponent implements OnInit {
    private readonly github = inject(GithubService);
    private readonly settings = inject(SettingsService);

    readonly prs = signal<GithubIssue[]>([]);
    readonly loading = signal(true);

    ngOnInit() {
        const name = this.settings.settings().githubName;
        this.github.getOpenPullRequests(name).subscribe({
            next: (data) => {
                this.prs.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    getRepoName(url: string): string {
        return url ? url.split('/').pop()! : 'unknown';
    }
}
