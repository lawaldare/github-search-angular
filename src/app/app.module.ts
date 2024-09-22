import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GithubComponent } from "./components/github/github.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { FollowersComponent } from "./components/followers/followers.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    GithubComponent,
    FollowersComponent,
    NavbarComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
