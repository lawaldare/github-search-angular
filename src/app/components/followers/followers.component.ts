import { GithubService } from "./../../services/github.service";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"],
})
export class FollowersComponent {
  private readonly github = inject(GithubService);
  private readonly route = inject(ActivatedRoute);

  public followers$ = this.route.params.pipe(
    switchMap((params) => {
      return this.github
        .getFollowers(params["username"])
        .pipe(catchError((error) => of(error)));
    })
  );
}
