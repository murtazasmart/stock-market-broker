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
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { LegendItem, ChartType } from "../../lbd/lbd-chart/lbd-chart.component";
import * as Chartist from "chartist";
import { AnalystServiceService } from "../../services/analyst-service.service";
import { TransactionsServiceService } from "../../services/transactions-service.service";
import { User } from "../../models/user";
import { Stock } from "../../models/stock";
import swal from "sweetalert2";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public tableData3: TableData;
  private rowData : Observable < Stock[]>;
  private rowData2: any;
  private currentRound: number;
  private currentHistory: History = null;
  private currentCompany:string;

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
      console.log("company",this.rowData2);
      this.currentRound = value.currentRound;
      

     
       console.log(JSON.parse(localStorage.getItem("userData")).gameId);
    });*/
    this.rowData=this.simulatorServiceService.getStockNames(this.currentRound);

    let companyArray = this.simulatorServiceService.getStockNames(this.currentRound);
    let companyLength = companyArray.length;
    console.log(companyLength);
    console.log("companyArray",companyArray);
    
    
    let companylist: string[] = [];
    companyArray.forEach(element => {
      companylist.push(element.company);
      
    });
    console.log("companylist",companylist);
    localStorage.setItem("companyList", JSON.stringify(companylist));

    this.tableData1 = {
      headerRow: ["Name", "Stock", "Quantity", "Type", "Turn", "Price"],
      dataRows: null
    };
  }
  public changeCurrentCompany(stock: Stock): void {
    console.log('iniside the company change', stock);
    this.simulatorServiceService.changeCurrentCompany(stock);
    this.currentCompany=JSON.parse(localStorage.getItem('currentCompany'))
  }

  ngOnInit() {}
}
