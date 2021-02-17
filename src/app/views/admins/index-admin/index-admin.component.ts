import { Component, OnInit } from '@angular/core';
// import { SimpleModalService } from 'ngx-simple-modal';
import { MainService } from 'src/app/services/main.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';
// import { UpdateAdminComponent } from '../update-admin/update-admin.component';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  admins = '';
  currentUserType = JSON.parse(localStorage.getItem('userType'))
  true = true
  updateFlag = false;
  name;
  promptMessage = '';

  constructor(private service: MainService, private sharingService: SharingDataService) { }

  ngOnInit(): void {
    this.getAdmins()
  }

  getAdmins() {
    this.admins = this.sharingService.getData()
    // console.log(this.admins)
    if (this.admins == '') {
      this.service.index('admins').subscribe(
        data => {
          // console.log(data)
          localStorage.setItem('loadingFlag', 'false')
          this.admins = data.data
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

  update(id, name, event) {
    // console.log(id, name, event.target.parentElement.parentElement.children[1].textContent)
    let updatedName = event.target.parentElement.parentElement.children[1].textContent
    if (updatedName != '') {
      this.service.update(`admins/update/${id}`, { userName: updatedName }).subscribe(
        data => {
          console.log(data)
          localStorage.setItem('loadingFlag', 'false')
          this.service.handleSuccess(`تم التحديث بنجاح`)
          this.getAdmins()
          this.cancel(name, event)
        },
        error => {
          localStorage.setItem('loadingFlag', 'false')
          console.log(error)
          this.service.handleError(error)
          this.cancel(name, event)
          // this.service.onShowWarning()
        }
      )
    }
  }

  cancel(name, event) {
    this.updateFlag = false
    // console.log(event.target.parentElement.parentElement.children[1].textContent)
    event.target.parentElement.parentElement.children[1].textContent = name
  }

  delete(id, event) {
    let tr = event.target.parentElement.parentElement
    // console.log(tr,id)
    this.service.delete(`admins/delete/${id}`).subscribe(
      data => {
        console.log(data)
        localStorage.setItem('loadingFlag', 'false')
        this.service.handleSuccess()
        tr.classList.add('d-none');
        this.getAdmins()
      },
      error => {
        localStorage.setItem('loadingFlag', 'false')
        console.log(error)
        this.service.handleError(error)
        // this.service.onShowWarning()
      }
    )
  }

}
