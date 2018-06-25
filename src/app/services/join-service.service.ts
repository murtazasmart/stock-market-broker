import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { JoinedDetailServiceService } from './joined-detail-service.service'
import { User } from '../models/user';
import { Subscription, Observable } from 'rxjs';
import { AIBot } from '../models/aibot';

@Injectable()
export class JoinServiceService {

  constructor(
    private http: Http,
    private router: Router,
    private joinedDetailServiceService: JoinedDetailServiceService
  ) { }

  public startGame(): Subscription {
    return this
      .http
      .get('https://stock-market-bank-service.herokuapp.com/bank/account')
      .subscribe(response => {
        const account: any = response.json();
        if (account != null) {
          this
            .http
            .post('https://stock-market-simulator.herokuapp.com/api/v1/game', { gameName: "StockGame" })
            .subscribe(response => {
              const decoded: any = response.json();
              if (decoded.name === "StockGame") {

                const userData = {
                  isStartGame: true,
                  isLoggedIn: true,
                  ...decoded
                }
                localStorage.setItem("userData", JSON.stringify(userData));
                this
                  .router
                  .navigate(['/dashboard']);
                console.log(userData);
              }

            } //check account is null
            )

        } else {
          alert('Please Add Players');
        }
      })

  }

  public endGame(): Subscription {
    return this
      .http
      .get('https://stock-market-bank-service.herokuapp.com/bank/startgame')
      .subscribe(response => {
        // after game is reset
        const responseStart: any = response.json();
        console.log('startGame', responseStart);
      })

  }

  // public addBot(name: String): Observable<any> {
  //   return this
  //     .http
  //     .post('https://stock-market-bank-service.herokuapp.com/bank/account', {
  //       Name: name
  //     }, {
  //         headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  //       })
  //     .map(response => {
  //       const decodedBankAccount: any = response.json();
  //       console.log('create join', decodedBankAccount);
  //       if (decodedBankAccount.Name === name) {
  //         const user: User = decodedBankAccount;
  //         this.joinedDetailServiceService.addUser(user);
  //         // console.log(this.joinedDetailServiceService.getUsers());
  //       }
  //     })
  // }

  public loggin(name: string): Observable<any> {
    return this
      .http
      .post('https://stock-market-bank-service.herokuapp.com/bank/account', {
        Name: name
      }, {
          headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        })
      .map(response => {
        const decodedBankAccount: any = response.json();
        console.log('create join', decodedBankAccount);
        if (decodedBankAccount.Name === name) {
          const user: User = decodedBankAccount;
          this.joinedDetailServiceService.addUser(user);
          console.log(this.joinedDetailServiceService.getUsers());
        }
      })

  }

  public logginAIBot(name: string): Observable<any> {
    return this
      .http
      .post('https://stock-market-bank-service.herokuapp.com/bank/account', {
        Name: name
      }, {
          headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        })
      .map(response => {
        const decodedBankAccount: any = response.json();
        console.log('create join', decodedBankAccount);
        if (decodedBankAccount.Name === name) {
          const aiBot: AIBot = decodedBankAccount;
          this.joinedDetailServiceService.addAIBot(aiBot);
          console.log(this.joinedDetailServiceService.getAIBots());
        }
      })

  }

}
