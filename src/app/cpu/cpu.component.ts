import { Component, OnInit } from '@angular/core';
import { SLR } from 'ml-regression';
import { Http, Response } from '@angular/http';
import { CpuPlayerService } from '../services/cpu-player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { TransactionsServiceService } from '../services/transactions-service.service';
import { BrokerServiceService } from '../services/broker-service.service';
import { AccountsService } from '../services/accounts.service';


@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss']
})
export class CpuComponent implements OnInit {

  // private csvFilePath = "Advertising.csv";
  // private ml = require('ml-regression');
  // private csv;
  private SAMPLARR = [];
  private prices99X = [];
  private pricesVirtusa = [];
  private pricesCargills = [];
  private priceDefault = [];
  private Technology1X = [];
  private Technology1y = [];
  private Technology2X = [];
  private Technology2y = [];
  private Technology3X = [];
  private Technology3y = [];
  private Technology4X = [];
  private Technology4y = [];
  private regressionModel;
  private sectorArray = [];
  private techCompanyArray = [];
  private bizCompanyArray = [];
  private techCompany1 = [];
  private techCompany2 = [];
  private techCompany3 = [];
  private techCompany4 = [];
  private bizCompany1 = [];
  private bizCompany2 = [];
  private bizCompany3 = [];
  private bizCompany4 = [];
  private telcoCompany1 = [];
  private telcoCompany2 = [];
  private telcoCompany3 = [];
  private telcoCompany4 = [];
  private healthCompany1 = [];
  private healthCompany2 = [];
  private healthCompany3 = [];
  private healthCompany4 = [];
  private predictionArray = [];
  private lastRound: number = 0;
  private companyWiseDataArrayList = [];
  private shareDetails = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private cpuService: CpuPlayerService,
    private transactionsServiceService: TransactionsServiceService,
    private brokerServiceService: BrokerServiceService) {
    this.getSectorWiseData();

  }

  async getSectorWiseData() {

    let sectorData = await this.cpuService.getData();
    try {
      sectorData.Technology.forEach(element => {
        this.techCompanyArray.push(element);
      });

      sectorData.Business.forEach(element => {
        this.bizCompanyArray.push(element);
      });

      this.getCompanyWiseData();
    } catch (error) {
      alert(error);
    }


  }

  async techCompanyParser() {
    for (let i = 0; i < this.techCompanyArray.length; i++) {
      const element = this.techCompanyArray[i];
      let companyWiseDataArray = await this.cpuService.getCompanyWiseHistory(element);
      this.companyWiseDataArrayList.push(companyWiseDataArray);
    }
  }

  async getCompanyWiseData() {
    try {
      await this.techCompanyParser();
      this.dressData(this.companyWiseDataArrayList);
      // await this.generatePredictions();
      await this.generatePredictions();
    } catch (error) {
      alert(error);
    }
  }

  generatePredictions() {
    this.techCompanyArray.forEach(element => {
      switch (element) {
        case '99X PLC':
          let predicted99X = this.performRegression99X();
          const newOb99X = {
            companyName: element,
            prediction: predicted99X,
          }
          this.predictionArray.push(newOb99X);
          break;
        case 'Virtusa PLC':
          let predictedVirtusa = this.performRegressionVirtusa();
          const newObVirtusa = {
            companyName: element,
            prediction: predictedVirtusa,
          }
          this.predictionArray.push(newObVirtusa);
          break;
        case 'WSO2 PLC':
          let predictedWSO2 = this.performRegressionWSO2();
          const newObWSO2 = {
            companyName: element,
            prediction: predictedWSO2,
          }
          this.predictionArray.push(newObWSO2);
          break;
        case 'IFS PLC':
          let predictedIFS = this.performRegressionIFS();
          const newObIFS = {
            companyName: element,
            prediction: predictedIFS,
          }
          this.predictionArray.push(newObIFS);
          break;
      }
    });
    let decision = this.makeDecision();
    localStorage.setItem('prediction', decision);
    this.getAcountBalance();
  }

  async getAcountBalance() {
    let accountDetails = await this.cpuService.getAccountBalance(1001);
    localStorage.setItem('BOTaccountBalance', accountDetails.balace);
    let balancePercentage = (accountDetails.balace / 1000) * 100;
    let twentyPercent = (accountDetails.balace / 100) * 20
    if (balancePercentage >= 20 && accountDetails.balace > 200) {
      this.investOn(accountDetails.accountNumber, twentyPercent);
    } else {
      this.sellShares(accountDetails.accountNumber);
    }
  }

  dressData(arrayOfData) {
    arrayOfData.forEach((row) => {
      this.lastRound = row[0].round;
      row.forEach(element => {
        switch (element.companyName) {
          case '99X PLC':
            this.Technology1X.push(this.f(element.round));
            this.Technology1y.push(this.f(element.stockPrice[0]));
          case 'Virtusa PLC':
            this.Technology2X.push(this.f(element.round));
            this.Technology2y.push(this.f(element.stockPrice[0]));
          case 'WSO2 PLC':
            this.Technology3X.push(this.f(element.round));
            this.Technology3y.push(this.f(row[0].stockPrice[0]));
          case 'IFS PLC':
            this.Technology4X.push(this.f(element.round));
            this.Technology4y.push(this.f(element.stockPrice[0]));
        }
      });
    });
  }

  f(s) {
    return parseFloat(s);
  }

  performRegression99X() {
    this.regressionModel = new SLR(this.Technology1X, this.Technology1y); // Train the model on training data
    let prediction = this.predictOutput();// console.log("regMod" + this.regressionModel);
    return prediction;
  }

  performRegressionVirtusa() {
    this.regressionModel = new SLR(this.Technology2X, this.Technology2y); // Train the model on training data
    let prediction = this.predictOutput();// console.log("regMod" + this.regressionModel);
    return prediction;
  }

  performRegressionWSO2() {
    this.regressionModel = new SLR(this.Technology3X, this.Technology3y); // Train the model on training data
    let prediction = this.predictOutput();// console.log("regMod" + this.regressionModel);
    return prediction;
  }

  performRegressionIFS() {
    this.regressionModel = new SLR(this.Technology4X, this.Technology4y); // Train the model on training data
    let prediction = this.predictOutput();// console.log("regMod" + this.regressionModel);
    return prediction;
  }

  predictOutput() {
    let nextRound: number = Number(this.lastRound) + 1;
    let prediction = this.regressionModel.predict(parseFloat("" + nextRound));
    return prediction;
  }

  makeDecision() {
    let highestPrice = 0;
    let company;
    this.predictionArray.forEach(element => {
      if (highestPrice < element.prediction) {
        highestPrice = element.prediction
        company = element.companyName
      }
    });
    localStorage.setItem('predictedPrice', String(highestPrice));
    return company;
  }

  investOn(accountNumber, investment) {
    let companyName = localStorage.getItem('prediction');
    let accountBalance = localStorage.getItem('BOTaccountBalance');
    let stockPrice = localStorage.getItem('predictedPrice');
    let qty = investment / Number(stockPrice);
    let purchaseValue = Number(stockPrice) * qty;
    this.getShareDetails();
    this
      .transactionsServiceService
      .transaction('debit', String(purchaseValue), accountNumber, 'buying')
      .flatMap(response => {
        return this
          .brokerServiceService
          .bTransaction('CPU', companyName, 30, 'buy', 105, '', 5);
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  sellShares(accountNumber) {
    let companyName = localStorage.getItem('prediction');
    let accountBalance = localStorage.getItem('BOTaccountBalance');
    this.getShareDetails();
    this
      .transactionsServiceService
      .transaction('credit', '3500', accountNumber, 'buying')
      .flatMap(response => {
        return this
          .brokerServiceService
          .bTransaction('CPU', companyName, 30, 'sell', 105, '', 5);
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  async getShareDetails() {
    let shareDetails = await this.cpuService.getShareDetails();
    shareDetails.forEach(element => {
      let price = element.price;
      let qty = element.quantity;
      let company = element.stock;

      let newOb = {
        price,
        qty,
        company
      }
      this.shareDetails.push(newOb);
    });
  }


  updateBankAccount() {

  }

  ngOnInit() {

  }

}
