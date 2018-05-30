import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { JoinComponent } from "./join/join.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { TablesComponent } from "./tables/tables.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { SharepriceComponent } from "./shareprice/shareprice.component";
import {CpuComponent} from './cpu/cpu.component';
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
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "", redirectTo: "join", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
