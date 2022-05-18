import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilityservice } from './service/utilityservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployecrudAssignment';

  isUpdate !: boolean;
  constructor(private router : Router, private utility:Utilityservice,private cdr: ChangeDetectorRef){

  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.utility.isUpdate.subscribe(val=>{
      setTimeout(() => {
        this.isUpdate = val
      }, 0);
    })
  }

}
