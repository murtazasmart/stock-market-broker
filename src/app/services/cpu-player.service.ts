import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'
import { AnalystServiceService } from './analyst-service.service';
import { resolve } from 'url';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class CpuPlayerService {

  constructor(private router: Router, private http: Http) {

  }

  public getData() {
    const gameId = JSON.parse(localStorage.getItem('userData')).gameId;
    return this.http
      .get('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/details?id='+gameId)
      .toPromise().then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  public getCompanyWiseHistory(companyName) {
    let ParentArray2 = [];
    const gameId = JSON.parse(localStorage.getItem('userData')).gameId;
    return this
      .http
      .get('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id='+gameId+'&stockName=' + companyName)
      .toPromise().then((res) => {
        let jsonArray = res.json();
        for (var i in jsonArray) {
          let round = i;
          let stockPrice = jsonArray;
          const newOb = {
            companyName,
            round,
            stockPrice
          };
          ParentArray2.push(newOb);
        }
        return ParentArray2;
      }).catch((err) => {
        console.log(err);
        return err;
      });

    // return ParentArray;

  }

  public createNewBankAccount() {
    let Data = [
      { "Name": "CPU1" }
    ];
    return this
      .http
      .get('https://exithost.000webhostapp.com/bank/account')
      .subscribe(response => {
        // after game is reset
        const responseStart: any = response.json();
        console.log('stock Prices', responseStart);
      });
  }

  public getAccountBalance(accountNo) {
    return this.http
      .get('https://exithost.000webhostapp.com/bank/balance/'+accountNo)
      .toPromise().then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  public getAccountStatement(accountNumber) {
    return this
      .http
      .get('https://exithost.000webhostapp.com/bank/account/')
      .subscribe(response => {
        // after game is reset
        const responseStart: any = response.json();
        console.log('stock Prices', responseStart);
      });
  }

  public updateBankAccount() {

    let data = [];
    return this
      .http
      .post('https://exithost.000webhostapp.com/bank/transaction', data)
      .subscribe(response => {
        const responseStart: any = response.json();
        console.log('stock Prices', responseStart);
      });
  }

  public investOn() {
    return this.http
      .get('https://exithost.000webhostapp.com/bank/balance/10001')
      .toPromise().then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  public sellStocks() {
    return this.http
      .get('https://exithost.000webhostapp.com/bank/balance/10001')
      .toPromise().then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  public getShareDetails() {
    let user = 'm1';
    return this.http
      .get('https://hidden-badlands-21838.herokuapp.com/api/transaction/portfolio/' + user)
      .toPromise().then((res) => {
      console.log(res.json());
      return res.json();
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

}
