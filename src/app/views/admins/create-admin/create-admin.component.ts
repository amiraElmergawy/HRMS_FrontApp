import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {


  addAdminForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  passFlag = false
  alertFlag = false

  currentUser=''

  constructor(private service: MainService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('enter pressed')
      this.add()
    }
  }

  ngOnInit(): void {
    // this.service.checkLoadFlag().subscribe()
  }

  add(){
    if (this.addAdminForm.valid) {
      localStorage.setItem('loadingFlag','true')
      // this.alertFlag = false
      // console.log(this.addAdminForm.value)
      const obj = {...this.addAdminForm.value,type:0}
      console.log(obj);
      this.service.create('admins',obj).subscribe(
        data=>{
          console.log(data)
          localStorage.setItem('loadingFlag','false')
          this.service.handleSuccess()
        },
        error=>{
          localStorage.setItem('loadingFlag','false')
          console.log(error)
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

  clear() {
    this.addAdminForm.reset()
  }
}
