import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  empModal: Employee = new Employee();
  role = ['Manager', 'Technician'];
  constructor(private fb: FormBuilder, private router:Router,
    private empService:EmployeeService,private route: ActivatedRoute) {}
  ngOnInit() {
    this.createEmployeeForm();
    this.route.paramMap.subscribe(params=>{
      const empId = +params.get('id');
      if(empId){
        this.getEmployee(empId)
      }
    })
  }
  getEmployee(id:number){
    this.empService.getUniqueEmp(id).subscribe(
      (employee)=> {
        this.editEmployee(employee)
        this.empModal = employee
      },
      (err:any) => console.log(err)      
    )
  }
  editEmployee(employee:any){
    this.employeeForm.patchValue({
      firstName : employee.firstName,
      lastName: employee.lastName,
      age: employee.age,
      role: employee.role,
      startDate: employee.startDate,
      endDate: employee.endDate
    })
  }
  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      startDate: [''],
      endDate: [''],
      role: this.fb.group({
        role:['']
      })
    });
  }
  onSubmit() {
    this.mapFormValueTOEmployeeModal()
    this.empService.update(this.empModal).subscribe(()=>{
      this.router.navigate(['list']),
      (err)=>console.log(err);
      
    })
    console.log(this.employeeForm);
    
  }
  mapFormValueTOEmployeeModal(){
    this.empModal.firstName =this.employeeForm.value.firstName,
    this.empModal.lastName =this.employeeForm.value.lastName,
    this.empModal.age = this.employeeForm.value.age,
    this.empModal.startDate = this.employeeForm.value.startDate,
    this.empModal.endDate = this.employeeForm.value.endDate,
    this.empModal.role = this.employeeForm.value.role

  }
  createEmployee() {
    this.empModal.firstName = this.employeeForm.value.firstName;
    this.empModal.lastName = this.employeeForm.value.lastName;
    this.empModal.age = this.employeeForm.value.age;
    this.empModal.startDate = this.employeeForm.value.startDate;
    this.empModal.endDate = this.employeeForm.value.endDate;
    this.empModal.role = this.employeeForm.value.role
    this.empService.create(this.empModal).subscribe(
      (res) => {
        console.log(res);
        this.employeeForm.reset();
        alert('Post Added Successfully');
        this.router.navigate(['list'])
      },
    );
    
  }
}
