import { Injectable } from "@angular/core";
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Http, Response } from "@angular/http";
import { Stock } from "../models/stock";
import { User } from "../models/user";
import { Price } from "../models/price";
import { Sector } from "../models/sector";
import { SectorPrice } from "../models/sectorprice";
@Injectable()
export class SimulatorServiceService {
  currentCompany: Observable<Stock>;
  currentSector: Observable<Sector>;
  userDetails: Observable<any>;
  public apps: Sector[];
  private userDetailsSubject: BehaviorSubject<any>;
  private currentCompanySubject: BehaviorSubject<Stock>;
  private currentSectorSubject: BehaviorSubject<Sector>;

  constructor(public http: Http) {
    this.userDetailsSubject = new BehaviorSubject<any>(null);
    this.userDetails = this.userDetailsSubject.asObservable();
    this.userDetailsSubject.next(
      JSON.parse(localStorage.getItem("userData")) || null
    );
    this.currentCompanySubject = new BehaviorSubject<Stock>(null);
    this.currentSectorSubject = new BehaviorSubject<Sector>(null);
  }

  public getCurrentStockPrices(stock: string): any {
    let dataArray = JSON.parse(localStorage.getItem("userData")).round.stocks;
    return dataArray.find(x => x.company === stock).price;
  }
  public getStockNames(round: number): any {
    let dataArray = JSON.parse(localStorage.getItem("userData")).round.stocks;
    //return dataArray.find(x => x.company === round).company;
    console.log(dataArray);
    return dataArray;
  }
  public getSectorNames(gameId: string):Observable<Sector[]> {
    let _apiUrl =
      "https://stock-market-simulator.herokuapp.com/api/v1/game/sectors?id=" +
      gameId;
      return this.http.get(_apiUrl).map(res => {
      /*const sectors=res.json() as Sector[];
      console.log("answer", this.apps);
      return sectors;*/
      return res.json().map(res=>{
        return new Sector(res);
      });
    });
  }
  public changeCurrentCompany(stock: Stock): void {
    this.currentCompanySubject.next(stock);
    localStorage.setItem("currentCompany", JSON.stringify(stock.company));
  }

  public changeCurrentSector(sector: Sector): void {
    localStorage.setItem("currentSector", JSON.stringify(sector.name));
  }

  public getPriceVariable(
    gameId: string,
    stockName: string
  ): Observable<Price[]> {
    let apiUrl =
      "https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id=" +
      gameId +
      "&stockName=" +
      stockName;
    console.log(
      "https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id=" +
        gameId +
        "&stockName=" +
        stockName
    );
    return this.http.get(apiUrl).map(res => {
      console.log(res.json());
      console.log("price Vaiables");
      const obj = res.json();

      let array1 = Object.keys(obj).map(function(k) {
        return obj[k];
      });
      console.log("price Vaiables2");
      console.log(array1);
      return array1.map((item, index) => {
        console.log(item);
        console.log(index);
        return new Price(index, item);
      });
    });
  }

  public getSectorPriceVariable(
    gameId: string,
    sector: string
  ): Observable<SectorPrice[]> {
    let apiUrl =
      "https://stock-market-simulator.herokuapp.com/api/v1/game/sector/history?id=" +
      gameId +
      "&sector=" +
      sector;
    console.log(
      "https://stock-market-simulator.herokuapp.com/api/v1/game/sector/history?id=" +
        gameId +
        "&sector=" +
        sector
    );
    return this.http.get(apiUrl).map(res => {
      console.log(res.json());
      console.log("price Vaiables3");
      const obj = res.json();

      let array1 = Object.keys(obj).map(function(k) {
        return obj[k];
      });
      console.log("price Vaiables4");
      console.log(array1);
      return array1.map((item, index) => {
        console.log(item);
        console.log(index);
        return new SectorPrice(index, item);
      });
    });
  }

  public makeNextTurn(): Subscription {
    console.log(JSON.parse(localStorage.getItem("userData")).gameId);
    return this.http
      .get(
        "https://stock-market-simulator.herokuapp.com/api/v1/game/turn/" +
          JSON.parse(localStorage.getItem("userData")).gameId
      )
      .subscribe(res => {
        let userData = JSON.parse(localStorage.getItem("userData"));

        let newUserData = userData;

        newUserData.round.stocks = res.json().stocks;
        newUserData.currentRound = res.json().stocks[0].round;
        newUserData.round.roundNo = res.json().stocks[0].round;

        console.log(newUserData);
        this.userDetailsSubject.next(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
      });
  }
}
