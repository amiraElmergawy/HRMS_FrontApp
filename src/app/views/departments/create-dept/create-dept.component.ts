import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-create-dept',
  templateUrl: './create-dept.component.html',
  styleUrls: ['./create-dept.component.css']
})
export class CreateDeptComponent implements OnInit {
  deptForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern("^[\u0621-\u064A ]+$"),
      Validators.minLength(4)
    ]),
    // child: new FormControl('', Validators.required),
    head: new FormControl('')
  });

  alertFlag = false
  departments='';
  employees='';

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
    this.getDepartments()
    this.getEmployees()
  }

  getDepartments() {
    this.service.show('departments').subscribe(
      data => {
        // console.log(data)
        localStorage.setItem('loadingFlag', 'false')
        this.departments = data
      },
      error => {
        localStorage.setItem('loadingFlag', 'false')
        this.departments = '';
      })
  }

  getEmployees() {
    this.service.show('employees').subscribe(
      data => {
        // console.log(data)
        localStorage.setItem('loadingFlag', 'false')
        this.employees = data
      },
      error => {
        localStorage.setItem('loadingFlag', 'false')
        this.employees = '';
      })
  }

  add() {
    if (this.deptForm.valid) {
      localStorage.setItem('loadingFlag', 'true')
      // this.alertFlag = false
      // console.log(this.deptForm.value)
      this.service.create('departments', this.deptForm.value).subscribe(
        data => {
          // console.log(data)
          localStorage.setItem('loadingFlag', 'false')
          this.service.handleSuccess(`تمت اضافة قسم ${data.data.name} بنجاح  `)
        },
        error => {
          localStorage.setItem('loadingFlag', 'false')
          // console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        }
      )
    }
    else {
      this.alertFlag = true;
      setTimeout(_ => {
        this.alertFlag = false
      }, 1000)
    }
  }

  clear() {
    this.deptForm.reset()
  }

}
