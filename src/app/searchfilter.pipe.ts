import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee/employee';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(Employee: Employee[], searchValue: string): Employee[] {
    if (!Employee || !searchValue) {
      return Employee;
    }
    return Employee.filter((employee) => {
      return (
        (
          employee.firstName.toLowerCase() || employee.lastName.toLowerCase()
        ).includes(searchValue.toLowerCase()) 
      );
    });
  }
}
