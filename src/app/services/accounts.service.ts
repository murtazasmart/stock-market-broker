import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subscription, Observable} from 'rxjs';
import {User} from '../models/user';
import {History} from '../models/history';
import 'rxjs/add/operator/map';
import { CpuPlayerService } from './cpu-player.service';
@Injectable()
export class AccountsService {

  
  constructor(private http : Http) { }

  public getHistoryData(gameId : string) : Observable < History[] > {
    return this
      .http
      .get('https://hidden-badlands-21838.herokuapp.com/api/transaction/history/'+ gameId
      )
      .map(res => {
        return res
          .json()
          .map(item => {
            return new History(item.name, item.stock, item.quantity, item.price, item.turn,item.type);
          });
      });
  }

}
