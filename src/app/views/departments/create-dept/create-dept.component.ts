import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
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

  constructor(private service: MainService, private storage:LocalStorageService) { }

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
    this.storage.store('loadingFlag', true)
    this.service.show('departments').subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.departments = data
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.departments = '';
      })
  }

  getEmployees() {
    this.storage.store('loadingFlag', true)
    this.service.show('employees').subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.employees = data
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.employees = '';
      })
  }

  add() {
    if (this.deptForm.valid) {
      this.storage.store('loadingFlag', true)
      // this.alertFlag = false
      // console.log(this.deptForm.value)
      this.service.create('departments', this.deptForm.value).subscribe(
        data => {
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess(`تمت اضافة قسم ${data.data.name} بنجاح  `)
        },
        error => {
          this.storage.store('loadingFlag', false)
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
