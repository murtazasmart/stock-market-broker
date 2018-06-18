import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'

@Injectable()
export class CpuPlayerService {

  constructor(private router: Router, private http: Http) {

  }

  public getData() {
    return this
      .http
      .get('https://stock-market-simulator.herokuapp.com/api/v1/game/turn/5b11abb11835324dd8bc1156')
      .subscribe(response => {
        // after game is reset
        const responseStart: any = response.json();
        console.log('startGame', responseStart);
      })
  }

}
