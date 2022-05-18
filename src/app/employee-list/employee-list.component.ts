import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Utilityservice } from '../service/utilityservice.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public empList : any = [];
  constructor(private api : ApiService, private router : Router, private utility : Utilityservice,
              public http :HttpClient) { }


  ngOnInit(): void {
    this.getAllEmployees();
    this.utility.isUpdate.next(false)
  }
  getAllEmployees(){
    this.api.getEmployees()
    .subscribe(res=>{
      this.empList = res.reverse();
    })
  }

  onDelete(row:any){
    this.api.deleteEmployee(row.id).subscribe
    (res=>{
      alert("Employee Delete Successfully");
      this.getAllEmployees();
    })
  }

  onEdit(id:number){
    this.utility.isUpdate.next(true);
    this.router.navigateByUrl('/edit',{ state: {data:id} })
  }


}
