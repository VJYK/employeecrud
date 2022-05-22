import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  create(data:any){
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAll() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getUniqueEmp(id:number){
    return this.http.get<any>('http://localhost:3000/posts/'+id).pipe(
      map((res:any)=> {return res})
    )
  }
  update(data: any) {
    return this.http.put<any>('http://localhost:3000/posts/' + data.id,data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  delete(id: any) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
