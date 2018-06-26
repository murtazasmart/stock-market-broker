import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { JoinServiceService } from "../../../services/join-service.service";
import { JoinedDetailServiceService } from "../../../services/joined-detail-service.service";
import { User } from "../../../models/user";
import { SimulatorServiceService } from "../../../services/simulator-service.service";
import { GameServiceService } from "../../../services/game-service.service";
import { Player } from "../../../models/player";
import { AIBot } from "../../../models/aibot";
import { AibotService } from "../../../services/aibot.service";

@Component({
  // moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  spinner: boolean = false;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private userList: User[];
  private currentUser: User;
  private currentRound: number;
  private winner: Player;
  isEndgame: boolean = false;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private joinService: JoinServiceService,
    private joinedDetailServiceService: JoinedDetailServiceService,
    private simulatorServiceService: SimulatorServiceService,
    private gameServiceService: GameServiceService,
    private aiBotService: AibotService
  ) {
    this.userList = this.joinedDetailServiceService.getUsers();
    this.location = location;
    this.sidebarVisible = false;

    this.changeRound();
    // listen for winner
    this.gameServiceService.winner.subscribe(value => {
      this.winner = value;
      localStorage.setItem("currentWinner", JSON.stringify(this.winner));
    });

    // listen to user change
    this.joinedDetailServiceService.currentUser.subscribe(value => {
      this.currentUser = value;
      console.log(value);
    });
  }

  private changeRound() {
    // when next turn clicked
    this.simulatorServiceService.userDetails.subscribe(value => {
      console.log(value);

      this.currentRound = value.currentRound;
    });
  }

  public async nextTurn() {
    //when click on next for both AI and normal player
    if (this.currentRound == 19) {
      this.router.navigate(["/finish"]);
      this.isEndgame = true;
    } else {
      let aiBotUserList = JSON.parse(localStorage.getItem("aiBots"));
      
      if (aiBotUserList==null) {
        this.simulatorServiceService.makeNextTurn();
        await this.gameServiceService.checkWinner();
      } else {
        await this.aiBotService.runBotMoves(aiBotUserList);
        this.simulatorServiceService.makeNextTurn();
        await this.gameServiceService.checkWinner();
      }

      this.changeRound();
    }
  }

  public changeCurrentUser(user: User): void {
    console.log("iniside the user change", user);
    this.joinedDetailServiceService.changeCurrentUser(user);
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton; const body =
    // document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.split("/").pop();
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  //////////////////////////////////////////////////////////////////////

  logOut() {
    this.joinService.endGame();

    this.joinedDetailServiceService.clearUserData();

    this.router.navigate(["/join"]);
  }
}
