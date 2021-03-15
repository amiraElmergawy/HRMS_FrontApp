import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  loadingFlag = false
  constructor(private localSt:LocalStorageService){}

  ngOnInit(): void {
    this.localSt.observe('loadingFlag').subscribe((value)=>{
      setTimeout(_=>{
        this.loadingFlag = value
      });
    });
  }
}
