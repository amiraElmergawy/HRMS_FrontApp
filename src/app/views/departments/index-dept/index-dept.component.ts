import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-index-dept',
  templateUrl: './index-dept.component.html',
  styleUrls: ['./index-dept.component.css']
})
export class IndexDeptComponent implements OnInit {

  departments = ''
  currentUserType = JSON.parse(localStorage.getItem('userType'))
  true = true
  deleteFlag = false;
  name

  constructor(private service: MainService, private sharingService: SharingDataService) { }

  ngOnInit(): void {
    this.getDepartments()
  }

  getDepartments() {
    this.departments = this.sharingService.getData()
    // console.log(this.departments)
    if (this.departments == '') {
      this.service.show('departments').subscribe(
        data => {
          // console.log(data)
          localStorage.setItem('loadingFlag', 'false')
          this.departments = data
          // this.service.handleSuccess(`تمت اضافة قسم ${data.data.name} بنجاح  `)
        },
        error => {
          localStorage.setItem('loadingFlag', 'false')
          console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        })
    }
  }


  deleteDept(id, event) {
    if (this.currentUserType) {
      let tr = event.target.parentElement.parentElement
      // console.log(tr, id)
      this.service.delete(`departments/delete/${id}`).subscribe(
        data => {
          // console.log(data)
          localStorage.setItem('loadingFlag', 'false')
          this.service.handleSuccess()
          tr.classList.add('d-none');
        },
        error => {
          localStorage.setItem('loadingFlag', 'false')
          // console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        }
      )
    }
  }

}
