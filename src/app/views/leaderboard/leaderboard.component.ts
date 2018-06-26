import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { History } from "../../models/history";
import { BrokerServiceService } from "../../services/broker-service.service";
import { BrokerTransaction } from "../../models/brokerTransaction";
import { SimulatorServiceService } from "../../services/simulator-service.service";
import { GameServiceService } from "../../services/game-service.service";
import { JoinedDetailServiceService } from "../../services/joined-detail-service.service";
import { JoinServiceService } from "../../services/join-service.service";
import { AccountsService } from "../../services/accounts.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { LegendItem, ChartType } from "../../lbd/lbd-chart/lbd-chart.component";
import * as Chartist from "chartist";
import { AnalystServiceService } from "../../services/analyst-service.service";
import { TransactionsServiceService } from "../../services/transactions-service.service";
import { User } from "../../models/user";
import { Portfolio } from "../../models/porfolio";
import { Users } from "../../models/users";
import { LeaderboardService } from "../../services/leaderboard.service";
import swal from "sweetalert2";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
  private rowData: Observable<Portfolio[]>;
  private rowData2: Observable<Users[]>;
  private tableData1: TableData;
  private LeaderboardResult:any[]=[];
  spinner: boolean = false;
  constructor(
    private joinedDetailServiceService: JoinedDetailServiceService,
    private brokerServiceService: BrokerServiceService,
    private simulatorServiceService: SimulatorServiceService,
    private gameServiceService: GameServiceService,
    private accountsService: AccountsService,
    private joinServiceService: JoinServiceService,
    private leaderboardService: LeaderboardService
  ) {
    this.spinner=true;
    this.leaderboardService.getData().then((users) => {
      this.spinner=false;
      console.log("herherher", users);
      this.LeaderboardResult = users;
      let winner = null;
      users.forEach((user) => {
        if (winner) {
          if (user.total >= winner.total) {
            winner = user;
          }
        } else {
          winner = user;
        }
      });
      console.log("winner is", winner);
      localStorage.setItem('winner',JSON.stringify(winner));
    }).catch((err) => {
      this.spinner=false;
      console.log(err);
    })
    this.tableData1 = {
      headerRow: [
        "Plaer/Bot Name",
        "Bank Balance",
        "Stock Portfolio Value",
        "Total Value"
      ],
      dataRows: null
    };
  }

  ngOnInit() {}
}

class ServiceRequestor {
  private row;
  private joinService: JoinServiceService;
  constructor(row, joinServiceService: JoinServiceService) {
    this.row = row;
    this.joinService = joinServiceService;
  }

  public call() {}
}
