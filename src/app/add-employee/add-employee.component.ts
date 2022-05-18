import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from '../model/employee.model';
import { ApiService } from '../service/api.service';
import {Utilityservice} from '../service/utilityservice.service'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public empForm !: FormGroup;
  public employeeModelObj = new EmployeeModel();
  public editEmpId !: number;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private utility:Utilityservice) {
    this.editEmpId = history.state.data;
   }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', Validators.required],
      contactno: ['', [Validators.compose([Validators.required, Validators.maxLength(10)])]],
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      dob: ['', Validators.required],
      address: ['', Validators.required],
    });
    if(this.editEmpId){
      this.getEmployeeById();
    }
  }

  // fullname : any

  // public onAddEmployee(){
  //    console.log("empForm",this.empForm.value);
  //    this.fullname=this.empForm.value.firstname + this.empForm.value.lastname

  // }

  addEmployee() {
    var isChecked = true;
    if (this.empForm.invalid)
      for (var a in this.empForm.controls) {
        this.empForm.controls[a].markAsDirty();
        this.empForm.controls[a].updateValueAndValidity();
        isChecked = false;
      }
    if (isChecked) {
      this.employeeModelObj.firstname = this.empForm.value.firstname;
      this.employeeModelObj.lastname = this.empForm.value.lastname;
      this.employeeModelObj.role = this.empForm.value.role;
      this.employeeModelObj.contactno = this.empForm.value.contactno;
      this.employeeModelObj.email = this.empForm.value.email;
      this.employeeModelObj.dob = this.empForm.value.dob;
      this.employeeModelObj.address = this.empForm.value.address;

      this.api.postEmployee(this.employeeModelObj).subscribe((res: any) => {
        console.log(res);
        this.empForm.reset();
        alert("Employee Added Succesfully")
        this.router.navigateByUrl('/employees');


      });
    }


  }





  clickaddemployee() {
    this.empForm.reset();
  }

  public empData: any;
  getEmployeeById() {
    this.api.getEmployee(this.editEmpId)
      .subscribe(res => {
        this.empData = res;
        this.EditEmployeeDetail();
      })
  }

  EditEmployeeDetail() {
    this.empForm.controls['firstname'].setValue(this.empData.firstname),
      this.empForm.controls['lastname'].setValue(this.empData.lastname),
      this.empForm.controls['role'].setValue(this.empData.role),
      this.empForm.controls['contactno'].setValue(this.empData.contactno)
    this.empForm.controls['email'].setValue(this.empData.email)
    this.empForm.controls['dob'].setValue(this.empData.dob)
    this.empForm.controls['address'].setValue(this.empData.address)

  }

  UpdateEmployeeDetail() {
    this.employeeModelObj.id = this.editEmpId;
    this.employeeModelObj.firstname = this.empForm.value.firstname;
    this.employeeModelObj.lastname = this.empForm.value.lastname;
    this.employeeModelObj.contactno = this.empForm.value.contactno;
    this.employeeModelObj.email = this.empForm.value.email;
    this.employeeModelObj.dob = this.empForm.value.dob;
    this.employeeModelObj.address = this.empForm.value.address;
    this.employeeModelObj.role = this.empForm.value.role;
    this.api.putEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert("Updated Employee");
        this.router.navigateByUrl('/employees')
        this.empForm.reset();
        this.utility.isUpdate.next(false)

      })
  }

}
