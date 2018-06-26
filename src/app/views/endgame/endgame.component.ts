import { Component, OnInit } from '@angular/core';
import {SimulatorServiceService} from '../../services/simulator-service.service';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {
  private FinalWinner:string;
  constructor() { 
    console.log("end game round",JSON.parse(localStorage.getItem('userData')).currentRound);
    this.FinalWinner=JSON.parse(localStorage.getItem('Winner')).playerName;
    
  }

  ngOnInit() {
  }

}
