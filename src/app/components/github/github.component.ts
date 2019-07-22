import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  user: any;
  repos: any;
  username: any;

  constructor(private github: GithubService, private router: Router) {
  }

  ngOnInit() {

  }

  getUser() {
    this.github.getUser(this.username).subscribe(user => {
      this.user = user;
    })
  }

  getRepos() {
    this.github.getRepos(this.username).subscribe(repos => {
      this.repos = repos;
    })
  }

  search(event) {
    this.username = event.target.value;
    this.getUser();
    this.getRepos();
  }
}
