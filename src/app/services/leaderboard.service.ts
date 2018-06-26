import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JoinServiceService } from '../services/join-service.service';

@Injectable()
export class LeaderboardService {

  constructor(
    private http: Http,
    private joinServiceService: JoinServiceService
  ) {
    console.log("Meee");
   }

  public getData(): Promise<any> {
    return new Promise((resolve, reject) => {
    this.joinServiceService.getAllLoggedUsers().then((users) => {
      const promiseArr = [];
      users.forEach((user) => {
        promiseArr.push(this.http.get(" https://stock-market-bank-service.herokuapp.com/bank/balance/" + user.accountNumber).toPromise());
      });
      Promise.all(promiseArr).then((bankBalanceResults) => {
        console.log("bank results", bankBalanceResults);
        bankBalanceResults = JSON.parse(JSON.stringify(bankBalanceResults));
        const promiseArr2 = [];
        users.forEach((user) => {
          promiseArr2.push(this.http.get("https://hidden-badlands-21838.herokuapp.com/api/transaction/value/portfolio/" + user.name).toPromise());
        });
        Promise.all(promiseArr2).then((portfolioResults) => {
        console.log("portfolio results", portfolioResults);
          const resultObject = []
          users.forEach((user) => {
            // const bankBalance = bankBalanceResults.find(x => x.accountNumber === user.accountNumber);
            const bankBalance = this.searchAccountNumber(bankBalanceResults, user.accountNumber);
            // const portfolioValue = portfolioResults.find(x => x.name === user.name);
            const portfolioValue = this.searchPortfolio(portfolioResults, user.name)
            const totalValue = bankBalance + portfolioValue;
            const obj = {
              playerName: user.name,
              bankBalance: bankBalance,
              portfolioValue: portfolioValue,
              total: totalValue,
            }
            resultObject.push(obj);
          });
          resolve(resultObject);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    }).catch((err) => {
      console.log(err);
      reject(err);
    })
    });
  }

  private searchAccountNumber(results: any[], accountNumber: string ) {
    let result = 0;
    results.forEach((res) => {
      const res2 = JSON.parse(res._body);
      if (res2.accountNumber === accountNumber) {
        result = Number(res2.balace);
      }
    });
    return result;
  }

  private searchPortfolio(results: any[], name: string ) {
    let result = 0;
    results.forEach((res) => {
      const res2 = JSON.parse(res._body);
      if (res2.name === name) {
        result = Number(res2.value);
      }
    });
    return result;
  }

}
