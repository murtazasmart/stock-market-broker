import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'

@Injectable()
export class CpuPlayerService {

  constructor(private router: Router, private http: Http) {

  }

  public getData() {

    // let josnArray = [
    //   {
    //     "company": "99X",
    //     "price": 103,
    //     "round": 0,
    //     "sector": "Technology"
    //   },
    //   {
    //     "company": "Virtusa",
    //     "price": 104,
    //     "round": 0,
    //     "sector": "Technology"
    //   },
    //   {
    //     "company": "WSO2",
    //     "price": 101,
    //     "round": 0,
    //     "sector": "Technology"
    //   },
    //   {
    //     "company": "John Keells",
    //     "price": 102,
    //     "round": 0,
    //     "sector": "Business"
    //   },
    //   {
    //     "company": "Cargills",
    //     "price": 102,
    //     "round": 0,
    //     "sector": "Business"
    //   }
    // ];

    // return josnArray;


    let jsonArray = [{
      "Technology": [
        "99X",
        "Virtusa",
        "WSO2"
      ],
      "Business": [
        "John Keells",
        "Cargills"
      ]
    }];
    return jsonArray;
    // console.log('Service Accessed get data');
    // let CompanyDetails = this
    //   .http
    //   .get('https://stock-market-simulator.herokuapp.com/api/v1/game/stock/details?id=5b2dd881f202830030795210')
    //   .subscribe(response => {
    //     const data: any = response.json();
    //     return data;
    //   });
    // console.log("SAMPLE" + JSON.stringify(CompanyDetails));
    // return CompanyDetails;
  }

  public getCompanyWiseHistory(companyName) {
    let josnArray = [{
      "0": 123
    },
    {
      "1": 163
    },
    {
      "2": 133
    },
    {
      "3": 145
    },
    {
      "4": 111
    },
    {
      "5": 131
    },
    {
      "6": 154
    },
    {
      "7": 160
    },
    {
      "8": 100
    },
    {
      "9": 94
    },
    {
      "10": 90
    },
    {
      "11": 123
    },
    {
      "12": 131
    },
    {
      "13": 117
    },
    {
      "14": 109
    },
    {
      "15": 121
    },
    {
      "16": 154
    },
    {
      "17": 129
    },
    {
      "18": 103
    },
    {
      "19": 138
    },
    {
      "20": 154
    },
    {
      "21": 141
    },
    {
      "22": 125
    },
    {
      "23": 122
    },];

    // let sample: {
    //   company: '',
    //   round: '',
    //   stockprice: '',
    // }

    let ParentArray = [];

    for (var i in josnArray) {
      let round = i;
      let stockPrice = josnArray[i][i];
      const newOb = {
        companyName,
        round,
        stockPrice
      };
      ParentArray.push(newOb);
    }
    return ParentArray;
  }

  public bankStartGame() {
    return this
      .http
      .get('https://exithost.000webhostapp.com/bank/startgame')
      .subscribe(response => {
        const responseStart: any = response.json();
        console.log('BANK STarted', responseStart);
      });

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
