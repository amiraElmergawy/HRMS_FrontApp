import { Component, HostListener, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';

@Component({
  selector: 'app-search-dept',
  templateUrl: './search-dept.component.html',
  styleUrls: ['./search-dept.component.css']
})
export class SearchDeptComponent implements OnInit {

  alertFlag = false
  searchValue: string;
  searchForm
  data = ''
  // deptName

  constructor(private service: MainService, private sharingService: SharingDataService, private storage:LocalStorageService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('enter pressed')
      this.search()
    }
  }

  ngOnInit(): void {
  }

  search() {
    if (this.searchValue) {
      this.storage.store('loadingFlag', true)
      // console.log(this.searchForm)
      // console.log(this.searchValue)
      let searchDept = {
        name: this.searchValue
      }
      this.service.search('departments/search', searchDept).subscribe(
        data=>{
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.data = ''
          setTimeout(_=>{
            this.data = data.data
            this.sharingService.setData(this.data)
          }, 500)
          // this.service.handleSuccess(`تمت اضافة قسم ${data.data.name} بنجاح  `)
        },
        error=>{
          this.storage.store('loadingFlag', false)
          console.log(error)
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

}
