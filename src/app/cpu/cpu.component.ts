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
  private TechnologyX = [];
  private Technologyy = [];
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
  private lastRound: number = 0;

  private roundData = [{
    "company": "99X",
    "price": 101,
    "round": 1,
    "sector": "Technology"
  },
  {
    "company": "Virtusa",
    "price": 101,
    "round": 1,
    "sector": "Technology"
  },
  {
    "company": "WSO2",
    "price": 102,
    "round": 1,
    "sector": "Technology"
  },
  {
    "company": "John Keells",
    "price": 102,
    "round": 1,
    "sector": "Business"
  },
  {
    "company": "Cargills",
    "price": 102,
    "round": 1,
    "sector": "Business"
  }];

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private cpuService: CpuPlayerService) {

    // var synaptic = require('synaptic');
    // var Neuron = synaptic.Neuron,
    // Layer = synaptic.Layer,
    // Network = synaptic.Network,
    // Trainer = synaptic.Trainer,
    // Architect = synaptic.Architect;
    // let myPerceptron = this.Perceptron(1, 13, 1);
    // this.Perceptron(2, 1, 1);
    // this.Perceptron(3, 2, 1);
    // console.log("SYNAPTIC" + JSON.stringify(synaptic));
    // console.log("CONSTRUCTOR" + csv);
    // csv().fromFile('Advertising.csv').on('json', (jsonObj) => {
    //   console.log("CSV READING");
    //   this.csvData.push(jsonObj);
    // }).on('done', () => {
    //   console.log("DONE READING FILE");
    //   this.dressData(); // To get data points from JSON Objects
    //   this.performRegression();
    // });
    // this.dressData();
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
        this.performRegression();
        console.log(companyWiseDataArray);
      })

    } catch (error) {
      alert(error);
    }
  }

  dressData(arrayOfData) {
    arrayOfData.forEach((row) => {
      this.lastRound = row.round;
      switch (row.companyName) {
        case '99X':
          this.TechnologyX.push(this.f(row.round));
          this.Technologyy.push(this.f(row.stockPrice));
        case 'Virtusa':
          this.TechnologyX.push(this.f(row.round));
          this.Technologyy.push(this.f(row.stockPrice));
        case 'WSO2':
          this.TechnologyX.push(this.f(row.round));
          this.Technologyy.push(this.f(row.stockPrice));
        case 'IFS':
          this.TechnologyX.push(this.f(row.round));
          this.Technologyy.push(this.f(row.stockPrice));
      }
    });
  }

  f(s) {
    return parseFloat(s);
  }

  performRegression() {
    this.regressionModel = new SLR(this.TechnologyX, this.Technologyy); // Train the model on training data
    this.playHand();

  }

  predictOutput() {
    let nextRound: number = Number(this.lastRound) + 1;
    console.log("NEXT ROUND" + nextRound);
    // let floatNumber = parseFloat('' + nextRound);
    let prediction=this.regressionModel.predict(parseFloat(""+nextRound));
    console.log('Prediction'+prediction);
  }

  playHand() {
    this.predictOutput();
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
