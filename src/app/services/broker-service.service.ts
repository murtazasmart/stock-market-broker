import { Injectable } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Http, Response } from "@angular/http";
import { BrokerTransaction } from "../models/brokerTransaction";
import { Stock } from "../models/stock";
import { Portfolio } from "../models/porfolio";

@Injectable()
export class BrokerServiceService {
  constructor(private http: Http) {}

  public bTransaction(
    name: string,
    stock: string,
    quantity: number,
    type: string,
    price: number,
    gameId: string,
    turn: number
  ): Observable<Response> {
    return this.http.post(
      "https://hidden-badlands-21838.herokuapp.com/api/transaction/",
      {
        name,
        stock,
        quantity,
        type,
        price,
        gameId,
        turn
      }
    );
  }

  public portfolio(user: string): Observable<BrokerTransaction[]> {
    return this.http
      .get(
        "https://hidden-badlands-21838.herokuapp.com/api/transaction/portfolio/" +
          user
      )
      .map(res => {
        const data = res.json();
        console.log(data);
        let transactionsList: BrokerTransaction[] = [];
        data.forEach((element: BrokerTransaction) => {
          const trans: any = transactionsList.find(
            x => x.stock === element.stock
          );
          let newData;
          console.log(transactionsList.find(x => x.stock === element.stock));
          if (transactionsList.find(x => x.stock === element.stock)) {
            console.log("inside");
            if (trans.type === "buy" && element.type === "buy") {
              element.quantity = element.quantity + trans.quantity;
              newData = element;
            } else if (trans.type === "buy" && element.type === "sell") {
              element.quantity = trans.quantity - element.quantity;
              newData = element;
            } else if (trans.type === "sell" && element.type === "buy") {
              element.quantity = element.quantity - trans.quantity;
              newData = element;
            } else if (trans.type === "sell" && element.type === "sell") {
              element.quantity = -element.quantity - trans.quantity;
              newData = element;
            }
            if (newData.quantity <= 0) {
              newData.type = "sell";
            } else {
              newData.type = "buy";
            }
            transactionsList = transactionsList.filter(function(obj) {
              return obj.stock !== element.stock;
            });
            if (newData.quantity > 0) transactionsList.push(newData);
          } else {
            transactionsList.push(element);
          }
        });

        return transactionsList;
      });
  }
  public getPortfolioValue(
    user: string,
    
  ): Observable<Portfolio[]> {
    let apiUrl =
      "https://hidden-badlands-21838.herokuapp.com/api/transaction/value/portfolio/" +
      user 
     
    console.log(
      "https://hidden-badlands-21838.herokuapp.com/api/transaction/value/portfolio/" +
        user 
    );
    return this.http.get(apiUrl).map(res => {
      console.log(res.json());
      console.log("price Vaiables6");
      const obj = res.json();

      let array1 = Object.keys(obj).map(function(k) {
        return obj[k];
      });
      console.log("price Vaiables7");
      console.log(array1);
      return array1.map((item) => {
        console.log(item);
        return new Portfolio(item);
      });
    });
  }

  
}
