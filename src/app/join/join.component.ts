import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
 model: any = {};
  loading = false;
  returnUrl: string;
  joined:boolean=false;

  constructor(private route: ActivatedRoute, private router: Router) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnInit() {}

  login() {
    //  this.joined=true;
    localStorage.setItem("loggedIn", "true");
    this.router.navigate(['/dashboard']);
  }

}
