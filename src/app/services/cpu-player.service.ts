import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'

@Injectable()
export class CpuPlayerService {

  constructor(private router: Router) {

  }

  public getData() {
    console.log("GET DATA ACCESSED");
  }

}
