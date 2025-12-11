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
  switchMap,
} from "rxjs/operators";

@Component({
  selector: "app-github",
  templateUrl: "./github.component.html",
  styleUrls: ["./github.component.scss"],
  standalone: false,
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
        switchMap((term: string) =>
          forkJoin([
            this.github.getUser(term).pipe(catchError((err) => of(null))),
            this.github.getRepos(term).pipe(catchError((err) => of(null))),
          ])
        ),
        map(([user, repos]) => {
          this.user.set(user);
          this.repos.update(() => repos);
        }),
        catchError((error) => {
          console.error("Error fetching data:", error);
          return of(error);
        })
      )
      .subscribe();
  }
}
