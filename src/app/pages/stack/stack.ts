import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { SettingsService } from '../../services/settings.service';
import { SkeletonComponent } from '../../components/skeleton/skeleton';

interface StackItem {
  name: string;
  description: string;
  logo: string;
}

interface LanguageGroup {
  name: string;
  count: number;
  logo: string;
  repos: { name: string; url: string; description?: string; stars: number }[];
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './stack.html',
  styleUrl: './stack.css'
})
export class StackComponent implements OnInit {
  private readonly github = inject(GithubService);
  private readonly settings = inject(SettingsService);

  readonly languages = signal<LanguageGroup[]>([]);
  readonly loading = signal(true);
  readonly selectedLanguage = signal<LanguageGroup | null>(null);

  readonly backendStack: StackItem[] = [
    { name: 'Spring Boot', description: 'REST API layer', logo: 'https://cdn.simpleicons.org/springboot' },
    { name: 'GitHub API', description: 'Repository & workflow data', logo: 'https://cdn.simpleicons.org/github' },
    { name: 'DTOs', description: 'Clean API contracts', logo: 'https://cdn.simpleicons.org/json' }
  ];

  readonly devOpsStack: StackItem[] = [
    { name: 'GitHub', description: 'Source control', logo: 'https://cdn.simpleicons.org/github' },
    { name: 'Docker', description: 'Containerized backend', logo: 'https://cdn.simpleicons.org/docker' },
    { name: 'CI/CD', description: 'Automated workflows', logo: 'https://cdn.simpleicons.org/githubactions' }
  ];

  ngOnInit() {
    const name = this.settings.settings().githubName;
    this.github.getUserRepositories(name).subscribe({
      next: (repos) => {
        const groups: Record<string, LanguageGroup> = {};

        for (const repo of repos) {
          if (repo.language) {
            if (!groups[repo.language]) {
              groups[repo.language] = {
                name: repo.language,
                count: 0,
                logo: this.getLogoUrl(repo.language),
                repos: []
              };
            }
            groups[repo.language].count++;
            groups[repo.language].repos.push({
              name: repo.name,
              url: repo.html_url,
              stars: repo.stargazers_count
            });
          }
        }

        const sorted = Object.values(groups)
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);

        this.languages.set(sorted);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  selectLanguage(lang: LanguageGroup) {
    this.selectedLanguage.set(lang);
  }

  closeModal() {
    this.selectedLanguage.set(null);
  }

  private getLogoUrl(language: string): string {
    const map: Record<string, string> = {
      'TypeScript': 'typescript',
      'JavaScript': 'javascript',
      'HTML': 'html5',
      'CSS': 'css3',
      'SCSS': 'sass',
      'Python': 'python',
      'Java': 'openjdk',
      'C++': 'cplusplus',
      'C#': 'csharp',
      'Go': 'go',
      'Rust': 'rust',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Shell': 'gnubash',
      'Jupyter Notebook': 'jupyter'
    };
    const slug = map[language] || language.toLowerCase();
    return `https://cdn.simpleicons.org/${slug}`;
  }
}
