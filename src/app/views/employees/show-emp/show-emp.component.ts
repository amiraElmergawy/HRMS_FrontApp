import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  empId
  employee
  empDept
  empHead
  currentUserType = JSON.parse(localStorage.getItem('userType'))
  deleteFlag = false
  persDataFlag = false

  collapse() {
    var coll = document.getElementsByClassName("collapsible");
    // console.log(coll, coll[0], coll.item(0))
    // console.log(document.getElementsByClassName("hmada"))
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    // content.style.maxHeight = content.scrollHeight / 4 + "px"
  }

  changeDateFormat(date) {
    return date.substring(0, 10)
  }

  constructor(private service: MainService, private actRoute: ActivatedRoute, private router: Router, private storage: LocalStorageService) {
    this.empId = this.actRoute.snapshot.params.id.valueOf();
  }

  getEmployee(empId) {
    this.storage.store('loadingFlag', true)
    this.service.show(`employees/${empId}`).subscribe(
      data => {
        this.storage.store('loadingFlag', false)
        if (empId == this.empId) { // function called on init
          this.employee = data
          this.getDepartment(data.jobData.dept)
          if (data.jobData.directPoss) {
            this.getEmployee(data.jobData.directPoss)
          }
          this.employee.personalData.gender = this.employee.personalData.gender ? 1 : 0
          this.employee.personalData.religion = this.employee.personalData.religion ? 1 : 0
          this.employee.jobData.status = this.employee.jobData.status ? 1 : 0
          this.employee.personalData.birthDate = this.changeDateFormat(this.employee.personalData.birthDate)
          this.employee.nationalData.issDate = this.changeDateFormat(this.employee.nationalData.issDate)
          this.employee.nationalData.expDate = this.changeDateFormat(this.employee.nationalData.expDate)
          this.employee.contractData.startaDate = this.changeDateFormat(this.employee.contractData.startaDate)
          this.employee.contractData.insuranceDate = this.changeDateFormat(this.employee.contractData.insuranceDate)
          this.employee.contractData.hireDate = this.changeDateFormat(this.employee.contractData.hireDate)
          this.employee.contractData.endDate = this.changeDateFormat(this.employee.contractData.endDate)
        }
        else this.empHead = data // empolyee's direct poss info called
        // console.log(data)
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.service.handleError(error)
        this.employee = ''
      }
    )
  }

  getDepartment(deptId) {
    this.storage.store('loadingFlag', true)
    this.service.show(`departments/${deptId}`).subscribe(
      data => {
        this.storage.store('loadingFlag', false)
        this.empDept = data
        // console.log(data)
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.empDept = ''
        this.service.handleError(error, 'بيانات القسم غير موجوده')
      }
    )
  }

  deleteEmp() {
    if (this.currentUserType) {
      this.storage.store('loadingFlag', true)
      this.service.delete(`employees/delete/${this.empId}`).subscribe(
        data => {
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess()
          // tr.classList.add('d-none');
        },
        error => {
          this.storage.store('loadingFlag', false)
          // console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        }
      )
    }
  }

  navigate() {
    this.router.navigate([`home/update-employee/${this.empId}`])
  }

  ngOnInit(): void {
    this.getEmployee(this.empId)
    this.collapse()
  }

}
