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
import { Price } from "../../models/price";
import { Sector } from "../../models/sector";
import { SectorPrice } from "../../models/sectorprice";
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
  private rowData: Observable<Stock[]>;
  private priceData: Observable<Price[]>;
  private sectorpriceData: Observable<SectorPrice[]>;
  private sectorData: Observable<Sector[]>;
  private rowData2: any;
  private currentRound: number;
  private currentHistory: History = null;
  private currentCompany: string;
  private currentSector: string;

  constructor(
    private joinedDetailServiceService: JoinedDetailServiceService,
    private brokerServiceService: BrokerServiceService,
    private simulatorServiceService: SimulatorServiceService,
    private gameServiceService: GameServiceService,
    private accountsService: AccountsService
  ) {

    //to get an Observable data
    this.sectorData = this.simulatorServiceService.getSectorNames(
      JSON.parse(localStorage.getItem("userData")).gameId
    );
    this.sectorData.subscribe(res => {
      console.log("response", res);
    });

    this.rowData = this.simulatorServiceService.getStockNames(
      this.currentRound
    );
    /*this.sectorpriceData = this.simulatorServiceService.getSectorPriceVariable(
      JSON.parse(localStorage.getItem("userData")).gameId,
      this.currentSector
    );

    this.priceData = this.simulatorServiceService.getPriceVariable(
      JSON.parse(localStorage.getItem("userData")).gameId,
      this.currentCompany
    );*/
    let companyArray = this.simulatorServiceService.getStockNames(
      this.currentRound
    );
    let companyLength = companyArray.length;
    console.log(companyLength);
    console.log("companyArray", companyArray);

    let companylist: string[] = [];
    companyArray.forEach(element => {
      companylist.push(element.company);
    });
    console.log("companylist", companylist);
    localStorage.setItem("companyList", JSON.stringify(companylist));

    this.tableData1 = {
      headerRow: ["Round", "Price"],
      dataRows: null
    };
  }
  public changeCurrentCompany(stock: Stock) {
    console.log("iniside the company change", stock);
    this.simulatorServiceService.changeCurrentCompany(stock);
    this.currentCompany = JSON.parse(localStorage.getItem("currentCompany"));
    this.priceData = this.simulatorServiceService.getPriceVariable(
      JSON.parse(localStorage.getItem("userData")).gameId,
      this.currentCompany
    );
    console.log("end1");
  }

  public changeCurrentSector(sector:Sector){
    console.log("iniside the sector change", sector);
    this.simulatorServiceService.changeCurrentSector(sector);
    this.currentSector = JSON.parse(localStorage.getItem("currentSector"));
    this.sectorpriceData = this.simulatorServiceService.getSectorPriceVariable(
      JSON.parse(localStorage.getItem("userData")).gameId,
      this.currentSector
    );
    console.log("end2");
  }

  ngOnInit() {}
}
