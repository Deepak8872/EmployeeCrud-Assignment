import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes =[
  {path:'', redirectTo:'employees', pathMatch:'full'},
  {path:'employees', component:EmployeeListComponent},
  {path:'add', component:AddEmployeeComponent},
  {path:'edit', component: AddEmployeeComponent}
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
