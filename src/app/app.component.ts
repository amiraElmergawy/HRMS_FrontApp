import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  loadingFlag = false

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // localStorage.observe('loadingFlag').subscribe((value)=>{
    //   setTimeout(()=>{this.loadingFlag=value});
    // });
    // this.loadingFlag = localStorage.getItem('loadingFlag')
    // window.addEventListener(localStorage.getItem('loadingFlag'), _=>{
    //   console.log(localStorage.getItem('loadingFlag'))

    //   // if(value)
    // })
    // localStorage.observe('loadingFlag').subscribe((value)=>{
    //   setTimeout(()=>{console.log(value)});
    // });
  }
}
