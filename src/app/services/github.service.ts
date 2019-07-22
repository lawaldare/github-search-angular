import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  client_id: string = 'b9543dfc9280995340a1';
  client_secret: string = '7c25bdc26452ba0cc4797cd9944f781773b6255e';
  URL = environment.githubAPI;


  constructor(private http: HttpClient) {
    console.log('github service init...')
  }


  getUser(username: string): Observable<any> {
    return this.http.get(`${this.URL}${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`) as Observable<any>;
  }

  getRepos(username: string): Observable<any> {
    return this.http.get(`${this.URL}${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}`) as Observable<any>;
  }

  getFollowers(username: string): Observable<any> {
    return this.http.get(`${this.URL}${username}/followers?client_id=${this.client_id}&client_secret=${this.client_secret}`) as Observable<any>;
  }

}
