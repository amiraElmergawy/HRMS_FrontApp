import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';

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

  constructor(private service: MainService, private sharingService: SharingDataService, private storage:LocalStorageService) { }

  ngOnInit(): void {
    this.getAdmins()
  }

  getAdmins() {
    this.admins = this.sharingService.getData()
    // console.log(this.admins)
    if (this.admins == '') {
      this.storage.store('loadingFlag', true)
      this.service.show('admins').subscribe(
        data => {
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.admins = data.data
          // this.service.handleSuccess(`تمت اضافة قسم ${data.data.name} بنجاح  `)
        },
        error => {
          this.storage.store('loadingFlag', false)
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
      this.storage.store('loadingFlag', true)
      this.service.update(`admins/update/${id}`, { userName: updatedName }).subscribe(
        data => {
          console.log(data)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess(`تم التحديث بنجاح`)
          this.getAdmins()
          this.cancel(name, event)
        },
        error => {
          this.storage.store('loadingFlag', false)
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
    this.storage.store('loadingFlag', true)
    this.service.delete(`admins/delete/${id}`).subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.service.handleSuccess()
        tr.classList.add('d-none');
        this.getAdmins()
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
