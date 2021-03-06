import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { JoinServiceService } from '../../services/join-service.service';
import { JoinedDetailServiceService } from '../../services/joined-detail-service.service';
import { User } from '../../models/user';
import { CpuComponent } from '../../cpu/cpu.component';
import { AIBot } from '../../models/aibot';
import swal from 'sweetalert2';

@Component({ selector: 'app-join', templateUrl: './join.component.html', styleUrls: ['./join.component.scss'] })
export class JoinComponent implements OnInit {
  model: any = {};
  loading = false;
  spinner: boolean = false;
  spinnerstart: boolean = false;
  returnUrl: string;
  joined: boolean = false;
  playerName: string = null;
  filled: boolean = true;
  userList: User[];
  aiBotList: AIBot[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private joinService: JoinServiceService,
    private joinedDetailServiceService: JoinedDetailServiceService
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.userList = this.joinedDetailServiceService.getUsers();
  }

  ngOnInit() { }

  async login() {
    this.spinner = true;
    try {
      this.joinService.loggin(this.playerName).subscribe(res => {
        this.spinner = false;
        this.playerName = '';
        this.filled = false;
        this.userList = this.joinedDetailServiceService.getUsers();
      });
    } catch (error) {
      console.log('error occured');
      this.spinner = false;
      swal('Error!', 'Joining Failed! Try With A different User Name', 'error');
    }
  }

  async loginAIBot() {
    this.spinner = true;
    try {
      this.joinService.logginAIBot(this.playerName).subscribe(res => {
        this.spinner = false;
        this.playerName = '';
        this.filled = false;
        // this.aiBotList = this.joinedDetailServiceService.getUsers();
        this.aiBotList = this.joinedDetailServiceService.getAIBots();
        localStorage.setItem("aiBots", JSON.stringify(this.aiBotList));
        console.log(this.aiBotList);
      });
    } catch (error) {
      console.log('error occured');
      this.spinner = false;
      swal('Error!', 'Error in BOT Creation Try with a Different BOT Name', 'error');
    }
  }


  // async addBot() {
  //   this.spinner = true;
  //   try {
  //     this.joinService.addBot(this.playerName).subscribe(res => {
  //       this.spinner = false;
  //       this.playerName = '';
  //       this.filled = false;
  //       this.userList = this.joinedDetailServiceService.getUsers();
  //     });
  //   } catch (error) {
  //     this.spinner = false;
  //     alert(error);
  //   }
  // }
  async start() {
    this.spinnerstart = true;
    const users = localStorage.getItem('users');
    const bots = localStorage.getItem('aiBots')
    try {
      if (users == "null" || users == "" && bots != null) {
        swal('Error!', 'You Need to Have at leset One Player To Continue', 'error');
        this.spinnerstart = false;
      } else {
        await this.joinService.startGame();
      }
    } catch (error) {
      this.spinnerstart = false;
      swal('Sorry!', 'We Are Unable To Start The Game!', 'error');
      alert(error);
    }
  }

  clear() {
    this.joinedDetailServiceService.clearUserData();
    this.userList = this.joinedDetailServiceService.getUsers();
  }
}
