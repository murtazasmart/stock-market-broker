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


    // let josnArray = [
    //   {
    //     "Technology": [
    //       "99X",
    //       "Virtusa",
    //       "WSO2"
    //     ],
    //     "Business": [
    //       "John Keells",
    //       "Cargills"
    //     ]
    //   }
    // ];

    // return josnArray;


    return this.http
      .get('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/details?id=5b2f42ae0272d00030623f97')
      .toPromise().then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((err) => {
        console.log(err);
        return err;
      });
  }

  public getCompanyWiseHistory(companyName) {
    // let josnArray = [{
    //   "0": 123
    // },
    // {
    //   "1": 163
    // },
    // {
    //   "2": 133
    // },
    // {
    //   "3": 145
    // },
    // {
    //   "4": 111
    // },
    // {
    //   "5": 131
    // },
    // {
    //   "6": 154
    // },
    // {
    //   "7": 160
    // },
    // {
    //   "8": 100
    // },
    // {
    //   "9": 94
    // },
    // {
    //   "10": 90
    // },
    // {
    //   "11": 123
    // },
    // {
    //   "12": 131
    // },
    // {
    //   "13": 117
    // },
    // {
    //   "14": 109
    // },
    // {
    //   "15": 121
    // },
    // {
    //   "16": 154
    // },
    // {
    //   "17": 129
    // },
    // {
    //   "18": 103
    // },
    // {
    //   "19": 138
    // },
    // {
    //   "20": 154
    // },
    // {
    //   "21": 141
    // },
    // {
    //   "22": 125
    // },
    // {
    //   "23": 122
    // },];

    // let sample: {
    //   company: '',
    //   round: '',
    //   stockprice: '',
    // }

    let ParentArray2 = [];

    return this
      .http
      .get('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/history?id=5b2f42ae0272d00030623f97&stockName=' + companyName)
      .toPromise().then((res) => {
        let jsonArray = res.json();
        // console.log(jsonArray);
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
        // console.log(ParentArray2);
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

}
