import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'

@Injectable()
export class CpuPlayerService {

  constructor(private router: Router, private http: Http) {

  }

  public getData() {

    let josnArray = [
      {
        "company": "99X",
        "price": 103,
        "round": 0,
        "sector": "Technology"
      },
      {
        "company": "Virtusa",
        "price": 104,
        "round": 0,
        "sector": "Technology"
      },
      {
        "company": "WSO2",
        "price": 101,
        "round": 0,
        "sector": "Technology"
      },
      {
        "company": "John Keells",
        "price": 102,
        "round": 0,
        "sector": "Business"
      },
      {
        "company": "Cargills",
        "price": 102,
        "round": 0,
        "sector": "Business"
      }
    ];

    return josnArray;


    // console.log('Service Accessed');
    // return this
    //   .http
    //   .get('https://stock-market-simulator.herokuapp.com/api/v1/game/round/stock/5b292d7d69fbe30030e38f76')
    //   .subscribe(response => {
    //     // after game is reset
    //     const responseStart: any = response.json();
    //     console.log('stock Prices', responseStart);
    //   });
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

    let sample: {
      company: '',
      round: '',
      stockprice: '',
    }

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

}
