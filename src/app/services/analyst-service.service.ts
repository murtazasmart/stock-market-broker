import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Subscription,Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AnalystServiceService {
  // https://stock-market-analyst.herokuapp.com/webapi/trends

  constructor(private http: Http) { 

  }

  public getAnalystData(user: User, turn: number, gameId: string): Observable<any>{
    console.log(user.Name,String(turn),gameId);
    return this
      .http
      .post('https://stock-market-analyst.herokuapp.com/webapi/trends', {
        user: user.Name,
        turn: String(turn),
        gameId: String(gameId)
    })
  }


}
