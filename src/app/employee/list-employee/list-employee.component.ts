import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee;
  employeeData: any = [];
  searchValue:string;
  role:any
  constructor(private empService: EmployeeService, private router: Router) {}
  empData: [];
  ngOnInit(): void {
    this.getAllEployee()
  }
  getAllEployee(){
    this.empService.getAll().subscribe((employees) => {
      (this.employeeData = employees), (err) => console.log(err);
    });
    this.employeeData.forEach(element => {
        return this.role = JSON.stringify(element.role.value)
    });
  }
  createEmployee() {
    this.router.navigate(['create']);
  }
  edit(empId: number) {
    this.router.navigate(['/edit', empId]);
  }
  deletePost(data: any) {
    this.empService.delete(data.id).subscribe((res) => {});
    this.getAllEployee()
  }
}
