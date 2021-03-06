import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { JoinComponent } from "./views/join/join.component";
import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";
import { TablesComponent } from "./views/tables/tables.component";
import { TypographyComponent } from "./views/typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { NotificationsComponent } from "./views/notifications/notifications.component";
import { UpgradeComponent } from "./views/upgrade/upgrade.component";
import { SharepriceComponent } from "./views/shareprice/shareprice.component";
import { EndgameComponent } from "./views/endgame/endgame.component";
import { CpuComponent } from "./cpu/cpu.component";
import {LeaderboardComponent} from './views/leaderboard/leaderboard.component';
/* 
here defined routes and unwanted are commented
*/

const routes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "join", component: JoinComponent },
  { path: "cpu", component: CpuComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TablesComponent },
  { path: "shareprice", component: SharepriceComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "finish", component: EndgameComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
