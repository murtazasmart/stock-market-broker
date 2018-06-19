import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {JoinServiceService} from '../../../services/join-service.service';
import {JoinedDetailServiceService} from '../../../services/joined-detail-service.service'
import {User} from '../../../models/user';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    private listTitles : any[];
    location : Location;
    private toggleButton : any;
    private sidebarVisible : boolean;
    private userList : User[];
    private currentUser: User;

    constructor(location : Location, private element : ElementRef, private router : Router, 
        private joinService : JoinServiceService, 
        private joinedDetailServiceService : JoinedDetailServiceService)
    {
        console.log(joinedDetailServiceService.getUsers());
        this.userList = this.joinedDetailServiceService.getUsers();
        this.location = location;
        this.sidebarVisible = false;
        this.currentUser = this.joinedDetailServiceService.getCurrentUser();
    }

    public changeCurrentUser(user: User): void{
        console.log('inisdde the user change', user);
        this.joinedDetailServiceService.changeCurrentUser(user);
        this.currentUser = this.joinedDetailServiceService.getCurrentUser();
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton
                .classList
                .add('toggled');
        }, 500);
        body
            .classList
            .add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this
            .toggleButton
            .classList
            .remove('toggled');
        this.sidebarVisible = false;
        body
            .classList
            .remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton; const body =
        // document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        var titlee = this
            .location
            .prepareExternalUrl(this.location.path());
        titlee = titlee
            .split('/')
            .pop();
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    //////////////////////////////////////////////////////////////////////

    logOut() {
        this
            .joinService
            .endGame();
        localStorage.setItem("userData", JSON.stringify({isLoggedIn: false}));

        this.joinedDetailServiceService.clearUserData();
        
        this
            .router
            .navigate(['/join']);
    }
}
