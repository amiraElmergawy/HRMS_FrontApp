import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { SimpleModalComponent } from 'ngx-simple-modal';
// import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})

export class UpdateAdminComponent {
  updateAdminForm = new FormGroup({
    // userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  adminId;

  passFlag = false
  alertFlag = false

  currentUser = ''

  constructor(private service: MainService, private actRoute: ActivatedRoute, private router: Router, private storage:LocalStorageService) {
    this.adminId = this.actRoute.snapshot.params.id.valueOf();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('enter pressed')
      this.update()
    }
  }

  ngOnInit(): void {
    // this.service.checkLoadFlag().subscribe()
  }

  update() {
    if (this.updateAdminForm.valid) {
      this.storage.store('loadingFlag', true)
      this.service.update(`admins/update/${this.adminId}`, this.updateAdminForm.value).subscribe(
        data => {
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess()
          setTimeout(_=>{
            this.router.navigate(['home/show-all-users'])
          }, 500)
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
      },
        2500
      )
    }
  }

  clear() {
    this.updateAdminForm.reset()
  }
}
