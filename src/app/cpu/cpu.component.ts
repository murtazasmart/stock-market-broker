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
    this.getCompanyWiseData();
  }

  async getSectorWiseData() {
    try {
      console.log("LOGIN ACCESSED");
      let xxx = await this.cpuService.getData();
    } catch (error) {
      alert(error);
    }
  }

  async getCompanyWiseData() {
    try {
      console.log("Get Compny Wise Data");
      let companyWiseDataArray = await this.cpuService.getCompanyWiseHistory('99X');
      this.dressData(companyWiseDataArray);
      this.performRegression();
      console.log(companyWiseDataArray);
    } catch (error) {
      alert(error);
    }
  }

  dressData(arrayOfData) {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    // this.csvData.forEach((row) => {
    //   // console.log("RADIO " + row.radio + " SALES " + row.sales);
    //   this.X.push(this.f(row.radio));
    //   this.y.push(this.f(row.sales));
    // });
    arrayOfData.forEach((row) => {
      // console.log("RADIO " + row.radio + " SALES " + row.sales);
      switch (row.companyName) {
        case '99X':
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
    // console.log("TEST_STOCK" + this.regressionModel.toString(5));
    // console.log("TEST_STOCK" + this.regressionModel.toString(5));
    this.playHand();

  }

  predictOutput() {
    // this.regressionModel.predict(parseFloat(24))
    // var person = prompt("Please Enter Your Prediction", "");
    // if (person == null || person == "") {
    //   alert("Please Enter a valid Amount");
    //   this.predictOutput();
    // } else {
    alert("Predicted Result " + this.regressionModel.predict(parseFloat('400')));
    //   // this.predictOutput();
    // }
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
