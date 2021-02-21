import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  data
  constructor() { }

  getData(){
    return this.data? this.data : ''
  }

  setData(data){
    this.data = data
  }

}
