import { GithubService } from "./../../services/github.service";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl } from "@angular/forms";
import { forkJoin, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
} from "rxjs/operators";

@Component({
  selector: "app-github",
  templateUrl: "./github.component.html",
  styleUrls: ["./github.component.scss"],
})
export class GithubComponent implements OnInit {
  public user = signal<any>({});
  public repos = signal<any>([]);
  private readonly github = inject(GithubService);
  public searchTerm = new FormControl("");

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        mergeMap((term: string) =>
          forkJoin([this.github.getUser(term), this.github.getRepos(term)])
        ),
        map(([user, repos]) => {
          this.user.set(user);
          this.repos.update(() => repos);
        }),
        catchError((error) => of(error))
      )
      .subscribe();
  }
}
