import { Component, OnInit } from '@angular/core';
import {SimulatorServiceService} from '../../services/simulator-service.service';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  constructor() { 
    console.log("end game",JSON.parse(localStorage.getItem('userData')).currentRound);
  }

  ngOnInit() {
  }

}
