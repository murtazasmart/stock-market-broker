import { Component, OnInit } from '@angular/core';
import { SLR } from 'ml-regression';
import { Http, Response } from '@angular/http';
import { CpuPlayerService } from '../services/cpu-player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";
// import {Response} from '@an'
// import * as csv from 'csvtojson';
// import * as ml from 'ml-regression';
// import { CSVDATA } from '../cpu/Advertising.csv';
// import { Architect } from 'synaptic';
// import { Perceptron } from 'synaptic';
// import { Layer } from 'synaptic';
// import { Network } from 'synaptic';
// import { Trainer } from 'synaptic';

// const { Layer, Network } = ;


@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss']
})
export class CpuComponent implements OnInit {

  // private csvFilePath = "Advertising.csv";
  // private ml = require('ml-regression');
  // private csv;
  // private SLR = '';
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

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private cpuService: CpuPlayerService) {
    this.getSectorWiseData();
  }

  async getSectorWiseData() {
    try {
      let sectorData = await this.cpuService.getData();

      sectorData[0].Technology.forEach(element => {
        this.techCompanyArray.push(element);
      });

      sectorData[0].Business.forEach(element => {
        this.bizCompanyArray.push(element);
      });
      this.getCompanyWiseData();
    } catch (error) {
      alert(error);
    }
  }

  async getCompanyWiseData() {
    try {
      this.techCompanyArray.forEach(element => {
        let companyWiseDataArray = this.cpuService.getCompanyWiseHistory(element);
        this.dressData(companyWiseDataArray);
      });
      this.generatePredictions();
    } catch (error) {
      alert(error);
    }
  }

  generatePredictions() {
    this.techCompanyArray.forEach(element => {
      switch (element) {
        case '99X':
          let predicted99X = this.performRegression99X();
          const newOb99X = {
            companyName: element,
            prediction: predicted99X,
          }
          console.log('PRED ' + JSON.stringify(newOb99X));
          this.predictionArray.push(newOb99X);
          break;
        case 'Virtusa':
          let predictedVirtusa = this.performRegressionVirtusa();
          const newObVirtusa = {
            companyName: element,
            prediction: predictedVirtusa,
          }
          console.log('PRED ' + JSON.stringify(newObVirtusa));
          this.predictionArray.push(newObVirtusa);
          break;
        case 'WSO2':
          let predictedWSO2 = this.performRegressionWSO2();
          const newObWSO2 = {
            companyName: element,
            prediction: predictedWSO2,
          }
          console.log('PRED ' + JSON.stringify(newObWSO2));
          this.predictionArray.push(newObWSO2);
          break;
        case 'IFS':
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
    console.log("Company to Invest is" + decision);
  }

  dressData(arrayOfData) {
    arrayOfData.forEach((row) => {
      this.lastRound = row.round;
      switch (row.companyName) {
        case '99X':
          this.Technology1X.push(this.f(row.round));
          this.Technology1y.push(this.f(row.stockPrice));
        case 'Virtusa':
          this.Technology2X.push(this.f(row.round));
          this.Technology2y.push(this.f(row.stockPrice));
        case 'WSO2':
          this.Technology3X.push(this.f(row.round));
          this.Technology3y.push(this.f(row.stockPrice));
        case 'IFS':
          this.Technology4X.push(this.f(row.round));
          this.Technology4y.push(this.f(row.stockPrice));
      }
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
    return company;
  }

  investOn() {

  }

  buyShares() {

  }

  sellShares() {

  }

  getRoundWiseSectorInformation() {

  }

  getRoundWiseCompanyInformation() {

  }

  ngOnInit() {

  }

}
