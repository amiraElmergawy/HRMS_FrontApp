import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  passFlag = false
  alertFlag = false

  currentUser=''

  constructor(private service: AdminService,
    private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('enter pressed')
      this.logIn()
    }
  }

  ngOnInit(): void {
    // this.service.checkLoadFlag().subscribe()
  }

  logIn(){
    if (this.logInForm.valid) {
      localStorage.setItem('loadingFlag','true')
      // this.alertFlag = false
      // console.log()
      this.service.logIn(this.logInForm.value).subscribe(
        data=>{
          // console.log(data)
          localStorage.setItem('loadingFlag','false')
          localStorage.setItem('userType', data.data.admin.type)
          localStorage.setItem('currentUser', JSON.stringify(data.data.admin))
          localStorage.setItem('token', data.data.token)
          this.router.navigate([''])
          this.currentUser = data?.data?.admin?.userName
        },
        error=>{
          localStorage.setItem('loadingFlag','false')
          // console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        }
      )
    }
    else {
      this.alertFlag = true;
      setTimeout(_=>{
        this.alertFlag = false
      },
      2500
      )
    }
  }

}
