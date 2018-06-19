import {Component, OnInit} from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import {LegendItem, ChartType} from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import {JoinedDetailServiceService} from '../../services/joined-detail-service.service';
import {AnalystServiceService} from '../../services/analyst-service.service'
import {TransactionsServiceService} from '../../services/transactions-service.service'
import { User } from '../../models/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare interface TableData {
  headerRow : string[];
  dataRows : string[][];
}

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {

  public tableData1 : TableData;
  public tableData2 : TableData;

  private currentUser: User = null
  private rowData: any;
  private rowData2: any;
  private currentRound: number;

  constructor(
    private joinedDetailServiceService : JoinedDetailServiceService, 
    private analystServiceService: AnalystServiceService,
    private transactionsServiceService: TransactionsServiceService
  ) {
    console.log(this.joinedDetailServiceService.getUsers());

    this.currentUser = this.joinedDetailServiceService.getCurrentUser();

    this.tableData1 = {
      headerRow: [
        'Action', 'Duration', 'Sector',  'Type'
      ],
      dataRows: null
    };

    this.analystServiceService.getAnalystData(this.currentUser,0,JSON.parse(localStorage.getItem("userData")).gameId).subscribe(response => {
      console.log(response);
      const decodedData : any = response.json();
      console.log(decodedData);
      this.rowData = decodedData;

      this.tableData1 = {
        headerRow: [
          'Action', 'Duration', 'Sector',  'Type'
        ],
        dataRows: this.rowData
      };
    })

    this.rowData2 = JSON.parse(localStorage.getItem("userData")).round.stocks;
    this.currentRound = JSON.parse(localStorage.getItem("userData")).currentRound;

    console.log(this.rowData2);

    this.tableData2 = {
      headerRow: [
        'Company', 'Sector', 'Price', 'Buy'
      ],
      dataRows: this.rowData2 
    };

  }

  ngOnInit() {}

  public buyShare(amount: any){
    const accountNumber = this.currentUser.accountNumber;
    this.transactionsServiceService.transaction('debit',String(amount),String(accountNumber), 'buying').subscribe(response=>{
      console.log(response);
      alert('you have succefully bought')!
    })
  }


}
