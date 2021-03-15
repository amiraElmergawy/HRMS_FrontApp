import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-index-emp',
  templateUrl: './index-emp.component.html',
  styleUrls: ['./index-emp.component.css']
})
export class IndexEmpComponent implements OnInit {
  employees
  filteringValue = ''

  constructor(private service: MainService, private router: Router, private storage:LocalStorageService) { }


  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.storage.store('loadingFlag', true)
    this.service.show('employees').subscribe(
      data => {
        this.storage.store('loadingFlag', false)
        this.employees = data
      },
      error => {
        this.storage.store('loadingFlag', false)
        console.log(error)
        this.service.handleError(error)
      })
  }

  navigate(empId){
    // console.log(id)
    this.router.navigate([`home/show-employee/${empId}`])
  }

}
