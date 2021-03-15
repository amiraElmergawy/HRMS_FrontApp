import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarFlag = true;
  // link = 'home#homeSubmenu'
  deptFlag = false;
  adminFlag = false;
  empFlag = false;
  currentUserType = JSON.parse(localStorage.getItem('userType'))
  constructor(private service:AdminService, private router:Router, private storage:LocalStorageService) { }

  ngOnInit(): void {
    // console.log(this.currentUserType)
  }

  logOut(){
    this.storage.store('loadingFlag', true)
    this.service.logOut().subscribe(
      data=>{
        this.storage.store('loadingFlag', false)
        console.log(data)
        localStorage.removeItem('userType')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        this.router.navigate(['logIn'])
      },
      error=>{
        this.storage.store('loadingFlag', false)
        console.log(error)
        this.service.handleError(error)
        // this.service.onShowWarning()
      }
    )

  }

}
