import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})
export class ShowDeptComponent implements OnInit {

  deptId
  department
  employees = ''
  deptHead
  currentUserType = JSON.parse(localStorage.getItem('userType'))
  removeFlag = false
  addFlag = false
  updateFlag = false
  updateHeadFlag = false
  departments
  childId = ''
  headId = ''
  allEmps

  constructor(private service: MainService, private dataService: SharingDataService, private actRoute: ActivatedRoute, private router: Router, private storage:LocalStorageService) {
    this.deptId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    this.getDepartment()
    this.getDeptEmployees()
  }

  getDepartment() {
    this.storage.store('loadingFlag', true)
    this.service.show(`departments/${this.deptId}`).subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        // return data;
        this.department = data
        if (this.department?.head) {
          this.getHead()
        }
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.department = ''
        // return '';
      }
    )
  }

  getHead() {
    this.storage.store('loadingFlag', true)
    this.service.show(`employees/${this.department.head}`).subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        // return data;
        this.deptHead = data
        // console.log(this.deptHead, "head")
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.deptHead = ''
        // return '';
      }
    )
  }

  getDeptEmployees() {
    this.storage.store('loadingFlag', true)
    this.service.show(`departments/${this.deptId}/employees`).subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.employees = data.data
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.employees = '';
      })
  }

  show(id) {
    this.router.navigate([`/home/show-department/${id}`])
  }

  removeChild(_id) {
    if (this.currentUserType) {
      // console.log(tr, id)
      this.storage.store('loadingFlag', true)
      this.service.create(`departments/${this.deptId}/removeChild`, { _id }).subscribe(
        res => {
          console.log(res)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess()
          this.department = res.data.dept
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

  getDepartments() {
    this.addFlag = true
    if (!this.departments || this.departments == '') {
      this.storage.store('loadingFlag', true)
      this.service.show('departments').subscribe(
        data => {
          console.log(data)
          this.storage.store('loadingFlag', false)
          this.departments = data
        },
        error => {
          this.storage.store('loadingFlag', false)
          this.departments = '';
        })
    }
  }

  addChild() {
    if (this.childId && this.childId != '') {
      // console.log(tr, id)
      this.storage.store('loadingFlag', true)
      this.service.create(`departments/${this.deptId}/addChild`, { _id: this.childId }).subscribe(
        res => {
          console.log(res)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess()
          this.department = res.data
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

  update(event?) {
    if (this.currentUserType) {
      let updatedData
      if (event) {
        updatedData = {name:event.target.parentElement.parentElement.children[0].textContent.substring(4)}
      } else if(this.headId && this.headId != ''){
        updatedData = {head:this.headId}
      } else updatedData =''
      // console.log(updatedData)
      if (updatedData != '') {
        this.storage.store('loadingFlag', true)
        this.service.update(`departments/update/${this.deptId}`, updatedData).subscribe(
          res => {
            console.log(res)
            this.storage.store('loadingFlag', false)
            this.department = res.data
            this.service.handleSuccess(`تم تحديث قسم ${this.department.name}`)
            // this.getDepartments()
            if (this.updateHeadFlag == true) {
              this.updateHeadFlag = false
              this.getHead()
            } else
            this.updateFlag = false
          },
          error => {
            this.storage.store('loadingFlag', false)
            console.log(error)
            this.service.handleError(error)
            this.cancel(event)
            // this.service.onShowWarning()
          }
        )
      }
    }
  }

  cancel(event) {
    this.updateFlag = false
    event.target.parentElement.parentElement.children[0].textContent = `قسم ${this.department.name}`
  }

  getAllEmployees(){
    this.updateHeadFlag = true
    if (!this.allEmps || this.allEmps == '') {
      this.storage.store('loadingFlag', true)
      this.service.show('employees').subscribe(
        data => {
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.allEmps = data
        },
        error => {
          this.storage.store('loadingFlag', false)
          this.allEmps = '';
        })
    }
  }


}
