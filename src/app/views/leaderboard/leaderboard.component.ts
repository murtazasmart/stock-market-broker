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
  private tableData1:TableData;
  constructor(
    private joinedDetailServiceService: JoinedDetailServiceService,
    private brokerServiceService: BrokerServiceService,
    private simulatorServiceService: SimulatorServiceService,
    private gameServiceService: GameServiceService,
    private accountsService: AccountsService,
    private joinServiceService: JoinServiceService
  ) {
    this.tableData1 = {
      headerRow: [
        'Plaer/Bot Name', 'Bank Balance', 'Stock Portfolio Value', 'Total Valu'
      ],
      dataRows: null
    };

    this.rowData2 = this.joinServiceService.getAllLoggedUsers();
    this.rowData2.subscribe(res=>{
      console.log("all logged users",res);
      return 
    });

    this.rowData = this.brokerServiceService.getPortfolioValue(
      JSON.parse(localStorage.getItem("users")).Name
    );
    this.rowData.subscribe(res => {
      console.log("porfolio value", res);
    });
  }

  ngOnInit() {}
}
