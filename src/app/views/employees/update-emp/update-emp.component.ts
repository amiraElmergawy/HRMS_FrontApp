import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
})
export class UpdateEmpComponent implements OnInit {

  genders = [
    "ذكر",
    "انثي"
  ];
  religions = [
    "مسلم",
    "مسيحى"
  ];
  status = [
    "خاضع للاضافي",
    "غير خاضع للاضافي"
  ];
  departments;
  employees;
  empId;
  currentEmpData;
  changeNameFlag = false
  //******************* */
  empForm = new FormGroup({
    personalData: new FormGroup({
      name: new FormControl(''),
      firstName: new FormControl(''),
      secondName: new FormControl(''),
      thirdName: new FormControl(''),
      familyName: new FormControl(''),
      gender: new FormControl(0, [Validators.required]),// 0 for male and 1 for female
      religion: new FormControl(0, [Validators.required]),// 0 for muslim and 1 for Christian
      Nationality: new FormControl('', [Validators.required,
      Validators.pattern("^[\u0621-\u064A ]+$")]),
      mStatus: new FormControl('', [Validators.required,
      Validators.pattern("^[\u0621-\u064A ]+$")]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{11}$")
      ]),
      address: new FormControl('',
        [Validators.required,
        Validators.pattern("^[0-9 \u0621-\u064A]+$")]
      ),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ])
      ,
      birthDate: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(18)
      ]),
      birthPlace: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A 0-9]+$"),
      ]),
      motherName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
    }),
    nationalData: new FormGroup({
      nID: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{14}$"),
      ]),
      currentAddress: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A 0-9]+$"),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      cRegistry: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      issDate: new FormControl(null, [
        Validators.required,
      ]),
      expDate: new FormControl(null, [
        Validators.required,
      ]),
    }),
    academicData: new FormGroup({ // Academic qualification data
      acadQualification: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      specialization: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      degree: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A 0-9]+$")
      ]),
      university: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      collage: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      yearsNo: new FormControl(null, [ // # of studying years
        Validators.required,
        Validators.maxLength(99)
      ]),
      gradYear: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A 0-9]+$")
      ]),
      anotherQualifications: new FormControl('', [
        // Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
    }),
    contractData: new FormGroup({
      hireDate: new FormControl(null, [
        Validators.required
      ]),
      workYearsNo: new FormControl(null, []),
      contractType: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      opType: new FormControl('', [ // part-time, full-time, etc....
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      startaDate: new FormControl(null, [
        Validators.required
      ]),
      endDate: new FormControl(null, [
        Validators.required
      ]),
      insuranceNo: new FormControl(null, [
        Validators.required
      ]),
      insuranceDate: new FormControl(null, [
        Validators.required
      ]),
    }),
    jobData: new FormGroup({
      job: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ]),
      dept: new FormControl('', [
        Validators.required
      ]),
      directPoss: new FormControl('', [
        // Validators.required
      ]),
      salary: new FormControl(null),
      currentSalary: new FormControl(null, [
        Validators.required
      ]),
      // can have extra salary or not
      status: new FormControl(0, [
        Validators.required
      ]),
      endStatus: new FormControl('', [
        Validators.required,
        Validators.pattern("^[\u0621-\u064A ]+$")
      ])
    })
  });
  constructor(private service: MainService, private actRoute: ActivatedRoute, private storage:LocalStorageService) {
    this.empId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getEmployees();
    this.formValueChanged()
    this.collapse()
  }

  collapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          // content.style.maxHeight = content.scrollHeight + "px";
          content.style.maxHeight = content.scrollHeight / 4 + "px"
        }
      });
    }
  }

  getDepartments() {
    this.storage.store('loadingFlag', true)
    this.service.show('departments').subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.departments = data
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.departments = '';
      })
  }

  getEmployees() {
    this.storage.store('loadingFlag', true)
    this.service.show(`employees`).subscribe(
      data => {
        // console.log(data)
        this.storage.store('loadingFlag', false)
        this.employees = data
        this.currentEmpData = data.find(emp => emp._id == this.empId);
        this.formInit()
        // console.log(this.currentEmpData)
        // console.log(this.deptHead, "head")
      },
      error => {
        this.storage.store('loadingFlag', false)
        this.employees = ''
        // return '';
      }
    )
  }

  changeDateFormat(date) {
    return date.substring(0, 10)
  }

  formInit() {
    this.currentEmpData.personalData.gender = this.currentEmpData.personalData.gender ? 1 : 0
    this.currentEmpData.personalData.religion = this.currentEmpData.personalData.religion ? 1 : 0
    this.currentEmpData.jobData.status = this.currentEmpData.jobData.status ? 1 : 0
    this.currentEmpData.personalData.birthDate = this.changeDateFormat(this.currentEmpData.personalData.birthDate)
    this.currentEmpData.nationalData.issDate = this.changeDateFormat(this.currentEmpData.nationalData.issDate)
    this.currentEmpData.nationalData.expDate = this.changeDateFormat(this.currentEmpData.nationalData.expDate)
    this.currentEmpData.contractData.startaDate = this.changeDateFormat(this.currentEmpData.contractData.startaDate)
    this.currentEmpData.contractData.insuranceDate = this.changeDateFormat(this.currentEmpData.contractData.insuranceDate)
    this.currentEmpData.contractData.hireDate = this.changeDateFormat(this.currentEmpData.contractData.hireDate)
    this.currentEmpData.contractData.endDate = this.changeDateFormat(this.currentEmpData.contractData.endDate)
    this.empForm?.reset(this.currentEmpData)
  }

  changeElementValue(ele, value) {
    ele.setValue(value)
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  updateName() {
    this.changeNameFlag = true
    this.changeElementValue(this.empForm.get('personalData.name'), 'اسم الموظف')
    let firstNameValue = '', secondNameVlue = '', thirdNameValue = '', familyNameValue = '';
    this.empForm.get('personalData.firstName').valueChanges.subscribe(
      value => {
        firstNameValue = value
        this.changeElementValue(this.empForm.get('personalData.name'), `${firstNameValue} ${secondNameVlue} ${thirdNameValue} ${familyNameValue}`)
      }
    )
    this.empForm.get('personalData.secondName').valueChanges.subscribe(
      value => {
        secondNameVlue = value
        this.changeElementValue(this.empForm.get('personalData.name'), `${firstNameValue} ${secondNameVlue} ${thirdNameValue} ${familyNameValue}`)
      }
    )
    this.empForm.get('personalData.thirdName').valueChanges.subscribe(
      value => {
        thirdNameValue = value
        this.changeElementValue(this.empForm.get('personalData.name'), `${firstNameValue} ${secondNameVlue} ${thirdNameValue} ${familyNameValue}`)
      }
    )
    this.empForm.get('personalData.familyName').valueChanges.subscribe(
      value => {
        familyNameValue = value
        this.changeElementValue(this.empForm.get('personalData.name'), `${firstNameValue} ${secondNameVlue} ${thirdNameValue} ${familyNameValue}`)
      }
    )
  }

  formValueChanged() {
    this.empForm.get('personalData.birthDate').valueChanges.subscribe(
      date => {
        this.changeElementValue(this.empForm.get('personalData.age'), this.getAge(date))
      }
    )

    this.empForm.get('nationalData.nID').valueChanges.subscribe(
      value => {
        if (this.empForm.get('nationalData.nID').valid) { // calculate birth date from national id number and detect the gender
          value = value.toString();
          let year = value[0] == '2' ? '19' : '20'
          year += value.substring(1, 3)
          const mon = value.substring(3, 5)
          const day = value.substring(5, 7)
          const birthDate = `${mon}-${day}-${year}`
          this.changeElementValue(this.empForm.get('personalData.birthDate'), birthDate)
          // this.changeElementValue(this.empForm.get('personalData.age'), this.getAge(this.empForm.get('personalData.birthDate')))
          const gender = +value[12] % 2 == 0 ? 1 : 0
          this.changeElementValue(this.empForm.get('personalData.gender'), gender)
        }
      }
    )
  }

  convertDate(date): string {
    var temp = new Date(date).toLocaleString()
    return temp.substring(0, temp.indexOf(","))
  }

  async update() {
    this.empForm.markAllAsTouched()
    if (this.empForm.valid) { // enhance form value to be like employee object
      this.empForm.value.personalData.birthDate = this.convertDate(this.empForm.value.personalData.birthDate)
      this.empForm.value.nationalData.issDate = this.convertDate(this.empForm.value.nationalData.issDate)
      this.empForm.value.nationalData.expDate = this.convertDate(this.empForm.value.nationalData.expDate)
      this.empForm.value.contractData.hireDate = this.convertDate(this.empForm.value.contractData.hireDate)
      this.empForm.value.contractData.startaDate = this.convertDate(this.empForm.value.contractData.startaDate)
      this.empForm.value.contractData.endDate = this.convertDate(this.empForm.value.contractData.endDate)
      this.empForm.value.contractData.insuranceDate = this.convertDate(this.empForm.value.contractData.insuranceDate)
      delete this.empForm.value.personalData.firstName
      delete this.empForm.value.personalData.secondName
      delete this.empForm.value.personalData.thirdName
      delete this.empForm.value.personalData.familyName
      this.empForm.value.code = this.employees.length + 1
      // console.log(this.empForm.value)
      this.empForm.value.nationalData.nID = this.empForm.value.nationalData.nID.toString()
      this.storage.store('loadingFlag', true)
      // this.alertFlag = false
      // console.log(this.empForm.value)
      this.service.update(`employees/update/${this.empId}`, this.empForm.value).subscribe(
        data => {
          // console.log(data)
          this.storage.store('loadingFlag', false)
          this.service.handleSuccess(`تم تحديث البيانات بنجاح`)
        },
        error => {
          this.storage.store('loadingFlag', false)
          // console.log(error)
          this.service.handleError(error)
          // this.service.onShowWarning()
        }
      )
    }
    else console.log(this.empForm.value)
  }

  async clear() {
    this.formInit()
  }
}
