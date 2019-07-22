import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  username: string;
  followers: any;

  constructor(private github: GithubService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFollowers();
  }

  getFollowers() {
    this.route.paramMap.subscribe(routeData => {
      this.username = routeData.get('username');
      this.getFollowersWithUsername(routeData.get('username'));
    });
  }

  getFollowersWithUsername(username: string) {
    this.github.getFollowers(username).subscribe(followers => {
      this.followers = followers;
    })
  }
}

