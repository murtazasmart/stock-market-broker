import { Injectable } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Stock } from '../models/stock';
import { User } from '../models/user';
import { Price } from '../models/price';

@Injectable()
export class SimulatorServiceService {
  currentCompany: Observable<Stock>;
  userDetails: Observable<any>;

  private userDetailsSubject: BehaviorSubject<any>;
  private currentCompanySubject: BehaviorSubject<Stock>;

  constructor(public http: Http) {
    this.userDetailsSubject = new BehaviorSubject<any>(null);
    this.userDetails = this.userDetailsSubject.asObservable();
    this.userDetailsSubject.next(JSON.parse(localStorage.getItem('userData')) || null);
    this.currentCompanySubject = new BehaviorSubject<Stock>(null);
  }

  public getCurrentStockPrices(stock: string): any{
    let dataArray = JSON.parse(localStorage.getItem('userData')).round.stocks;
    return dataArray.find(x => x.company === stock).price;
  }
  public getStockNames(round:number): any{
    let dataArray = JSON.parse(localStorage.getItem('userData')).round.stocks;
    //return dataArray.find(x => x.company === round).company;
    console.log(dataArray);
    return dataArray;
   
  }
  public changeCurrentCompany(stock: Stock): void {
    this.currentCompanySubject.next(stock);
    localStorage.setItem('currentCompany', JSON.stringify(stock.company));
  }

  public getPriceVariable(gameId :string,stockName:string) : Observable <Price[]> {
    let apiUrl='https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id='+gameId+'&stockName='+stockName;
    console.log('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id='+gameId+'&stockName='+stockName);
    return this
      .http
      .get(apiUrl)
      .map(res => {
        console.log(res.json());
        console.log('price Vaiables');
        const obj=res.json();
        
        let array1=Object.keys(obj).map(function (k){return obj[k]});
        console.log('price Vaiables2');
        console.log(array1);
        return array1
          .map((item,index) => {
            console.log(item);
            console.log(index);
            return new Price(item,index);
          });
      });
  }


  public makeNextTurn(): Subscription {
    console.log(JSON.parse(localStorage.getItem('userData')).gameId);
    return this.http
      .get(
        'https://stock-market-simulator.herokuapp.com/api/v1/game/turn/' +
          JSON.parse(localStorage.getItem('userData')).gameId
      )
      .subscribe(res => {
        let userData = JSON.parse(localStorage.getItem('userData'));

        let newUserData = userData;

        newUserData.round.stocks = res.json().stocks;
        newUserData.currentRound = res.json().stocks[0].round;
        newUserData.round.roundNo = res.json().stocks[0].round;

        console.log(newUserData);
        this.userDetailsSubject.next(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      });
  }
}
