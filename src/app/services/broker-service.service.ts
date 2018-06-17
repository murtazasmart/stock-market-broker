import { Injectable } from '@angular/core';
import { Subscription,Observable } from 'rxjs';
import {Http, Response} from '@angular/http';

@Injectable()
export class BrokerServiceService {
  // calhost:9000/api/transaction/history
  constructor(private http: Http) { }

  public transaction(type: string, amount: string, accountNumber: string, shortDescription: string): Observable<any>{
    console.log(type,amount,accountNumber,shortDescription);
    return this
      .http
      .post('http://localhost:9000/api/transaction/history', {
        type: type,
        amount: amount,
        accountNumber: accountNumber,
        shortDescription: shortDescription
    })
  }
}
