import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { History } from "../../models/history";
import { BrokerServiceService } from "../../services/broker-service.service";
import { BrokerTransaction } from "../../models/brokerTransaction";
import { SimulatorServiceService } from "../../services/simulator-service.service";
import { GameServiceService } from "../../services/game-service.service";
import { JoinedDetailServiceService } from "../../services/joined-detail-service.service";
import { AccountsService } from "../../services/accounts.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import {LegendItem, ChartType} from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import {AnalystServiceService} from '../../services/analyst-service.service';
import {TransactionsServiceService} from '../../services/transactions-service.service';
import {User} from '../../models/user';
import swal from 'sweetalert2'

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-shareprice",
  templateUrl: "./shareprice.component.html",
  styleUrls: ["./shareprice.component.scss"]
})
export class SharepriceComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public tableData3: TableData;
  private rowData: Observable<History[]>;
  private rowData2: any;
  private currentRound: number;
  private currentHistory: History = null;

  constructor(
    private joinedDetailServiceService: JoinedDetailServiceService,
    private brokerServiceService: BrokerServiceService,
    private simulatorServiceService: SimulatorServiceService,
    private gameServiceService: GameServiceService,
    private accountsService: AccountsService
  ) {




    //when next round clicks
    /*this.simulatorServiceService.userDetails.subscribe(value => {
      console.log(value);
      this.rowData2 = value.round.stocks;
      this.currentRound = value.currentRound;*/

      this.rowData = this.accountsService.getHistoryData(
        //this.currentHistory,
       
        JSON.parse(localStorage.getItem("userData")).gameId
      );
       console.log(JSON.parse(localStorage.getItem("userData")).gameId);
    //});

    this.tableData1 = {
      headerRow: ["Name", "Stock", "Quantity", "Type", "Turn", "Price"],
      dataRows: null
    };
  }

  ngOnInit() {}
}
